import React, { useState, useEffect } from "react";
import avatar from "../img/avatar.png";
import soap from "../img/soap.png";  // Changed from sampah1.png to soap.png
import upIcon from "../img/35.png";
import downIcon from "../img/37.png";
import leftIcon from "../img/36.png";
import rightIcon from "../img/38.png";

const GRID_SIZE = 3;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
const TOTAL_TRASH = 5;

const getRandomPositions = (count, exclude = []) => {
  const positions = new Set();
  while (positions.size < count) {
    const pos = Math.floor(Math.random() * TOTAL_CELLS);
    if (!exclude.includes(pos)) positions.add(pos);
  }
  return Array.from(positions);
};

const imgButtonStyle = {
  width: 60,
  height: 60,
  cursor: "pointer",
  userSelect: "none",
  filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.3))",
  transition: "transform 0.15s ease",
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "1rem",
  fontWeight: "700",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  backgroundColor: "#2196F3",
  color: "white",
  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
  userSelect: "none",
  transition: "background-color 0.3s ease",
};

const Mandi = ({  // Changed from TempleCleaningGame to Mandi
  hygieneGain = 25,  // Changed from 30 to 25
  setStatusLevels,
  maxStatus,
  setShowGameScreen,
  setShowHomeGame,  // Changed from setShowTempleGame to setShowHomeGame
  setActionContent,
  setPopupInfo,
  onComplete,
}) => {
  const startPos = 4;
  const [avatarPos, setAvatarPos] = useState(startPos);
  const [trashPositions, setTrashPositions] = useState(() =>
    getRandomPositions(TOTAL_TRASH, [startPos])
  );
  const [collectedTrash, setCollectedTrash] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (trashPositions.includes(avatarPos)) {
      setTrashPositions((prev) => prev.filter((pos) => pos !== avatarPos));
      setCollectedTrash((prev) => prev + 1);
    }
  }, [avatarPos, trashPositions]);

  useEffect(() => {
    if (collectedTrash >= TOTAL_TRASH) {
      setCompleted(true);
    }
  }, [collectedTrash]);

  const moveAvatar = (direction) => {
    if (completed) return;

    let newPos = avatarPos;
    if (direction === "up" && avatarPos - GRID_SIZE >= 0) {
      newPos = avatarPos - GRID_SIZE;
    } else if (direction === "down" && avatarPos + GRID_SIZE < TOTAL_CELLS) {
      newPos = avatarPos + GRID_SIZE;
    } else if (direction === "left" && avatarPos % GRID_SIZE !== 0) {
      newPos = avatarPos - 1;
    } else if (direction === "right" && (avatarPos + 1) % GRID_SIZE !== 0) {
      newPos = avatarPos + 1;
    }
    setAvatarPos(newPos);
  };

  const fastForward = () => {
    setTrashPositions([]);
    setCollectedTrash(TOTAL_TRASH);
    setCompleted(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (completed) return;
      switch (e.key) {
        case "ArrowUp":
          moveAvatar("up");
          break;
        case "ArrowDown":
          moveAvatar("down");
          break;
        case "ArrowLeft":
          moveAvatar("left");
          break;
        case "ArrowRight":
          moveAvatar("right");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [avatarPos, completed]);

  useEffect(() => {
    if (completed) {
      setPopupInfo({
        text: `Mandi selesai! Hygiene +${hygieneGain}`,  // Changed text
        backgroundColor: "#000",
        color: "#00FF00",
        position: { x: 300, y: 150 },
        visible: true,
      });

      const timer = setTimeout(() => {
        setPopupInfo((prev) => ({ ...prev, visible: false }));
        setShowGameScreen(true);
        setShowHomeGame(false);  // Changed from setShowTempleGame
        setActionContent(null);

        if (onComplete) {
          console.log("Calling onComplete callback");
          onComplete();
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [
    completed,
    hygieneGain,
    onComplete,
    setActionContent,
    setPopupInfo,
    setShowGameScreen,
    setShowHomeGame,  // Changed from setShowTempleGame
    setStatusLevels,
  ]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        borderRadius: 15,
        padding: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        userSelect: "none",
        minWidth: 360,
        boxShadow: "0 0 20px rgba(0,0,0,0.9)",
        zIndex: 9999,
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: 25,
          fontWeight: "700",
          fontSize: "2rem",
          textShadow: "2px 2px 6px #000",
        }}
      >
        Mandi  {/* Changed from "Temple Cleaning Game" */}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 80px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 80px)`,
          gap: 8,
          backgroundColor: "#eee",
          padding: 10,
          borderRadius: 12,
          boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
        }}
      >
        {[...Array(TOTAL_CELLS)].map((_, idx) => {
          const isAvatar = idx === avatarPos;
          const isTrash = trashPositions.includes(idx);

          return (
            <div
              key={idx}
              style={{
                width: 80,
                height: 80,
                backgroundColor: isAvatar
                  ? "#4CAF50"
                  : isTrash
                  ? "#AA0000"
                  : "#ccc",
                borderRadius: 8,
                boxShadow: isAvatar
                  ? "0 0 8px 3px #4CAF50"
                  : "inset 0 0 5px #999",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: 24,
                color: isAvatar ? "white" : isTrash ? "white" : "#666",
                userSelect: "none",
                cursor: "default",
                transition: "background-color 0.3s ease",
              }}
              aria-label={
                isAvatar
                  ? "Player Avatar"
                  : isTrash
                  ? "Sabun untuk dikumpulkan"  // Changed from "Trash to collect"
                  : "Empty space"
              }
            >
              {isAvatar && <img src={avatar} alt="Avatar" width={50} />}
              {isTrash && <img src={soap} alt="Sabun" width={40} />}  {/* Changed alt text */}
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "relative",
          width: 120,
          height: 120,
          marginTop: 25,
          userSelect: "none",
        }}
      >
        {/* Tombol Atas */}
        <img
          src={upIcon}
          alt="Up"
          role="button"
          tabIndex={0}
          style={{
            ...imgButtonStyle,
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width:"40px",
            height:"40px"
          }}
          onClick={() => moveAvatar("up")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") moveAvatar("up");
          }}
        />

        {/* Tombol Kiri */}
        <img
          src={leftIcon}
          alt="Left"
          role="button"
          tabIndex={0}
          style={{
            ...imgButtonStyle,
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            width:"40px",
            height:"40px"
          }}
          onClick={() => moveAvatar("left")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") moveAvatar("left");
          }}
        />

        {/* Tombol Kanan */}
        <img
          src={rightIcon}
          alt="Right"
          role="button"
          tabIndex={0}
          style={{
            ...imgButtonStyle,
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            width:"40px",
            height:"40px"
          }}
          onClick={() => moveAvatar("right")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") moveAvatar("right");
          }}
        />

        {/* Tombol Bawah */}
        <img
          src={downIcon}
          alt="Down"
          role="button"
          tabIndex={0}
          style={{
            ...imgButtonStyle,
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width:"40px",
            height:"40px"
          }}
          onClick={() => moveAvatar("down")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") moveAvatar("down");
          }}
        />
      </div>

      <button
        onClick={fastForward}
        style={{
          ...buttonStyle,
          marginTop: 20,
          alignSelf: "center",
          width: "50%",
          fontWeight: "700",
          fontSize: 18,
          borderRadius: 15,
          boxShadow: "0 6px 12px rgba(33,150,243,0.8)",
          userSelect: "none",
        }}
      >
        Fast Forward
      </button>
    </div>
  );
};

export default Mandi;  // Changed from TempleCleaningGame to Mandi