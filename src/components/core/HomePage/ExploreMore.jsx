import React, { useState } from "react"
import { motion } from "framer-motion"

import { TECH_TRACKS } from "../../../data/techTracks"
import HighlightText from "./HighlightText"
import TechTrackCard from "./TechTrackCard"
import TechTrackOverlay from "./TechTrackOverlay"

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
}

const ExploreMore = () => {
  const [activeTrack, setActiveTrack] = useState(null)

  return (
    <div className="w-full py-10">
      {/* Heading */}
      <div className="mb-10 text-center">
        <div className="text-4xl font-semibold tracking-tight">
          Unlock the
          <HighlightText text="Power of Code" />
        </div>
        <p className="mt-3 text-base font-medium text-richblack-300">
          12 real learning tracks — click any one for the full roadmap, career
          path, and project ideas.
        </p>
      </div>

      {/* Grid */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto grid w-11/12 max-w-[1300px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {TECH_TRACKS.map((track) => (
          <motion.div key={track.id} variants={cardVariants}>
            <TechTrackCard track={track} onOpen={setActiveTrack} />
          </motion.div>
        ))}
      </motion.div>

      <TechTrackOverlay track={activeTrack} onClose={() => setActiveTrack(null)} />
    </div>
  )
}

export default ExploreMore
