import React from "react";
import HighlightText from "../HomePage/HighlightText";
import { FaRegEdit, FaCalendarCheck, FaVideo } from "react-icons/fa";

const steps = [
  { icon: FaRegEdit, title: "Fill the Form", desc: "Tell us a little about you and your goals." },
  { icon: FaCalendarCheck, title: "Pick a Slot", desc: "Choose your preferred date and time." },
  { icon: FaVideo, title: "Join the Call", desc: "We'll send a link and walk you through everything." },
];

const HowItWorks = () => {
  return (
    <section className="bg-richblack-900 py-16">
      <div className="mx-auto w-11/12 max-w-maxContent">
        <h2 data-reveal className="text-center text-3xl font-semibold tracking-tight text-white lg:text-4xl">
          How the <HighlightText text={"Demo Works"} />
        </h2>

        <div className="relative mt-14 grid gap-10 sm:grid-cols-3">
          <div className="pointer-events-none absolute top-7 left-0 hidden h-px w-full bg-gradient-to-r from-transparent via-white/[0.14] to-transparent sm:block" />
          {steps.map((s, i) => (
            <div key={i} data-reveal className="relative flex flex-col items-center gap-4 text-center">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.1] bg-richblack-800 text-yellow-50">
                <s.icon className="text-lg" />
              </div>
              <h3 className="text-[15px] font-semibold text-richblack-5">{s.title}</h3>
              <p className="max-w-[220px] text-[13px] leading-6 text-richblack-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
