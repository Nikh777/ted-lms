import React, { useEffect, useState } from "react"
import InstructorTable from "../../components/admin/InstructorTable"
import { apiConnector } from "../../services/apiconnector"
import { adminEndpoints } from "../../services/apis"

const { ADMIN_INSTRUCTORS_API } = adminEndpoints

const Instructors = () => {
  const [instructors, setInstructors] = useState([])

  useEffect(() => {
    const getInstructors = async () => {
      try {
        const token = localStorage.getItem("adminToken")

        const response = await apiConnector("GET", ADMIN_INSTRUCTORS_API, null, {
          Authorization: `Bearer ${token}`,
        })

        if (response.data.success) {
          setInstructors(response.data.data || [])
        }
      } catch (error) {
        console.log(error)
      }
    }

    getInstructors()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-richblack-5">Instructors</h1>
        <p className="mt-1 text-sm text-richblack-300">Approved instructors on TED.</p>
      </div>

      <InstructorTable instructors={instructors} type="approved" />
    </div>
  )
}

export default Instructors
