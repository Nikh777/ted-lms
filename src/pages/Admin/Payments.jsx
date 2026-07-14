import React from "react"
import PaymentTable from "../../components/admin/PaymentTable"

const Payments = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-richblack-5">Payments</h1>
        <p className="mt-1 text-sm text-richblack-300">Course purchase and revenue history.</p>
      </div>

      <PaymentTable />
    </div>
  )
}

export default Payments
