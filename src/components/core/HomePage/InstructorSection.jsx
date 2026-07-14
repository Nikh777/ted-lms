import React from "react";
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";

const InstructorSection = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-16 items-center">

        {/* Image Side */}
        <div className="lg:w-[50%] relative">
          <div className="absolute inset-0 -m-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent blur-2xl pointer-events-none" />
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]">
            <img
              src={Instructor}
              alt="Instructor"
              className="w-full shadow-[-16px_-16px_0_0] shadow-yellow-50/80 rounded-2xl"
            />
          </div>
        </div>

        {/* Content Side */}
        <div className="lg:w-[50%] flex flex-col gap-8">
          <h1 className="text-4xl font-semibold leading-tight">
            Become an
            <HighlightText text="instructor" />
          </h1>

          <p className="text-[15px] leading-7 text-richblack-300 w-[90%]">
            Instructors from around the world teach millions of students on
            TED. We provide the tools and skills to teach what you
            love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto="/signup">
              <div className="flex items-center gap-3">
                Start Teaching Today
                <FaArrowRight className="text-xs" />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
