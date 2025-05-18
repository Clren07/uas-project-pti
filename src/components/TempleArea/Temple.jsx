import React, { useState, useEffect } from "react";

const Temple = ({ activeActivity, onClose, onStatusUpdate }) => {
  // State untuk progress bar 5 detik (dalam ms)
  const [progress, setProgress] = useState(100); // persen penuh = 100%
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let timer;
    if (activeActivity === "Berdoa" && progress > 0 && !showPopup) {
      // Kurangi progress tiap 100ms supaya total 5 detik
      timer = setTimeout(() => {
        setProgress((prev) => Math.max(prev - 2, 0)); // 100% / 50 steps = 2% per 100ms
      }, 100);
    } else if (progress === 0 && !showPopup) {
      // Tampilkan popup setelah progress habis
      setShowPopup(true);
      // Update status happiness +20 ke parent
      onStatusUpdate({ happiness: 20 });
    }

    return () => clearTimeout(timer);
  }, [progress, activeActivity, showPopup, onStatusUpdate]);

  const handleClose = () => {
    setShowPopup(false);
    setProgress(100);
    onClose(); // tutup temple screen di parent
  };

  // Hanya render jika aktifitasnya "Berdoa"
  if (activeActivity !== "Berdoa") return null;

  return (
    <>
      {/* Fullscreen temple background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "url('/img/temple-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        {/* Gambar orang berdoa dengan bg putih di tengah */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 250,
            height: 300,
            marginBottom: 30,
          }}
        >
          <img
            src="/img/praying-person.png"
            alt="Berdoa"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Progress bar countdown */}
        <div
          style={{
            width: "80%",
            height: 25,
            backgroundColor: "#444",
            borderRadius: 15,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#FFD700",
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </div>

      {/* Popup info setelah progress selesai */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 1100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#222",
              padding: 30,
              borderRadius: 16,
              textAlign: "center",
              color: "white",
              maxWidth: 300,
              boxShadow: "0 0 10px #FFD700",
            }}
          >
            <h3>Status Updated!</h3>
            <p>Happiness increased by +20</p>
            <button
              onClick={handleClose}
              style={{
                marginTop: 20,
                padding: "10px 20px",
                borderRadius: 10,
                border: "none",
                backgroundColor: "#FFD700",
                color: "black",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Temple;
