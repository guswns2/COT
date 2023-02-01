import { colors, TextField } from "@mui/material";
import "./css/SecondSection.css";
import PieChart from "./Chart/PieChart";
import BarChart from "./Chart/BarChart";
import LineChart from "./Chart/LineChart";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";

const SecondSection = () => {
  const [date, setDate] = useState();

  console.log(date);

  // const dateRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setDate(e.target.value);

    axios
      .post("http://127.0.0.1:3001/Date", {
        datevalue: date,
      })
      .then((result) => {
        console.log("데이터 보내기 성공!", result.data.date);
      }) // axios로 보낼 위치에 데이터 보내기를 성공하면 then
      .catch(() => {
        console.log("데이터 보내기 실패!");
      });
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
              <BarChart></BarChart>
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
              <BarChart></BarChart>
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
