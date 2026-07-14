import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/Button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-28 pb-20">
      <div className="pointer-events-none absolute top-10 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/[0.08] blur-[130px]" />
      <div className="pointer-events-none absolute top-52 right-10 h-[260px] w-[260px] rounded-full bg-yellow-50/[0.05] blur-[100px]" />
      <div className="pointer-events-none absolute top-32 left-8 h-[220px] w-[220px] rounded-full bg-caribbeangreen-100/[0.06] blur-[100px]" />

      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center gap-7 text-center text-white">
        <div
          data-reveal
          className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-2 text-sm text-richblack-200 backdrop-blur-md"
        >
          <span>The complete platform tour</span>
          <FaArrowRight className="text-yellow-50 text-xs" />
        </div>

        <h1 data-reveal className="max-w-4xl text-4xl font-bold leading-[1.15] tracking-tight lg:text-6xl">
          Everything you need to
          <HighlightText text={"learn, teach and grow"} />
        </h1>

        <p data-reveal className="max-w-2xl text-base leading-7 text-richblack-300">
          Explore how Vaini brings together industry-ready courses, expert
          mentors and a supportive community — all in one modern learning
          platform built for real outcomes.
        </p>

        <div data-reveal className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <CTAButton active={true} linkto="/signup">
            Get Started Free
          </CTAButton>
          <Link
            to="/book-demo"
            className="rounded-xl border border-richblack-600 px-6 py-[11px] text-[15px] font-semibold text-richblack-100 transition-all duration-200 hover:scale-[1.03] hover:border-richblack-400 hover:bg-richblack-800"
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
