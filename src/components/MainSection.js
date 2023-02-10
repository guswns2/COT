import "./css/MainSection.css";
// import Modal from "./Modal";
import { useState, useEffect } from "react";
import PieChart from "./Chart/PieChart";
import BarChartNow from "./Chart/BarChartNow";
import LineChart from "./Chart/LineChart";
import DoughnutChart from "./Chart/DoughnutChart";
import Clock from "./Clock";
import axios from "axios";

const MainSection = () => {
  const [todayPower, setTodayPower] = useState(0);
  const [todayCarbon, setTodayCarbon] = useState(0);
  const [randomNum, setRandomNum] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState();
  const [temp1,setTemp1] = useState();
  const [temp2,setTemp2] = useState();
  const [temp3,setTemp3] = useState();
  const [weather1,setWeather1] = useState();
  const [weather2,setWeather2] = useState();
  const [weather3,setWeather3] = useState();
  const [humi1, setHumi1] = useState();
  const [humi2, setHumi2] = useState();
  const [wind1, setWind1] = useState();
  const [wind2, setWind2] = useState();
  const [yes1, setYes1] = useState();
  const [yes2, setYes2] = useState();
  const [yes3, setYes3] = useState();
  const [id,setId] = useState();  
  const [loc1,setLoc1] = useState();
  const wise = [
    ["측정할 수 없으면 관리할 수 없다.", "- 피터 드러커 -"],
    [
      "앞으로 나아가는 유일한 방법은 환경의 질을 향상시키려면 모든 사람을 참여시키는 것입니다.",
      "- 리처드 로저스 -",
    ],
    [
      "행복의 첫 번째 조건 중 하나는 인간과 자연의 연결고리가 끊어지지 않는 것이다.",
      "- 레오 톨스토이 -",
    ],
    ["지구는 우리 모두의 공통점이야.", "- 웬델 베리 - "],
    [
      "환경은 우리 모두가 만나는 곳이고, 우리 모두가 서로 관심을 갖는 곳이며, 그것이 우리 모두가 공유하는 유일한 것이다.",
      "- 레이디 버드 존슨 -",
    ],
    [
      "과학의 올바른 용도는 자연을 정복하는 것이 아니라 그 속에서 살아가는 것이다.",
      "- Barry Popular -",
    ],
  ];
  // // 모달 페이지
  // const [modalOpen, setModalOpen] = useState(false);

  // const showModal = () => {
  //   setModalOpen(true);
  //   document.body.style.overflow = "hidden";
  // };

  function getData() {
    try{
    axios({
      method: "GET",
      url:"/today_weather",

    })
    .then((response) => {
      
      let arr1 = ((response.data.data.split(' ')).filter((e) => e != '')).slice(0,8);
      let arr2 = ((response.data.data.split(' ')).filter((e) => e != '')).slice(11,15);
      let arr3 = arr1.concat(arr2);
      
      // console.log('arr3',arr3)
      // 위치
      let loc = response.data.data1
      
      
      console.log("위치",loc)
      // 현재 온도 ~~
      let temp = arr3.slice(3,5);
      temp[1] = temp[1].substring(0,2);
      temp[2] = arr3.slice(3,5)[1].substring(2,);
      console.log('temp',temp)
      console.log('temp2',temp[2])
      let weather = arr3.slice(0,3);
      for (let i = 0; i < weather.length; i++){
        if (i != weather.length-1)
        weather[i] = weather[i] + " ";
      }

      // 습도
      let humi = arr3.slice(8,10);
      for (let i = 0; i < humi.length; i++){
        if (i != humi.length-1)
        humi[i] = humi[i] + " ";
      }

      // 바람
      let wind = arr3.slice(10,);
      for (let i = 0; i < wind.length; i++){
        if (i != wind.length-1)
        wind[i] = wind[i] + " ";
      }

      // 어제보다 오늘 더
      let yes = arr3.slice(5,8);
      for (let i = 0; i < yes.length; i++){
        if (i != yes.length-1)
        yes[i] = yes[i] + " ";
      }
      
      location
      setLoc1(loc)

      //Temp
      setTemp1(temp[0]);
      setTemp2(temp[1]);
      setTemp3(temp[2]);
      
      //Weather
      setWeather1(weather[0]);
      setWeather2(weather[1]);
      setWeather3(weather[2]);
      
      //humi
      setHumi1(humi[0]);
      setHumi2(humi[1]);
      
      //wind
      setWind1(wind[0]);
      setWind2(wind[1]);
      
      //Yes
      setYes1(yes[0]);
      setYes2(yes[1]);
      setYes3(yes[2]);
      

      

      let weatherArr = ["sun.png","rainy.png","cloud.png","cloudy.png","snow.png"];
      if (arr1[2] == "맑음"){
        setWeatherIcon(weatherArr[0]);  
      } else if(arr1[2] == "구름많음"){
        setWeatherIcon(weatherArr[3]);  
      } else if(arr1[2] == "흐림"){
        setWeatherIcon(weatherArr[2]);  
      } else if(arr1[2] == "비"){
        setWeatherIcon(weatherArr[1]);  
      } else if(arr1[2] == "눈"){
        setWeatherIcon(weatherArr[4]);
      }
      

    }).catch((error) => {
      if (error.response) {
        console.log
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
  catch(error){
    console.log("dd")
  }
  }

  useEffect(() => {
    // 
    getData()

    // 주간 전력소비량
    axios
      .post("http://127.0.0.1:3001/MainSection", {
        // SecondSection.js 로부터 props형식으로 받은 날짜값을 전달
      })
      .then((result) => {
        // 받는 부분
        console.log("MainSection 데이터 : ", result.data.mainsection[0].power);
        let power = String(result.data.mainsection[0].power).replace(
          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
          ","
        );
        let carborn = String(result.data.mainsection[0].carborn).replace(
          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
          ","
        );
        setTodayPower(power);
        setTodayCarbon(carborn);
        setRandomNum(Math.floor(Math.random() * 5 + 1));
      }) // axios로 보낼 위치에 데이터 보내기를 성공하면 then
      .catch(() => {
        console.log("데이터 보내기 실패!");
      });

      document.getElementById("main").style.borderBottom = "1px solid white";
      document.getElementById("dashboard").style.borderBottom ="";
  }, []);
  // 로컬스토리지에 저장
  let I = String(localStorage.getItem("id"));
  const handleId = (e) => {
    e.preventDefault();
    console.log('e.target.value',e.target.value);
    localStorage.setItem('id',e.target.id);
    setId(e.target.id);
  };

  return (
    <div className="main-section">
      <div className="main-container" id="info1-con1">
        <div className="main-info1">
          <div className="info1-box1">
            <h1 className="h1">
              <Clock></Clock>
            </h1>
            <div className="h3">
              <img
                src="green.png"
                style={{ width: "100px", height: "100px" }}
              ></img>
              <div className="txt">
                <span
                  style={{
                    fontSize: "21px",
                    display: "inline-block",
                    position: "relative",
                  }}
                >
                  {console.log("randomNum", randomNum)}
                  {wise[randomNum][0]}
                  <br></br>
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    display: "inline-block",
                    position: "relative",
                  }}
                >
                  {wise[randomNum][1]}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="main-container1-1">
          <div className="main-info2" id="info1-c1d2">
            <div className="info1-box2">
              <div className="info1-box2-c1">
                <div className="todayco2-image">
                  <img className="icon" alt="" src="../4-1@2x.png" />
                </div>
                <div className="todayco2-text">
                  <b className="b1" id="todayCo2Text">
                    오늘의 탄소배출량
                  </b>
                  <br></br>
                  <b className="ttco2" id="todayCo2Text2">
                    {todayPower}{" "}
                    <span style={{ fontSize: "14px" }}>t/tco2</span>
                  </b>
                </div>
              </div>
              <div className="info1-box2-c2">
                <div className="todayelectric-image">
                  <img className="icon1" alt="" src="../5-1@2x.png" />
                </div>
                <div className="todayelectric-text">
                  <b className="b1" id="todayeleText">
                    오늘의 전력소비량
                  </b>
                  <br></br>
                  <b className="kw">
                    {todayCarbon} <span style={{ fontSize: "14px" }}>kw</span>
                  </b>
                </div>
              </div>
            </div>
          </div>
          <div className="main-info2-weather" id="info1-c1d2">
            <div className="location">
            <span style={{fontSize:'20px'}}>{loc1}</span>
            </div>
              <div className="info2-weather1">
                <h5 style={{width:'100px'}}>
                  <span style={{fontSize:'20px'}}>{temp1} {temp2}</span>
                  <span style={{fontSize:'30px', color:'lightgreen'}}>{temp3}</span>
                </h5>
                <h5 style={{width:'120px', marginLeft:'10px', marginRight:'10px'}}>
                  <span style={{fontSize:'20px'}}>{weather1} {weather2}</span>
                  <span style={{fontSize:'29.7spx', color:'lightgreen'}}>{weather3}</span>
                </h5>
                <img className="weatherIcon" src={weatherIcon}></img>
              </div>
              <div className="info2-weather2">
                <h5 style={{width:'90px'}}>
                  <span style={{fontSize:'20px'}}>{humi1}</span>
                  <span style={{fontSize:'29.8px', color:'lightgreen'}}>{humi2}</span>
                </h5>
                <h5 style={{width:'120px'}}>
                  <span style={{fontSize:'18px'}}>{wind1}</span>
                  <span style={{fontSize:'27px', color:'lightgreen'}}>{wind2}</span>
                </h5>
                <h5 style={{width:'130px'}}>
                  <span style={{fontSize:'20px'}}>{yes1}</span>
                  <span style={{fontSize:'28px', color:'lightgreen'}}>{yes2}</span>{yes3}
                </h5>
              </div>
            </div>
        </div>
      </div>
      <div className="main-container2">
        <div className="main-info3" id="Main Info3">
          <div className="info3-box">
            <b className="b">전력소비량 / 탄소배출량</b>
            {/* <button className="info3-button" onClick={showModal}>
              <div className="plus">
                <img className="plus1-icon" alt="" src="../plus1.svg" />
              </div>
            </button> */}
          </div>
          <div className="info3-box2">
            <div className="bar">
              <BarChartNow></BarChartNow>
            </div>
          </div>
        </div>
        {/* <div className="main-info3" id="Main Info4">
          <div className="info3-box">
            <b className="b">7일 탄소배출량</b>
            <button className="info3-button" onClick={showModal}>
              <div className="plus">
                <img className="plus1-icon" alt="" src="../plus11.svg" />
              </div>
            </button>
          </div> */}
        {/* <div className="Line">
            <LineChart></LineChart>
          </div> */}
        {/* <div className="pie">
              <PieChart></PieChart>
            </div> */}
        {/* </div> */}
        <div className="main-info4" id="Main Info5">
          <div className="info3-box">
            <b className="b">탄소배출권</b>
          </div>
          <div className="Doughnut">
            <DoughnutChart></DoughnutChart>
          </div>
        </div>
      </div>
      {/* {modalOpen === true && <Modal setModalOpen={setModalOpen} />} */}
    </div>
  );
};

export default MainSection;
