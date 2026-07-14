import React from "react";
import { FaCheck, FaTrash } from "react-icons/fa";

const DemoRequestTable = ({ requests = [], onMarkCompleted, onDelete }) => {
  return (
    <div className="table-glass-wrap overflow-x-auto">
      <table className="table-glass min-w-[900px]">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Organization</th>
            <th>Preferred Slot</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td className="px-5 py-6 text-richblack-400" colSpan="7">
                No demo requests yet.
              </td>
            </tr>
          ) : (
            requests.map((req) => (
              <tr key={req._id}>
                <td className="font-medium text-richblack-5">{req.name}</td>
                <td>{req.email}</td>
                <td>{req.phone}</td>
                <td>{req.organization || "-"}</td>
                <td>
                  {req.preferredDate || "-"} {req.preferredTime ? `· ${req.preferredTime}` : ""}
                </td>
                <td>
                  <span className={req.status === "Completed" ? "chip-success" : "chip-warning"}>
                    <span className="chip-dot" />
                    {req.status}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    {req.status !== "Completed" && (
                      <button
                        type="button"
                        onClick={() => onMarkCompleted(req._id)}
                        title="Mark as completed"
                        className="rounded-lg p-2 text-caribbeangreen-100 border border-transparent transition-all duration-300 hover:border-caribbeangreen-100/30 hover:bg-caribbeangreen-100/10 hover:scale-[1.05]"
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onDelete(req._id)}
                      title="Delete request"
                      className="rounded-lg p-2 text-pink-200 border border-transparent transition-all duration-300 hover:border-pink-200/30 hover:bg-pink-200/10 hover:scale-[1.05]"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DemoRequestTable;
