import React, { useRef } from "react"
import { gsap } from "gsap"

function TechTrackCard({ track, onOpen }) {
  const cardRef = useRef(null)
  const Icon = track.icon

  const handleOpen = () => {
    const el = cardRef.current
    if (!el) {
      onOpen(track)
      return
    }
    // Smooth GSAP 3D-flip micro-interaction, then hand off to the
    // fullscreen knowledge dashboard overlay.
    gsap.timeline()
      .to(el, {
        rotateY: 90,
        scale: 0.94,
        opacity: 0.5,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => onOpen(track),
      })
      .to(el, {
        rotateY: 0,
        scale: 1,
        opacity: 1,
        duration: 0.28,
        ease: "power2.out",
      })
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleOpen()
    }
  }

  return (
    <div style={{ perspective: "1000px" }}>
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={`Open ${track.name} learning track details`}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        className="group relative flex h-full cursor-pointer flex-col gap-4 rounded-2xl border border-white/[0.08]
          bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-300 ease-out
          hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.05]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
      >
        {/* icon badge */}
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] text-2xl transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${track.accent.from}22, ${track.accent.to}11)`,
            color: track.accent.from,
            boxShadow: `0 0 0 0 transparent`,
          }}
        >
          <Icon />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-richblack-5">{track.name}</h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-richblack-300">
            {track.description}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1 text-[11px]">
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-richblack-200">
            {track.difficulty}
          </span>
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-richblack-200">
            {track.estimatedTime}
          </span>
          <span
            className="ml-auto flex items-center gap-1 font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ color: track.accent.from }}
          >
            View details →
          </span>
        </div>
      </div>
    </div>
  )
}

export default TechTrackCard
