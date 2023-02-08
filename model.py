from flask import Flask, redirect, jsonify, request
from datetime import datetime
import pymysql
from sqlalchemy import create_engine
pymysql.install_as_MySQLdb()
import requests as req
from bs4 import BeautifulSoup as bs
import pandas as pd
import datetime
import pandas as pd
from xgboost import XGBRegressor
import sys # 한글 출력 안되서 




app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/today_weather', methods = ['GET', 'POST'])
def crawling2() :
     
    res=req.get("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%EB%82%A0%EC%94%A8")
    soup=bs(res.text,'lxml')

    to = soup.select("#main_pack > section.sc_new.cs_weather_new._cs_weather > div._tab_flicking > div.content_wrap > div.open > div:nth-child(1) > div > div.weather_info > div")
    to_wt = to[0].text

    response_body = {
        'data' : to_wt
    }
    print(to_wt)
    return  response_body['data']


@app.route('/input', methods = ['GET', 'POST'])
def db_connector():
    # MySQL 연결
    engine = create_engine("mysql+mysqldb://cot:sion1234@project-db-stu.ddns.net:3307/cot", encoding='utf-8')
    conn = engine.raw_connection()
    cursor = conn.cursor()
    sql = "select * from dayuse"
    cursor.execute(sql)
    result = cursor.fetchall()
        
    data= pd.DataFrame(result, columns=['num', 'date_time', 'power', 'carbon', 'temp', 'humi', 'rain'])

    date = pd.to_datetime(data.date_time)
    data['hour'] = date.dt.hour
    data['day'] = date.dt.day
    data['month'] = date.dt.month
    data['weekday'] = date.dt.weekday   # 요일
    data['year'] = date.dt.year

    data.hour = data.hour.astype({'hour':'string'})
    data.day = data.day.astype({'day':'string'})
    data.month = data.month.astype({'month':'string'})
    data.weekday = data.weekday.astype({'weekday':'string'})
    data.year = data.year.astype({'year':'string'})


    data.hour = data.hour.astype({'hour':'object'})
    data.day = data.day.astype({'day':'object'})
    data.month = data.month.astype({'month':'object'})
    data.weekday = data.weekday.astype({'weekday':'object'})
    data.year = data.year.astype({'year':'object'})
    
    # 원 핫
    categorical_feature = ['hour', 'day', 'month', 'year', 'weekday']

    for feature_name in categorical_feature : 
        # 원-핫 인코딩
        one_hot = pd.get_dummies(data[feature_name],prefix=feature_name)
        # 기존 문자 형태 컬럼 삭제
        data.drop(feature_name, axis=1, inplace=True)
        # 기존 test 데이터에 원-핫 데이터 병합하기
        data = pd.concat([data,one_hot], axis=1)
    
    # 건물번호 string -> string 타입으로 변경
    data.num = data.num.astype({'num':'string'})
    data.num = data.num.astype({'num':'object'})

    train = data.iloc[:4000, :]
    test = data.iloc[4000:, :]

    y_train = train['power']
    x_train = train.iloc[:, 4:]

    y_test = test['power']
    x_test = test.iloc[:, 4:]

    xgb_reg = XGBRegressor(
                            n_estimators = 10000, 
                            eta = 0.01, 
                            max_depth = 8, 
                            colsample_bytree = 0.8, 
                            seed=0,
                        )
    xgb_reg.fit(x_train, y_train, eval_set=[(x_train, y_train), (x_test, y_test)],
            early_stopping_rounds=300,
            verbose=False)
    pred = xgb_reg.predict(x_test)
 
    predict = pd.DataFrame(pred, columns=['pre_power'])
    predict['pre_carbon'] = pred*0.4594

    df_test = pd.concat([test.num,test.date_time], axis=1, ignore_index=True)
    df_test = df_test.reset_index(drop=True)
   
    df_pre = pd.concat([predict, df_test], axis=1, ignore_index=True)
    df_pre = df_pre[[2,3,0,1]]
    df_pre.columns = ['pre_id', 'pre_time', 'pre_power', 'pre_carbon']
    
    print(df_test)
    df_pre.to_sql(name='predict', con=engine, if_exists='append', index=False)
  
    return redirect("localhost:3000/")


@app.route('/pre_weather', methods = ['GET', 'POST'])
def crawling() : 
    # freemeteo 에서 날씨 데이터 크롤링
    res=req.get("https://freemeteo.kr/weather/seoul/hourly-forecast/today/?gid=1835848&language=korean&country=south-korea")
    soup=bs(res.text,'lxml')

    week = ['today', 'tomorrow', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7']

    list_tm = []
    list_tp = []
    list_hm = []
    list_rn = []

    # 요일별
    for i in week : 
        res=req.get(f"https://freemeteo.kr/weather/seoul/hourly-forecast/{i}/?gid=1835848&language=korean&country=south-korea")
        soup=bs(res.text,'lxml')
        weather=soup.select("#content > div.right-col > div.weather-now > div.today.table > div > table > tbody > tr> td:nth-child(2)")
        # 시간별
        for i in range(2,len(weather)) : 
            weather=soup.select(f"#content > div.right-col > div.weather-now > div.today.table > div > table > tbody > tr> td:nth-child({i})")

            temp = weather[len(weather)-6].text
            humi = weather[len(weather)-3].text
            rain = weather[len(weather)-1].text
            if rain == '\xa0':
                rain = '0mm'

            time = soup.select(f"#content > div.right-col > div.weather-now > div.today.table > div > table > thead > tr > th:nth-of-type({i})")
            date = soup.select("#page-titles > h1")
            date = date[0].text[-11:].strip()+" "+time[0].text+":00"
            date = pd.to_datetime(date)
            if (time[0].text == '00:00') | (time[0].text == '03:00') : 
                date = date + datetime.timedelta(days=1)

            list_tm.append(date)
            list_tp.append(float(temp.replace('°C',"")))
            list_hm.append(float(humi.replace('%',"")))
            list_rn.append(float(rain.replace('mm',"")))

    # 가져온 데이터 데이터프레임으로 저장
    df_wt = pd.DataFrame(columns=['date_w','temp','humi','rain'])
    df_wt['date_w']=pd.Series(list_tm)
    df_wt['temp']=pd.Series(list_tp)
    df_wt['humi']=pd.Series(list_hm)
    df_wt['rain']=pd.Series(list_rn)
    df_wt = df_wt.set_index('date_w')
    
    # 3시간 단위 -> 1시간 단위로 변경 및 날씨데이터 보간
    df_rs = df_wt.resample(rule='H').last()
    df_ip = df_rs.interpolate()
    df_re = df_ip.reset_index()

    print(df_re)


    # DB로 데이터프레임 전송
    engine = create_engine("mysql+mysqldb://cot:sion1234@project-db-stu.ddns.net:3307/cot", encoding='utf-8')
    conn = engine.raw_connection()

    df_re.to_sql(name='weather', con=engine, if_exists='append', index=False)

    return redirect("localhost:3000")



if __name__ == '__main__':
    # 서버 실행
    app.run(port='5000' ,debug = True)