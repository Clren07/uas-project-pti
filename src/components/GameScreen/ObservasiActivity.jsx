import React, { useEffect, useRef, useState } from "react";
import ayam from "../img/ayam.png";
import deer from "../img/deer.png";
import rabbit from "../img/rabbit.png";
import panda from "../img/panda.png";
import bebek from "../img/bebek.png";
import turtle from "../img/turtle.png";
import musang from "../img/musang.png";

const allAnimals = [
  { name: "ayam", src: ayam },
  { name: "deer", src: deer },
  { name: "rabbit", src: rabbit },
  { name: "panda", src: panda },
  { name: "bebek", src: bebek },
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
  setShowTempleGame,
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
  const didShowAlert = useRef(false);

useEffect(() => {
  if (!didShowAlert.current) {
    const randomSelected = [...allAnimals].sort(() => 0.5 - Math.random()).slice(0, 3);
    const shuffled = [...allAnimals].sort(() => 0.5 - Math.random()).slice(0, predefinedPositions.length);

    setSelectedAnimals(randomSelected);
    setAnimals(
      shuffled.map((animal, i) => ({
        ...animal,
        ...predefinedPositions[i],
        observed: false,
      }))
    );

    alert("Observasi dimulai! Temukan: " + randomSelected.map(a => a.name).join(", "));
    didShowAlert.current = true;
  }

  const keyHandler = (e) => {
    setObsX((prevX) => {
      const step = 2;
      if (e.key === "ArrowLeft") return Math.max(0, prevX - step);
      if (e.key === "ArrowRight") return Math.min(95, prevX + step);
      return prevX;
    });

    setObsY((prevY) => {
      const step = 2;
      if (e.key === "ArrowUp") return Math.min(80, prevY + step);
      if (e.key === "ArrowDown") return Math.max(0, prevY - step);
      return prevY;
    });
  };

  window.addEventListener("keydown", keyHandler);
  return () => window.removeEventListener("keydown", keyHandler);
}, []);


  useEffect(() => {
    const checkCollision = () => {
      const avatarRect = avatarRef.current?.getBoundingClientRect();
      if (!avatarRect) return;

      const avatarCenterX = avatarRect.left + avatarRect.width / 2;
      const avatarCenterY = avatarRect.top + avatarRect.height / 2;

      setAnimals((prev) =>
        prev.map((animal) => {
          if (animal.observed) return animal;

          const animalElem = document.querySelector(`img[data-name='${animal.name}']`);
          if (!animalElem) return animal;

          const rect = animalElem.getBoundingClientRect();
          const dx = avatarCenterX - (rect.left + rect.width / 2);
          const dy = avatarCenterY - (rect.top + rect.height / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 30 && selectedAnimals.some((a) => a.name === animal.name)) {
        const updatedFound = [...foundAnimals, animal.name];
        setFoundAnimals(updatedFound);

        if (updatedFound.length >= 3) {
        onComplete();
        setShowTempleGame(false);
        setShowGameScreen(true);
        setStatusLevels((prev) => ({
        ...prev,
        energy: Math.max(0, prev.energy - energyLoss),
        happiness: Math.min(maxStatus, prev.happiness + happinessGain),
        }));
    }

    return { ...animal, observed: true };
    }

          return animal;
        })
      );
    };

    checkCollision();
  }, [obsX, obsY]);

  return (
    <div ref={activityRef} className="activity-screen" style={{ display: "flex" }}>
      <div id="observasi-instruksi">
        Cari dan observasi 3 satwa: {selectedAnimals.map((a) => a.name).join(", ")}
      </div>
      <img
        ref={avatarRef}
        src={localStorage.getItem("selectedAvatar") || ""}
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
