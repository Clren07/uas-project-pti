import React, { useState, useEffect, useRef } from "react";
import TopBar from "../TopBar/TopBar";
import StatusBars from "../StatusBars/StatusBars";
import GameArea from "../GameArea/GameArea"  
import "./GameScreen.css";
import bgGame from "../img/backgroundGameArea.png";

import TempleCleaningGame from "./TempleCleaningGame"; 
import TempleBackground from "../img/temple.png";
import BerdoaActivity from "./BerdoaActivity";
import MenggambarActivity from "./MenggambarActivity";
import FotografiActivity from "./FotografiActivity";

import CityBackground from "../img/city.png";
import BelanjaSouvenir from "./BelanjaSouvenir";
import MakanActivity from "./MakanActivity";
import MembersihkanKota from "./MembersihkanKota";

import BeachBackground from "../img/beach.png";
import BerenangActivity from "./BerenangActivity";

import MountainBackground from "../img/MountainBackground.png";
import MendakiActivity from "./MendakiActivity";
import CampingActivity from "./CampingActivity";
import ObservasiActivity from "./observasiActivity";


import bunga from '../img/bunga.png';
import payung from '../img/payung.png';
import tas from '../img/tas.png';
import bebek from '../img/bebek.png';
import cincin from '../img/cincin.png';

import GameOver from "./GameOver";

const GameScreen = ({ playerData, returnToHome }) => {
  const [showGameScreen, setShowGameScreen] = useState(true);
  const [showTempleGame, setShowTempleGame] = useState(false);
  const [showCityGame, setShowCityGame] = useState(false);
  const [showBeachGame, setShowBeachGame] = useState(false);
  const [showMountainGame, setShowMountainGame] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [statusLevels, setStatusLevels] = useState({
    hunger: 250,
    energy: 250,
    happiness: 250,
    hygiene: 250,
    money: 230000,
  });

  useEffect(() => {
    console.log("Status Levels updated:", statusLevels);  // Debugging status
  }, [statusLevels]);


  const [popupInfo, setPopupInfo] = useState({
    text: "",
    position: { x: 0, y: 0 },
    visible: false,
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
  const [lastLocation, setLastLocation] = useState(null);

  const [countdownText, setCountdownText] = useState(" ");
  const [progressBarWidth, setProgressBarWidth] = useState("0%");

  const [actionContent, setActionContent] = useState(null);
  const [itemsExchangedCount, setItemsExchangedCount] = useState(0);

  const playerRef = useRef(null);
  const gameAreaRef = useRef(null);

  const maxStatus = {
  hunger: 500,
  energy: 500,
  happiness: 500,
  hygiene: 500,
  };

  useEffect(() => {
    const adaYangHabis = Object.values(statusLevels).some((nilai) => nilai <= 0);
    if (adaYangHabis) {
      setIsGameOver(true);
    }
  }, [statusLevels]);

  const handleRestart = () => {
    setStatusLevels({
      hunger: 250,
      energy: 250,
      happiness: 250,
      hygiene: 250,
      money: 230000,
    });
    setIsGameOver(false);
  };
  
  const resetAvatarPosition = () => {
    if (playerRef.current && gameAreaRef.current) {
      const gameArea = gameAreaRef.current;
      const player = playerRef.current;

      const centerX = (gameArea.offsetWidth - player.offsetWidth) / 2;
      const centerY = (gameArea.offsetHeight - player.offsetHeight) / 2;

      // Set avatar ke posisi tengah
      player.style.left = `${centerX}px`;
      player.style.top = `${centerY}px`;
    }
  };

  useEffect(() => {
    if (showGameScreen) {
      resetAvatarPosition(); // Reset posisi avatar setiap kali kembali ke game screen
    }
  }, [showGameScreen]);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [items, setItems] = useState({
    bunga: false,  
    payung: false,
    tas: false,
    bebek: false,
    cincin: false,
  });
  //bunga, payung, tas, bebek,cincin
  // Function to add bunga to items after praying activity is completed
  const addBungaToItems = () => {
    if (!items.bunga) {
      setItems((prevItems) => ({
        ...prevItems,
        bunga: true, // Add bunga to the inventory
      }));
    }
  };

  const addCincinToItems = () => {
    if (!items.cincin) {
      setItems((prevItems) => ({
        ...prevItems,
        cincin: true, // Add cincin to the inventory
      }));
    }
  };

  const addPayungToItems = () => {
    if (!items.payung) {
      setItems((prevItems) => ({
        ...prevItems,
        payung: true, // Add cincin to the inventory
      }));
    }
  };

  const addBebekToItems = () => {
    if (!items.bebek) {
      setItems((prevItems) => ({
        ...prevItems,
        bebek: true, // Add cincin to the inventory
      }));
    }
  };

  const addTasToItems = () => {
    if (!items.tas) {
      setItems((prevItems) => ({
        ...prevItems,
        tas: true, // Add cincin to the inventory
      }));
    }
  };
  

  const locations = [
    { name: "The Mountain", x: 0, y: 240, width: 130, height: 40 },
    { name: "The Temple", x: 375, y: 320, width: 130, height: 50 },
    { name: "Home", x: 705, y: 265, width: 160, height: 50 },
    { name: "The City", x: 1130, y: 285, width: 100, height: 80 },
    { name: "The Beach", x: 0, y: 530, width: 1450, height: 90 },
  ];

  const activities = {
    "The Mountain": [
      { label: "Mendaki", 
        info: "Energy -30, Happiness +20",
        action: () => {
            setShowGameScreen(false);
            setShowMountainGame(true);
            setActionContent(
              <MendakiActivity
                happinessGain={20}
                energyLoss={30}
                setStatusLevels={setStatusLevels}
                maxStatus={maxStatus}
                setShowGameScreen={setShowGameScreen}
                setShowMountainGame={setShowMountainGame}
                setActionContent={setActionContent}
                setPopupInfo={setPopupInfo}
                setCountdownText={setCountdownText}
                setProgressBarWidth={setProgressBarWidth}
                onComplete={() => {
                  setStatusLevels((prevLevels) => {
                    const updatedLevels = {
                      ...prevLevels,
                      happiness: Math.min(maxStatus.happiness, prevLevels.happiness + 20), // Menambahkan 20 ke happiness
                      energy: Math.max(0, (prevLevels.energy || 0) - 30),
                    };
                    console.log("Updated Status Levels:", updatedLevels); // Debugging
                    return updatedLevels;
                  });
                  resetAvatarPosition(); 
                }}
              />
            );
          },
      },
      {
        label: "Camping & Masak",
        info: "Hunger +25, Energy -30, Happiness +60, Money -15k",
        hasMoney: true,
        action: () => {
            setShowGameScreen(false);
            setShowMountainGame(true);
            setActionContent(
              <CampingActivity
                happinessGain={60}
                energyLoss={30}
                moneyLoss={15}
                hungerGain={25}
                setStatusLevels={setStatusLevels}
                maxStatus={maxStatus}
                setShowGameScreen={setShowGameScreen}
                setShowMountainGame={setShowMountainGame}
                setActionContent={setActionContent}
                setPopupInfo={setPopupInfo}
                setCountdownText={setCountdownText}
                setProgressBarWidth={setProgressBarWidth}
                onComplete={() => {
                  // Tambah happiness dan tambahkan bunga ke items setelah berdoa selesai
                  setStatusLevels((prevLevels) => {
                    const updatedLevels = {
                      ...prevLevels,
                      happiness: Math.min(maxStatus.happiness, prevLevels.happiness + 60), // Menambahkan 60 ke happiness
                      energy: Math.max(0, (prevLevels.energy || 0) - 30),
                      hunger: Math.min(maxStatus.hunger, prevLevels.hunger + 25),
                      money: Math.max(0, (prevLevels.money || 0) - 15),
                    };
                    console.log("Updated Status Levels:", updatedLevels); // Debugging
                    return updatedLevels;
                  });
                  resetAvatarPosition(); 
                }}
              />
            );
          },
      },
      { 
        label: "Observasi Satwa", 
        info: "Happiness +40, Energy -20",
        action: () => {
            setShowGameScreen(false);
            setShowMountainGame(true);
            setActionContent(
              <ObservasiActivity
                happinessGain={40}
                energyLoss={20}
                setStatusLevels={setStatusLevels}
                maxStatus={maxStatus}
                setShowGameScreen={setShowGameScreen}
                setShowMountainGame={setShowMountainGame}
                setActionContent={setActionContent}
                setPopupInfo={setPopupInfo}
                setCountdownText={setCountdownText}
                setProgressBarWidth={setProgressBarWidth}
                onComplete={() => {
                  // Tambah happiness dan tambahkan bunga ke items setelah berdoa selesai
                  setStatusLevels((prevLevels) => {
                    const updatedLevels = {
                      ...prevLevels,
                      happiness: Math.min(maxStatus.happiness, prevLevels.happiness + 40), // Menambahkan 40 ke happiness
                      energy: Math.max(0, (prevLevels.energy || 0) - 20),
                    };
                    console.log("Updated Status Levels:", updatedLevels); // Debugging
                    return updatedLevels;
                  });
                  resetAvatarPosition(); 
                }}
              />
            );
          },

      },
    ],
   "The Temple": [
      { 
          label: "Berdoa",
          info: "Happiness +20",
          action: () => {
            setShowGameScreen(false);
            setShowTempleGame(true);
            setActionContent(
              <BerdoaActivity
                durationInSeconds={10}
                happinessGain={20}
                setStatusLevels={setStatusLevels}
                maxStatus={maxStatus}
                setShowGameScreen={setShowGameScreen}
                setShowTempleGame={setShowTempleGame}
                setActionContent={setActionContent}
                setPopupInfo={setPopupInfo}
                setCountdownText={setCountdownText}
                setProgressBarWidth={setProgressBarWidth}
                onComplete={() => {
                  // Tambah happiness dan tambahkan bunga ke items setelah berdoa selesai
                  setStatusLevels((prevLevels) => {
                    const updatedLevels = {
                      ...prevLevels,
                      happiness: Math.min(maxStatus.happiness, prevLevels.happiness + 20), // Menambahkan 20 ke happiness
                    };
                    console.log("Updated Status Levels:", updatedLevels); // Debugging
                    return updatedLevels;
                  });
                  resetAvatarPosition();
                  addBungaToItems();  // Menambahkan bunga ke inventory
                }}
              />
            );
          },
        },
      { label: "Menggambar Candi", 
        info: "Happiness +20, Energy -10",
        action: () => {
          setShowGameScreen(false);
          setShowTempleGame(true);
          setActionContent(
            <MenggambarActivity
              durationInSeconds={10}
              happinessGain={20}
              energyLoss={10}
              setStatusLevels={setStatusLevels}
              maxStatus={maxStatus}
              setShowGameScreen={setShowGameScreen}
              setShowTempleGame={setShowTempleGame}
              setActionContent={setActionContent}
              setPopupInfo={setPopupInfo}
              setCountdownText={setCountdownText}
              setProgressBarWidth={setProgressBarWidth}
              onComplete={() => {
              setStatusLevels((prevLevels) => {
                const updatedLevels = {
                  ...prevLevels,
                  happiness: Math.min(maxStatus.happiness, (prevLevels.happiness || 0) + 20),
                  energy: Math.max(0, (prevLevels.energy || 0) - 10),  // kurangi energy, jangan sampai di bawah 0
                };
                console.log("Updated Status Levels:", updatedLevels);
                return updatedLevels;
              });
              resetAvatarPosition();
              addBungaToItems();  // Menambahkan bunga ke inventory setelah menggambar selesai
            }}
            />
          );
        },
      },
      {
        label: "Fotografi & Jual Foto",
        info: "Happiness +25, Money +10k",
        hasMoney: true,
        action: () => {
          setShowGameScreen(false);
          setShowTempleGame(true);
          setActionContent(
            <FotografiActivity
              happinessGain={25}
              moneyGain={10000}
              setStatusLevels={setStatusLevels}
              maxStatus={maxStatus}
              setShowGameScreen={setShowGameScreen}
              setShowTempleGame={setShowTempleGame}
              setActionContent={setActionContent}
              setPopupInfo={setPopupInfo}
              setCountdownText={setCountdownText}
              setProgressBarWidth={setProgressBarWidth}
              onComplete={() => {
                setStatusLevels((prevLevels) => {
                  const updatedLevels = {
                    ...prevLevels,
                    happiness: Math.min(maxStatus.happiness, prevLevels.happiness + 25),
                    money: (prevLevels.money || 0) + 10000,
                  };
                  console.log("Updated Status Levels:", updatedLevels);
                  return updatedLevels;
                });
                resetAvatarPosition();
                addBungaToItems();  // Tambah bunga ke inventory
              }}
            />
          );
        },
      },      
      {
        label: "Bantu Membersihkan Candi",
        info: "Hygiene +30, Energy -20",
        action: () => {
          setShowGameScreen(false);
          setShowTempleGame(true);
          setActionContent(
            <TempleCleaningGame
              hygieneGain = {30}
              energyLoss = {12000}
              setStatusLevels={setStatusLevels}
              maxStatus={maxStatus}
              setShowGameScreen={setShowGameScreen}
              setShowTempleGame={setShowTempleGame}
              setActionContent={setActionContent}
              setPopupInfo={setPopupInfo}
              setCountdownText={setCountdownText}
              setProgressBarWidth={setProgressBarWidth}
              onComplete={() => {
                setStatusLevels((prevLevels) => {
                  const updatedLevels = {
                    ...prevLevels,
                    hygiene: Math.min(maxStatus.hygiene, (prevLevels.hygiene || 0) + 30),
                    energy: Math.max(0, (prevLevels.energy || 0) - 20),
                  };
                  console.log("Updated Status Levels:", updatedLevels);
                  return updatedLevels;
                });
                resetAvatarPosition();
                addBungaToItems();
              }}
            />
          );
        },
      }    
    ],
    Home: [
      { label: "Makan", info: "Hunger +50, Money -10k", hasMoney: true },
      { label: "Tidur", info: "Energy +50" },
      { label: "Mandi", info: "Hygiene +25" },
      { label: "Bersih-Bersih Rumah", info: "Hygiene +40, Energy -30" },
    ],

    "The City": [
      { label: "Belanja Souvenir", 
        info: "Money -25k, Happiness +30", 
        hasMoney: true,
        action: () => {
          setShowGameScreen(false);
          setShowCityGame(true);
          setActionContent(
            <BelanjaSouvenir
              durationInSeconds={20}
              happinessGain={30}
              moneyLoss={25000}
              setStatusLevels={setStatusLevels}
              maxStatus={maxStatus}
              setShowGameScreen={setShowGameScreen}
              setShowCityGame={setShowCityGame}
              setActionContent={setActionContent}
              setPopupInfo={setPopupInfo}
              setCountdownText={setCountdownText}
              setProgressBarWidth={setProgressBarWidth}
              onComplete={() => {
                setStatusLevels((prevLevels) => {
                  const updatedLevels = {
                    ...prevLevels,
                    happiness: Math.min(maxStatus.happiness, prevLevels.happiness + 30),
                    money: (prevLevels.money || 0) - 25000,
                  };
                  console.log("Updated Status Levels:", updatedLevels);
                  return updatedLevels;
                });
                resetAvatarPosition();
                addTasToItems(); // Menambahkan cincin ke inventory
              }}
            />
          );
        }
      },
      {
        label: "Makan di Restoran",
        info: "Hunger +50, Money -20k",
        hasMoney: true,
        action: () => {
          setShowGameScreen(false);
          setShowCityGame(true);
          setActionContent(
            <MakanActivity
              durationInSeconds={10}
              hungerGain={50}
              moneyLoss={20000}
              setStatusLevels={setStatusLevels}
              maxStatus={maxStatus}
              setShowGameScreen={setShowGameScreen}
              setShowCityGame={setShowCityGame}
              setActionContent={setActionContent}
              setPopupInfo={setPopupInfo}
              setCountdownText={setCountdownText}
              setProgressBarWidth={setProgressBarWidth}
              onComplete={() => {
                setStatusLevels((prevLevels) => {
                  const updatedLevels = {
                    ...prevLevels,
                    hunger: Math.min(maxStatus.hunger, prevLevels.hunger + 50),
                    money: (prevLevels.money || 0) - 20000,
                    };
                    console.log("Updated Status Levels:", updatedLevels); // Debugging
                    return updatedLevels;
                });
                resetAvatarPosition();
                addTasToItems();
              }}
            />
          );
        }
      },
      {
        label: "Volunteer Membersihkan Kota",
        info: "Happiness +40, Hygiene +20, Energy -30",
        action: () => {
          setShowGameScreen(false);
          setShowCityGame(true);
          setActionContent(
            <MembersihkanKota
              durationInSeconds={10}
              happinessGain={40}
              hygieneGain={20}
              energyLoss={30}
              setStatusLevels={setStatusLevels}
              maxStatus={maxStatus}
              setShowGameScreen={setShowGameScreen}
              setShowCityGame={setShowCityGame}
              setActionContent={setActionContent}
              setPopupInfo={setPopupInfo}
              setCountdownText={setCountdownText}
              setProgressBarWidth={setProgressBarWidth}
              onComplete={() => {
                setStatusLevels((prevLevels) => {
                  const updatedLevels = {
                    ...prevLevels,
                    happiness: Math.min(maxStatus.happiness, (prevLevels.happiness || 0) + 40),
                    hygiene: Math.min(maxStatus.hygiene, (prevLevels.hygiene || 0) + 20),
                    energy: Math.max(0, (prevLevels.energy || 0) - 30),
                  };
                  console.log("Updated Status Levels:", updatedLevels);
                  return updatedLevels;
                });
      
                setPopupInfo({
                  text: "Kota bersih! +40 Happiness, +20 Hygiene",
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
                }, 2000);

                resetAvatarPosition();
                addTasToItems();
              }}
              
            />
          );
        }
      }           
    ],
    "The Beach": [
      { label: "Berenang", 
        info: "Energy -30, Happiness +20, Hygiene +10" ,
        action: () => {
          setShowGameScreen(false);
          setShowBeachGame(true);
          setActionContent(
            <BerenangActivity
              durationInSeconds={10}
              happinessGain={20}
              hygieneGain={10}
              energyLoss={30}
              setStatusLevels={setStatusLevels}
              maxStatus={maxStatus}
              setShowGameScreen={setShowGameScreen}
              setShowBeachGame={setShowBeachGame}
              setActionContent={setActionContent}
              setPopupInfo={setPopupInfo}
              setCountdownText={setCountdownText}
              setProgressBarWidth={setProgressBarWidth}
              onComplete={() => {
                setStatusLevels((prevLevels) => {
                  const updatedLevels = {
                    ...prevLevels,
                    happiness: Math.min(maxStatus.happiness, (prevLevels.happiness || 0) + 20),
                    hygiene: Math.min(maxStatus.hygiene, (prevLevels.hygiene || 0) + 10),
                    energy: Math.max(0, (prevLevels.energy || 0) - 30),
                  };
                  console.log("Updated Status Levels:", updatedLevels);
                  return updatedLevels;
                });
                resetAvatarPosition();
                addTasToItems();
              }}
            />
          );
        }
      },
      { label: "Pungut Sampah", info: "Happiness +30, Hygiene +40, Energy -20" },
      { label: "Cari Kerang Unik", info: "Happiness +15, Money +5k", hasMoney: true },
    ],
  };

  const [popupNotification, setPopupNotification] = useState({
    visible: false,
    message: "",
  });

  // Handle item click to remove item
  const handleItemClick = (item) => {
    // Increase the money by 2000
    setStatusLevels((prev) => ({
      ...prev,
      money: prev.money + 2000,
    }));

    // Add a random value (between 10 and 20) to a random status bar
    const randomStatus = Math.random();
    const randomValue = Math.floor(Math.random() * 11) + 10; // Random value between 10 and 20
    let updatedMessage = `You gained 2000 money and`;
    
    if (randomStatus < 0.25) {
      setStatusLevels((prev) => ({
        ...prev,
        happiness: Math.min(maxStatus.happiness, prev.happiness + randomValue),
      }));
      updatedMessage += ` +${randomValue} Happiness.`;
    } else if (randomStatus < 0.5) {
      setStatusLevels((prev) => ({
        ...prev,
        energy: Math.min(maxStatus.energy, prev.energy + randomValue),
      }));
      updatedMessage += ` +${randomValue} Energy.`;
    } else if (randomStatus < 0.75) {
      setStatusLevels((prev) => ({
        ...prev,
        hygiene: Math.min(maxStatus.hygiene, prev.hygiene + randomValue),
      }));
      updatedMessage += ` +${randomValue} Hygiene.`;
    } else {
      setStatusLevels((prev) => ({
        ...prev,
        hunger: Math.min(maxStatus.hunger, prev.hunger + randomValue),
      }));
      updatedMessage += ` +${randomValue} Hunger.`;
    }

    // Set item to false (hidden) when clicked
    setItems((prevItems) => ({
      ...prevItems,
      [item]: false,
    }));

    // Increase the count of exchanged items
    setItemsExchangedCount((prevCount) => prevCount + 1);
    
    // Show the popup notification
    setPopupNotification({
      visible: true,
      message: updatedMessage,
    });

    // Hide the popup after 3 seconds
    setTimeout(() => {
      setPopupNotification({ visible: false, message: "" });
    }, 3000);
  };

  // Initialize player position
  useEffect(() => {
    if (playerRef.current && gameAreaRef.current) {
      const gameArea = gameAreaRef.current;
      const player = playerRef.current;

      const centerX = (gameArea.offsetWidth - player.offsetWidth) / 2;
      const centerY = (gameArea.offsetHeight - player.offsetHeight) / 2;

      player.style.left = `${centerX}px`;
      player.style.top = `${centerY}px`;
    }
  }, []);

  // Game time update
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

  // Update greeting based on time
  useEffect(() => {
    const { hours } = gameTime;

    if (hours >= 5 && hours < 12) {
      setGreeting("Good Morning");
    } else if (hours >= 12 && hours < 15) {
      setGreeting("Good Noon");
    } else if (hours >= 15 && hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [gameTime.hours]);

  // Decrease status bars over time
  useEffect(() => {
    const statusTimer = setInterval(() => {
      setStatusLevels((prev) => ({
        ...prev, 
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

    const newX = Math.max(
      0,
      Math.min(gameArea.offsetWidth - player.offsetWidth, currentX + x)
    );
    const newY = Math.max(
      0,
      Math.min(gameArea.offsetHeight - player.offsetHeight, currentY + y)
    );

    player.style.left = `${newX}px`;
    player.style.top = `${newY}px`;

    checkCollision(newX, newY);
  };

  const lastLocationRef = useRef(lastLocation);
  const showLocationWindowRef = useRef(showLocationWindow);

  useEffect(() => {
    lastLocationRef.current = lastLocation;
  }, [lastLocation]);

  useEffect(() => {
    showLocationWindowRef.current = showLocationWindow;
  }, [showLocationWindow]);

  const checkCollision = (x, y) => {
    const playerWidth = playerRef.current?.offsetWidth || 50;
    const playerHeight = playerRef.current?.offsetHeight || 50;

    const validLocations = [
      "The Mountain",
      "The Temple",
      "Home",
      "The City",
      "The Beach",
    ];

    let overlappingLocation = null;

    for (const location of locations) {
      if (
        x < location.x + location.width &&
        x + playerWidth > location.x &&
        y < location.y + location.height &&
        y + playerHeight > location.y &&
        validLocations.includes(location.name)
      ) {
        overlappingLocation = location;
        break;
      }
    }

    if (overlappingLocation) {
      if (lastLocationRef.current !== overlappingLocation.name) {
        setCurrentLocation(overlappingLocation);
        setShowLocationWindow(true);
        setLastLocation(overlappingLocation.name);
      } else if (!showLocationWindowRef.current) {
        setShowLocationWindow(true);
      }
    } else {
      if (showLocationWindowRef.current || lastLocationRef.current !== null) {
        setShowLocationWindow(false);
        setCurrentLocation(null);
        setLastLocation(null);
        setPopupInfo((prev) => ({ ...prev, visible: false }));  // Hide popup when location window is closed
      }
    }
  };

  const handleKeyDown = (e) => {
    const step = 10;

    switch (e.key) {
      case "ArrowUp":
        movePlayer(0, -step);
        break;
      case "ArrowDown":
        movePlayer(0, step);
        break;
      case "ArrowLeft":
        movePlayer(-step, 0);
        break;
      case "ArrowRight":
        movePlayer(step, 0);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const performAction = (label) => {
    console.log("Action performed:", label);
    setShowLocationWindow(false);
    setPopupInfo((prev) => ({ ...prev, visible: false }));  // Close the popup after action
  };

return (
    <div>
    {showTempleGame && (
      <div
        id="temple-screen"
        style={{
          backgroundImage: `url(${TempleBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "105vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          display: "block",
        }}
      >
        {actionContent}
      </div>
    )}
    {showCityGame && (
      <div
        id="city-screen"
        style={{
          backgroundImage: `url(${CityBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "105vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          display: "block",
        }}
      >
        {actionContent}
      </div>
    )}
    {showBeachGame && (
      <div
        id="beach-screen"
        style={{
          backgroundImage: `url(${BeachBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "105vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          display: "block",
        }}
      >
        {actionContent}
      </div>
    )}
    {showMountainGame && (
      <div
        id="mountain-screen"
        style={{
          backgroundImage: `url(${MountainBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "105vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          display: "block",
        }}
      >
        {actionContent}
      </div>
    )}
    {isGameOver && (
      <GameOver onRestart={handleRestart} />
    )}
    <div
      id="game-screen"
      ref={gameAreaRef}
      style={{
        backgroundImage: `url(${bgGame})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "105vh",
        display: showGameScreen ? "block" : "none",
      }}
    > 
      {actionContent ? (
        actionContent
      ) : (
        <>
          <TopBar
            greeting={greeting}
            time={`${gameTime.day} | Day ${gameTime.dayCount} | ${String(gameTime.hours).padStart(2, "0")}:${String(gameTime.minutes).padStart(2, "0")}`}
            money={statusLevels.money}
          />
          <StatusBars
            key={`${statusLevels.hunger}-${statusLevels.energy}-${statusLevels.happiness}-${statusLevels.hygiene}`}
            hunger={statusLevels.hunger}
            energy={statusLevels.energy}
            happiness={statusLevels.happiness}
            hygiene={statusLevels.hygiene}
            maxStatus={maxStatus}
          />
          <GameArea
            playerRef={playerRef}
            playerName={playerData.name}
            playerAvatar={playerData.avatar}
            onMove={movePlayer}
          />
          {locations.map((loc) => (
            <div
              key={loc.name}
              style={{
                position: "absolute",
                top: loc.y,
                left: loc.x,
                width: loc.width,
                height: loc.height,
                pointerEvents: "none",
                zIndex: 5,
              }}
              title={`Collision Area: ${loc.name}`}
            />
          ))}

          {showLocationWindow && currentLocation && (
            <div
              id="location-window"
              style={{
                position: "absolute",
                top: "10%",
                left: "15%",
                backgroundColor: "rgba(0,0,0,0.6)",
                padding: "20px",
                borderRadius: "15px",
                width: "300px",
                color: "white",
                zIndex: 1000,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                id="location-title"
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                You are at {currentLocation.name.toLowerCase().replace("the ", "")}!
              </div>

              <div
                id="action-buttons"
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {activities[currentLocation.name].map((act, idx) => {
                  const moneyMatch = act.info.match(/Money ([+-])(\d+k)/i);
                  let moneyMessage = "";
                  if (act.hasMoney && moneyMatch) {
                    const sign = moneyMatch[1];
                    const amount = moneyMatch[2];
                    moneyMessage =
                      sign === "+"
                        ? `You will get ${amount} for doing this activity.`
                        : `You will lose ${amount} for doing this activity.`;
                  }

                  return (
                    <button
                      key={idx}
                      className="action-button"
                      onClick={() => act.action()}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setPopupInfo({
                          text: act.info,
                          position: { x: rect.right + 10, y: rect.top },
                          visible: true,
                        });
                      }}
                      onMouseLeave={() =>
                        setPopupInfo((prev) => ({ ...prev, visible: false }))
                      }
                    >
                      {act.label}
                      {act.hasMoney && (
                        <span
                          className="info-icon"
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            setPopupInfo({
                              text: moneyMessage,
                              position: { x: rect.right + 10, y: rect.top },
                              visible: true,
                            });
                          }}
                          onMouseLeave={(e) => {
                            e.stopPropagation();
                            setPopupInfo((prev) => ({ ...prev, visible: false }));
                          }}
                        >
                          i
                        </span>
                      )}
                    </button>
                    
                  );
                  
                })}
              </div>
              <div
                style={{ marginTop: "20px", fontWeight: "bold", fontSize: "18px" }}
              >
              ITEMS 
              </div>
              <div id="items-container" className="items-container">
                {items.bunga && (
                  <div
                    className="item-icon"
                    style={{ backgroundImage: `url(${bunga})` }}
                    onClick={() => handleItemClick("bunga")}
                  />
                )}
                {items.payung && (
                  <div
                    className="item-icon"
                    style={{ backgroundImage: `url(${payung})` }}
                    onClick={() => handleItemClick("payung")}
                  />
                )}
                {items.tas && (
                  <div
                    className="item-icon"
                    style={{ backgroundImage: `url(${tas})` }}
                    onClick={() => handleItemClick("tas")}
                  />
                )}
                {items.bebek && (
                  <div
                    className="item-icon"
                    style={{ backgroundImage: `url(${bebek})` }}
                    onClick={() => handleItemClick("bebek")}
                  />
                )}
                {items.cincin && (
                  <div
                    className="item-icon"
                    style={{ backgroundImage: `url(${cincin})` }}
                    onClick={() => handleItemClick("cincin")}
                  />
                )}
              </div>

              {/* Display the number of items exchanged */}
              <div id="items-exchanged-count">
                <p>Jumlah item yang sudah ditukar: {itemsExchangedCount}</p>
              </div>
            </div>
          )}

          {/* Popup Notification */}
          {popupNotification.visible && (
            <div
              id="popup-notification"
              style={{
                position: "fixed",
                bottom: "80px", // Adjusted position to be just below the status bars
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#000",
                color: "#fff000",
                padding: "10px 20px",
                borderRadius: "15px",
                fontSize: "16px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                zIndex: 1000,
              }}
            >
              {popupNotification.message}
            </div>
          )}

          {popupInfo.visible && (
            <div
              id="popup"
              style={{
                position: "fixed",
                top: `${popupInfo.position.y}px`,  // Menyesuaikan posisi vertikal sesuai dengan posisi tombol
                left: `${popupInfo.position.x + 10}px`,  // Mengatur posisi popup sedikit ke kanan dari tombol
                backgroundColor: "#121111",
                border: "1px solid #1b1717",
                padding: "6px 10px",
                fontSize: "13px",
                borderRadius: "15px",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.15)",
                maxWidth: "200px",
                color: "#e5eb3e",
                zIndex: 9999,
                pointerEvents: "none",
                whiteSpace: "normal",
                userSelect: "none",
                display: "block",
              }}
            >
              {popupInfo.text}
            </div>
          )}
        </>
      )}
    </div>
    </div>
  );
};

export default GameScreen;
