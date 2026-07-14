export default function Tab({ tabData, field, setField }) {
    return (
      <div className="flex bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-1 gap-x-1 my-6 rounded-full max-w-max">
        {tabData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setField(tab.type)}
            className={`relative py-2 px-5 rounded-full text-sm font-medium transition-all duration-300 ease-out ${
              field === tab.type
                ? "bg-white/[0.08] text-richblack-5 border border-cyan-400/30 shadow-[0_0_16px_rgba(34,211,238,0.18)]"
                : "bg-transparent text-richblack-300 border border-transparent hover:text-richblack-5 hover:bg-white/[0.04]"
            }`}
          >
            {tab?.tabName}
          </button>
        ))}
      </div>
    );
  }