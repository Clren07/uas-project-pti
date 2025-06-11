import React, { useEffect, useState } from "react";
import trashImg from "../img/sampah2.png";
import shellImg from "../img/kerang.png"; 

const generateItems = (kerangCount = 8, trashCount = 12) => {
  const kerangs = Array.from({ length: kerangCount }).map((_, i) => ({
    id: `k-${i}`,
    type: "kerang",
    x: Math.random() * 80 + 10,
    y: Math.random() * 60 + 10,
    removed: false,
  }));
  const trash = Array.from({ length: trashCount }).map((_, i) => ({
    id: `t-${i}`,
    type: "sampah",
    x: Math.random() * 80 + 10,
    y: Math.random() * 60 + 10,
  }));
  return [...kerangs, ...trash].sort(() => Math.random() - 0.5);
};

const CariKerangUnik = ({
  happinessGain = 15,
  moneyGain = 5000,
  setPopupInfo,
  setShowGameScreen,
  setShowBeachGame,
  setActionContent,
  onComplete,
}) => {
  const [items, setItems] = useState(generateItems());
  const [kerangCount, setKerangCount] = useState(
    items.filter((item) => item.type === "kerang").length
  );
  const [clickedItems, setClickedItems] = useState([]); // animasi klik

  const handleItemClick = (item) => {
    if (item.type === "kerang") {
      setClickedItems((prev) => [...prev, item.id]);
      setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== item.id));
        setKerangCount((prev) => prev - 1);
      }, 300); // delay animasi
    }
  };

  useEffect(() => {
    if (kerangCount === 0) {
      setPopupInfo({
        text: `Kerang ditemukan! +${happinessGain} Happiness, +${moneyGain} Money`,
        backgroundColor: "#0099cc",
        color: "#fff",
        position: { x: 300, y: 150 },
        visible: true,
      });

      setTimeout(() => {
        setPopupInfo((prev) => ({ ...prev, visible: false }));
        setShowGameScreen(true);
        setShowBeachGame(false);
        setActionContent(null);
        if (onComplete) onComplete();
      }, 2000);
    }
  }, [kerangCount]);

  const handleFastForward = () => {
    setItems((prev) => prev.filter((item) => item.type !== "kerang"));
    setKerangCount(0);
  };

  return (
    <div
      style={{
        width: "40vw",
        maxWidth: "400px",
        minWidth: "320px",
        height: "30vw",
        backgroundColor: "rgba(255,255,255,0.9)",
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
        🐚 CARI KERANG UNIK!
      </h2>

      <div
        style={{
          textAlign: "center",
          fontSize: "18px",
          marginBottom: "10px",
          color: "#000",
        }}
      >
        🐚 Tersisa: {kerangCount}
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
        {/* Tampilkan kerang dulu agar berada di bawah sampah */}
        {items
          .filter((item) => item.type === "kerang")
          .map((item) => (
            <img
              key={item.id}
              src={shellImg}
              alt="kerang"
              onClick={() => handleItemClick(item)}
              style={{
                position: "absolute",
                width: "50px",
                height: "50px",
                left: `${item.x}%`,
                top: `${item.y}%`,
                cursor: "pointer",
                transition: "transform 0.2s, opacity 0.3s",
                transform: clickedItems.includes(item.id)
                  ? "scale(0)"
                  : "scale(1)",
                opacity: clickedItems.includes(item.id) ? 0 : 1,
                zIndex: 1,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.2)";
              }}
              onMouseOut={(e) => {
                if (!clickedItems.includes(item.id))
                  e.currentTarget.style.transform = "scale(1)";
              }}
            />
          ))}

        {/* Tampilkan sampah di atas */}
        {items
          .filter((item) => item.type === "sampah")
          .map((item) => (
            <img
              key={item.id}
              src={trashImg}
              alt="sampah"
              style={{
                position: "absolute",
                width: "50px",
                height: "50px",
                left: `${item.x}%`,
                top: `${item.y}%`,
                zIndex: 2,
                 pointerEvents: "none",
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default CariKerangUnik;
