import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import HighlightText from "../HomePage/HighlightText";

const ContactSection = () => {
  return (
    <section className="bg-richblack-900 pb-20 pt-4">
      <div className="mx-auto w-11/12 max-w-maxContent">
        <div
          data-reveal
          className="flex flex-col items-center gap-6 rounded-2xl border border-white/[0.07] bg-richblack-800/50 p-10 text-center backdrop-blur-sm sm:flex-row sm:justify-between sm:text-left"
        >
          <div>
            <h3 className="text-xl font-semibold text-richblack-5">
              Prefer to <HighlightText text={"talk directly"} />?
            </h3>
            <p className="mt-2 text-[14px] text-richblack-300">
              Reach out and our team will get back to you within a day.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
              <span className="flex items-center justify-center gap-2 text-[13px] text-richblack-200 sm:justify-start">
                <FaEnvelope className="text-yellow-50" /> support@vaini.com
              </span>
              <span className="flex items-center justify-center gap-2 text-[13px] text-richblack-200 sm:justify-start">
                <FaPhoneAlt className="text-yellow-50" /> +91 98765 43210
              </span>
            </div>
          </div>

          <Link
            to="/contact"
            className="shrink-0 rounded-xl border border-richblack-600 px-6 py-[11px] text-[15px] font-semibold text-richblack-100 transition-all duration-200 hover:scale-[1.03] hover:border-richblack-400 hover:bg-richblack-800"
          >
            Go to Contact Page
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
