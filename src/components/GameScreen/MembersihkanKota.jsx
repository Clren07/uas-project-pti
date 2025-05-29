import React, { useEffect, useState, useRef } from "react";
import trashImg from "../img/sampah2.png";
import binImg from "../img/keranjang.png";

const generateTrash = (count = 6) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 80 + 10,
    y: Math.random() * 50 + 10,
    dx: Math.random() * 0.2 + 0.1,
    dy: (Math.random() - 0.5) * 0.2,
  }));
};

const MembersihkanKota = ({
  happinessGain = 40,
  hygieneGain = 20,
  energyLoss = 30,
  setStatusLevels,
  maxStatus,
  setShowGameScreen,
  setShowCityGame,
  setActionContent,
  setPopupInfo,
  onComplete,
}) => {
  const [trashList, setTrashList] = useState(generateTrash());
  const [hasCompleted, setHasCompleted] = useState(false);
  const binRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setTrashList((prev) =>
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
      const bin = binRef.current;
      if (!bin) return;

      const binRect = bin.getBoundingClientRect();

      setTrashList((prev) =>
        prev.filter((trash) => {
          const el = document.getElementById(`trash-${trash.id}`);
          if (!el) return true;

          const trashRect = el.getBoundingClientRect();
          const isColliding =
            trashRect.right > binRect.left &&
            trashRect.left < binRect.right &&
            trashRect.bottom > binRect.top &&
            trashRect.top < binRect.bottom;

          return !isColliding;
        })
      );
    };

    const interval = setInterval(checkCollision, 300);
    return () => clearInterval(interval);
  }, [trashList]);

  // Effect untuk mendeteksi ketika sampah habis dan belum pernah selesai
  useEffect(() => {
    if (trashList.length === 0 && !hasCompleted) {
      setHasCompleted(true);

      setPopupInfo({
        text: `Kota bersih! +${happinessGain} Happiness, +${hygieneGain} Hygiene`,
        backgroundColor: "#009900",
        color: "#fff",
        position: { x: 300, y: 150 },
        visible: true,
      });

      setTimeout(() => {
        setPopupInfo((prev) => ({ ...prev, visible: false }));
        setShowGameScreen(true);
        setShowCityGame(false);
        setActionContent(null);
        if (onComplete) {
          console.log("Calling onComplete callback");
          onComplete();
        }
      }, 2000);
    }
  }, [trashList, hasCompleted]);

  // Fungsi fast forward: langsung hapus semua sampah
  const handleFastForward = () => {
    setTrashList([]);
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
        🧹 BERSIHKAN KOTA!
      </h2>

      <div
        style={{
          textAlign: "center",
          fontSize: "18px",
          marginBottom: "10px",
          color: "#000",
        }}
      >
        🗑️ Tersisa: {trashList.length}
      </div>

      {/* Tombol Fast Forward */}
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
        {trashList.map((item) => (
          <img
            key={item.id}
            id={`trash-${item.id}`}
            src={trashImg}
            alt="Trash"
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
          ref={binRef}
          src={binImg}
          alt="Trash Bin"
          style={{
            position: "absolute",
            top: "13vw",
            left: "40%",
            width: "80px",
            height: "80px",
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const id = e.dataTransfer.getData("text/plain");
            setTrashList((prev) => prev.filter((t) => t.id !== parseInt(id)));
          }}
        />
      </div>
    </div>
  );
};

export default MembersihkanKota;
