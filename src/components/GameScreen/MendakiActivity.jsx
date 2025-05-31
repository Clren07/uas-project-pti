import React, { useState, useEffect } from "react";
import BerdoaImg from "../img/berdoa.gif";

const MendakiActivity = ({
  durationInSeconds = 10,
  happinessGain = 20,
  setStatusLevels,
  maxStatus,
  setShowGameScreen,
  setShowMountainGame,
  setActionContent,
  setPopupInfo,
  setCountdownText,
  setProgressBarWidth,
  onComplete,
}) => {
  const [countdown, setCountdown] = useState(durationInSeconds);

  useEffect(() => {
    console.log("MendakiActivity mounted, starting countdown:", durationInSeconds);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const next = Math.max(prev - 1, 0);
        console.log("Countdown updated:", next);
        return next;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
      console.log("MendakiActivity unmounted, interval cleared");
    };
  }, [durationInSeconds]);

  // Handler untuk tombol Fast Forward
  const handleFastForward = () => {
    console.log("Fast Forward pressed, countdown set to 0");
    setCountdown(0);
  };

  useEffect(() => {
    const safeDuration = durationInSeconds || 1;

    console.log(`Updating countdown text and progress bar: ${countdown} / ${safeDuration}`);

    if (setCountdownText) setCountdownText(`${isNaN(countdown) ? 0 : countdown} detik`);
    if (setProgressBarWidth) setProgressBarWidth(`${(countdown / safeDuration) * 100}%`);

    if (countdown === 0) {
      console.log("Countdown reached zero, updating happiness and showing popup");

      setPopupInfo({
        text: `Berdoa selesai! Happiness +${happinessGain}`,
        backgroundColor: "#000",
        color: "#FFFF00",
        position: { x: 300, y: 150 },
        visible: true,
      });


      setTimeout(() => {
        console.log("Hiding popup and switching screen back to game");
        setPopupInfo((prev) => ({ ...prev, visible: false }));
        setShowGameScreen(true);
        setShowMountainGame(false);
        setActionContent(null);
        if (onComplete) {
          console.log("Calling onComplete callback");
          onComplete();
        }
  
      }, 2000);
    }
  }, [
    countdown,
    durationInSeconds,
    happinessGain,
    maxStatus.happiness,
    onComplete,
    setPopupInfo,
    setStatusLevels,
    setShowGameScreen,
    setShowMountainGame,
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
        justifyContent: "enter",
        zIndex: 9999,
        color: "white",
        textAlign: "center",
        fontFamily: "sans-serif",
        userSelect: "none",
      }}
    >
      <p style={{ fontSize: 26, marginBottom: 15 }}>Sedang mendaki...</p>

      <img
        src={BerdoaImg}
        alt="Mendaki"
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
            backgroundColor: "#76c7c0",
            transition: "width 0.5s ease",
            borderRadius: 10,
          }}
        />
      </div>

      <p style={{ fontSize: 20, margin: 0 }}>
        {isNaN(countdown) ? "0" : countdown} detik
      </p>

      {/* Tombol Fast Forward */}
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
          userSelect: "none",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        Fast Forward
      </button>
    </div>
  );
};

export default MendakiActivity;