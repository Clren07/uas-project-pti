import React, { useState, useEffect } from "react";
import avatar from "../img/avatar.png";
import sampah from "../img/sampah1.png";
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

const TempleCleaningGame = ({
  hygieneGain = 30,
  energyLoss = 12000,
  setStatusLevels,
  maxStatus,
  setShowGameScreen,
  setShowTempleGame,
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
        text: `Bersih-bersih selesai! Hygiene +${hygieneGain}, Energy -${energyLoss}`,
        backgroundColor: "#000",
        color: "#00FF00",
        position: { x: 300, y: 150 },
        visible: true,
      });

      const timer = setTimeout(() => {
        setPopupInfo((prev) => ({ ...prev, visible: false }));
        setShowGameScreen(true);
        setShowTempleGame(false);
        setActionContent(null);

        if (onComplete) onComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [
    completed,
    hygieneGain,
    energyLoss,
    onComplete,
    setActionContent,
    setPopupInfo,
    setShowGameScreen,
    setShowTempleGame,
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
        Temple Cleaning Game
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
                  ? "Trash to collect"
                  : "Empty space"
              }
            >
              {isAvatar && <img src={avatar} alt="Avatar" width={50} />}
              {isTrash && <img src={sampah} alt="Trash" width={40} />}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 25,
          display: "flex",
          justifyContent: "center",
          gap: 15,
          userSelect: "none",
        }}
      >
        <img
          src={upIcon}
          alt="Move Up"
          role="button"
          tabIndex={0}
          style={imgButtonStyle}
          onClick={() => moveAvatar("up")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              moveAvatar("up");
            }
          }}
        />
        <img
          src={downIcon}
          alt="Move Down"
          role="button"
          tabIndex={0}
          style={imgButtonStyle}
          onClick={() => moveAvatar("down")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              moveAvatar("down");
            }
          }}
        />
        <img
          src={leftIcon}
          alt="Move Left"
          role="button"
          tabIndex={0}
          style={imgButtonStyle}
          onClick={() => moveAvatar("left")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              moveAvatar("left");
            }
          }}
        />
        <img
          src={rightIcon}
          alt="Move Right"
          role="button"
          tabIndex={0}
          style={imgButtonStyle}
          onClick={() => moveAvatar("right")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              moveAvatar("right");
            }
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

export default TempleCleaningGame;
