import "./css/MainSection.css";
// import Modal from "./Modal";
import { useState, useEffect } from "react";
import PieChart from "./Chart/PieChart";
import BarChartNow from "./Chart/BarChartNow";
import LineChart from "./Chart/LineChart";
import DoughnutChart from "./Chart/doughnutChart";
import Clock from "./Clock";
import axios from "axios";

const MainSection = () => {
  const [todayPower, setTodayPower] = useState(0);
  const [todayCarbon, setTodayCarbon] = useState(0);
  const [randomNum, setRandomNum] = useState(0);
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
  useEffect(() => {
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
    document.getElementById("dashboard").style.borderBottom = "";
  }, []);

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
          <div className="main-info2" id="info1-c1d2" />
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
