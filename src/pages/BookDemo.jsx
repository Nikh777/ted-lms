import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

import Hero from "../components/core/BookDemoPage/Hero";
import WhySchedule from "../components/core/BookDemoPage/WhySchedule";
import Benefits from "../components/core/BookDemoPage/Benefits";
import HowItWorks from "../components/core/BookDemoPage/HowItWorks";
import DemoBookingForm from "../components/core/BookDemoPage/DemoBookingForm";
import FAQs from "../components/core/BookDemoPage/FAQs";
import ContactSection from "../components/core/BookDemoPage/ContactSection";
import Footer from "../components/common/Footer";

const BookDemo = () => {
  const containerRef = useScrollReveal("[data-reveal]", { stagger: 0.08 });

  return (
    <div ref={containerRef} className="bg-richblack-900">
      <Hero />
      <WhySchedule />
      <Benefits />
      <HowItWorks />
      <DemoBookingForm />
      <FAQs />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default BookDemo;
