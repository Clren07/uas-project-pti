import { useState } from "react";
import AvatarSelector from "../AvatarSelector/AvatarSelector";
import "./HomeScreen.css";
import bgHome from "../img/backgroundStartScreen.png";
import tombolStart from "../img/tombolStart.png";
import Babi from "../img/Babi.png";
import Kucing from "../img/Kucing.png";
import KucingHeadset from "../img/KucingHeadset.png";
import Tupai from "../img/Tupai.png";
import Kelinci from "../img/Kelinci.png";
import Beruang from "../img/Beruang.png";

const HomeScreen = ({ startGame }) => {
  const [playerName, setPlayerName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(Babi);

  const avatars = [Babi, Kucing, KucingHeadset, Tupai, Kelinci, Beruang];

  const changeAvatar = (direction) => {
    const currentIndex = avatars.indexOf(selectedAvatar);
    const newIndex =
      (currentIndex + direction + avatars.length) % avatars.length;
    setSelectedAvatar(avatars[newIndex]);
  };

  const handleStartGame = () => {
    if (!playerName.trim()) {
      alert("Please enter your name!");
      return;
    }
    startGame(playerName, selectedAvatar);
  };

  return (
    <div
      id="home-screen"
      style={{
        backgroundImage: `url(${bgHome})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw", 
        overflow: "hidden",
      }}
    >
      <div className="container">
        <AvatarSelector
          selectedAvatar={selectedAvatar}
          onPrevClick={() => changeAvatar(-1)}
          onNextClick={() => changeAvatar(1)}
        />
        <div className="input-container">
          <input
            type="text"
            id="player-name"
            placeholder="Enter your name here..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <img
            id="start-game"
            src={tombolStart}
            alt="Start Game"
            onClick={handleStartGame}
            style={{
              width: "150px",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
