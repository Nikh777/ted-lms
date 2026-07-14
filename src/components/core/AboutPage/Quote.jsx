import React from "react"
import HighlightText from "../HomePage/HighlightText"

const Quote = () => {
  return (
    <div className="relative mx-auto max-w-4xl py-5 pb-16 text-center">
      <p className="text-xl font-semibold leading-relaxed text-richblack-100 md:text-[34px] md:leading-[1.4]">
        We are passionate about revolutionizing the way we learn. Our
        innovative platform <HighlightText text={"combines technology"} />,{" "}
        <span className="bg-gradient-to-r from-yellow-50 to-brown-50 bg-clip-text font-bold text-transparent">
          expertise
        </span>
        , and community to create an{" "}
        <span className="bg-gradient-to-r from-caribbeangreen-100 to-blue-100 bg-clip-text font-bold text-transparent">
          unparalleled educational experience.
        </span>
      </p>
    </div>
  )
}

export default Quote
