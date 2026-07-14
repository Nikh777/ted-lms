import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "TED partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The TED curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "TED partners with more than 275+ leading universities and companies to bring hands-on, project-driven learning.",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Earn recognized certificates that showcase your skills to employers and peers around the world.",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Instant, consistent feedback on assignments so you always know exactly where you stand.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Graduate with a portfolio of real projects and the confidence to walk straight into the job market.",
  },
];

const LearningGrid = () => {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-4 xl:grid-cols-4">
      {LearningGridArray.map((card, i) => {
        const isFeature = card.order < 0
        return (
          <div
            key={i}
            className={`group rounded-2xl border border-white/[0.07] backdrop-blur-sm transition-all duration-300
              ${i === 0 && "xl:col-span-2"}
              ${card.order === 3 && "xl:col-start-2"}
              ${
                isFeature
                  ? "bg-gradient-to-br from-blue-500/[0.08] via-richblack-800/60 to-transparent"
                  : "bg-richblack-800/60 hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
              }
            `}
          >
            {isFeature ? (
              <div className="flex h-full flex-col justify-center gap-4 p-8">
                <div className="text-3xl font-semibold leading-tight text-richblack-5 lg:text-4xl">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-[15px] font-medium leading-6 text-richblack-300 lg:w-[90%]">
                  {card.description}
                </p>
                <div className="mt-2 w-fit">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col gap-4 p-8">
                <h1 className="text-[17px] font-semibold text-richblack-5">
                  {card.heading}
                </h1>
                <p className="text-[14px] font-medium leading-6 text-richblack-300">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
