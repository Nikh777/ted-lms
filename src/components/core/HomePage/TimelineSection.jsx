import React from "react";
import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const TimeLine = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-16 mb-20 items-center">

        {/* Timeline list */}
        <div className="lg:w-[45%] flex flex-col gap-2">
          {TimeLine.map((ele, i) => (
            <div className="flex flex-col" key={i}>
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex justify-center items-center shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                  <img src={ele.Logo} alt={ele.Heading} className="w-6 h-6" />
                </div>
                <div className="pt-1">
                  <h2 className="font-semibold text-[16px] text-richblack-700 leading-snug">
                    {ele.Heading}
                  </h2>
                  <p className="text-[14px] text-richblack-600 mt-0.5 leading-5">
                    {ele.Description}
                  </p>
                </div>
              </div>
              {TimeLine.length - 1 !== i && (
                <div className="hidden lg:block h-10 border-l border-dashed border-richblack-200 ml-6 my-1" />
              )}
            </div>
          ))}
        </div>

        {/* Image with stats */}
        <div className="relative w-fit h-fit">
          <div className="absolute inset-0 rounded-xl bg-blue-200/10 blur-2xl -m-4 pointer-events-none" />
          <img
            src={TimeLineImage}
            alt="Timeline"
            className="relative shadow-[20px_20px_0px_0px_#ffffff] object-cover h-[400px] lg:h-fit rounded-sm"
          />
          {/* Stats bar */}
          <div className="absolute left-[50%] bottom-0 -translate-x-1/2 translate-y-[50%] flex flex-col lg:flex-row bg-caribbeangreen-700 text-white uppercase">
            <div className="flex gap-4 items-center lg:border-r border-caribbeangreen-300 px-8 py-6 lg:py-8">
              <h1 className="text-3xl font-bold w-[48px]">10</h1>
              <h1 className="text-caribbeangreen-300 text-[12px] leading-4 w-[64px] uppercase font-medium">
                Years experiences
              </h1>
            </div>
            <div className="flex gap-4 items-center px-8 py-6 lg:py-8">
              <h1 className="text-3xl font-bold w-[48px]">250</h1>
              <h1 className="text-caribbeangreen-300 text-[12px] leading-4 w-[64px] uppercase font-medium">
                Types of courses
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
