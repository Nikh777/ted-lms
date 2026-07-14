import React from "react";
import HighlightText from "../HomePage/HighlightText";
import { FaEye, FaHandsHelping, FaClock } from "react-icons/fa";

const reasons = [
  { icon: FaEye, title: "See it Firsthand", desc: "Walk through real courses, dashboards and tools live." },
  { icon: FaHandsHelping, title: "Tailored to You", desc: "We focus the demo on your specific goals or team's needs." },
  { icon: FaClock, title: "Just 20 Minutes", desc: "A short, focused session that respects your time." },
];

const WhySchedule = () => {
  return (
    <section className="bg-richblack-900 py-16">
      <div className="mx-auto w-11/12 max-w-maxContent">
        <h2 data-reveal className="text-center text-3xl font-semibold tracking-tight text-white lg:text-4xl">
          Why Schedule a <HighlightText text={"Demo"} />
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {reasons.map((r, i) => (
            <div
              key={i}
              data-reveal
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] bg-richblack-800/60 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-yellow-50/30 hover:shadow-[0_0_28px_rgba(255,214,10,0.1)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] text-yellow-50">
                <r.icon className="text-lg" />
              </div>
              <h3 className="text-[15px] font-semibold text-richblack-5">{r.title}</h3>
              <p className="text-[13px] leading-6 text-richblack-300">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySchedule;
