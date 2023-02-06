import { colors, TextField } from "@mui/material";
import "./css/SecondSection.css";
import PieChart from "./Chart/PieChart";
import BarChartWeek from "./Chart/BarChartWeek";
import BarChartYear from "./Chart/BarChartYear";
import BarChartMonth from "./Chart/BarChartMonth";
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
          </div>
          <div className="info1-box21" id="Info1 Box">
            <button className="pdfbutton" />
          </div>
        </div>
      </div>
      <div className="second-container2" id="Second Container2">
        <div className="second-info2-1" id="Second Info2">
          <div className="info2-box1" id="info2 Box1">
            <b className="b">7일간 전력소비량 / 탄소배출량</b>
          </div>
          <div className="info2-box2" id="info2 Box2">
            <div className="bar">
              {/* {click === true && <BarChartWeek></BarChartWeek>} */}
              <BarChartWeek val={choice}></BarChartWeek>
            </div>
          </div>
        </div>
        <div className="second-info2-2" id="Second Info3">
          <div className="info2-box1" id="info3 Box1">
            <b className="b">요약</b>
          </div>

        </div>
      </div>
      <div className="second-container2" id="Second Container2">
        <div className="second-info2-1" id="Second Info2">
          <div className="info2-box1" id="info2 Box1">
            <b className="b">30일간 전력소비량 / 탄소배출량</b>
          </div>
          <div className="info2-box2" id="info2 Box2">
            <div className="bar">
              <BarChartMonth val={choice}></BarChartMonth>
            </div>
          </div>
        </div>
        <div className="second-info2-2" id="Second Info3">
          <div className="info2-box1" id="info3 Box1">
            <b className="b">요약</b>
          </div>

        </div>
      </div>

      <div className="second-container2" id="Second Container2">
        <div className="second-info2-1" id="Second Info2">
          <div className="info2-box1" id="info2 Box1">
            <b className="b">월간 전력소비량 / 탄소배출량</b>
          </div>
          <div className="info2-box2" id="info2 Box2">
            <div className="bar">
              <BarChartYear val={choice}></BarChartYear>
            </div>
          </div>
        </div>
        <div className="second-info2-2" id="Second Info3">
          <div className="info2-box1" id="info3 Box1">
            <b className="b">요약</b>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SecondSection;
