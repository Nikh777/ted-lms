import React from "react"
import { motion } from "framer-motion"
import { FiUsers, FiBookOpen, FiAward, FiStar } from "react-icons/fi"

const STATS = [
  { icon: FiBookOpen, value: "500+", label: "Courses" },
  { icon: FiUsers, value: "50K+", label: "Students" },
  { icon: FiAward, value: "200+", label: "Expert Instructors" },
  { icon: FiStar, value: "4.8", label: "Average Rating" },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
}

function StatsStrip() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
    >
      {STATS.map(({ icon: Icon, value, label }) => (
        <motion.div
          key={label}
          variants={item}
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/[0.1] bg-white/[0.06] px-4 py-4 text-center backdrop-blur-md transition-transform duration-300 hover:-translate-y-1"
        >
          <Icon className="text-lg text-cyan-300" />
          <span className="text-xl font-bold text-white">{value}</span>
          <span className="text-[11px] font-medium uppercase tracking-wide text-richblack-200">
            {label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default StatsStrip
