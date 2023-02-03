import "./css/Header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="top-header1">
        <div className="top-container">
          <button className="navigation-right">
            <button className="change-of-tomorrow">Change Of Tomorrow</button>
          </button>
          <div className="navigation-right1">
            <div className="vector-parent">
              <img className="group-child" alt="" src="../polygon-1.svg" />
              <div className="main-parent">
                <button className="main">MAIN</button>
                <button className="dashboard">DASHBOARD</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
