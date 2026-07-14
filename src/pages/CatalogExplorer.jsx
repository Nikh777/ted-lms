import React, { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiSearch, FiX } from "react-icons/fi"
import { HiOutlineSparkles } from "react-icons/hi"

import Footer from "../components/common/Footer"
import CourseCard from "../components/core/Catalog/Course_Card"
import {
  getAllCourses,
  fetchCourseCategories,
} from "../services/operations/courseDetailsAPI"

// Spring config reused across every interactive motion element on this page
const SPRING = { type: "spring", stiffness: 260, damping: 24, mass: 0.6 }

const gridContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
}

const gridItemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING,
  },
  exit: { opacity: 0, y: -12, scale: 0.96, transition: { duration: 0.15 } },
}

const SORT_OPTIONS = [
  { key: "popular", label: "Most Popular" },
  { key: "priceLow", label: "Price: Low to High" },
  { key: "priceHigh", label: "Price: High to Low" },
]

function CatalogExplorer() {
  const [loading, setLoading] = useState(true)
  const [allCourses, setAllCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const [courseRes, categoryRes] = await Promise.all([
        getAllCourses(),
        fetchCourseCategories(),
      ])
      setAllCourses(Array.isArray(courseRes) ? courseRes : [])
      setCategories(Array.isArray(categoryRes) ? categoryRes : [])
      setLoading(false)
    })()
  }, [])

  const filteredCourses = useMemo(() => {
    let list = [...allCourses]

    if (activeCategory !== "all") {
      list = list.filter((course) => {
        const catId =
          typeof course?.category === "object"
            ? course?.category?._id
            : course?.category
        return catId === activeCategory
      })
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter((course) =>
        [course?.courseName, course?.courseDescription]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(q))
      )
    }

    if (sortBy === "priceLow") {
      list.sort((a, b) => (a?.price || 0) - (b?.price || 0))
    } else if (sortBy === "priceHigh") {
      list.sort((a, b) => (b?.price || 0) - (a?.price || 0))
    } else {
      list.sort(
        (a, b) =>
          (b?.studentsEnrolled?.length || 0) -
          (a?.studentsEnrolled?.length || 0)
      )
    }

    return list
  }, [allCourses, activeCategory, search, sortBy])

  return (
    <div className="pt-16 min-h-screen bg-richblack-900">
      {/* ============ Hero ============ */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-[380px] w-[380px] rounded-full bg-cyan-400/[0.08] blur-[120px]" />
        <div className="pointer-events-none absolute -top-10 right-1/4 h-[320px] w-[320px] rounded-full bg-violet-500/[0.08] blur-[120px]" />

        <div className="relative mx-auto flex w-11/12 max-w-[1300px] flex-col items-center gap-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-richblack-200 backdrop-blur-md">
            <HiOutlineSparkles className="text-cyan-300" />
            Full Course Catalog
          </div>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-richblack-5 lg:text-5xl">
            Explore every course, all in one place
          </h1>
          <p className="max-w-xl text-sm leading-6 text-richblack-300 lg:text-base">
            Search, filter, and sort through our entire library to find the
            exact course that fits your goals.
          </p>

          {/* Neon-aura search */}
          <div className="relative mt-2 w-full max-w-xl">
            <motion.div
              animate={{
                boxShadow: searchFocused
                  ? "0 0 0 4px rgba(34,211,238,0.12), 0 0 40px rgba(34,211,238,0.25)"
                  : "0 0 0 0px rgba(34,211,238,0)",
                borderColor: searchFocused
                  ? "rgba(34,211,238,0.55)"
                  : "rgba(255,255,255,0.08)",
              }}
              transition={SPRING}
              className="flex items-center gap-3 rounded-2xl border bg-white/[0.04] px-4 py-3.5 backdrop-blur-xl"
            >
              <FiSearch className="shrink-0 text-lg text-richblack-300" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search courses, topics, or skills..."
                className="w-full bg-transparent text-[15px] text-richblack-5 placeholder:text-richblack-400 outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="shrink-0 rounded-full p-1 text-richblack-300 transition-colors hover:bg-white/[0.08] hover:text-white"
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ============ Filters ============ */}
      <div className="sticky top-16 z-30 border-b border-white/[0.06] bg-richblack-900/85 backdrop-blur-xl">
        <div className="mx-auto flex w-11/12 max-w-[1300px] flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Category pills — glassmorphic */}
          <div className="flex flex-wrap items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
              onClick={() => setActiveCategory("all")}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold backdrop-blur-md transition-colors duration-200 ${
                activeCategory === "all"
                  ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.22)]"
                  : "border-white/[0.08] bg-white/[0.03] text-richblack-200 hover:border-white/[0.18] hover:text-white"
              }`}
            >
              All Courses
            </motion.button>
            {categories.map((cat) => (
              <motion.button
                key={cat._id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
                onClick={() => setActiveCategory(cat._id)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold backdrop-blur-md transition-colors duration-200 ${
                  activeCategory === cat._id
                    ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.22)]"
                    : "border-white/[0.08] bg-white/[0.03] text-richblack-200 hover:border-white/[0.18] hover:text-white"
                }`}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <span className="text-xs text-richblack-400">Sort by</span>
            <div className="flex gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-md">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSortBy(opt.key)}
                  className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-200 ${
                    sortBy === opt.key
                      ? "bg-white/[0.1] text-white"
                      : "text-richblack-300 hover:text-richblack-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============ Results Grid ============ */}
      <div className="mx-auto w-11/12 max-w-[1300px] py-12">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[340px] animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.03]"
              />
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="glass-panel flex flex-col items-center gap-2 py-20 text-center">
            <p className="text-lg font-semibold text-richblack-5">
              No courses matched your search
            </p>
            <p className="text-sm text-richblack-300">
              Try a different keyword or clear your filters.
            </p>
          </div>
        ) : (
          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course._id}
                  layout
                  variants={gridItemVariants}
                  exit="exit"
                  whileHover={{ y: -6 }}
                  transition={SPRING}
                  className="glass-card p-3"
                >
                  <CourseCard course={course} Height={"h-[200px]"} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default CatalogExplorer
