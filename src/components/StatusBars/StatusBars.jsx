// StatusBars.jsx
import "./StatusBars.css";
import React, { useEffect } from "react";

const StatusBars = ({ hunger, energy, happiness, hygiene, maxStatus }) => {
  useEffect(() => {
    console.log("Hunger updated:", hunger);
    console.log("Energy updated:", energy);
    console.log("Happiness updated:", happiness);
    console.log("Hygiene updated:", hygiene);
  }, [hunger, energy, happiness, hygiene]);

  return (
    <div className="status-bars">
      <div className="bar-container">
        <div className="bar-icon">🍽️</div>
        <div className="bar">
          <div
            className="bar-fill hunger"
            style={{ width: `${(hunger / maxStatus.hunger) * 100}%` }}
          ></div>
          <span className="bar-value">{hunger}</span>
        </div>
      </div>

      <div className="bar-container">
        <div className="bar-icon">⚡</div>
        <div className="bar">
          <div
            className="bar-fill energy"
            style={{ width: `${(energy / maxStatus.energy) * 100}%` }}
          ></div>
          <span className="bar-value">{energy}</span>
        </div>
      </div>

      <div className="bar-container">
        <div className="bar-icon">😊</div>
        <div className="bar">
          <div
            className="bar-fill happiness"
            style={{ width: `${(happiness / maxStatus.happiness) * 100}%` }}
          ></div>
          <span className="bar-value">{happiness}</span>
        </div>
      </div>

      <div className="bar-container">
        <div className="bar-icon">🧼</div>
        <div className="bar">
          <div
            className="bar-fill hygiene"
            style={{ width: `${(hygiene / maxStatus.hygiene) * 100}%` }}
          ></div>
          <span className="bar-value">{hygiene}</span>
        </div>
      </div>
    </div>

    
  );
};

export default StatusBars;
