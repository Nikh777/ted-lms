import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaLinkedin, FaGlobe, FaFileAlt, FaCheck, FaTimes } from "react-icons/fa";
import {
  getPendingApplications,
  approveInstructorApplication,
  rejectInstructorApplication,
} from "../services/operations/instructorAPI";

const InstructorRequests = () => {
  const { token } = useSelector((state) => state.auth);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // stores application id

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    const data = await getPendingApplications(token);
    setApplications(data);
    setLoading(false);
  };

  const handleApprove = async (appId) => {
    setActionLoading(appId);
    const success = await approveInstructorApplication(appId, token);
    if (success) {
      // Remove row instantly
      setApplications((prev) => prev.filter((a) => a._id !== appId));
    }
    setActionLoading(null);
  };

  const handleReject = async (appId) => {
    setActionLoading(appId);
    const success = await rejectInstructorApplication(appId, token);
    if (success) {
      setApplications((prev) => prev.filter((a) => a._id !== appId));
    }
    setActionLoading(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-richblack-5">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-richblack-5">
            Instructor Requests
          </h1>
          <p className="mt-1 text-richblack-300 text-sm">
            {applications.length} pending application
            {applications.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-richblack-800 py-24 text-center">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-richblack-100 font-semibold text-lg">
            No pending applications
          </p>
          <p className="text-richblack-400 text-sm mt-1">
            All instructor applications have been reviewed.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="rounded-2xl border border-white/[0.07] bg-richblack-800 p-6 transition-all duration-200 hover:border-white/[0.12]"
            >
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">

                {/* Left: User Info */}
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={
                      app.user?.image ||
                      `https://api.dicebear.com/5.x/initials/svg?seed=${app.user?.firstName} ${app.user?.lastName}`
                    }
                    alt={app.user?.firstName}
                    className="h-12 w-12 rounded-full object-cover ring-1 ring-white/10 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-richblack-5 truncate">
                      {app.user?.firstName} {app.user?.lastName}
                    </p>
                    <p className="text-richblack-400 text-sm truncate">
                      {app.user?.email}
                    </p>
                  </div>
                </div>

                {/* Center: Details */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-richblack-300 flex-1">
                  <div>
                    <span className="text-richblack-100 font-medium">Experience: </span>
                    {app.experience} yr{app.experience !== 1 ? "s" : ""}
                  </div>

                  <a
                    href={app.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    <FaLinkedin />
                    LinkedIn
                  </a>

                  {app.portfolio && (
                    <a
                      href={app.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-richblack-300 hover:text-richblack-100 transition-colors"
                    >
                      <FaGlobe />
                      Portfolio
                    </a>
                  )}

                  <a
                    href={app.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-yellow-50 hover:text-yellow-25 transition-colors"
                  >
                    <FaFileAlt />
                    Resume
                  </a>
                </div>

                {/* Right: Actions */}
                <div className="flex gap-3 flex-shrink-0">
                  <button
                    onClick={() => handleApprove(app._id)}
                    disabled={actionLoading === app._id}
                    className="flex items-center gap-2 rounded-xl bg-caribbeangreen-600 hover:bg-caribbeangreen-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaCheck />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(app._id)}
                    disabled={actionLoading === app._id}
                    className="flex items-center gap-2 rounded-xl bg-pink-600 hover:bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaTimes />
                    Reject
                  </button>
                </div>
              </div>

              {/* About */}
              <div className="mt-4 border-t border-white/[0.06] pt-4">
                <p className="text-sm text-richblack-100 font-medium mb-1">About</p>
                <p className="text-sm text-richblack-300 leading-6 line-clamp-3">
                  {app.about}
                </p>
              </div>

              {/* Applied date */}
              <p className="mt-3 text-xs text-richblack-500">
                Applied on{" "}
                {new Date(app.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorRequests;
