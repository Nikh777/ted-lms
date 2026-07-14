import React from "react"
import { NavLink } from "react-router-dom"
import TedLogo from "../common/TedLogo"
import {
  FaBook,
  FaChartLine,
  FaChalkboardTeacher,
  FaCreditCard,
  FaHome,
  FaUser,
  FaUserCheck,
  FaUsers,
  FaCalendarCheck,
} from "react-icons/fa"

const adminLinks = [
  { name: "Dashboard", path: "/admin/dashboard", icon: FaHome },
  { name: "Users", path: "/admin/users", icon: FaUsers },
  { name: "Requests", path: "/admin/instructor-requests", icon: FaUserCheck },
  { name: "Instructors", path: "/admin/instructors", icon: FaChalkboardTeacher },
  { name: "Courses", path: "/admin/courses", icon: FaBook },
  { name: "Payments", path: "/admin/payments", icon: FaCreditCard },
  { name: "Demo Requests", path: "/admin/demo-requests", icon: FaCalendarCheck },
  { name: "Analytics", path: "/admin/analytics", icon: FaChartLine },
  { name: "Profile", path: "/admin/profile", icon: FaUser },
]

const AdminSidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/[0.08] bg-white/[0.02] backdrop-blur-xl lg:block">
      <div className="flex h-16 items-center gap-2 border-b border-white/[0.08] px-6">
        <TedLogo size="sm" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-richblack-400">
          Admin
        </span>
      </div>

      <nav className="space-y-1 px-3 py-5">
        {adminLinks.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-cyan-400/[0.12] to-transparent text-richblack-5 border border-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.08)]"
                  : "text-richblack-300 hover:bg-white/[0.04] hover:text-richblack-5"
              }`
            }
          >
            <Icon className="text-base" />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar
