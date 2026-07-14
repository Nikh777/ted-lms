import { useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  // console.log("All Course ", courses)

  return (
    <>
      <Table className="glass-panel overflow-hidden">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-2xl border-b border-white/[0.08] bg-white/[0.03] px-6 py-3 backdrop-blur-md">
            <Th className="flex-1 text-left text-[11px] font-semibold uppercase tracking-wider text-richblack-300">
              Courses
            </Th>
            <Th className="text-left text-[11px] font-semibold uppercase tracking-wider text-richblack-300">
              Duration
            </Th>
            <Th className="text-left text-[11px] font-semibold uppercase tracking-wider text-richblack-300">
              Price
            </Th>
            <Th className="text-left text-[11px] font-semibold uppercase tracking-wider text-richblack-300">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-10 border-b border-white/[0.05] px-6 py-8 transition-colors duration-200 hover:bg-white/[0.03]"
              >
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[220px] rounded-xl object-cover border border-white/[0.08]"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-richblack-400">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <span className="chip-neutral w-fit">
                        <HiClock size={14} />
                        Drafted
                      </span>
                    ) : (
                      <span className="chip-success w-fit">
                        <span className="chip-dot" />
                        Published
                      </span>
                    )}
                  </div>
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  2hr 30min
                </Td>
                <Td className="text-sm font-semibold text-richblack-5">
                  ₹{course.price}
                </Td>
                <Td className="text-sm font-medium text-richblack-100 ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }}
                    title="Edit"
                    className="rounded-lg p-2 transition-all duration-300 hover:scale-110 hover:bg-caribbeangreen-100/10 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="rounded-lg p-2 transition-all duration-300 hover:scale-110 hover:bg-pink-200/10 hover:text-[#ff4d6d]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}