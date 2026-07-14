import React from "react";
import HighlightText from "../HomePage/HighlightText";
import { FaCheckCircle } from "react-icons/fa";

const benefits = [
  "Full walkthrough of course creation & learning tools",
  "See analytics and progress-tracking dashboards live",
  "Understand pricing and plans for teams of any size",
  "Get your specific questions answered by a real person",
];

const Benefits = () => {
  return (
    <section className="bg-richblack-900 py-16">
      <div className="mx-auto w-11/12 max-w-maxContent lg:w-[70%]">
        <h2 data-reveal className="text-center text-3xl font-semibold tracking-tight text-white lg:text-4xl">
          What You'll <HighlightText text={"Get"} />
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <div
              key={i}
              data-reveal
              className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-richblack-800/50 p-5 backdrop-blur-sm"
            >
              <FaCheckCircle className="mt-0.5 shrink-0 text-caribbeangreen-100" />
              <p className="text-[14px] leading-6 text-richblack-200">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
