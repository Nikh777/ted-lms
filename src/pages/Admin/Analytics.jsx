import React from "react"
import Charts from "../../components/admin/Charts"

const Analytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-richblack-5">Analytics</h1>
        <p className="mt-1 text-sm text-richblack-300">
          Revenue charts and course performance analytics.
        </p>
      </div>

      <Charts title="Revenue Charts" />
      <Charts title="Course Analytics" />
    </div>
  )
}

export default Analytics
