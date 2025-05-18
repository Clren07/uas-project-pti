import React from "react";
import arrowUp from "../img/35.png";
import arrowLeft from "../img/36.png";
import arrowRight from "../img/38.png";
import arrowDown from "../img/37.png";
import "./GameArea.css";

const GameArea = ({ playerRef, playerName, playerAvatar, onMove }) => {
  const handleMove = (direction) => {
    const step = 20;
    switch (direction) {
      case "up":
        onMove(0, -step);
        break;
      case "down":
        onMove(0, step);
        break;
      case "left":
        onMove(-step, 0);
        break;
      case "right":
        onMove(step, 0);
        break;
      default:
        break;
    }
  };

  return (
    <div className="game-area">
      {/* Player avatar + name wrapper */}
      <div
        ref={playerRef}
        id="player-wrapper"
        style={{
          position: "absolute",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <img
          id="player-avatar"
          src={playerAvatar}
          alt="Player Avatar"
          style={{ width: "90px", height: "90px", position: "absolute"}}
        />
        <p
          id="player-name-display"
          style={{
            margin: "15px 0",
            fontSize: "14px",
            color: "#000",
            padding: "2px 4px",
          }}
        >
          {playerName}
        </p>
      </div>

      {/* Arrow controls */}
      <div id="arrow-buttons">
        <button id="up-btn" onClick={() => handleMove("up")}>
          <img src={arrowUp} alt="Up" />
        </button>
        <div>
          <button id="left-btn" onClick={() => handleMove("left")}>
            <img src={arrowLeft} alt="Left" />
          </button>
          <button id="right-btn" onClick={() => handleMove("right")}>
            <img src={arrowRight} alt="Right" />
          </button>
        </div>
        <button id="down-btn" onClick={() => handleMove("down")}>
          <img src={arrowDown} alt="Down" />
        </button>
      </div>
    </div>
  );
};

export default GameArea;