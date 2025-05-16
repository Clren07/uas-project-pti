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
    <div className="relative w-full h-[calc(100%-100px)]">
      {/* Player */}
      <div
        ref={playerRef}
        id="player-wrapper"
        className="absolute z-10 text-center"
      >
        <img
          id="player-avatar"
          src={playerAvatar}
          alt="Player Avatar"
          className="w-[90px] h-[90px] object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        />
        <p
          id="player-name-display"
          className="absolute left-1/2 top-[calc(50%+30px)] -translate-x-1/2 text-xs font-bold text-black w-[100px] z-10 font-sans"
        >
          {playerName}
        </p>
      </div>

      {/* Collision Boxes */}
      <div className="absolute top-0 left-0 w-screen h-screen pointer-events-none z-[1] opacity-0">
        <div id="box1" className="absolute bg-red-600/70 border-2 border-black pointer-events-auto w-[290px] h-[200px] top-[225px] left-0" />
        <div id="box2" className="absolute bg-red-600/70 border-2 border-black pointer-events-auto w-[240px] h-[170px] top-[420px] left-[372px]" />
        <div id="box3" className="absolute bg-red-600/70 border-2 border-black pointer-events-auto w-[250px] h-[160px] top-[225px] left-[800px]" />
        <div id="box4" className="absolute bg-red-600/70 border-2 border-black pointer-events-auto w-[290px] h-[350px] top-[235px] right-0" />
        <div id="box5" className="absolute bg-red-600/70 border-2 border-black pointer-events-auto w-[1450px] h-[90px] top-[600px] left-0" />
      </div>

      {/* Arrow controls */}
      <div className="fixed bottom-5 right-20 flex flex-col items-center justify-between gap-1 z-[100]">
        <button onClick={() => handleMove("up")} className="w-[35px] h-[31px]">
          <img
            src={arrowUp}
            alt="Up"
            className="w-full h-full object-contain transition-transform hover:scale-125 hover:brightness-110"
          />
        </button>
        <div className="flex justify-between gap-10">
          <button onClick={() => handleMove("left")} className="w-[35px] h-[31px]">
            <img
              src={arrowLeft}
              alt="Left"
              className="w-full h-full object-contain transition-transform hover:scale-125 hover:brightness-110"
            />
          </button>
          <button onClick={() => handleMove("right")} className="w-[35px] h-[31px]">
            <img
              src={arrowRight}
              alt="Right"
              className="w-full h-full object-contain transition-transform hover:scale-125 hover:brightness-110"
            />
          </button>
        </div>
        <button onClick={() => handleMove("down")} className="w-[35px] h-[31px]">
          <img
            src={arrowDown}
            alt="Down"
            className="w-full h-full object-contain transition-transform hover:scale-125 hover:brightness-110"
          />
        </button>
      </div>
    </div>
  );
};

export default GameArea;
