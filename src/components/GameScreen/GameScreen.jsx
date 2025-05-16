import { useState, useEffect, useRef } from "react";
import TopBar from "../TopBar/TopBar";
import StatusBars from "../StatusBars/StatusBars";
import GameArea from "../GameArea/GameArea";
import LocationWindow from "../LocationWindow/LocationWindow";
import "./GameScreen.css";
import bgGame from "../img/backgroundGameArea.png";
import Beach from "../img/Beach.png";
import Home from "../img/Home.png";
import Temple from "../img/Temple.png";
import Mountain from "../img/Mountain.png";
import City from "../img/City.png";

const GameScreen = ({ playerData, returnToHome }) => {
  const locationRefs = useRef({});

  const [statusLevels, setStatusLevels] = useState({
    hunger: 250,
    energy: 250,
    happiness: 250,
    hygiene: 250,
    money: 230000,
  });

  const [gameTime, setGameTime] = useState({
    day: "Monday",
    dayCount: 1,
    hours: 9,
    minutes: 0,
  });

  const [greeting, setGreeting] = useState("Good Morning");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showLocationWindow, setShowLocationWindow] = useState(false);

  const playerRef = useRef(null);
  const gameAreaRef = useRef(null);

  const maxStatus = 500;
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const locations = [
    {
      name: "The Mountain",
      x: 0,
      y: 255,
      width: 330,
      height: 260,
      image: Mountain,
      collisionArea: { width: 130, height: 130 },
    },
    {
      name: "The Temple",
      x: 360,
      y: 450,
      width: 250,
      height: 200,
      image: Temple,
      collisionArea: { width: 100, height: 100 },
    },
    {
      name: "Home",
      x: 800,
      y: 273,
      width: 250,
      height: 170,
      image: Home,
      collisionArea: { width: 175, height: 60 },
    },
    {
      name: "The City",
      x: 1080,
      y: 200,
      width: 500,
      height: 450,
      image: City,
      collisionArea: { width: 140, height: 150 },
    },
    {
      name: "The Beach",
      x: 0,
      y: 600,
      width: 1920,
      height: 190,
      image: Beach,
      collisionArea: { width: 1920, height: 190 },
    },
  ];

  // Center player on mount
  useEffect(() => {
    const player = playerRef.current;
    const gameArea = gameAreaRef.current;
    if (player && gameArea) {
      const centerX = (gameArea.offsetWidth - player.offsetWidth) / 2;
      const centerY = (gameArea.offsetHeight - player.offsetHeight) / 2;
      player.style.left = `${centerX}px`;
      player.style.top = `${centerY}px`;
    }
  }, []);

  // Game time ticking
  useEffect(() => {
    const timer = setInterval(() => {
      setGameTime((prev) => {
        let newMinutes = prev.minutes + 1;
        let newHours = prev.hours;
        let newDayIndex = daysOfWeek.indexOf(prev.day);
        let newDayCount = prev.dayCount;

        if (newMinutes >= 60) {
          newMinutes = 0;
          newHours++;
          if (newHours >= 24) {
            newHours = 0;
            newDayIndex = (newDayIndex + 1) % daysOfWeek.length;
            newDayCount++;
          }
        }

        return {
          day: daysOfWeek[newDayIndex],
          dayCount: newDayCount,
          hours: newHours,
          minutes: newMinutes,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update greeting
  useEffect(() => {
    const { hours } = gameTime;

    if (hours >= 5 && hours < 12) setGreeting("Good Morning");
    else if (hours < 15) setGreeting("Good Noon");
    else if (hours < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, [gameTime.hours]);

  // Status degradation over time
  useEffect(() => {
    const statusTimer = setInterval(() => {
      setStatusLevels((prev) => ({
        hunger: Math.max(0, prev.hunger - 50),
        energy: Math.max(0, prev.energy - 50),
        happiness: Math.max(0, prev.happiness - 50),
        hygiene: Math.max(0, prev.hygiene - 50),
        money: prev.money,
      }));
    }, 60000);

    return () => clearInterval(statusTimer);
  }, []);

  const movePlayer = (x, y) => {
    if (!playerRef.current || !gameAreaRef.current) return;

    const player = playerRef.current;
    const gameArea = gameAreaRef.current;
    
    const currentX = parseInt(player.style.left) || 0;
    const currentY = parseInt(player.style.top) || 0;

    const newX = Math.max(0, Math.min(gameArea.offsetWidth - player.offsetWidth, currentX + x));
    const newY = Math.max(0, Math.min(gameArea.offsetHeight - player.offsetHeight, currentY + y));

    player.style.left = `${newX}px`;
    player.style.top = `${newY}px`;

    checkCollision(newX, newY);
  };

  const checkCollision = () => {
    const player = playerRef.current;
    if (!player) return;

    const playerRect = player.getBoundingClientRect();
    let overlappingLocation = null;

    locations.forEach((location) => {
      const locElement = locationRefs.current[location.name];
      if (!locElement || !location.collisionArea) return;

      const locRect = locElement.getBoundingClientRect();

      // Hitung area tengah untuk collision
      const centerX = locRect.left + locRect.width / 2;
      const centerY = locRect.top + locRect.height / 2;
      const collisionWidth = location.collisionArea.width;
      const collisionHeight = location.collisionArea.height;

      // Buat rect untuk area tengah
      const centerRect = {
        left: centerX - collisionWidth / 2,
        right: centerX + collisionWidth / 2,
        top: centerY - collisionHeight / 2,
        bottom: centerY + collisionHeight / 2,
      };

      // Cek overlap dengan area tengah
      const isOverlap = !(
        playerRect.right < centerRect.left ||
        playerRect.left > centerRect.right ||
        playerRect.bottom < centerRect.top ||
        playerRect.top > centerRect.bottom
      );

      if (isOverlap) {
        overlappingLocation = location;
      }
    });

    if (
      overlappingLocation &&
      currentLocation?.name !== overlappingLocation.name
    ) {
      setCurrentLocation(overlappingLocation);
      setShowLocationWindow(true);
    } else if (!overlappingLocation) {
      setShowLocationWindow(false);
    }
  };

  const handleKeyDown = (e) => {
    const step = 10;
    switch (e.key) {
      case "ArrowUp": movePlayer(0, -step); break;
      case "ArrowDown": movePlayer(0, step); break;
      case "ArrowLeft": movePlayer(-step, 0); break;
      case "ArrowRight": movePlayer(step, 0); break;
      default: break;
    }
  };

  useEffect(() => {
    console.log("Bg Game:", bgGame);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const performAction = (action) => {
    console.log("Performing action:", action);
    setShowLocationWindow(false);
  };

  return (
    <div
      id="game-screen"
      ref={gameAreaRef}
      className="flex relative items-center justify-center overflow-hidden w-screen h-[105vh] bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bgGame})` }}
    >
      <TopBar
        greeting={greeting}
        time={`${gameTime.day} | Day ${gameTime.dayCount} | ${String(gameTime.hours).padStart(2, "0")}:${String(gameTime.minutes).padStart(2, "0")}`}
        money={statusLevels.money}
      />

      <StatusBars
        hunger={statusLevels.hunger}
        energy={statusLevels.energy}
        happiness={statusLevels.happiness}
        hygiene={statusLevels.hygiene}
        maxStatus={maxStatus}
      />

      {locations.map((location, index) => (
        <img
          key={index}
          ref={(el) => (locationRefs.current[location.name] = el)}
          src={location.image}
          alt={location.name}
          className={location.className || ""}
          style={
            location.className
              ? { pointerEvents: "none", zIndex: 1 }
              : {
                  position: "absolute",
                  left: `${location.x}px`,
                  top: `${location.y}px`,
                  width: `${location.width}px`,
                  height: `${location.height}px`,
                  pointerEvents: "none",
                  zIndex: 1,
                }
          }
        />
      ))}

      <GameArea
        playerRef={playerRef}
        playerName={playerData.name}
        playerAvatar={playerData.avatar}
        onMove={movePlayer}
        locations={locations}
      />

      {showLocationWindow && currentLocation && (
        <LocationWindow
          location={currentLocation.name}
          onAction={performAction}
          onClose={() => setShowLocationWindow(false)}
        />
      )}

    </div>
  );
};

export default GameScreen;
