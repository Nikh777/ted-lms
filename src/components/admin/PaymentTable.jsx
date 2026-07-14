import React from "react"

const statusChip = (status) => {
  const s = (status || "").toLowerCase()
  if (s === "success" || s === "completed" || s === "paid") return "chip-success"
  if (s === "pending" || s === "processing") return "chip-warning"
  if (s === "failed" || s === "cancelled") return "chip-danger"
  return "chip-neutral"
}

const PaymentTable = ({ payments = [] }) => {
  return (
    <div className="table-glass-wrap">
      <table className="table-glass min-w-[780px]">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Student</th>
            <th>Course</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td className="px-5 py-6 text-richblack-400" colSpan="5">
                No payments available.
              </td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr key={payment._id || payment.paymentId}>
                <td className="font-mono text-xs text-richblack-300">{payment.paymentId}</td>
                <td className="font-medium text-richblack-5">{payment.studentName}</td>
                <td>{payment.courseName}</td>
                <td className="font-semibold text-richblack-5">₹{payment.amount}</td>
                <td>
                  <span className={statusChip(payment.status)}>
                    <span className="chip-dot" />
                    {payment.status}
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

export default PaymentTable
