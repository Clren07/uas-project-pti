import React from "react";
import cryingGif from "../img/crying.gif"; // Import the crying gif

const GameOver = ({ onContinue, onRestart }) => {
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
      <p style={{ marginBottom: 20 }}>Game Over!</p>
      
      {/* Display the crying GIF */}
      <img 
        src={cryingGif} 
        alt="Crying" 
        style={{ width: "200px", height: "auto", marginBottom: "20px" }} 
      />

      {/* Continue Button */}
      <button
        onClick={onContinue}
        style={{
          padding: "12px 24px",
          fontSize: 20,
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          backgroundColor: "#1976D2",  // Blue color for Continue button
          color: "#fff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          marginTop: 20,
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default GameOver;
