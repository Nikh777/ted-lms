import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-r from-[#60a5fa] via-[#38bdf8] to-[#34d399] text-transparent bg-clip-text font-bold">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;
