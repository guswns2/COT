import { colors, TextField } from "@mui/material";
import "./css/SecondSection.css";
import PieChart from "./Chart/PieChart";
import BarChartPreWeek from "./Chart/BarChartPreWeek";
import BarChartPreMonth from "./Chart/BarChartPreMonth";
import LineChart from "./Chart/LineChart";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";

const SecondSection = () => {
  const [choice , setChoice] =useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("e.target.value", e.target.value);
    setChoice(e.target.value);
  };
  

  return (
    <section className="second-section" id="Second Section">
      <div className="second-container1" id="Second Container1">
        <div className="second-info1" id="Second Info1">
          <div className="info1-box11" id="Info1 Box1">
            {/* <form onSubmit={handleSubmit} method="post"> */}
            <TextField
              className="selectdate"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="standard"
              size="medium"
              color="primary"
              fullWidth
              onChange={handleSubmit}
            />
            {/* </form> */}
            {/* <button className="weekbutton" id="WeekButton" type="submit">
              <b className="b4">확인</b>
            </button> */}
            {/* <button
              className="weekbutton"
              id="MonthButton"
              onClick={() => {
                document.getElementById("WeekButton").style.backgroundColor =
                  "";
                document.getElementById("MonthButton").style.backgroundColor =
                  "rgb(190, 187, 187)";
              }}
            >
              <b className="b4">월간</b>
            </button> */}
          </div>
          <div className="info1-box21" id="Info1 Box">
            <button className="pdfbutton" />
          </div>
        </div>
      </div>
      <div className="second-container2" id="Second Container2">
        <div className="second-info2" id="Second Info2">
          <div className="info2-box1" id="info2 Box1">
            <b className="b">주간 전력소비량</b>
          </div>
          <div className="info2-box2" id="info2 Box2">
            {/* <div className="pie">
              <PieChart></PieChart>
            </div> */}
            <div className="bar">
              {/* {click === true && <BarChartPreWeek></BarChartPreWeek>} */}
              <BarChartPreWeek val={choice}></BarChartPreWeek>
            </div>
          </div>
        </div>
        <div className="second-info2" id="Second Info3">
          <div className="info2-box1" id="info3 Box1">
            <b className="b">주간 탄소배출량</b>
          </div>
          <div className="Line">
            <LineChart></LineChart>
          </div>
        </div>
      </div>
      <div className="second-container2" id="Second Container2">
        <div className="second-info2" id="Second Info2">
          <div className="info2-box1" id="info2 Box1">
            <b className="b">월간 전력소비량</b>
          </div>
          <div className="info2-box2" id="info2 Box2">
            {/* <div className="pie">
              <PieChart></PieChart>
            </div> */}
            <div className="bar">
              <BarChartPreMonth val={choice}></BarChartPreMonth>
              </div>
          </div>
        </div>
        <div className="second-info2" id="Second Info3">
          <div className="info2-box1" id="info3 Box1">
            <b className="b">월간 탄소배출량</b>
          </div>
          <div className="Line">
            <LineChart></LineChart>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
