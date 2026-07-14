import React from "react"

const Courses = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-richblack-5">Courses</h1>
        <p className="mt-1 text-sm text-richblack-300">All courses published on the platform.</p>
      </div>

      <div className="overflow-hidden rounded-lg border border-richblack-700">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-richblack-800 text-richblack-100">
            <tr>
              <th className="px-4 py-3 font-medium">Course</th>
              <th className="px-4 py-3 font-medium">Instructor</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-richblack-700 bg-richblack-900 text-richblack-300">
            <tr>
              <td className="px-4 py-5" colSpan="4">
                No courses available.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Courses
