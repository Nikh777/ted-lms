import React, { useEffect, useState } from "react"
import InstructorTable from "../../components/admin/InstructorTable"
import { apiConnector } from "../../services/apiconnector"
import { adminEndpoints } from "../../services/apis"

const {
  ADMIN_APPROVE_INSTRUCTOR_API,
  ADMIN_REJECT_INSTRUCTOR_API,
  ADMIN_REQUESTS_API,
} = adminEndpoints

const InstructorRequests = () => {
  const [requests, setRequests] = useState([])

  const getRequests = async () => {
    try {
      const token = localStorage.getItem("adminToken")

      const response = await apiConnector("GET", ADMIN_REQUESTS_API, null, {
        Authorization: `Bearer ${token}`,
      })

      if (response.data.success) {
        setRequests(response.data.data || response.data.requests || [])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRequests()
  }, [])

  const removeRequest = (id) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== id)
    )
  }

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("adminToken")

      const response = await apiConnector(
        "PATCH",
        `${ADMIN_APPROVE_INSTRUCTOR_API}/${id}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (response.data.success) {
        removeRequest(id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("adminToken")

      const response = await apiConnector(
        "PATCH",
        `${ADMIN_REJECT_INSTRUCTOR_API}/${id}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (response.data.success) {
        removeRequest(id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-richblack-5">
          Instructor Requests
        </h1>

        <p className="mt-1 text-sm text-richblack-300">
          Pending instructor applications awaiting review.
        </p>
      </div>

      <InstructorTable
        instructors={requests}
        type="requests"
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  )
}

export default InstructorRequests
