import "./css/Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/Login");
  };

  return (
    <div className="top-section">
      <div className="top-header">
        <div className="top-container">
          <button className="change-of-tomorrow">Change Of Tomorrow</button>
          <div className="navigation-right">
            <div className="navigation-menu">
              <button className="menu1">Menu1</button>
              <button className="menu1">Menu2</button>
              <button className="menu1" onClick={navigateLogin}>
                Login
              </button>
            </div>
            <div className="account-section">
              <button className="notification-bell">
                <img className="vector-icon" alt="" src="../vector.svg" />
                <img className="vector-icon1" alt="" src="../vector1.svg" />
                <img
                  className="notification-bell-child"
                  alt=""
                  src="../ellipse-53.svg"
                />
              </button>
              <button className="unsplashd1upkifd04a" />
              <img
                className="hamburger-menu-icon"
                alt=""
                src="../hamburgermenu@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
