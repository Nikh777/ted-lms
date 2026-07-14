import React from "react"

const StatsCard = ({ title, value, description }) => {
  return (
    <div className="glass-card p-5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-richblack-300">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-richblack-5 bg-gradient-to-r from-white to-richblack-100 bg-clip-text">
        {value}
      </p>
      {description && <p className="mt-2 text-xs text-richblack-400">{description}</p>}
    </div>
  )
}

export default StatsCard
