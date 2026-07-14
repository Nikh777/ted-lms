import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaGlobe, FaFileUpload } from "react-icons/fa";
import {
  submitInstructorApplication,
  getMyApplication,
} from "../services/operations/instructorAPI";

const STATUS_UI = {
  Pending: {
    color: "text-yellow-50",
    bg: "bg-yellow-50/10 border-yellow-50/20",
    label: "Application Pending",
    message:
      "Your application is under review. We will notify you once the Admin has made a decision.",
  },
  Approved: {
    color: "text-caribbeangreen-100",
    bg: "bg-caribbeangreen-100/10 border-caribbeangreen-100/20",
    label: "Application Approved 🎉",
    message:
      "Congratulations! Your application has been approved. Please log out and log back in to access your Instructor Dashboard.",
  },
  Rejected: {
    color: "text-pink-200",
    bg: "bg-pink-200/10 border-pink-200/20",
    label: "Application Rejected",
    message:
      "Unfortunately your application was not approved. Please contact support for more information.",
  },
};

const BecomeInstructor = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const [existingApplication, setExistingApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    linkedin: "",
    portfolio: "",
    experience: "",
    about: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState("");

  // Redirect if already Instructor or Admin
  useEffect(() => {
    if (user?.accountType === "Instructor" || user?.accountType === "Admin") {
      navigate("/dashboard/instructor", { replace: true });
      return;
    }
    // Fetch existing application
    (async () => {
      const app = await getMyApplication(token);
      setExistingApplication(app);
      setLoading(false);
    })();
  }, [user, token, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(file.type)) {
      setResumeError("Only PDF, JPG, or PNG files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setResumeError("File size must be under 5MB.");
      return;
    }
    setResumeError("");
    setResumeFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setResumeError("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("linkedin", form.linkedin);
    formData.append("portfolio", form.portfolio);
    formData.append("experience", form.experience);
    formData.append("about", form.about);

    setSubmitting(true);
    const result = await submitInstructorApplication(formData, token);
    setSubmitting(false);

    if (result?.success) {
      setExistingApplication(result.application);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  // Show status card if application already exists
  if (existingApplication) {
    const ui = STATUS_UI[existingApplication.status];
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold text-richblack-5">
          Become an Instructor
        </h1>
        <div className={`rounded-2xl border p-8 ${ui.bg}`}>
          <p className={`text-xl font-semibold ${ui.color} mb-3`}>{ui.label}</p>
          <p className="text-richblack-200 leading-7">{ui.message}</p>

          {existingApplication.status === "Pending" && (
            <div className="mt-6 grid gap-2 text-sm text-richblack-300">
              <p>
                <span className="text-richblack-100 font-medium">LinkedIn: </span>
                <a
                  href={existingApplication.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-300 underline"
                >
                  {existingApplication.linkedin}
                </a>
              </p>
              <p>
                <span className="text-richblack-100 font-medium">Experience: </span>
                {existingApplication.experience} year
                {existingApplication.experience !== 1 ? "s" : ""}
              </p>
              <p>
                <span className="text-richblack-100 font-medium">Status: </span>
                <span className={`font-semibold ${ui.color}`}>
                  {existingApplication.status}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Application Form
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-richblack-5 mb-2">
          Become an Instructor
        </h1>
        <p className="text-richblack-300 text-[15px] leading-7">
          Share your expertise with millions of students worldwide. Fill in the
          details below and our team will review your application.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Resume Upload */}
        <div className="flex flex-col gap-2">
          <label className="lable-style">
            Resume <sup className="text-pink-200">*</sup>
          </label>
          <div
            className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 cursor-pointer transition-all duration-200
              ${resumeFile ? "border-caribbeangreen-300 bg-caribbeangreen-300/5" : "border-richblack-600 hover:border-richblack-400 bg-richblack-800"}
            `}
            onClick={() => document.getElementById("resumeInput").click()}
          >
            <FaFileUpload className={`text-3xl ${resumeFile ? "text-caribbeangreen-300" : "text-richblack-400"}`} />
            {resumeFile ? (
              <p className="text-caribbeangreen-300 font-medium text-sm">{resumeFile.name}</p>
            ) : (
              <>
                <p className="text-richblack-200 font-medium text-sm">
                  Click to upload resume
                </p>
                <p className="text-richblack-400 text-xs">PDF, JPG or PNG · Max 5MB</p>
              </>
            )}
            <input
              id="resumeInput"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleResumeChange}
            />
          </div>
          {resumeError && (
            <p className="text-pink-200 text-xs mt-1">{resumeError}</p>
          )}
        </div>

        {/* LinkedIn */}
        <div className="flex flex-col gap-2">
          <label className="lable-style">
            LinkedIn Profile URL <sup className="text-pink-200">*</sup>
          </label>
          <div className="relative">
            <FaLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-richblack-400" />
            <input
              type="url"
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              required
              placeholder="https://linkedin.com/in/yourprofile"
              className="form-style w-full pl-10"
            />
          </div>
        </div>

        {/* Portfolio */}
        <div className="flex flex-col gap-2">
          <label className="lable-style">Portfolio / GitHub URL</label>
          <div className="relative">
            <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-richblack-400" />
            <input
              type="url"
              name="portfolio"
              value={form.portfolio}
              onChange={handleChange}
              placeholder="https://yourportfolio.com"
              className="form-style w-full pl-10"
            />
          </div>
        </div>

        {/* Years of Experience */}
        <div className="flex flex-col gap-2">
          <label className="lable-style">
            Years of Experience <sup className="text-pink-200">*</sup>
          </label>
          <select
            name="experience"
            value={form.experience}
            onChange={handleChange}
            required
            className="form-style w-full cursor-pointer"
          >
            <option value="">Select experience</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((y) => (
              <option key={y} value={y}>
                {y} year{y !== 1 ? "s" : ""}
              </option>
            ))}
            <option value="11">10+ years</option>
          </select>
        </div>

        {/* About */}
        <div className="flex flex-col gap-2">
          <label className="lable-style">
            About Yourself <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Describe your expertise, teaching style, and what you plan to teach..."
            className="form-style w-full resize-none"
          />
          <p className="text-richblack-400 text-xs text-right">
            {form.about.length} / 1000
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="yellowButton mt-2 w-full py-3 text-[15px] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default BecomeInstructor;
