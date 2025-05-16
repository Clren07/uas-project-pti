// StatusBars.jsx
import "./StatusBars.css";

const StatusBars = ({ hunger, energy, happiness, hygiene, maxStatus }) => {
  const barClass = "relative flex-grow h-5 rounded-[10px] bg-white/20 shadow-inner overflow-hidden";
  const barValueClass = "absolute right-1 text-[10px] font-bold text-white leading-5 drop-shadow";

  return (
    <div className="flex justify-center items-center absolute top-[60px] left-0 w-full gap-5 m-5 px-5 z-[100]">
      {/* Hunger */}
      <div className="flex items-center gap-2 min-w-[120px] bg-white/15 backdrop-blur-md rounded-[15px] p-2 hover:[&>.bar-fill]:brightness-110 hover:[&>.bar-icon]:scale-110 transition">
        <div className="text-[20px] w-6 text-center bar-icon">🍽️</div>
        <div className={barClass}>
          <div
            className="bar-fill h-full rounded-[10px] transition-all hunger bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e]"
            style={{ width: `${(hunger / maxStatus) * 100}%` }}
          />
          <span className={barValueClass}>{hunger}</span>
        </div>
      </div>

      {/* Energy */}
      <div className="flex items-center gap-2 min-w-[120px] bg-white/15 backdrop-blur-md rounded-[15px] p-2 hover:[&>.bar-fill]:brightness-110 hover:[&>.bar-icon]:scale-110 transition">
        <div className="text-[20px] w-6 text-center bar-icon">⚡</div>
        <div className={barClass}>
          <div
            className="bar-fill h-full rounded-[10px] transition-all energy bg-gradient-to-r from-[#4ecdc4] to-[#88f3e8]"
            style={{ width: `${(energy / maxStatus) * 100}%` }}
          />
          <span className={barValueClass}>{energy}</span>
        </div>
      </div>

      {/* Happiness */}
      <div className="flex items-center gap-2 min-w-[120px] bg-white/15 backdrop-blur-md rounded-[15px] p-2 hover:[&>.bar-fill]:brightness-110 hover:[&>.bar-icon]:scale-110 transition">
        <div className="text-[20px] w-6 text-center bar-icon">😊</div>
        <div className={barClass}>
          <div
            className="bar-fill h-full rounded-[10px] transition-all happiness bg-gradient-to-r from-[#ffd166] to-[#ffe3a0]"
            style={{ width: `${(happiness / maxStatus) * 100}%` }}
          />
          <span className={barValueClass}>{happiness}</span>
        </div>
      </div>

      {/* Hygiene */}
      <div className="flex items-center gap-2 min-w-[120px] bg-white/15 backdrop-blur-md rounded-[15px] p-2 hover:[&>.bar-fill]:brightness-110 hover:[&>.bar-icon]:scale-110 transition">
        <div className="text-[20px] w-6 text-center bar-icon">🧼</div>
        <div className={barClass}>
          <div
            className="bar-fill h-full rounded-[10px] transition-all hygiene bg-gradient-to-r from-[#84a9ff] to-[#a5c4ff]"
            style={{ width: `${(hygiene / maxStatus) * 100}%` }}
          />
          <span className={barValueClass}>{hygiene}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBars;
