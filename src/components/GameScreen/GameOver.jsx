// GameOver.jsx
import React from "react";

const GameOver = ({ onRestart }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 32,
        zIndex: 10000,
      }}
    >
      <p style={{ marginBottom: 20 }}>💀 Game Over!</p>
      <button
        onClick={onRestart}
        style={{
          padding: "12px 24px",
          fontSize: 20,
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          backgroundColor: "#e53935",
          color: "#fff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }}
      >
        Restart
      </button>
    </div>
  );
};

export default GameOver;
