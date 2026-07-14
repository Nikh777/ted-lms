import React from "react";
import HighlightText from "../HomePage/HighlightText";
import { FaUserPlus, FaBookOpen, FaLaptopCode, FaCertificate } from "react-icons/fa";

const steps = [
  { icon: FaUserPlus, title: "Sign Up", desc: "Create your free account in seconds." },
  { icon: FaBookOpen, title: "Pick a Path", desc: "Choose a course track that matches your goals." },
  { icon: FaLaptopCode, title: "Build & Practice", desc: "Learn by building real, hands-on projects." },
  { icon: FaCertificate, title: "Get Certified", desc: "Graduate with a certificate and a portfolio." },
];

const LearningJourney = () => {
  return (
    <section className="bg-richblack-900 py-20">
      <div className="mx-auto w-11/12 max-w-maxContent">
        <h2 data-reveal className="text-center text-3xl font-semibold tracking-tight text-white lg:text-4xl">
          Your <HighlightText text={"Learning Journey"} />
        </h2>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute top-7 left-0 hidden h-px w-full bg-gradient-to-r from-transparent via-white/[0.14] to-transparent lg:block" />

          {steps.map((s, i) => (
            <div key={i} data-reveal className="relative flex flex-col items-center gap-4 text-center">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.1] bg-richblack-800 text-yellow-50 shadow-[0_0_20px_rgba(255,214,10,0.1)]">
                <s.icon className="text-lg" />
              </div>
              <h3 className="text-[15px] font-semibold text-richblack-5">{s.title}</h3>
              <p className="max-w-[200px] text-[13px] leading-6 text-richblack-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningJourney;
