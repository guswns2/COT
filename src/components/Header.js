import { useNavigate } from "react-router-dom";
import "./css/Header.css";
import Clock from "./Clock";
const Header = () => {
  const nav = useNavigate();

  return (
    <div className="header">
      <div className="top-header1">
        <div className="top-container">
          <button className="navigation-right">
            <button
              className="change-of-tomorrow"
              onClick={() => {
                document.getElementById("main").style.borderBottom =
                  "1px solid white";
                document.getElementById("dashboard").style.borderBottom = "";
                nav("/");
              }}
            >
              Change Of Tomorrow
            </button>
          </button>
          <div className="navigation-right1">
            <div className="vector-parent">
              <img className="group-child" alt="" src="../polygon-1.svg" />
              <div className="main-parent">
                <button
                  className="main"
                  
                  id="main"
                  onClick={() => {
                    document.getElementById("main").style.borderBottom =
                      "1px solid white";
                    document.getElementById("dashboard").style.borderBottom =
                      "";
                    nav("/Main");
                  }}
                >
                  Main
                </button>
                <button
                  className="dashboard"
                  id="dashboard"
                  onClick={() => {
                    document.getElementById("dashboard").style.borderBottom =
                      "1px solid white";
                    document.getElementById("main").style.borderBottom = "";
                    nav("/dashboard");
                  }}
                >
                  DASHBOARD
                </button>
                <button
                  className="logout"
                  id="logout"
                  onClick={() => {
                    document.getElementById("logout").style.borderBottom = 
                    "1px solid white";
                    nav("/login")
                  }}
                >
                  LOGOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
