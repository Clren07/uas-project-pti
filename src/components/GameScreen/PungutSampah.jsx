import React, { useEffect, useState, useRef } from "react";
import sampah2Img from "../img/sampah2.png";
import avatarImg from "../img/keranjang.png";
import arrowLeftImg from "../img/36.png"; // panah kiri overlay
import arrowRightImg from "../img/38.png"; // panah kanan overlay

const PungutSampah = ({
  durationInSeconds = 15,
  happinessGain = 30,
  hygieneGain=40,
  energyLoss= 20,
  setStatusLevels,
  maxStatus,
  setShowGameScreen,
  setShowBeachGame,
  setActionContent,
  setPopupInfo,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);
  const [playerPos, setPlayerPos] = useState(1); // 0=left,1=center,2=right
  const [sampahs, setSampahs] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [speed, setSpeed] = useState(1); // normal speed 1x, fast 2x

  const timerRef = useRef(null);
  const dropTimeoutRef = useRef(null);

  // Timer effect, runs with speed multiplier
  useEffect(() => {
    if (isGameOver) return;
    if (timeLeft <= 0) {
      setIsGameOver(true);
      return;
    }

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000 / speed);

    return () => clearInterval(timerRef.current);
  }, [timeLeft, isGameOver, speed]);

  // Game over side effect
  useEffect(() => {
    if (!isGameOver) return;
    setPopupInfo({
      visible: true,
      message: `Permainan selesai! Sampah yang ditangkap: ${score}`,
    });
    const timeout = setTimeout(() => {
      setPopupInfo((prev) => ({ ...prev, visible: false }));
      setShowGameScreen(true);
      setShowBeachGame(false);
      setActionContent(null);
      if (onComplete) onComplete();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isGameOver, score]);

  // Function to drop sampah with random delay between drops
  const dropSampah = () => {
    if (isGameOver) return;

    // Drop one sampah
    setSampahs((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), lane: Math.floor(Math.random() * 3), y: 0 },
    ]);

    // Schedule next drop with random delay between 400ms to 900ms (adjusted by speed)
    const nextDropDelay = (400 + Math.random() * 500) / speed;

    dropTimeoutRef.current = setTimeout(() => {
      dropSampah();
    }, nextDropDelay);
  };

  useEffect(() => {
    dropSampah();

    return () => clearTimeout(dropTimeoutRef.current);
  }, [isGameOver, speed]);

  // Move sampahs down every 100ms (adjusted with speed)
  useEffect(() => {
    if (isGameOver) return;
    const moveInterval = setInterval(() => {
      setSampahs((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + 10 * speed }))
          .filter((item) => item.y < 300)
      );
    }, 100);
    return () => clearInterval(moveInterval);
  }, [isGameOver, speed]);

  // Catch sampahs when near player
  useEffect(() => {
    setSampahs((prev) =>
      prev.filter((item) => {
        const caught = item.y > 250 && item.y < 270 && item.lane === playerPos;
        if (caught) setScore((s) => s + 1);
        return !caught;
      })
    );
  }, [sampahs, playerPos]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") setPlayerPos((pos) => Math.max(0, pos - 1));
      else if (e.key === "ArrowRight") setPlayerPos((pos) => Math.min(2, pos + 1));
      else if (e.key === " ") setSpeed((spd) => (spd === 1 ? 2 : 1)); // space to toggle speed
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const laneWidth = 100;
  const gameAreaWidth = laneWidth * 3 + 40;

  if (isGameOver) {
    return (
      <div
        style={{
          fontFamily: "Poppins, sans-serif",
          maxWidth: 400,
          margin: "30px auto",
          padding: 20,
          borderRadius: 12,
          backgroundColor: "#f8f9fa",
          boxShadow: "0 4px 15px rgb(0 0 0 / 0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#343a40" }}>Permainan Selesai!</h2>
        <p style={{ fontSize: 18, color: "#495057" }}>
          Sampah yang berhasil ditangkap:{" "}
          <span style={{ fontWeight: "bold", color: "#0d6efd" }}>{score}</span>
        </p>
      </div>
    );
  }

  return (
    <div
    style={{
        fontFamily: "'Comic Neue', 'Poppins', sans-serif",
        maxWidth: "90vw",
        maxHeight:"90vw",
        width:"30vw",
        height:"35vw",
        margin: "30px auto",
        padding: 24,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
        textAlign: "center",
        backdropFilter: "blur(5px)",
    }}
    >

      <h2 style={{ 
        fontWeight: "600",
        fontSize: 18,
        marginTop: 10,
        color: "#212529" 
        }}>Pungut Sampah!</h2>
      <div
        style={{
          fontWeight: "600",
          fontSize: 12,
          marginTop:5,
          marginBottom: 5,
          color: timeLeft <= 5 ? "#dc3545" : "#212529",
          transition: "color 0.3s ease",
        }}
      >
        Sisa Waktu: {timeLeft}s (Speed: {speed}x)
      </div>
      <div
        style={{
          fontWeight: "600",
          fontSize: 12,
          marginBottom: 10,
          color: "#212529",
        }}
      >
        Sampah Ditangkap: {score}
      </div>

      <div
        style={{
          position: "relative",
          width: gameAreaWidth,
          height: 320,
          margin: "0 auto",
          borderRadius: 12,
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 10px rgb(0 0 0 / 0.1)",
          overflow: "hidden",
          border: "1.5px solid #adb5bd",
        }}
      >
        {/* Avatar with left and right arrow overlays */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: playerPos * laneWidth + 35, // geser sedikit agar center bagus utk avatar gede
            width: 80,
            height: 80,
            userSelect: "none",
            pointerEvents: "none",
            transition: "left 0.15s ease",
          }}
        >
          <img
            src={avatarImg}
            alt="avatar"
            style={{
              width: 80,
              height: 80,
              display: "block",
              position: "relative",
              zIndex: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
            draggable={false}
          />
          {/* Left Arrow */}
          <img
            src={arrowLeftImg}
            alt="arrow left"
            style={{
              position: "absolute",
              left: -25,
              top: 30,
              width: 20,
              height: 28,
              opacity: playerPos > 0 ? 1 : 0.3,
              userSelect: "none",
              pointerEvents: "none",
              transition: "opacity 0.3s ease",
            }}
            draggable={false}
          />
          {/* Right Arrow */}
          <img
            src={arrowRightImg}
            alt="arrow right"
            style={{
              position: "absolute",
              right: -25,
              top: 30,
              width: 20,
              height: 28,
              opacity: playerPos < 2 ? 1 : 0.3,
              userSelect: "none",
              pointerEvents: "none",
              transition: "opacity 0.3s ease",
            }}
            draggable={false}
          />
        </div>

        {/* Sampahs falling */}
        {sampahs.map((item) => (
          <img
            key={item.id}
            src={sampah2Img}
            alt="sampah"
            style={{
              position: "absolute",
              width: 50,
              height: 50,
              top: item.y,
              left: item.lane * laneWidth + 45,
              userSelect: "none",
              pointerEvents: "none",
              transition: "top 0.1s linear",
            }}
            draggable={false}
          />
        ))}
      </div>

      {/* Control Buttons */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <button
        onClick={() => setPlayerPos((pos) => Math.max(0, pos - 1))}
        style={buttonStyle}
        aria-label="Move Left"
        >
        <img
            src={arrowLeftImg}
            alt="arrow left"
            style={{ width: 20, height: 20, marginRight: 8, pointerEvents: "none" }}
            draggable={false}
        />
        </button>

        <button
        onClick={() => setSpeed(speed === 1 ? 2 : 1)}
        style={{ ...buttonStyle, minWidth: 120 }}
        aria-label="Fast Forward"
        >
        {speed === 1 ? "▶▶ Fast Forward" : "⏸ Pause Fast"}
        </button>

        <button
        onClick={() => setPlayerPos((pos) => Math.min(2, pos + 1))}
        style={buttonStyle}
        aria-label="Move Right"
        >
        <img
            src={arrowRightImg}
            alt="arrow right"
            style={{ width: 20, height: 20, marginLeft: 8, pointerEvents: "none" }}
            draggable={false}
        />
        </button>

        
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: 16,
  fontWeight: "600",
  backgroundColor: "#0d6efd",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  userSelect: "none",
  transition: "background-color 0.3s ease",
};

export default PungutSampah;