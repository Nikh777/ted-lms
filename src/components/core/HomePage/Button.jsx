import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`
          group relative inline-flex items-center justify-center
          text-center text-[13px] sm:text-[15px] px-6 py-[11px]
          rounded-xl font-semibold tracking-tight
          transition-all duration-200 ease-out
          overflow-hidden cursor-pointer
          ${
            active
              ? "bg-yellow-50 text-richblack-900 hover:bg-yellow-25 shadow-[0_0_24px_rgba(255,214,10,0.18)] hover:shadow-[0_0_32px_rgba(255,214,10,0.32)] hover:scale-[1.02] active:scale-[0.98]"
              : "bg-white/[0.03] backdrop-blur-xl text-richblack-100 border border-white/[0.08] hover:border-cyan-400/30 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:scale-[1.02] active:scale-[0.98]"
          }
        `}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
