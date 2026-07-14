import React from "react";

const Stats = [
  { count: "5K", label: "Active Students", color: "blue" },
  { count: "10+", label: "Mentors", color: "green" },
  { count: "200+", label: "Courses", color: "yellow" },
  { count: "50+", label: "Awards", color: "pink" },
];

const StatsComponenet = () => {
  return (
    <div className="relative overflow-hidden bg-richblack-900">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[360px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.06] blur-[120px]" />

      <div className="relative mx-auto w-11/12 max-w-maxContent py-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Stats.map((data, index) => (
            <div
              key={index}
              className={`group flex flex-col items-center gap-1 rounded-2xl border border-white/[0.07] bg-richblack-800/60 py-10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5
                ${data.color === "blue" && "hover:border-blue-400/30 hover:shadow-[0_0_28px_rgba(96,165,250,0.12)]"}
                ${data.color === "green" && "hover:border-emerald-400/30 hover:shadow-[0_0_28px_rgba(52,211,153,0.12)]"}
                ${data.color === "yellow" && "hover:border-yellow-50/30 hover:shadow-[0_0_28px_rgba(255,214,10,0.12)]"}
                ${data.color === "pink" && "hover:border-pink-400/30 hover:shadow-[0_0_28px_rgba(244,114,182,0.12)]"}
              `}
            >
              <h1 className="text-[34px] font-bold tracking-tight text-richblack-5">
                {data.count}
              </h1>
              <h2 className="text-[14px] font-medium text-richblack-300">
                {data.label}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsComponenet;
