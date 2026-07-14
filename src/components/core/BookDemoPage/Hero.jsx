import React from "react";
import HighlightText from "../HomePage/HighlightText";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-28 pb-16">
      <div className="pointer-events-none absolute top-10 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-yellow-50/[0.06] blur-[130px]" />
      <div className="pointer-events-none absolute top-48 right-16 h-[240px] w-[240px] rounded-full bg-blue-500/[0.06] blur-[100px]" />

      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center gap-6 text-center text-white">
        <h1 data-reveal className="max-w-3xl text-4xl font-bold leading-[1.15] tracking-tight lg:text-5xl">
          See Vaini in Action —
          <HighlightText text={"Book a Live Demo"} />
        </h1>
        <p data-reveal className="max-w-xl text-base leading-7 text-richblack-300">
          Get a personalized walkthrough of the platform with our team and see
          exactly how Vaini can work for you or your organization.
        </p>
      </div>
    </section>
  );
};

export default Hero;
