import React from "react"

const UserTable = ({ users = [] }) => {
  return (
    <div className="table-glass-wrap">
      <table className="table-glass min-w-[720px]">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td className="px-5 py-6 text-richblack-400" colSpan="4">
                No users available.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id || user.email}>
                <td className="font-medium text-richblack-5">
                  {user.name || `${user.firstName || ""} ${user.lastName || ""}`}
                </td>
                <td>{user.email}</td>
                <td>{user.accountType}</td>
                <td>
                  <span className={(user.status || "Active") === "Active" ? "chip-success" : "chip-neutral"}>
                    <span className="chip-dot" />
                    {user.status || "Active"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
