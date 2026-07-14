import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

import Hero from "../components/core/LearnMorePage/Hero";
import WhyVaini from "../components/core/LearnMorePage/WhyVaini";
import LearningJourney from "../components/core/LearnMorePage/LearningJourney";
import PlatformFeatures from "../components/core/LearnMorePage/PlatformFeatures";
import Statistics from "../components/core/LearnMorePage/Statistics";
import Categories from "../components/core/LearnMorePage/Categories";
import FeaturedCourses from "../components/core/LearnMorePage/FeaturedCourses";
import Testimonials from "../components/core/LearnMorePage/Testimonials";
import FAQs from "../components/core/LearnMorePage/FAQs";
import BecomeInstructorCTA from "../components/core/LearnMorePage/BecomeInstructorCTA";
import Footer from "../components/common/Footer";

const LearnMore = () => {
  const containerRef = useScrollReveal("[data-reveal]", { stagger: 0.08 });

  return (
    <div ref={containerRef} className="bg-richblack-900">
      <Hero />
      <WhyVaini />
      <LearningJourney />
      <PlatformFeatures />
      <Statistics />
      <Categories />
      <FeaturedCourses />
      <Testimonials />
      <FAQs />
      <BecomeInstructorCTA />
      <Footer />
    </div>
  );
};

export default LearnMore;
