// TopBar.jsx
import "./TopBar.css";

const TopBar = ({ greeting, time, money }) => {
  return (
    <div className="top-bar-container">
      <div className="top-bar glassmorphism">
        <div className="top-bar-item">
          <span className="value">{greeting}</span>
        </div>

        <div className="top-bar-item">
          <span className="value">{time}</span>
        </div>

        <div className="top-bar-item">
          <span className="value">${money.toLocaleString("id-ID")}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
