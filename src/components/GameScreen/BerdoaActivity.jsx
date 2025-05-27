// BerdoaActivity.jsx

import React, { useState, useEffect } from "react";

const BerdoaActivity = ({
  durationInSeconds,
  happinessGain,
  setStatusLevels,
  maxStatus,
  setShowGameScreen,
  setActionContent,
  setCountdownText,
  setProgressBarWidth
}) => {
  const [countdown, setCountdown] = useState(durationInSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const newCountdown = prev - 1;
        setCountdownText(`${newCountdown} detik`);
        const progress = (newCountdown / durationInSeconds) * 100;
        setProgressBarWidth(`${progress}%`);
        return newCountdown;
      });
    }, 1000);

    if (countdown <= 0) {
      clearInterval(interval);
      setActionContent(
        <div style={{ textAlign: "center", fontSize: "20px", color: "#fff" }}>
          <p>Berdoa selesai! Happiness +{happinessGain}</p>
        </div>
      );

      setStatusLevels((prev) => ({
        ...prev,
        happiness: Math.min(maxStatus, prev.happiness + happinessGain),
      }));

      setTimeout(() => {
        setShowGameScreen(true);
      }, 2000); // Delay untuk memberikan waktu sebelum kembali ke GameScreen
    }

    return () => clearInterval(interval);
  }, [countdown, durationInSeconds, happinessGain, setStatusLevels, maxStatus, setActionContent, setCountdownText, setProgressBarWidth, setShowGameScreen]);

  return (
    <div
      id="berdoa-container"
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "rgba(0,0,0,0.7)",
        borderRadius: "12px",
        color: "#fff",
        width: "80%",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <img
        src="img/berdoa.png"
        alt="Berdoa"
        style={{ width: "200px", borderRadius: "12px", marginBottom: "20px" }}
      />
      <h2>Berdoa</h2>
      <div style={{ width: "100%", backgroundColor: "#eee", height: "20px", borderRadius: "10px", marginTop: "10px" }}>
        <div
          id="meditasi-progress"
          style={{ height: "100%", width: `${(countdown / durationInSeconds) * 100}%`, backgroundColor: "#76c7c0", borderRadius: "10px" }}
        ></div>
      </div>
      <p id="meditasi-countdown" style={{ marginTop: "10px", fontSize: "18px" }}>
        {countdown} detik
      </p>
    </div>
  );
};

export default BerdoaActivity;
