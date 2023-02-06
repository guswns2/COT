import { useNavigate } from "react-router-dom";
import "./css/Header.css";
const Header = () => {
  const nav = useNavigate();
  const navMain = () => {
    nav("/Main");
  };
  const navDash = () => {
    nav("/Dashboard");
  };
  return (
    <div className="header">
      <div className="top-header1">
        <div className="top-container">
          <button className="navigation-right">
            <button className="change-of-tomorrow" onClick={navMain}>
              Change Of Tomorrow
            </button>
          </button>
          <div className="navigation-right1">
            <div className="vector-parent">
              <img className="group-child" alt="" src="../polygon-1.svg" />
              <div className="main-parent">
                <button className="main" onClick={navMain}>
                  MAIN
                </button>
                <button className="dashboard" onClick={navDash}>
                  DASHBOARD
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
