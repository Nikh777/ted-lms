import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="relative mx-auto w-full max-w-2xl rounded-2xl border border-white/[0.07] bg-richblack-800/50 p-8 backdrop-blur-sm sm:p-10">
      <div className="pointer-events-none absolute -top-10 right-0 h-[200px] w-[200px] rounded-full bg-yellow-50/[0.05] blur-[90px]" />
      <div className="relative">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-richblack-5 lg:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-3 text-center text-[15px] text-richblack-300">
          We'd love to hear from you. Please fill out this form.
        </p>
        <div className="mx-auto mt-10">
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;
