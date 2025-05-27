import React, { useState } from 'react';
import './LocationWindow.css';

const LocationWindow = ({ location = '', onClose, updateStatus }) => {
  console.log("LocationWindow Loaded");
  console.log("Location:", location);
  const [showPopup, setShowPopup] = useState({
    visible: false,
    content: '',
    position: { x: 0, y: 0 },
  });

  const maxStatus = 500;

  const activities = {
    "The Mountain": [
      { label: "Mendaki", info: "Energy -30, Happiness +20" },
      { label: "Camping & Masak", info: "Hunger +25, Energy -30, Happiness +60, Money -15k", hasMoney: true },
      { label: "Observasi Satwa", info: "Happiness +40, Energy -20" }
    ],
    "The Temple": [
      { label: "Berdoa", info: "Happiness +20" },
      { label: "Menggambar Candi", info: "Happiness +20, Energy -10" },
      { label: "Fotografi & Jual Foto", info: "Happiness +25, Money +10k", hasMoney: true },
      { label: "Bantu Membersihkan Candi", info: "Hygiene +30, Energy -20" }
    ],
    "Home": [
      { label: "Makan", info: "Hunger +50, Money -10k", hasMoney: true },
      { label: "Tidur", info: "Energy +50" },
      { label: "Mandi", info: "Hygiene +25" },
      { label: "Bersih-Bersih Rumah", info: "Hygiene +40, Energy -30" }
    ],
    "The City": [
      { label: "Belanja Souvenir", info: "Money -25k, Happiness +30", hasMoney: true },
      { label: "Makan di Restoran", info: "Hunger +50, Money -20k", hasMoney: true },
      { label: "Volunteer Membersihkan Kota", info: "Happiness +40, Hygiene +20, Energy -30" }
    ],
    "The Beach": [
      { label: "Berenang", info: "Energy -30, Happiness +20, Hygiene +10" },
      { label: "Pungut Sampah", info: "Happiness +30, Hygiene +40, Energy -20" },
      { label: "Cari Kerang Unik", info: "Happiness +15, Money +5k", hasMoney: true }
    ]
  };

  const parseInfo = (info) => {
    const updates = {};
    const patterns = {
      hunger: /Hunger ([+-])(\d+)/,
      energy: /Energy ([+-])(\d+)/,
      happiness: /Happiness ([+-])(\d+)/,
      hygiene: /Hygiene ([+-])(\d+)/,
      money: /Money ([+-])(\d+)k/i
    };

    Object.entries(patterns).forEach(([key, regex]) => {
      const match = info.match(regex);
      if (match) {
        const value = parseInt(match[2]) * (key === 'money' ? 1000 : 1);
        updates[key] = match[1] === '+' ? value : -value;
      }
    });

    return updates;
  };

  const handleAction = (action) => {
    const updates = parseInfo(action.info);

    updateStatus(prev => ({
      hunger: Math.min(maxStatus, Math.max(0, prev.hunger + (updates.hunger || 0))),
      energy: Math.min(maxStatus, Math.max(0, prev.energy + (updates.energy || 0))),
      happiness: Math.min(maxStatus, Math.max(0, prev.happiness + (updates.happiness || 0))),
      hygiene: Math.min(maxStatus, Math.max(0, prev.hygiene + (updates.hygiene || 0))),
      money: Math.max(0, prev.money + (updates.money || 0)),
    }));

    onClose();
  };

  const handleMouseEnter = (e, content) => {
    const rect = e.target.getBoundingClientRect();
    setShowPopup({
      visible: true,
      content,
      position: { x: rect.right + 10, y: rect.top },
    });
  };

  const handleMouseLeave = () => {
    setShowPopup(prev => ({ ...prev, visible: false }));
  };

  const currentActivities = activities[location];
  console.log("Current Activities:", currentActivities);
  if (!location || !activities[location]) {
    return (
      <div className="locationWindow">
        <h2>Location tidak dikenali.</h2>
      </div>
    );
  }

  return (
    <div id="location-window" className="locationWindow">
      <h2 id="location-title">
        You are at {location.toLowerCase().replace("the ", "")}!
      </h2>

      <div id="action-buttons" className="button-container">
        {currentActivities ? currentActivities.map((action, index) => (
          <button
            key={index}
            className="action-button"
            onClick={() => handleAction(action)}
            onMouseEnter={(e) => handleMouseEnter(e, action.info)}
            onMouseLeave={handleMouseLeave}
          >
            {action.label}
            {action.hasMoney && (
              <i
                className="info-icon"
                onMouseEnter={(e) => {
                  const moneyMatch = action.info.match(/Money ([+-])(\d+)k/i);
                  if (moneyMatch) {
                    const sign = moneyMatch[1];
                    const amount = moneyMatch[2];
                    const message =
                      sign === '+'
                        ? `You will get ${amount}k for doing this activity.`
                        : `You will lose ${amount}k for doing this activity.`;
                    handleMouseEnter(e, message);
                  }
                }}
                onMouseLeave={handleMouseLeave}
              >
                i
              </i>
            )}
          </button>
        )) : (
          <p>No activities available here.</p>
        )}
      </div>

      <h3 className="items-title">Items</h3>
      <div className="items-container">
        {['bebek', 'payung', 'cincin', 'tas', 'bunga'].map((item, i) => (
          <div
            key={i}
            className="item-icon"
            style={{ backgroundImage: `url('/img/${item}.png')` }}
          />
        ))}
      </div>

      {showPopup.visible && (
        <div
          id="popup"
          className='popup'
          style={{
            position: "absolute",
            left: `${showPopup.position.x}px`,
            top: `${showPopup.position.y}px`,
            backgroundColor: "#121111",
            border: "1px solid #1b1717",
            padding: "6px 10px",
            fontSize: "13px",
            borderRadius: "15px",
            boxShadow: "2px 2px 6px rgba(0,0,0,0.15)",
            maxWidth: "200px",
            color: "#e5eb3e",
            zIndex: 999,
          }}
        >
          {showPopup.content}
        </div>
      )}
    </div>
  );
};

export default LocationWindow;
