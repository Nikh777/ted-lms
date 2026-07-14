import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { adminEndpoints } from "../apis"

const {
  ADMIN_APPROVE_INSTRUCTOR_API,
  ADMIN_DASHBOARD_API,
  ADMIN_REJECT_INSTRUCTOR_API,
  ADMIN_REQUESTS_API,
  ADMIN_USERS_API,
} = adminEndpoints

const authHeader = (token) => ({
  Authorization: `Bearer ${token}`,
})

export const getAdminDashboard = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      ADMIN_DASHBOARD_API,
      null,
      authHeader(token)
    )

    return response.data
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Unable to fetch dashboard data",
    }
  }
}

export const getAdminUsers = async (token) => {
  try {
    const response = await apiConnector("GET", ADMIN_USERS_API, null, authHeader(token))
    return response.data
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Unable to fetch users",
    }
  }
}

export const getInstructorRequests = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      ADMIN_REQUESTS_API,
      null,
      authHeader(token)
    )

    return response.data
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Unable to fetch instructor requests",
    }
  }
}

export const approveInstructorRequest = async (id, token) => {
  const toastId = toast.loading("Approving instructor...")

  try {
    const response = await apiConnector(
      "PATCH",
      `${ADMIN_APPROVE_INSTRUCTOR_API}/${id}`,
      null,
      authHeader(token)
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success(response.data.message)
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || "Unable to approve instructor"
    toast.error(message)
    return { success: false, message }
  } finally {
    toast.dismiss(toastId)
  }
}

export const rejectInstructorRequest = async (id, token) => {
  const toastId = toast.loading("Rejecting application...")

  try {
    const response = await apiConnector(
      "PATCH",
      `${ADMIN_REJECT_INSTRUCTOR_API}/${id}`,
      null,
      authHeader(token)
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success(response.data.message)
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || "Unable to reject application"
    toast.error(message)
    return { success: false, message }
  } finally {
    toast.dismiss(toastId)
  }
}
