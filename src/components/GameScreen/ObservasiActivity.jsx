import React, { useEffect, useRef, useState } from "react";
import ayam from "../img/ayam.png";
import deer from "../img/deer.png";
import rabbit from "../img/rabbit.png";
import panda from "../img/panda.png";
import duck from "../img/duck.png";
import turtle from "../img/turtle.png";
import musang from "../img/musang.png";
import avatar from "../img/avatar.png";

const allAnimals = [
  { name: "ayam", src: ayam },
  { name: "deer", src: deer },
  { name: "rabbit", src: rabbit },
  { name: "panda", src: panda },
  { name: "bebek", src: duck },
  { name: "turtle", src: turtle },
  { name: "musang", src: musang },
];

const predefinedPositions = [
  { left: 8, bottom: 10 },
  { left: 28, bottom: 17 },
  { left: 45, bottom: 12 },
  { left: 60, bottom: 35 },
  { left: 85, bottom: 14 },
  { left: 20, bottom: 28 },
  { left: 60, bottom: 9 },
];

const ObservasiActivity = ({
  energyLoss = 20,
  happinessGain = 40,
  setStatusLevels,
  maxStatus,
  setShowGameScreen,
  setShowMountainGame,
  setActionContent,
  setPopupInfo,
  onComplete,
}) => {
  const activityRef = useRef();
  const avatarRef = useRef();
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [foundAnimals, setFoundAnimals] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [obsX, setObsX] = useState(50);
  const [obsY, setObsY] = useState(10);
  const didInit = useRef(false);

  // Fast Forward Function
  const fastForward = () => {
    setFoundAnimals(selectedAnimals.map((a) => a.name)); // semua satwa dianggap ditemukan
    setAnimals((prevAnimals) =>
      prevAnimals.map((animal) => ({
        ...animal,
        observed: selectedAnimals.some((a) => a.name === animal.name)
          ? true
          : animal.observed,
      }))
    );

    setStatusLevels((prev) => ({
      ...prev,
      energy: Math.max(0, prev.energy - energyLoss),
      happiness: Math.min(maxStatus, prev.happiness + happinessGain),
    }));

    setShowGameScreen(true);
    setShowMountainGame(false);
    setActionContent(null);
    if (onComplete) onComplete();
  };

  // Inisialisasi satwa & alert
  useEffect(() => {
    if (!didInit.current) {
      const randomSelected = [...allAnimals]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      const shuffled = [...allAnimals]
        .sort(() => 0.5 - Math.random())
        .slice(0, predefinedPositions.length);

      setSelectedAnimals(randomSelected);
      setAnimals(
        shuffled.map((animal, i) => ({
          ...animal,
          ...predefinedPositions[i],
          observed: false,
        }))
      );

      alert(
        "Observasi dimulai! Temukan: " +
          randomSelected.map((a) => a.name).join(", ")
      );
      didInit.current = true;
    }

    const keyHandler = (e) => {
      const step = 2;
      setObsX((prevX) => {
        if (e.key === "ArrowLeft") return Math.max(0, prevX - step);
        if (e.key === "ArrowRight") return Math.min(95, prevX + step);
        return prevX;
      });
      setObsY((prevY) => {
        if (e.key === "ArrowUp") return Math.min(80, prevY + step);
        if (e.key === "ArrowDown") return Math.max(0, prevY - step);
        return prevY;
      });
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, []);

  // Cek tabrakan saat posisi berubah
  useEffect(() => {
    const checkCollision = () => {
      const avatarRect = avatarRef.current?.getBoundingClientRect();
      if (!avatarRect) return;

      const avatarCenterX = avatarRect.left + avatarRect.width / 2;
      const avatarCenterY = avatarRect.top + avatarRect.height / 2;

      setAnimals((prevAnimals) =>
        prevAnimals.map((animal) => {
          if (animal.observed) return animal;

          const animalElem = document.querySelector(
            `img[data-name='${animal.name}']`
          );
          if (!animalElem) return animal;

          const rect = animalElem.getBoundingClientRect();
          const dx = avatarCenterX - (rect.left + rect.width / 2);
          const dy = avatarCenterY - (rect.top + rect.height / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (
            distance < 30 &&
            selectedAnimals.some((a) => a.name === animal.name)
          ) {
            if (!foundAnimals.includes(animal.name)) {
              const updatedFound = [...foundAnimals, animal.name];
              setFoundAnimals(updatedFound);

              if (updatedFound.length >= 3) {
                setTimeout(() => {
                  setStatusLevels((prev) => ({
                    ...prev,
                    energy: Math.max(0, prev.energy - energyLoss),
                    happiness: Math.min(
                      maxStatus,
                      prev.happiness + happinessGain
                    ),
                  }));
                  setShowGameScreen(true);
                  setShowMountainGame(false);
                  setActionContent(null);
                  if (onComplete) onComplete();
                }, 2000);
              }

              return { ...animal, observed: true };
            }
          }

          return animal;
        })
      );
    };

    checkCollision();
  }, [obsX, obsY, selectedAnimals, foundAnimals]);

  return (
    <div
      ref={activityRef}
      className="activity-screen"
      style={{ display: "flex" }}
    >
      {/* FAST FORWARD BUTTON */}
      <button
        onClick={fastForward}
        style={{
          position: "absolute",
          top: "80px",
          right: "20px",
          zIndex: 1000,
          padding: "10px 20px",
          backgroundColor: "#f87171",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        ⏩ Fast Forward
      </button>

      {/* INSTRUKSI */}
      <div
        id="observasi-instruksi"
        style={{
          position: "absolute",
          top: 20,
          width: "100%",
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "white",
          textShadow: "2px 2px 5px black",
          userSelect: "none",
          zIndex: 1000,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          padding: "10px 0",
        }}
      >
        Cari dan observasi 3 satwa:{" "}
        {selectedAnimals.map((a) => a.name).join(", ")}
      </div>

      {/* AVATAR */}
      <img
        ref={avatarRef}
        src={avatar} // langsung pakai avatar.png
        alt="avatar"
        className="observasi-avatar"
        style={{
          left: `${obsX}%`,
          bottom: `${obsY}%`,
          position: "absolute",
          height: "100px",
          width: "auto",
          objectFit: "contain",
        }}
      />

      {/* ANIMALS */}
      {animals.map((animal) => (
        <img
          key={animal.name}
          src={animal.src}
          data-name={animal.name}
          className="animal"
          style={{
            left: `${animal.left}%`,
            bottom: `${animal.bottom}%`,
            position: "absolute",
            width: "40px",
            opacity: animal.observed ? 0.3 : 1,
          }}
        />
      ))}
    </div>
  );
};

export default ObservasiActivity;
