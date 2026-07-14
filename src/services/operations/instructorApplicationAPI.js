import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { instructorApplicationEndpoints } from "../apis"

const { APPLY_INSTRUCTOR_API, GET_INSTRUCTOR_APPLICATION_API } =
  instructorApplicationEndpoints

export const submitInstructorApplication = async (data, token) => {
  const toastId = toast.loading("Submitting application...")

  try {
    const response = await apiConnector("POST", APPLY_INSTRUCTOR_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success(response.data.message)
    return response.data
  } catch (error) {
    const message =
      error.response?.data?.message || "Unable to submit instructor application"
    toast.error(message)
    return { success: false, message }
  } finally {
    toast.dismiss(toastId)
  }
}

export const getInstructorApplication = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      GET_INSTRUCTOR_APPLICATION_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    return response.data
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Unable to fetch instructor application",
    }
  }
}
