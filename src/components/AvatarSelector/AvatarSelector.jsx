import React from "react";
import babiImage from "../img/Babi.png";
import kucingImage from "../img/Kucing.png";
import kucingHeadsetImage from "../img/KucingHeadset.png";
import tupaiImage from "../img/Tupai.png";
import kelinciImage from "../img/Kelinci.png";
import beruangImage from "../img/Beruang.png";
import panahKiri from "../img/panahKiri.png";
import panahKanan from "../img/panahKanan.png";
import "./AvatarSelector.css";

const AvatarSelector = ({ selectedAvatar, onPrevClick, onNextClick }) => {
  // Langsung menggunakan imported images sebagai array
  const avatars = [babiImage, kucingImage, kucingHeadsetImage, tupaiImage, kelinciImage, beruangImage];

  return (
    <div className="avatar-selector">
      <img
        id="prev-avatar"
        src={panahKiri}
        alt="Previous Avatar"
        onClick={onPrevClick}
      />
      <img 
        id="avatar" 
        src={selectedAvatar}  // Langsung gunakan prop yang dikirim
        alt="Avatar" 
        style={{ width: "120px", height: "auto" }}
      />
      <img
        id="next-avatar"
        src={panahKanan}
        alt="Next Avatar"
        onClick={onNextClick}
      />
    </div>
  );
};

export default AvatarSelector;