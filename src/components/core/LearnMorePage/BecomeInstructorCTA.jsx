import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import CTAButton from "../HomePage/Button";
import HighlightText from "../HomePage/HighlightText";

const BecomeInstructorCTA = () => {
  return (
    <section className="bg-richblack-900 py-20">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center gap-12 lg:flex-row">
        <div data-reveal className="relative lg:w-[50%]">
          <div className="pointer-events-none absolute inset-0 -m-4 rounded-2xl bg-gradient-to-br from-yellow-50/[0.08] to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]">
            <img src={Instructor} alt="Become an instructor" className="w-full object-cover" />
          </div>
        </div>

        <div data-reveal className="flex flex-col gap-5 lg:w-[50%]">
          <h2 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
            Become an <HighlightText text={"Instructor"} />
          </h2>
          <p className="text-[15px] leading-7 text-richblack-300">
            Instructors from around the world teach millions of learners on
            Vaini. We provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit">
            <CTAButton active={true} linkto="/signup">
              <div className="flex items-center gap-2">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructorCTA;
