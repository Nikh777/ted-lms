import React, { useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FiX, FiTarget, FiBriefcase, FiFolder, FiHelpCircle, FiLayers, FiTrendingUp } from "react-icons/fi"

import ArchitectureDiagram from "./ArchitectureDiagram"

const SPRING = { type: "spring", stiffness: 260, damping: 26, mass: 0.7 }

const DEMAND_COLOR = {
  "Very High": "text-caribbeangreen-100 border-caribbeangreen-100/30 bg-caribbeangreen-100/10",
  High: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10",
  Moderate: "text-yellow-25 border-yellow-50/30 bg-yellow-50/10",
}

function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-md">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-richblack-100">
        <Icon className="text-richblack-300" />
        {title}
      </div>
      {children}
    </div>
  )
}

function Chip({ children }) {
  return (
    <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-richblack-200">
      {children}
    </span>
  )
}

function TechTrackOverlay({ track, onClose }) {
  useEffect(() => {
    if (!track) return
    const onKey = (e) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [track, onClose])

  return createPortal(
    <AnimatePresence>
      {track && (
        <motion.div
          key="ted-track-overlay"
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 py-10 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* blurred backdrop */}
          <motion.div
            className="fixed inset-0 bg-richblack-900/80 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${track.name} learning track details`}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/[0.1] bg-richblack-900 shadow-[0_0_80px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={SPRING}
          >
            {/* ambient accent glow */}
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-[280px] w-[520px] -translate-x-1/2 rounded-full opacity-25 blur-[100px]"
              style={{
                background: `linear-gradient(135deg, ${track.accent.from}, ${track.accent.to})`,
              }}
            />

            {/* header */}
            <div className="relative flex items-start justify-between gap-4 border-b border-white/[0.07] p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.1] text-3xl"
                  style={{
                    background: `linear-gradient(135deg, ${track.accent.from}22, ${track.accent.to}11)`,
                    color: track.accent.from,
                  }}
                >
                  <track.icon />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-richblack-5 sm:text-3xl">{track.name}</h2>
                  <p className="mt-1 max-w-xl text-sm text-richblack-300">{track.description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-richblack-200 transition-all duration-200 hover:rotate-90 hover:border-white/[0.2] hover:text-white"
              >
                <FiX />
              </button>
            </div>

            {/* stat strip */}
            <div className="relative grid grid-cols-2 gap-3 border-b border-white/[0.07] px-6 py-4 sm:grid-cols-4 sm:px-8">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-richblack-400">Difficulty</p>
                <p className="mt-0.5 text-sm font-semibold text-richblack-5">{track.difficulty}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-richblack-400">Est. Time</p>
                <p className="mt-0.5 text-sm font-semibold text-richblack-5">{track.estimatedTime}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-richblack-400">Industry Demand</p>
                <span
                  className={`mt-0.5 inline-block rounded-full border px-2 py-0.5 text-xs font-semibold ${
                    DEMAND_COLOR[track.industryDemand] || DEMAND_COLOR.High
                  }`}
                >
                  {track.industryDemand}
                </span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-richblack-400">Prerequisites</p>
                <p className="mt-0.5 text-sm font-semibold text-richblack-5">
                  {track.prerequisites[0]}
                </p>
              </div>
            </div>

            {/* body */}
            <div className="relative grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
              <SectionCard icon={FiTarget} title="Overview & Purpose">
                <p className="text-sm leading-6 text-richblack-300">{track.purpose}</p>
                <p className="mt-2 text-sm leading-6 text-richblack-400">{track.realWorldUsage}</p>
              </SectionCard>

              <SectionCard icon={FiLayers} title="Architecture Position">
                <ArchitectureDiagram activeLayer={track.architectureLayer} accent={track.accent} />
              </SectionCard>

              <SectionCard icon={FiTrendingUp} title="Learning Roadmap">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {track.prerequisites.map((p, i) => (
                    <React.Fragment key={p}>
                      <Chip>{p}</Chip>
                      <span className="text-richblack-500">→</span>
                    </React.Fragment>
                  ))}
                  <span
                    className="rounded-full border px-3 py-1 font-semibold"
                    style={{
                      borderColor: `${track.accent.from}55`,
                      color: track.accent.from,
                      background: `${track.accent.from}15`,
                    }}
                  >
                    {track.name}
                  </span>
                  <span className="text-richblack-500">→</span>
                  {track.relatedTech.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-6 text-richblack-400">{track.expectedOutcome}</p>
              </SectionCard>

              <SectionCard icon={FiFolder} title="Project Examples">
                <ul className="space-y-2 text-sm text-richblack-300">
                  {track.projects.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: track.accent.from }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </SectionCard>

              <SectionCard icon={FiBriefcase} title="Career Path">
                <div className="flex flex-wrap gap-2">
                  {track.careerRoles.map((role) => (
                    <Chip key={role}>{role}</Chip>
                  ))}
                </div>
              </SectionCard>

              <SectionCard icon={FiHelpCircle} title="Common Interview Questions">
                <ul className="space-y-2 text-sm text-richblack-300">
                  {track.interviewQuestions.map((q) => (
                    <li key={q} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-richblack-500" />
                      {q}
                    </li>
                  ))}
                </ul>
              </SectionCard>

              <SectionCard icon={FiTarget} title="Skills You'll Learn">
                <div className="flex flex-wrap gap-2">
                  {track.skillsYouWillLearn.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </SectionCard>

              <SectionCard icon={FiLayers} title="Related Technologies">
                <div className="flex flex-wrap gap-2">
                  {track.relatedTech.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </SectionCard>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default TechTrackOverlay
