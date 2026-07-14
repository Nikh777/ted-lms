import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown, BsShieldLock } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"
import TedLogo from "./TedLogo"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`fixed top-0 left-0 z-[999] flex h-16 w-full items-center justify-center
        border-b border-white/[0.07] backdrop-blur-xl transition-all duration-300
        ${location.pathname !== "/" ? "bg-richblack-900/95" : "bg-richblack-900/75"}
      `}
    >
      <div className="flex w-11/12 max-w-[1300px] items-center justify-between">

        {/* Logo */}
        <Link to="/" className="transition-all duration-300 hover:opacity-80">
          <TedLogo size="md" />
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-1 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-all duration-200
                      ${matchRoute("/catalog/:catalogName")
                        ? "text-yellow-50 bg-white/[0.06]"
                        : "text-richblack-100 hover:text-white hover:bg-white/[0.05]"
                      }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown className="text-[10px] transition-transform duration-200 group-hover:rotate-180" />

                    {/* Dropdown */}
                    <div className="invisible absolute left-1/2 top-full mt-3 z-[1000] w-[240px] -translate-x-1/2 translate-y-1 rounded-xl border border-white/[0.08] bg-richblack-800/[0.97] p-2 opacity-0 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                      <div className="absolute left-1/2 -top-[5px] h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-l border-t border-white/[0.08] bg-richblack-800" />
                      {loading ? (
                        <p className="px-3 py-2 text-sm text-richblack-300">Loading...</p>
                      ) : subLinks?.filter((s) => s?.courses?.length > 0).length > 0 ? (
                        subLinks
                          .filter((subLink) => subLink?.courses?.length > 0)
                          .map((subLink) => (
                            <Link
                              key={subLink._id}
                              to={`/catalog/${subLink.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")
                                .replace(/[^a-z0-9-]/g, "")}`}
                              className="block rounded-lg px-3 py-2.5 text-sm text-richblack-100 transition-all duration-150 hover:bg-white/[0.07] hover:text-white"
                            >
                              {subLink.name}
                            </Link>
                          ))
                      ) : (
                        <p className="px-3 py-2 text-sm text-richblack-300">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`rounded-lg px-3 py-2 text-sm transition-all duration-200
                        ${matchRoute(link?.path)
                          ? "text-yellow-50 bg-white/[0.06]"
                          : "text-richblack-100 hover:text-white hover:bg-white/[0.05]"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth / Cart */}
        <div className="hidden items-center gap-x-3 md:flex">
          {/* Admin Portal entry point */}
          <Link to="/admin/login">
            <button
              className="group relative flex items-center gap-1.5 overflow-hidden rounded-xl border border-violet-500/30
                bg-white/[0.03] px-3.5 py-[7px] text-sm font-medium text-richblack-200 backdrop-blur-md
                transition-all duration-300 ease-out
                hover:-translate-y-[1px] hover:border-violet-400/50 hover:text-white
                hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] active:scale-[0.97]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <BsShieldLock className="text-[15px] text-violet-300 transition-transform duration-300 group-hover:scale-110" />
              <span className="hidden lg:inline">Admin Portal</span>
            </button>
          </Link>

          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative p-2" aria-label={`Cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}>
              <AiOutlineShoppingCart className="text-[22px] text-richblack-200 transition-all duration-200 hover:text-white" aria-hidden="true" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-yellow-50 text-[9px] font-bold text-richblack-900">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-[7px] text-sm text-richblack-100 backdrop-blur-sm transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.08] hover:text-white">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="rounded-xl bg-yellow-50 px-4 py-[7px] text-sm font-semibold text-richblack-900 transition-all duration-200 hover:bg-yellow-25 hover:scale-[1.03] active:scale-[0.98]">
                Sign up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropdown />}
        </div>

        {/* Mobile Menu */}
        <button className="p-1 md:hidden" aria-label="Open menu">
          <AiOutlineMenu fontSize={22} fill="#AFB2BF" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default Navbar
