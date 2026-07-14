import React, { useState } from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../../../services/apiconnector";
import { demoEndpoints } from "../../../services/apis";

const initialState = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  role: "",
  teamSize: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

const teamSizeOptions = ["Just me", "2-10", "11-50", "51-200", "200+"];

const DemoBookingForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in your name, email and phone number.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Submitting your demo request...");

    try {
      const res = await apiConnector("POST", demoEndpoints.BOOK_DEMO_API, formData);

      if (res?.data?.success) {
        toast.success("Demo request submitted! We'll be in touch shortly.");
        setFormData(initialState);
      } else {
        toast.error(res?.data?.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log("BOOK DEMO ERROR =", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  return (
    <section className="bg-transparent py-16">
      <div className="mx-auto w-11/12 max-w-2xl">
        <div
          data-reveal
          className="relative rounded-3xl border-t border-l border-white/10 border-b border-r border-white/[0.04] bg-white/[0.03] backdrop-blur-xl p-8 sm:p-10"
        >
          <div className="pointer-events-none absolute -top-10 right-0 h-[200px] w-[200px] rounded-full bg-cyan-400/[0.08] blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-[220px] w-[220px] rounded-full bg-violet-400/[0.06] blur-[100px]" />

          <div className="relative">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-richblack-5 lg:text-3xl">
              Book Your Demo
            </h2>
            <p className="mt-2 text-center text-[14px] text-richblack-300">
              Fill out the form below and we'll reach out to confirm your slot.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-5">
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="name" className="lable-style">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="form-style"
                    required
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="email" className="lable-style">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="form-style"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="phone" className="lable-style">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 12345 67890"
                    className="form-style"
                    required
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="organization" className="lable-style">Organization</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Company / School name"
                    className="form-style"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="role" className="lable-style">Your Role</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g. HR Manager, Teacher"
                    className="form-style"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="teamSize" className="lable-style">Team Size</label>
                  <select
                    id="teamSize"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    className="form-style"
                  >
                    <option value="">Select team size</option>
                    {teamSizeOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="preferredDate" className="lable-style">Preferred Date</label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="form-style"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="preferredTime" className="lable-style">Preferred Time</label>
                  <input
                    type="time"
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="form-style"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="lable-style">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Anything specific you'd like us to cover?"
                  className="form-style"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-fit rounded-xl bg-yellow-50 px-7 py-3 text-center text-[14px] font-semibold text-richblack-900 shadow-[0_0_24px_rgba(255,214,10,0.18)] transition-all duration-200 hover:bg-yellow-25 hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(255,214,10,0.28)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:text-[15px]"
              >
                {loading ? "Submitting..." : "Book My Demo"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoBookingForm;
