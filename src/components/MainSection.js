import "./css/MainSection.css";
import Modal from "./Modal";
import { useState } from "react";
import PieChart from "./Chart/PieChart";
import BarChartPreWeek from "./Chart/BarChartPreWeek";
import LineChart from "./Chart/LineChart";

const MainSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="main-section">
      <div className="main-container" id="info1-con1">
        <div className="main-info1">
          <div className="info1-box1">
            <h3 className="h3">
              <span className="txt">
                <p className="p">
                  사장님 오늘은 탄소배출량을 00톤 달성! 어제 대비 0.3%
                  감소하였어요!
                </p>
                <p className="p1">
                  이대로 계속하면 전력사용량 00% 감소, 탄소배출량 00% 감소가
                  예상돼요!
                </p>
              </span>
            </h3>
          </div>
          <div className="info1-box2">
            <div className="todayco2" id="todayCo2Div">
              <div className="todayco2-image">
                <img className="icon" alt="" src="../4-1@2x.png" />
              </div>
              <div className="todayco2-text">
                <b className="b1" id="todayCo2Text">
                  오늘의 탄소배출량
                </b>
                <b className="ttco2" id="todayCo2Text2">
                  128,300 t/tco2
                </b>
              </div>
            </div>
            <div className="todayelectric">
              <div className="todayelectric-image">
                <img className="icon1" alt="" src="../5-1@2x.png" />
              </div>
              <div className="todayelectric-text">
                <b className="b1" id="todayeleText">
                  오늘의 전력소비량
                </b>
                <b className="kw">12300 kw</b>
              </div>
            </div>
          </div>
        </div>
        <div className="main-info2" id="info1-c1d2" />
      </div>
      <div className="main-container2">
        <div className="main-info3" id="Main Info3">
          <div className="info3-box">
            <b className="b">연간 전력소비량</b>
            <button className="info3-button" onClick={showModal}>
              <div className="plus">
                <img className="plus1-icon" alt="" src="../plus1.svg" />
              </div>
            </button>
          </div>
          <div className="info3-box2">
            {/* <div className="pie">
              <PieChart></PieChart>
            </div> */}
            <div className="bar">
              {/* <BarChartPreWeek></BarChartPreWeek> */}
            </div>
          </div>
        </div>
        <div className="main-info3" id="Main Info4">
          <div className="info3-box">
            <b className="b">연간 탄소배출량</b>
            <button className="info3-button" onClick={showModal}>
              <div className="plus">
                <img className="plus1-icon" alt="" src="../plus11.svg" />
              </div>
            </button>
          </div>
          <div className="Line">
            <LineChart></LineChart>
          </div>
        </div>
      </div>
      {modalOpen === true && <Modal setModalOpen={setModalOpen} />}
    </div>
  );
};

export default MainSection;
