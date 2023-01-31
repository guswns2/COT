import "./css/Header.css";
import { useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/Login");
  };

  //스크롤 이벤트
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  }, []);
  
  return (
    <div className={scrollPosition > 74.96 ? "change-section" : "top-section"}>
      <div className={scrollPosition > 74.96 ? "change-header" : "top-header"}>
        <div
          className={
            scrollPosition > 74.96 ? "change-container" : "top-container"
          }
        >
          <button
            className={
              scrollPosition > 74.96
                ? "change-of-tomorrow2"
                : "change-of-tomorrow"
            }
          >
            Change Of Tomorrow
          </button>
          <div className="navigation-right">
            <div className="navigation-menu">
              <button
                className={scrollPosition > 74.96 ? "change-menu1" : "menu1"}
                onClick={() => {
                  window.scrollTo({
                    top: document.querySelector("head").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                메인
              </button>
              <button
                className={scrollPosition > 74.96 ? "change-menu1" : "menu1"}
                onClick={() => {
                  window.scrollTo({
                    top: document.querySelector(".second-container1").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                과거데이터
              </button>
              <button
                className={scrollPosition > 74.96 ? "change-menu1" : "menu1"}
                onClick={navigateLogin}
              >
                Login
              </button>
            </div>
            <div className="account-section">
              {/* <button className="notification-bell">
                <img className="vector-icon" alt="" src="../vector.svg" />
                <img className="vector-icon1" alt="" src="../vector1.svg" />
                <img
                  className="notification-bell-child"
                  alt=""
                  src="../ellipse-53.svg"
                />
              </button> */}
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
