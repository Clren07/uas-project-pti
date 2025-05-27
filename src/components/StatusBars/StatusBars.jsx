// StatusBars.jsx
import "./StatusBars.css";

const StatusBars = ({ hunger, energy, happiness, hygiene, maxStatus }) => {
  return (
    <div className="status-bars">
      <div className="bar-container">
        <div className="bar-icon">🍽️</div>
        <div className="bar">
          <div
            className="bar-fill hunger"
            style={{ width: `${(hunger / maxStatus) * 100}%` }}
          ></div>
          <span className="bar-value">{hunger}</span>
        </div>
      </div>

      <div className="bar-container">
        <div className="bar-icon">⚡</div>
        <div className="bar">
          <div
            className="bar-fill energy"
            style={{ width: `${(energy / maxStatus) * 100}%` }}
          ></div>
          <span className="bar-value">{energy}</span>
        </div>
      </div>

      <div className="bar-container">
        <div className="bar-icon">😊</div>
        <div className="bar">
          <div
            className="bar-fill happiness"
            style={{ width: `${(happiness / maxStatus) * 100}%` }}
          ></div>
          <span className="bar-value">{happiness}</span>
        </div>
      </div>

      <div className="bar-container">
        <div className="bar-icon">🧼</div>
        <div className="bar">
          <div
            className="bar-fill hygiene"
            style={{ width: `${(hygiene / maxStatus) * 100}%` }}
          ></div>
          <span className="bar-value">{hygiene}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBars;
