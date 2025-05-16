import React from "react";
import babiImage from "../img/Babi.png";
import kucingImage from "../img/Kucing.png";
import kucingHeadsetImage from "../img/KucingHeadset.png";
import tupaiImage from "../img/Tupai.png";
import kelinciImage from "../img/Kelinci.png";
import beruangImage from "../img/Beruang.png";
import panahKiri from "../img/panahKiri.png";
import panahKanan from "../img/panahKanan.png";

const AvatarSelector = ({ selectedAvatar, onPrevClick, onNextClick }) => {
  return (
    <div className="flex items-center justify-center gap-5">
      <img
        src={panahKiri}
        alt="Previous Avatar"
        onClick={onPrevClick}
        className="w-[50px] cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125"
      />
      <img
        src={selectedAvatar}
        alt="Avatar"
        className="w-[120px] h-auto"
      />
      <img
        src={panahKanan}
        alt="Next Avatar"
        onClick={onNextClick}
        className="w-[50px] cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125"
      />
    </div>
  );
};

export default AvatarSelector;
