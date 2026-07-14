import React from "react";
import HighlightText from "../HomePage/HighlightText";
import ReviewSlider from "../../common/ReviewSlider";

const Testimonials = () => {
  return (
    <section className="bg-richblack-900 py-20">
      <div className="mx-auto w-11/12 max-w-maxContent">
        <h2 data-reveal className="text-center text-3xl font-semibold tracking-tight text-white lg:text-4xl">
          Loved by <HighlightText text={"Learners Worldwide"} />
        </h2>
        <div data-reveal>
          <ReviewSlider />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
