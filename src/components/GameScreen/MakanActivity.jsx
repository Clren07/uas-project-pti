import React, { useState, useEffect } from "react";
import MakanImg from "../img/makan.gif";

const MakanActivity = ({
  durationInSeconds = 10,
  hungerGain = 50,
  moneyLoss = 20000,
  setStatusLevels,
  maxStatus,
  setShowGameScreen,
  setShowCityGame,
  setActionContent,
  setPopupInfo,
  setCountdownText,
  setProgressBarWidth,
  onComplete,
}) => {
  const [countdown, setCountdown] = useState(durationInSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [durationInSeconds]);

  const handleFastForward = () => {
    setCountdown(0);
  };

  useEffect(() => {
    const safeDuration = durationInSeconds || 1;
    if (setCountdownText) setCountdownText(`${countdown} detik`);
    if (setProgressBarWidth) {
      setProgressBarWidth(`${(countdown / safeDuration) * 100}%`);
    }

    if (countdown === 0) {
      if (onComplete) onComplete();

      setPopupInfo({
        text: `Makan selesai! Hunger +${hungerGain}, Money -${moneyLoss / 1000}k`,
        backgroundColor: "#111",
        color: "#00FFAA",
        position: { x: 300, y: 150 },
        visible: true,
      });

      setTimeout(() => {
        setPopupInfo((prev) => ({ ...prev, visible: false }));
        setShowGameScreen(true);
        setShowCityGame(false);
        setActionContent(null);
      }, 2000);
    }
  }, [
    countdown,
    durationInSeconds,
    hungerGain,
    moneyLoss,
    maxStatus,
    onComplete,
    setPopupInfo,
    setCountdownText,
    setProgressBarWidth,
    setShowGameScreen,
    setShowCityGame,
    setActionContent,
  ]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90vw",
        maxWidth: 500,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        borderRadius: 15,
        padding: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        color: "white",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <p style={{ fontSize: 26, marginBottom: 15 }}>Sedang makan di restoran...</p>

      <img
        src={MakanImg}
        alt="Makan"
        style={{
          width: 160,
          maxWidth: "80%",
          borderRadius: 12,
          marginBottom: 20,
        }}
      />

      <div
        style={{
          width: "100%",
          backgroundColor: "#444",
          height: 20,
          borderRadius: 10,
          marginBottom: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(countdown / (durationInSeconds || 1)) * 100}%`,
            backgroundColor: "#FFA500",
            transition: "width 0.5s ease",
            borderRadius: 10,
          }}
        />
      </div>

      <p style={{ fontSize: 20 }}>{countdown} detik</p>

      <button
        onClick={handleFastForward}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          fontSize: 16,
          backgroundColor: "#ffcc00",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        Fast Forward
      </button>
    </div>
  );
};

export default MakanActivity;
