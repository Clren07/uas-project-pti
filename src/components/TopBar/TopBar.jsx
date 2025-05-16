const TopBar = ({ greeting, time, money }) => {
  const commonBg = "bg-[rgba(34,139,34,0.3)] rounded-xl";

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-center p-2 z-50">
      <div className="flex gap-4 bg-[rgba(255,255,255,0.15)] backdrop-blur-lg rounded-xl p-3 border border-[rgba(255,255,255,0.3)] shadow-lg">
        {/* Greeting */}
        <div
          className={`flex flex-col items-center px-4 py-2 min-w-[100px] transform transition-transform duration-200 hover:-translate-y-1 ${commonBg}`}
        >
          <span className="text-sm font-bold text-black">{greeting}</span>
        </div>

        {/* Time */}
        <div
          className={`flex flex-col items-center px-4 py-2 min-w-[100px] transform transition-transform duration-200 hover:-translate-y-1 ${commonBg}`}
        >
          <span className="text-sm font-bold text-black">{time}</span>
        </div>

        {/* Money */}
        <div
          className={`flex flex-col items-center px-4 py-2 min-w-[100px] transform transition-transform duration-200 hover:-translate-y-1 ${commonBg}`}
        >
          <span className="text-sm font-bold text-black">
            ${money.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
