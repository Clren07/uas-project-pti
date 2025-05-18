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
      className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bgHome})` }}
    >
      <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-xl bg-transparent max-w-sm w-full mt-48">
        <AvatarSelector
          selectedAvatar={selectedAvatar}
          onPrevClick={() => changeAvatar(-1)}
          onNextClick={() => changeAvatar(1)}
        />
        <div className="flex flex-col items-center gap-2 w-full">
          <input
            type="text"
            id="player-name"
            placeholder="Enter your name here..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-64 h-10 text-center text-base rounded-full border-2 border-gray-300 outline-none"
          />
          <img
            id="start-game"
            src={tombolStart}
            alt="Start Game"
            onClick={handleStartGame}
            className="w-36 cursor-pointer transition-transform duration-200 hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
