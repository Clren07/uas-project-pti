import React, { useState, useEffect, useRef } from "react";

const MendakiActivity = ({
  durationInSeconds = 10,
  happinessGain = 20,
  energyLoss = 30,
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
  const [avatarPos, setAvatarPos] = useState({ x: 50, y: 50 });
  const activityRef = useRef(null);

  // Update countdown setiap detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [durationInSeconds]);

  // Update countdown text dan progress bar di parent
  useEffect(() => {
    if (setCountdownText)
      setCountdownText(`${isNaN(countdown) ? 0 : countdown} detik`);
    if (setProgressBarWidth)
      setProgressBarWidth(`${(countdown / (durationInSeconds || 1)) * 100}%`);

    if (countdown === 0) {
      // Tampilkan popup info
      setPopupInfo({
        text: `Mendaki selesai! Energy -${energyLoss}, Happiness +${happinessGain}`,
        backgroundColor: "#004d00",
        color: "#aaffaa",
        position: { x: 300, y: 150 },
        visible: true,
      });

      setTimeout(() => {
        setPopupInfo((prev) => ({ ...prev, visible: false }));
        setShowGameScreen(true);
        setShowMountainGame(false);
        setActionContent(null);
        if (onComplete) onComplete();
      }, 2000);
    }
  }, [
    countdown,
    durationInSeconds,
    happinessGain,
    energyLoss,
    onComplete,
    setPopupInfo,
    setShowGameScreen,
    setShowMountainGame,
    setActionContent,
    setCountdownText,
    setProgressBarWidth,
  ]);

  // Keyboard controls untuk menggerakkan avatar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (countdown === 0) return; // disable saat countdown selesai

      const step = 2; // persentase per langkah
      setAvatarPos((pos) => {
        let newX = pos.x;
        let newY = pos.y;
        switch (e.key) {
          case "ArrowUp":
            newY = Math.max(0, pos.y - step);
            break;
          case "ArrowDown":
            newY = Math.min(90, pos.y + step);
            break;
          case "ArrowLeft":
            newX = Math.max(0, pos.x - step);
            break;
          case "ArrowRight":
            newX = Math.min(90, pos.x + step);
            break;
          default:
            break;
        }
        return { x: newX, y: newY };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [countdown]);

  return (
    <div
      ref={activityRef}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90vw",
        maxWidth: 500,
        height: 400,
        backgroundColor: "rgba(34, 139, 34, 0.85)", // warna hijau gunung transparan
        borderRadius: 15,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        zIndex: 9999,
        color: "white",
        fontFamily: "sans-serif",
        userSelect: "none",
      }}
    >
      <p style={{ fontSize: 26, marginBottom: 15 }}>Mendaki gunung...</p>

      {/* Area game */}
      <div
        style={{
          position: "relative",
          backgroundColor: "#2e8b57",
          borderRadius: 12,
          width: "100%",
          height: 250,
          overflow: "hidden",
          marginBottom: 20,
          border: "3px solid #145214",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            position: "absolute",
            left: `${avatarPos.x}%`,
            top: `${avatarPos.y}%`,
            width: 40,
            height: 40,
            backgroundColor: "#ffcc00",
            borderRadius: "50%",
            border: "2px solid #aa8800",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 8px #ffee77",
          }}
          title="Avatar Mendaki"
        />
      </div>

      {/* Progress Bar */}
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

      {/* Countdown Text */}
      <p style={{ fontSize: 20, margin: 0 }}>
        {isNaN(countdown) ? "0" : countdown} detik
      </p>
    </div>
  );
};

export default MendakiActivity;
