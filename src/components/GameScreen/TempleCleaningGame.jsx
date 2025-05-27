import React, { useEffect, useState } from "react";
import './TempleCleaningGame.css';

const TempleCleaningGame = ({ hygieneGain, energyLoss, setStatusLevels, maxStatus, updateStatusBars, showTempleGame }) => {
  const [collectedTrash, setCollectedTrash] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [avatarPos, setAvatarPos] = useState({ x: 0, y: 0 });
  const totalTrash = 5;
  const trashPositions = new Set();
  const playerAvatar = "player-avatar";  // Use the actual avatar URL or path

  useEffect(() => {
    // Memulai game jika showTempleGame berubah menjadi true
    if (showTempleGame) {
      setGameStarted(true);  // Memulai game
    }
  }, [showTempleGame]); // Menambahkan showTempleGame sebagai dependency

  useEffect(() => {
    if (!gameStarted) return;
    // Randomize trash positions
    while (trashPositions.size < totalTrash) {
      const rand = Math.floor(Math.random() * 9);
      if (rand !== 0) trashPositions.add(rand);
    }

    function keyHandler(e) {
      const newAvatarPos = { ...avatarPos };

      if (e.key === "ArrowUp" && newAvatarPos.y > 0) newAvatarPos.y--;
      if (e.key === "ArrowDown" && newAvatarPos.y < 2) newAvatarPos.y++;
      if (e.key === "ArrowLeft" && newAvatarPos.x > 0) newAvatarPos.x--;
      if (e.key === "ArrowRight" && newAvatarPos.x < 2) newAvatarPos.x++;

      setAvatarPos(newAvatarPos);
      checkForTrash(newAvatarPos);
    }

    document.addEventListener("keydown", keyHandler);

    return () => document.removeEventListener("keydown", keyHandler);
  }, [gameStarted, avatarPos]);

  const checkForTrash = (newAvatarPos) => {
    const index = newAvatarPos.y * 3 + newAvatarPos.x;
    if (trashPositions.has(index)) {
      trashPositions.delete(index);
      setCollectedTrash(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (collectedTrash === totalTrash) {
      setTimeout(() => {
        // Update status
        setStatusLevels((prev) => ({
          ...prev,
          hygiene: Math.min(maxStatus, prev.hygiene + hygieneGain),
          energy: Math.max(0, prev.energy - energyLoss),
        }));
        updateStatusBars();
        setGameStarted(false); // Close game
      }, 500);
    }
  }, [collectedTrash, hygieneGain, energyLoss, setStatusLevels, maxStatus, updateStatusBars]);

  if (!gameStarted) return null;

  return (
    <div id="temple-cleaning-game" style={{ background: "rgba(0, 0, 0, 0.6)", padding: "20px", color: "white", textAlign: "center", borderRadius: "15px" }}>
      <h3>Bantu Membersihkan Candi</h3>
      <div id="temple-grid" className="grid-container" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
        {Array.from({ length: 9 }).map((_, i) => {
          const x = i % 3;
          const y = Math.floor(i / 3);
          return (
            <div key={i} style={{ width: "60px", height: "60px", border: "1px solid white", position: "relative" }}>
              {avatarPos.x === x && avatarPos.y === y ? (
                <img src={playerAvatar} alt="avatar" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
              ) : trashPositions.has(i) && (
                <div className="trash" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>🗑</div>
              )}
            </div>
          );
        })}
      </div>
      <p>Sampah Terkumpul: {collectedTrash}/{totalTrash}</p>
    </div>
  );
};

export default TempleCleaningGame;
