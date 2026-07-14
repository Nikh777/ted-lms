import React from "react";
import HighlightText from "../HomePage/HighlightText";
import {
  FaCode,
  FaChalkboardTeacher,
  FaRocket,
  FaGlobeAmericas,
} from "react-icons/fa";

const features = [
  {
    icon: FaCode,
    color: "blue",
    title: "Project Based Learning",
    desc: "Build real-world applications while mastering modern technologies.",
  },
  {
    icon: FaChalkboardTeacher,
    color: "green",
    title: "Expert Mentors",
    desc: "Learn directly from senior developers and industry professionals.",
  },
  {
    icon: FaRocket,
    color: "yellow",
    title: "Career Focused",
    desc: "Interview prep, coding practice, and dedicated career guidance.",
  },
  {
    icon: FaGlobeAmericas,
    color: "pink",
    title: "Learn Anywhere",
    desc: "Lifetime access across all your devices, anytime, anywhere.",
  },
];

const colorClasses = {
  blue: "hover:border-blue-400/30 hover:shadow-[0_0_28px_rgba(96,165,250,0.12)] text-blue-100",
  green:
    "hover:border-emerald-400/30 hover:shadow-[0_0_28px_rgba(52,211,153,0.12)] text-caribbeangreen-100",
  yellow:
    "hover:border-yellow-50/30 hover:shadow-[0_0_28px_rgba(255,214,10,0.12)] text-yellow-50",
  pink: "hover:border-pink-400/30 hover:shadow-[0_0_28px_rgba(244,114,182,0.12)] text-pink-200",
};

const WhyVaini = () => {
  return (
    <section className="bg-richblack-900 py-20">
      <div className="mx-auto w-11/12 max-w-maxContent">
        <h2 data-reveal className="text-center text-3xl font-semibold tracking-tight text-white lg:text-4xl">
          Why <HighlightText text={"Vaini"} />
        </h2>
        <p data-reveal className="mx-auto mt-4 max-w-xl text-center text-[15px] text-richblack-300">
          A platform designed around outcomes, not just content — everything
          is built to help you actually get better, faster.
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={i}
              data-reveal
              className={`group rounded-2xl border border-white/[0.07] bg-richblack-800/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 ${colorClasses[f.color]}`}
            >
              <f.icon className="mb-4 text-2xl" />
              <h3 className="mb-2 text-[15px] font-semibold leading-snug text-richblack-5">
                {f.title}
              </h3>
              <p className="text-[13px] leading-6 text-richblack-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyVaini;
