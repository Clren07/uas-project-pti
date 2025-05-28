import React, { useState, useEffect } from "react";

import tile1 from "../img/1.png";
import tile2 from "../img/2.png";
import tile3 from "../img/3.png";

const tileImages = [null, tile1, tile2, tile3];

const FotografiActivity = ({
  happinessGain = 25,
  moneyGain = 10000,
  setStatusLevels,
  maxStatus,
  setShowGameScreen,
  setShowTempleGame,
  setActionContent,
  setPopupInfo,
  onComplete,
}) => {
  const solvedPuzzle = [1, 2, 3, null];

  const shuffleEasy = () => {
    let arr = [...solvedPuzzle];
    const emptyIndex = 3;
    const possibleSwaps = [1, 2];
    const swap1 = possibleSwaps[Math.floor(Math.random() * possibleSwaps.length)];
    [arr[emptyIndex], arr[swap1]] = [arr[swap1], arr[emptyIndex]];
    if (Math.random() > 0.5) {
      const newEmptyIndex = swap1;
      const getAdjacentIndexes = (index) => {
        const adj = [];
        if (index - 2 >= 0) adj.push(index - 2);
        if (index + 2 <= 3) adj.push(index + 2);
        if (index % 2 !== 0) adj.push(index - 1);
        if (index % 2 !== 1) adj.push(index + 1);
        return adj;
      };
      const adj = getAdjacentIndexes(newEmptyIndex).filter((pos) => pos !== emptyIndex);
      if (adj.length > 0) {
        const swap2 = adj[Math.floor(Math.random() * adj.length)];
        [arr[newEmptyIndex], arr[swap2]] = [arr[swap2], arr[newEmptyIndex]];
      }
    }
    return arr;
  };

  const [tiles, setTiles] = useState(shuffleEasy);
  const [completed, setCompleted] = useState(false);

  const arraysEqual = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

  const emptyIndex = tiles.indexOf(null);

  const getAdjacentIndexes = (index) => {
    const adj = [];
    if (index - 2 >= 0) adj.push(index - 2);
    if (index + 2 <= 3) adj.push(index + 2);
    if (index % 2 !== 0) adj.push(index - 1);
    if (index % 2 !== 1) adj.push(index + 1);
    return adj;
  };

  const moveTile = (index) => {
    if (completed) return;
    const adj = getAdjacentIndexes(emptyIndex);
    if (!adj.includes(index)) return;
    const newTiles = tiles.slice();
    [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
    setTiles(newTiles);
    if (arraysEqual(newTiles, solvedPuzzle)) {
      setCompleted(true);
    }
  };

  // Fast forward: langsung selesai
  const fastForward = () => {
    setTiles(solvedPuzzle);
    setCompleted(true);
  };

  useEffect(() => {
    if (completed) {
      setPopupInfo({
        text: `Fotografi selesai! Happiness +${happinessGain}, Money +${moneyGain}`,
        backgroundColor: "#000",
        color: "#00FF00",
        position: { x: 300, y: 150 },
        visible: true,
      });

      setTimeout(() => {
        setPopupInfo((prev) => ({ ...prev, visible: false }));
        setShowGameScreen(true);
        setShowTempleGame(false);
        setActionContent(null);

        if (onComplete) onComplete();
      }, 2000);
    }
  }, [
    completed,
    happinessGain,
    moneyGain,
    maxStatus.happiness,
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
        backgroundColor: "rgba(0, 0, 0, 0.85)", // lebih gelap supaya lebih jelas
        borderRadius: 15,
        padding: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        userSelect: "none",
        width: "auto",
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
          userSelect: "none",
          textShadow: "2px 2px 6px #000",
        }}
      >
        Fotografi & Jual Foto
      </h2>

      <div
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 16,
          boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
          display: "grid",
          gridTemplateColumns: "repeat(2, 160px)",
          gridTemplateRows: "repeat(2, 160px)",
          gap: 12,
          userSelect: "none",
        }}
      >
        {tiles.map((tile, idx) => (
          <div
            key={idx}
            onClick={() => moveTile(idx)}
            style={{
              width: 160,
              height: 160,
              borderRadius: 12,
              backgroundColor: tile === null ? "#444" : "#eee",
              backgroundImage: tile ? `url(${tileImages[tile]})` : "none",
              backgroundSize: "cover",
              cursor: tile === null ? "default" : "pointer",
              boxShadow: "0 4px 8px #0003",
              transition: "background-color 0.3s ease",
              userSelect: "none",
            }}
            aria-label={tile === null ? "Empty slot" : `Tile ${tile}`}
          />
        ))}
      </div>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          gap: 12,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <button
          onClick={fastForward}
          disabled={completed}
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            fontWeight: "700",
            borderRadius: 10,
            border: "none",
            cursor: completed ? "not-allowed" : "pointer",
            backgroundColor: completed ? "#555" : "#4CAF50",
            color: "white",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            userSelect: "none",
            transition: "background-color 0.3s ease",
          }}
        >
          Fast Forward
        </button>
      </div>

      {completed && (
        <p
          style={{
            marginTop: 24,
            color: "#0a0",
            fontWeight: "bold",
            fontSize: "1.25rem",
            textShadow: "1px 1px 2px #0004",
            userSelect: "none",
          }}
        >
          🎉 Puzzle selesai! 🎉
        </p>
      )}
    </div>
  );
};

export default FotografiActivity;
