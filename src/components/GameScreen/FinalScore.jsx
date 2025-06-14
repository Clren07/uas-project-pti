import React, { useState } from "react";
import backgroundGameOver from "../img/backgroundGameOver.png"; // Import image

const FinalScore = ({
  finalScore,
  onRestart,
  completedActivities,
  itemsExchangedCount,
  visitedLocationsCount,
}) => {
  
  const hunger     = Number(finalScore.hunger)    || 0;
  const energy     = Number(finalScore.energy)    || 0;
  const happiness  = Number(finalScore.happiness) || 0;
  const hygiene    = Number(finalScore.hygiene)   || 0;
  const money      = Number(finalScore.money)     || 0;

  // Calculate the total score
  const totalStats =
    finalScore.hunger + finalScore.energy + finalScore.happiness + finalScore.hygiene;
  const totalScore =
    totalStats * 0.1 +
    finalScore.money * 0.001 +
    completedActivities * 3 +
    itemsExchangedCount * 2 +
    visitedLocationsCount * 2;

  // State to manage window expansion
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSeeMoreClick = () => {
    setIsExpanded(true); // Expand the window
  };

  const handleCloseClick = () => {
    setIsExpanded(false); // Collapse the window
  };

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
          top: isExpanded? "40px" : "120px", // Window position
          left: "50%", // Center the window horizontally
          transform: "translateX(-50%)", // Center the window
          width: "600px",
          background: "rgba(0, 0, 0, 0.8)", // Semi-transparent black background
          color: "#FFFF00",
          borderRadius: "15px",
          padding: "15px",
          textAlign: "center",
          zIndex: 100,
          maxHeight: isExpanded ? "600px" : "550px", // Adjust size for expanded/collapsed with only 50px difference
          overflow: "auto",
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

        {/* Total Score Display */}
        <p style={{ margin: "5px 0", fontSize: "25px", color: "yellow" }}>
          <strong>TOTAL SCORE </strong>
        </p>

        <p style={{ margin: "5px 0", fontSize: "50px", color: "yellow" }}>
          <strong>{totalScore.toFixed(2)}</strong>
        </p>

        {/* Expanded Content */}
        {isExpanded && (
          <>
            <p style={{ margin: "5px 0", fontSize: "15px", color: "white" }}>
              <strong>Hunger: </strong>{finalScore.hunger}
            </p>
            <p style={{ margin: "5px 0", fontSize: "15px", color: "white" }}>
              <strong>Energy: </strong>{finalScore.energy}
            </p>
            <p style={{ margin: "5px 0", fontSize: "15px", color: "white" }}>
              <strong>Happiness: </strong>{finalScore.happiness}
            </p>
            <p style={{ margin: "5px 0", fontSize: "15px", color: "white" }}>
              <strong>Hygiene: </strong>{finalScore.hygiene}
            </p>
            <p style={{ margin: "5px 0", fontSize: "15px", color: "white" }}>
              <strong>Money: </strong>{finalScore.money}
            </p>

            {/* Display the number of completed activities */}
            <p style={{ margin: "5px 0", fontSize: "15px", color: "white" }}>
              <strong>Activities performed: </strong>{completedActivities}
            </p>

            {/* Display the number of items exchanged */}
            <p style={{ margin: "5px 0", fontSize: "15px", color: "white" }}>
              <strong>Items collected and used: </strong>{itemsExchangedCount}
            </p>

            <p style={{ margin: "5px 0", fontSize: "15px", color: "white" }}>
              <strong>Variety of visited areas: </strong>{visitedLocationsCount}/5
            </p>
          </>
        )}

        {/* "See More" and "Close" Buttons */}
        {!isExpanded ? (
            <button
                onClick={handleSeeMoreClick}
                style={{
                padding: "10px 20px",
                marginTop: "15px",
                fontSize: "18px",
                backgroundColor: "#4CAF50", // Green color for see more
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "transform 0.3s ease-in-out", // Smooth scaling effect
                }}
                onMouseEnter={(e) => {
                // Scale the button when mouse enters
                e.target.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                // Reset the scale when mouse leaves
                e.target.style.transform = "scale(1)";
                }}
            >
                See more
            </button>
            ) : (
            <button
                onClick={handleCloseClick}
                style={{
                padding: "10px 20px",
                marginTop: "15px",
                fontSize: "18px",
                backgroundColor: "#e53935", // Red color for close
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "transform 0.3s ease-in-out", // Smooth scaling effect
                }}
                onMouseEnter={(e) => {
                // Scale the button when mouse enters
                e.target.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                // Reset the scale when mouse leaves
                e.target.style.transform = "scale(1)";
                }}
            >
                Close
            </button>
            )}
      </div>

      {/* Restart Button */}
      <button
        onClick={onRestart}
        style={{
          padding: "12px 24px",
          position: "absolute",
          bottom: "15.5%",  // Adjust this value to move the button up/down
          fontSize: 20,
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          backgroundColor: "#e53935",
          color: "#fff",
          boxShadow: "0 4px 8px rgba(255, 70, 70, 0.63)",
        }}
      >
        Restart
      </button>
    </div>
  );
};

export default FinalScore;