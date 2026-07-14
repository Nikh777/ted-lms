import React from "react";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between flex-col lg:gap-12 gap-10`}>

      {/* Section 1 */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6">
        <div className="text-richblack-5 leading-tight">{heading}</div>

        <div className="text-richblack-300 text-[15px] leading-7 w-[90%]">
          {subheading}
        </div>

        <div className="flex gap-5 mt-4">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight className="text-xs" />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 — Code Block */}
      <div className="relative h-fit flex flex-row py-5 px-2 text-[10px] sm:text-sm leading-[18px] sm:leading-6 w-full lg:w-[470px] rounded-2xl border border-white/[0.08] bg-richblack-800/80 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.4)]">
        {backgroundGradient}

        {/* Line Numbers */}
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-600 font-mono text-[11px] pt-1 gap-[1px]">
          {Array.from({ length: 11 }, (_, i) => (
            <p key={i + 1} className="leading-6">{i + 1}</p>
          ))}
        </div>

        {/* Code */}
        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{ whiteSpace: "pre-line", display: "block" }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
