import React, { useEffect, useState, useRef } from "react";
import sandwichImg from "../img/sandwich.png";
import plateImg from "../img/plate.png";

const generateFood = (count = 6) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 80 + 10,
    y: Math.random() * 50 + 10,
    dx: Math.random() * 0.2 + 0.1,
    dy: (Math.random() - 0.5) * 0.2,
  }));
};

const Makan = ({
  happinessGain = 40,
  hungerGain = 50,
  setStatusLevels,
  maxStatus,
  setShowGameScreen,
  setShowHomeGame,
  setActionContent,
  setPopupInfo,
  onComplete,
}) => {
  const [foodList, setFoodList] = useState(generateFood());
  const [hasCompleted, setHasCompleted] = useState(false);
  const plateRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setFoodList((prev) =>
        prev.map((item) => ({
          ...item,
          x: (item.x + item.dx) % 90,
          y: Math.max(5, Math.min(70, item.y + item.dy)),
        }))
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkCollision = () => {
      const plate = plateRef.current;
      if (!plate) return;

      const plateRect = plate.getBoundingClientRect();

      setFoodList((prev) =>
        prev.filter((food) => {
          const el = document.getElementById(`food-${food.id}`);
          if (!el) return true;

          const foodRect = el.getBoundingClientRect();
          const isColliding =
            foodRect.right > plateRect.left &&
            foodRect.left < plateRect.right &&
            foodRect.bottom > plateRect.top &&
            foodRect.top < plateRect.bottom;

          return !isColliding;
        })
      );
    };

    const interval = setInterval(checkCollision, 300);
    return () => clearInterval(interval);
  }, [foodList]);

  useEffect(() => {
    if (foodList.length === 0 && !hasCompleted) {
      setHasCompleted(true);

      setPopupInfo({
        text: `Makanan habis! +${hungerGain} Hunger`,
        backgroundColor: "#009900",
        color: "#fff",
        position: { x: 300, y: 150 },
        visible: true,
      });

      setTimeout(() => {
        setPopupInfo((prev) => ({ ...prev, visible: false }));
        setShowGameScreen(true);
        setShowHomeGame(false);
        setActionContent(null);
        if (onComplete) {
          console.log("Calling onComplete callback");
          onComplete();
        }
      }, 2000);
    }
  }, [foodList, hasCompleted]);

  const handleFastForward = () => {
    setFoodList([]);
  };

  return (
    <div
      style={{
        width: "40vw",
        maxWidth: "400px",
        minWidth: "320px",
        height: "30vw",
        backgroundColor: "rgba(255,255,255,0.85)",
        borderRadius: "20px",
        overflow: "hidden",
        padding: "15px 20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        position: "relative",
        userSelect: "none",
        margin: "8vw auto",
        color: "#000",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "24px",
          marginBottom: "5px",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        🍽️ MAKAN!
      </h2>

      <div
        style={{
          textAlign: "center",
          fontSize: "18px",
          marginBottom: "10px",
          color: "#000",
        }}
      >
        🍴 Tersisa: {foodList.length}
      </div>

      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <button
          onClick={handleFastForward}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Fast Forward
        </button>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "240px",
        }}
      >
        {foodList.map((item) => (
          <img
            key={item.id}
            id={`food-${item.id}`}
            src={sandwichImg}
            alt="Food"
            style={{
              position: "absolute",
              width: "60px",
              height: "60px",
              cursor: "grab",
              left: `${item.x}%`,
              top: `${item.y}%`,
              transition: "transform 0.3s",
            }}
            draggable="true"
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", item.id);
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        ))}

        <img
          ref={plateRef}
          src={plateImg}
          alt="Plate"
          style={{
            position: "absolute",
            top: "13vw",
            left: "40%",
            width: "110px",
            height: "110px",
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const id = e.dataTransfer.getData("text/plain");
            setFoodList((prev) => prev.filter((t) => t.id !== parseInt(id)));
          }}
        />
      </div>
    </div>
  );
};

export default Makan;