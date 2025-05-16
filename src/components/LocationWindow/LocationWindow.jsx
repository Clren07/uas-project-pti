import { useState } from "react";
import "./LocationWindow.css";

const LocationWindow = ({ location, onClose, onAction }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });

  const activities = {
    "The Mountain": [
      { label: "Mendaki", info: "Energy -30, Happiness +20" },
      {
        label: "Camping & Masak",
        info: "Hunger +25, Energy -30, Happiness +60, Money -15k",
        hasMoney: true,
      },
      { label: "Observasi Satwa", info: "Happiness +40, Energy -20" },
    ],
    "The Temple": [
      { label: "Berdoa", info: "Happiness +20" },
      { label: "Menggambar Candi", info: "Happiness +20, Energy -10" },
      {
        label: "Fotografi & Jual Foto",
        info: "Happiness +25, Money +10k",
        hasMoney: true,
      },
      { label: "Bantu Membersihkan Candi", info: "Hygiene +30, Energy -20" },
    ],
    Home: [
      { label: "Makan", info: "Hunger +50, Money -10k", hasMoney: true },
      { label: "Tidur", info: "Energy +50" },
      { label: "Mandi", info: "Hygiene +25" },
      { label: "Bersih-Bersih Rumah", info: "Hygiene +40, Energy -30" },
    ],
    "The City": [
      {
        label: "Belanja Souvenir",
        info: "Money -25k, Happiness +30",
        hasMoney: true,
      },
      {
        label: "Makan di Restoran",
        info: "Hunger +50, Money -20k",
        hasMoney: true,
      },
      {
        label: "Volunteer Membersihkan Kota",
        info: "Happiness +40, Hygiene +20, Energy -30",
      },
    ],
    "The Beach": [
      { label: "Berenang", info: "Energy -30, Happiness +20, Hygiene +10" },
      {
        label: "Pungut Sampah",
        info: "Happiness +30, Hygiene +40, Energy -20",
      },
      {
        label: "Cari Kerang Unik",
        info: "Happiness +15, Money +5k",
        hasMoney: true,
      },
    ],
  };

  const handleActionClick = (action) => {
    onAction(action);
    onClose();
  };

  const handleMouseEnter = (e, info, hasMoney) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let content = info;

    if (hasMoney) {
      const moneyMatch = info.match(/Money ([+-])(\d+k)/i);
      if (moneyMatch) {
        const sign = moneyMatch[1];
        const amount = moneyMatch[2];
        content += `\nYou will ${
          sign === "+" ? "get" : "lose"
        } ${amount} for this activity.`;
      }
    }

    setPopupContent(content);
    setPopupPosition({
      left: rect.right + 10,
      top: rect.top,
    });
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const handleInfoMouseEnter = (e, info) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupContent(info);
    setPopupPosition({
      left: rect.right + 10,
      top: rect.top,
    });
    setShowPopup(true);
  };

  return (
  <div
        id="location-window"
        className="flex flex-col absolute top-[150px] left-1/2 -translate-x-1/2 w-[300px] bg-black bg-opacity-60 text-white rounded-2xl p-5 text-center z-50"
      >
        <h2 id="location-title" className="text-lg font-bold mb-4">
          You are at {location.toLowerCase().replace("the ", "")}!
        </h2>
        <div id="action-buttons" className="flex flex-col gap-2 mt-2">
          {activities[location]?.map((activity, index) => {
            const moneyMatch = activity.info.match(/Money ([+-])(\d+k)/i);
            let moneyMessage = "";

            if (activity.hasMoney && moneyMatch) {
              const sign = moneyMatch[1];
              const amount = moneyMatch[2];
              moneyMessage = `You will ${
                sign === "+" ? "get" : "lose"
              } ${amount} for doing this activity.`;
            }

            return (
              <button
                key={index}
                className="bg-yellow-400 text-black font-bold rounded-lg py-2 w-full mt-2 relative hover:bg-yellow-500"
                onClick={() => handleActionClick(activity.label)}
                onMouseEnter={(e) =>
                  handleMouseEnter(e, activity.info, activity.hasMoney)
                }
                onMouseLeave={handleMouseLeave}
              >
                {activity.label}
                {activity.hasMoney && (
                  <span
                    className="ml-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full cursor-help hover:bg-red-700"
                    onMouseEnter={(e) => handleInfoMouseEnter(e, moneyMessage)}
                    onMouseLeave={handleMouseLeave}
                  >
                    i
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {showPopup && (
          <div
            id="popup"
            className="absolute bg-[#121111] border border-[#1b1717] px-2 py-1 text-xs rounded-2xl shadow-md max-w-[200px] text-yellow-300 whitespace-pre-line z-50"
            style={{
              left: `${popupPosition.left}px`,
              top: `${popupPosition.top}px`,
              display: "block",
            }}
          >
            {popupContent}
          </div>
        )}
      </div>
    );
  };

export default LocationWindow;