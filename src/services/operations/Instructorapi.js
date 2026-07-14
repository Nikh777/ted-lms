import { apiConnector } from "../apiconnector";
import { instructorEndpoints, adminInstructorEndpoints } from "../apis";
import toast from "react-hot-toast";

// ─── Student: Submit Application ─────────────────────────────────────────────

export const submitInstructorApplication = async (formData, token) => {
  const toastId = toast.loading("Submitting application...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      instructorEndpoints.APPLY_FOR_INSTRUCTOR_API,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response.data.message);
    result = response.data;
  } catch (error) {
    const msg =
      error?.response?.data?.message || error.message || "Something went wrong.";
    toast.error(msg);
  } finally {
    toast.dismiss(toastId);
  }
  return result;
};

// ─── Student: Get My Application Status ──────────────────────────────────────

export const getMyApplication = async (token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      instructorEndpoints.GET_MY_APPLICATION_API,
      null,
      { Authorization: `Bearer ${token}` }
    );
    if (response?.data?.success) {
      result = response.data.application;
    }
  } catch (error) {
    console.error("getMyApplication error:", error);
  }
  return result;
};

// ─── Admin: Get Pending Applications ─────────────────────────────────────────

export const getPendingApplications = async (token) => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      adminInstructorEndpoints.GET_PENDING_APPLICATIONS_API,
      null,
      { Authorization: `Bearer ${token}` }
    );
    if (response?.data?.success) {
      result = response.data.applications;
    }
  } catch (error) {
    console.error("getPendingApplications error:", error);
    toast.error("Could not fetch applications.");
  }
  return result;
};

// ─── Admin: Approve Application ───────────────────────────────────────────────

export const approveInstructorApplication = async (applicationId, token) => {
  const toastId = toast.loading("Approving...");
  let success = false;
  try {
    const response = await apiConnector(
      "PATCH",
      `${adminInstructorEndpoints.APPROVE_APPLICATION_API}/${applicationId}`,
      null,
      { Authorization: `Bearer ${token}` }
    );
    if (!response?.data?.success) throw new Error(response?.data?.message);
    toast.success("Application approved.");
    success = true;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not approve.");
  } finally {
    toast.dismiss(toastId);
  }
  return success;
};

// ─── Admin: Reject Application ────────────────────────────────────────────────

export const rejectInstructorApplication = async (applicationId, token) => {
  const toastId = toast.loading("Rejecting...");
  let success = false;
  try {
    const response = await apiConnector(
      "PATCH",
      `${adminInstructorEndpoints.REJECT_APPLICATION_API}/${applicationId}`,
      null,
      { Authorization: `Bearer ${token}` }
    );
    if (!response?.data?.success) throw new Error(response?.data?.message);
    toast.success("Application rejected.");
    success = true;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not reject.");
  } finally {
    toast.dismiss(toastId);
  }
  return success;
};

// ─── Admin: Get Pending Count ─────────────────────────────────────────────────

export const getPendingCount = async (token) => {
  let count = 0;
  try {
    const response = await apiConnector(
      "GET",
      adminInstructorEndpoints.GET_PENDING_COUNT_API,
      null,
      { Authorization: `Bearer ${token}` }
    );
    if (response?.data?.success) count = response.data.count;
  } catch (error) {
    console.error("getPendingCount error:", error);
  }
  return count;
};