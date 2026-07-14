import React from "react"

const InstructorTable = ({
  instructors = [],
  type = "approved",
  onApprove,
  onReject,
}) => {
  const isRequestTable = type === "requests"
  const emptyMessage = isRequestTable
    ? "No pending instructor applications."
    : "No instructors available."

  return (
    <div className="table-glass-wrap overflow-x-auto">
      <table className="table-glass min-w-[980px]">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {isRequestTable && <th>Resume</th>}
            <th>Experience</th>
            {isRequestTable && <th>LinkedIn</th>}
            {isRequestTable && <th>Portfolio</th>}
            <th>Status</th>
            {isRequestTable && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {instructors.length === 0 ? (
            <tr>
              <td className="px-5 py-6 text-richblack-400" colSpan={isRequestTable ? "8" : "4"}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            instructors.map((instructor) => (
              <tr key={instructor._id || instructor.email || instructor.user?.email}>
                <td className="font-medium text-richblack-5">
                  {instructor.name ||
                    `${instructor.firstName || ""} ${instructor.lastName || ""}`.trim() ||
                    `${instructor.user?.firstName || ""} ${
                      instructor.user?.lastName || ""
                    }`}
                </td>
                <td>
                  {instructor.email || instructor.user?.email}
                </td>
                {isRequestTable && (
                  <td>
                    <a
                      href={instructor.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2 transition-colors"
                    >
                      View
                    </a>
                  </td>
                )}
                <td>{instructor.experience || "N/A"}</td>
                {isRequestTable && (
                  <td>
                    {instructor.linkedin ? (
                      <a
                        href={instructor.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2 transition-colors"
                      >
                        LinkedIn
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                )}
                {isRequestTable && (
                  <td>
                    {instructor.portfolio ? (
                      <a
                        href={instructor.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2 transition-colors"
                      >
                        Portfolio
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                )}
                <td>
                  <span className={(instructor.status || "Approved") === "Approved" ? "chip-success" : "chip-warning"}>
                    <span className="chip-dot" />
                    {instructor.status || "Approved"}
                  </span>
                </td>
                {isRequestTable && (
                  <td>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onApprove(instructor._id)}
                        className="rounded-lg bg-caribbeangreen-100/10 border border-caribbeangreen-100/30 px-3 py-1.5 text-xs font-semibold text-caribbeangreen-50 transition-all duration-300 hover:scale-[1.03] hover:bg-caribbeangreen-100/20 hover:shadow-[0_0_16px_rgba(6,214,160,0.2)]"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => onReject(instructor._id)}
                        className="rounded-lg bg-pink-200/10 border border-pink-200/30 px-3 py-1.5 text-xs font-semibold text-pink-100 transition-all duration-300 hover:scale-[1.03] hover:bg-pink-200/20 hover:shadow-[0_0_16px_rgba(239,71,111,0.2)]"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default InstructorTable
