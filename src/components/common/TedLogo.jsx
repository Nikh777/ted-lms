import React, { useId } from "react"

/**
 * TedLogo — typography-based brand mark for TED (Total Education Development)
 *
 * Renders "TED" as crisp SVG type inside a glassmorphic badge, with an
 * electric purple -> electric cyan gradient fill, an animated ambient glow,
 * and a shimmer sweep that intensifies on hover/focus.
 *
 * Fully responsive (scales via the `size` prop / parent font-size) and
 * respects prefers-reduced-motion via motion-safe: variants.
 */
const SIZE_MAP = {
  sm: { wrapper: "h-8 px-2.5", text: "text-lg", tagline: "hidden" },
  md: { wrapper: "h-10 px-3.5", text: "text-2xl", tagline: "hidden sm:block" },
  lg: { wrapper: "h-14 px-5", text: "text-4xl", tagline: "block" },
}

function TedLogo({ size = "md", showTagline = false, className = "" }) {
  const uid = useId()
  const gradientId = `ted-gradient-${uid}`
  const glowId = `ted-glow-${uid}`
  const { wrapper, text, tagline } = SIZE_MAP[size] || SIZE_MAP.md

  return (
    <div
      className={`group relative inline-flex items-center gap-2.5 rounded-xl border border-white/[0.08]
        bg-white/[0.03] backdrop-blur-md transition-all duration-300 ease-out
        hover:border-violet-400/30 hover:bg-white/[0.05]
        ${wrapper} ${className}`}
    >
      {/* ambient glow, pulses gently, blooms on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-violet-500/20 via-cyan-400/15 to-violet-500/20
          opacity-40 blur-lg transition-opacity duration-500 motion-safe:animate-glowPulse
          group-hover:opacity-80"
      />

      <svg
        viewBox="0 0 92 32"
        className={`relative w-auto ${text === "text-4xl" ? "h-8" : text === "text-2xl" ? "h-6" : "h-4"}`}
        role="img"
        aria-label="TED logo"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="45%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <text
          x="0"
          y="24"
          fontFamily="Inter, sans-serif"
          fontWeight="800"
          fontSize="26"
          letterSpacing="1"
          fill={`url(#${gradientId})`}
          filter={`url(#${glowId})`}
        >
          TED
        </text>
      </svg>

      {/* shimmer sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
      >
        <span
          className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent
            opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-safe:group-hover:animate-shimmer"
        />
      </span>

      {showTagline && (
        <span
          className={`${tagline} border-l border-white/10 pl-2.5 text-[10px] font-medium uppercase leading-tight tracking-wider text-richblack-300`}
        >
          Total
          <br />
          Education
          <br />
          Development
        </span>
      )}
    </div>
  )
}

export default TedLogo
