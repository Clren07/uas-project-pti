import React, { useState, useEffect } from "react";
import tidurImg from "../img/tidur.gif";

const Tidur = ({
  durationInSeconds = 10,
  energyGain = 50,  // Changed from happinessGain to energyGain +50
  setStatusLevels,
  maxStatus,
  setShowGameScreen,
  setShowHomeGame,
  setActionContent,
  setPopupInfo,
  setCountdownText,
  setProgressBarWidth,
  onComplete,
}) => {
  const [countdown, setCountdown] = useState(durationInSeconds);

  useEffect(() => {
    console.log("Tidur mounted, starting countdown:", durationInSeconds);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const next = Math.max(prev - 1, 0);
        console.log("Countdown updated:", next);
        return next;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
      console.log("Tidur unmounted, interval cleared");
    };
  }, [durationInSeconds]);

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
      console.log("Countdown reached zero, updating energy and showing popup");

      setPopupInfo({
        text: `Tidur selesai! Energy +${energyGain}`,  // Updated to show energy
        backgroundColor: "#000",
        color: "#FFFF00",
        position: { x: 300, y: 150 },
        visible: true,
      });

      setTimeout(() => {
        console.log("Hiding popup and switching screen back to game");
        setPopupInfo((prev) => ({ ...prev, visible: false }));
        setShowGameScreen(true);
        setShowHomeGame(false);
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
    energyGain,  
    maxStatus.energy,  
    onComplete,
    setPopupInfo,
    setStatusLevels,
    setShowGameScreen,
    setShowHomeGame,
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
        userSelect: "none",
      }}
    >
      <p style={{ fontSize: 26, marginBottom: 15 }}>Sedang tidur...</p>

      <img
        src={tidurImg}
        alt="tidur"
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

export default Tidur;