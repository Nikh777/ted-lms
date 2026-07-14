import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import HighlightText from "../HomePage/HighlightText";

const faqs = [
  {
    q: "Do I get lifetime access to a course after purchase?",
    a: "Yes — once you enroll in a course, you get lifetime access to all its videos, resources, and future updates.",
  },
  {
    q: "Are the certificates recognized by employers?",
    a: "Our certificates showcase verified project work and skills, and are widely accepted as proof of practical ability by hiring teams.",
  },
  {
    q: "Can I switch between courses or get a refund?",
    a: "Yes, we offer a 7-day refund window on most courses if you feel it isn't the right fit.",
  },
  {
    q: "Do you offer support if I get stuck?",
    a: "Absolutely — you can reach mentors through live doubt sessions and our 24/7 support team.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-richblack-900 py-20">
      <div className="mx-auto w-11/12 max-w-maxContent lg:w-[70%]">
        <h2 data-reveal className="text-center text-3xl font-semibold tracking-tight text-white lg:text-4xl">
          Frequently Asked <HighlightText text={"Questions"} />
        </h2>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                data-reveal
                className="overflow-hidden rounded-2xl border border-white/[0.07] bg-richblack-800/50 backdrop-blur-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-semibold text-richblack-5">{item.q}</span>
                  <BsChevronDown
                    className={`shrink-0 text-richblack-300 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-yellow-50" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-[13px] leading-6 text-richblack-300">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
