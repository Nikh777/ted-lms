import React from "react"
import TedLogo from "../common/TedLogo"

const AdminNavbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#0B0F19]/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TedLogo size="sm" />
          <p className="hidden text-[11px] font-semibold uppercase tracking-wider text-richblack-400 sm:block">Admin Console</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-richblack-5">Admin</p>
            <p className="text-xs text-richblack-400">Platform Manager</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] border border-cyan-400/30 font-semibold text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.18)]">
            A
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar
