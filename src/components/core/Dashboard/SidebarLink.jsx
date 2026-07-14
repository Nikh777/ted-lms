import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const active = matchRoute(link.path)

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={active ? "sidebar-link-active" : "sidebar-link-inactive"}
    >
      <div className="flex items-center gap-x-2.5">
        {/* Icon Goes Here */}
        <Icon className={`text-lg ${active ? "text-cyan-300" : ""}`} />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}