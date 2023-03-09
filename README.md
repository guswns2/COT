## 스마트인재개발원 빅데이터 융합서비스 개발자과정 - 실전프로젝트


### 🖥 프로젝트 소개
주제 : 머신러닝 기반 건물에너지 및 탄소배출량 관리 Web

팀명 : COT (Change Of Tomorrow)

인원 : 5명

개발 기간 : 2022.12 ~ 2023.01 (약 4주)


### ⚙ 개발 환경
Web
 - Javascript, React

Server
 - Node.js(v16.17.1), Flask

DataBase
 - MySQL

MachineLearning 
 - Python

Code Editor 
 - VisualStudio Code, Jupyter, MySQL WorkBench

### 🔍📃📰💷🔄주요 기능
- Login : ID, PW 값 DB 검증
- Sign Up : ID 중복체크, DB 저장
- Main Page : 실시간 시간, 금일 누적 전력사용량&탄소배출량 값, 실시간 날씨, 일일/주간 시간당 전력사용량&탄소배출량&예측전력사용량 라인그래프, 연 누적 탄소배출량 도넛그래프
- History Page : 과거 주간/월간/연간 전력사용량&탄소배출량 라인그래프

### 🔁 프로젝트 설치 및 실행
- pm2 설치 : npm install pm2 -g 
- node_module 설치 : npm install -f (v8.15.0)
- Python Interpreter 선택 : Ctrl+Shift+p > Python: Select Interpreter > Python 3.9.12('base') ~\anaconda3\python.exe
- model.py 라이브러리 설치 : pip install flask, pip install pymysql, pip install flask_cors
