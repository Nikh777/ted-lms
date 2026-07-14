import React from "react"
import { ARCHITECTURE_LAYERS } from "../../../data/techTracks"

/**
 * Renders the full-stack layer order and highlights where the given
 * track sits within it — the "Architecture Position" required by the
 * knowledge dashboard overlay.
 */
function ArchitectureDiagram({ activeLayer, accent }) {
  return (
    <div className="flex flex-col gap-1.5">
      {ARCHITECTURE_LAYERS.map((layer) => {
        const isActive = layer.key === activeLayer
        return (
          <div
            key={layer.key}
            className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-xs transition-all duration-300 ${
              isActive
                ? "border-white/20 bg-white/[0.06] text-richblack-5"
                : "border-white/[0.05] bg-white/[0.015] text-richblack-400"
            }`}
            style={
              isActive
                ? {
                    boxShadow: `0 0 18px ${accent?.from}33, inset 0 0 0 1px ${accent?.from}55`,
                  }
                : undefined
            }
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${accent?.from}, ${accent?.to})`
                  : "rgba(255,255,255,0.15)",
                boxShadow: isActive ? `0 0 8px ${accent?.from}` : "none",
              }}
            />
            <span className={isActive ? "font-semibold" : ""}>{layer.label}</span>
            {isActive && (
              <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-richblack-100">
                You are here
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ArchitectureDiagram
