import { useState } from "react";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import GameScreen from "./components/GameScreen/GameScreen";
import bgGame from "./components/img/backgroundGameArea.png";
import bgHome from "./components/img/backgroundStartScreen.png";
import babi from "./components/img/Babi.png";
import kucing from "./components/img/Kucing.png";
import kucingHeadset from "./components/img/KucingHeadset.png";
import tupai from "./components/img/Tupai.png";
import kelinci from "./components/img/Kelinci.png";
import beruang from "./components/img/Beruang.png";

function TestBackground() {
  return (
    <div>
      <img src={bgGame} alt="Test Game BG" />
      <img src={bgHome} alt="Test Home BG" />
    </div>
  );
}

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerData, setPlayerData] = useState({
    name: "",
    avatar: babi, // Using the imported image directly
  });

  const startGame = (name, avatar) => {
    setPlayerData({
      name,
      avatar,
    });
    setGameStarted(true);
  };

  const returnToHome = () => {
    setGameStarted(false);
  };

  return (
    <div className="app-container">
      {!gameStarted ? (
        <HomeScreen startGame={startGame} />
      ) : (
        <GameScreen playerData={playerData} returnToHome={returnToHome} />
      )}
    </div>
  );
}

export default App;
