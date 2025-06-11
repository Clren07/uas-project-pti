import React from "react";
import backgroundGameOver from "../img/backgroundGameOver.png"; // Import image

const FinalScore = ({ finalScore, onRestart }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundImage: `url(${backgroundGameOver})`, // Ensure correct path to the background image
        backgroundSize: "cover", // Cover the entire background
        backgroundPosition: "center", // Center the image
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 32,
        zIndex: 10000,
      }}
    >
      {/* Life Satisfaction Score Window */}
      <div
        className="location-window"
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "80px", // Window position
          left: "50%", // Center the window horizontally
          transform: "translateX(-50%)", // Center the window
          width: "600px",
          background: "rgba(0, 0, 0, 0.8)", // Semi-transparent black background
          color: "#FFFF00",
          borderRadius: "15px",
          padding: "20px",
          textAlign: "center",
          zIndex: 100,
        }}
      >
        {/* Title */}
        <div
          className="locationTitle"
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            marginBottom: "15px",
            textAlign: "center",
            color: "#FFFFFF",
          }}
        >
          ------ Life Satisfaction Score ------
        </div>

        {/* Scores */}
        <p style={{ margin: "5px 0", fontSize: "23px" }}>
          <strong>Hunger: </strong>{finalScore.hunger}
        </p>
        <p style={{ margin: "5px 0", fontSize: "23px" }}>
          <strong>Energy: </strong>{finalScore.energy}
        </p>
        <p style={{ margin: "5px 0", fontSize: "23px" }}>
          <strong>Happiness: </strong>{finalScore.happiness}
        </p>
        <p style={{ margin: "5px 0", fontSize: "23px" }}>
          <strong>Hygiene: </strong>{finalScore.hygiene}
        </p>
        <p style={{ margin: "5px 0", fontSize: "23px" }}>
          <strong>Money: </strong>{finalScore.money}
        </p>
      </div>

      {/* Restart Button */}
      <button
        onClick={onRestart}
        style={{
          padding: "12px 24px",
          position: "absolute",
          bottom: "15%",  // Adjust this value to move the button up/down
          fontSize: 20,
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          backgroundColor: "#e53935",
          color: "#fff",
          boxShadow: "0 4px 8px rgb(255, 193, 70)",
        }}
      >
        Restart
      </button>
    </div>
  );
};

export default FinalScore;
