import { colors, TextField } from "@mui/material";
import "./css/SecondSection.css";

const SecondSection = () => {
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
            />
            <button
              className="weekbutton"
              id="WeekButton"
              onClick={() => {
                document.getElementById("WeekButton").style.backgroundColor =
                  "rgb(190, 187, 187)";
                document.getElementById("MonthButton").style.backgroundColor =
                  "";
              }}
            >
              <b className="b4">주간</b>
            </button>
            <button
              className="weekbutton"
              id="MonthButton"
              onClick={() => {
                document.getElementById("WeekButton").style.backgroundColor = "";
                document.getElementById("MonthButton").style.backgroundColor =
                  "rgb(190, 187, 187)";
              }}
            >
              <b className="b4">월간</b>
            </button>
          </div>
          <div className="info1-box21" id="Info1 Box">
            <button className="pdfbutton" />
          </div>
        </div>
      </div>
      <div className="second-container2" id="Second Container2">
        <div className="second-info2" id="Second Info2">
          <div className="info2-box1" id="info2 Box1">
            <b className="b6">기간별 전력소비량</b>
          </div>
        </div>
        <div className="second-info2" id="Second Info3">
          <div className="info2-box1" id="info3 box1">
            <b className="b6">기간별 탄소배출량</b>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
