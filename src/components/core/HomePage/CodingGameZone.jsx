import React, { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiCheck, FiX, FiZap, FiTerminal, FiClock } from "react-icons/fi"
import { HiOutlineLightningBolt } from "react-icons/hi"

import HighlightText from "./HighlightText"

// Uniform spring used for every interactive element in the arena
const SPRING = { type: "spring", stiffness: 300, damping: 22, mass: 0.6 }

/* ---------------------------------------------------------------
   Puzzle data — purely local, no backend / redux involvement
---------------------------------------------------------------- */
const SYNTAX_PUZZLES = [
  {
    id: 1,
    code: `function add(a, b) {\n  return a + b\n___`,
    blankLabel: "closing token",
    options: ["}", "]", ")", ";"],
    answer: "}",
  },
  {
    id: 2,
    code: `const nums = [1, 2, 3]\nnums.___(n => n * 2)`,
    blankLabel: "array method",
    options: ["map", "filter", "push", "length"],
    answer: "map",
  },
  {
    id: 3,
    code: `if (isReady) ___\n  launch()\n}`,
    blankLabel: "missing token",
    options: ["{", "(", "[", "=>"],
    answer: "{",
  },
  {
    id: 4,
    code: `const user = { name: "Kai" ___\nconsole.log(user.name)`,
    blankLabel: "closing token",
    options: ["}", ")", "]", ";"],
    answer: "}",
  },
  {
    id: 5,
    code: `for (let i = 0; i < 5; i___) {\n  print(i)\n}`,
    blankLabel: "increment op",
    options: ["++", "--", "+=2", "**"],
    answer: "++",
  },
]

const SPEEDRUN_PUZZLES = [
  {
    id: 1,
    code: `console.log(typeof [])`,
    options: ["'array'", "'object'", "'undefined'", "'list'"],
    answer: "'object'",
  },
  {
    id: 2,
    code: `console.log(2 + "2")`,
    options: ["4", "'22'", "NaN", "undefined"],
    answer: "'22'",
  },
  {
    id: 3,
    code: `console.log([1,2,3].length)`,
    options: ["2", "3", "4", "undefined"],
    answer: "3",
  },
  {
    id: 4,
    code: `console.log(Boolean(""))`,
    options: ["true", "false", "undefined", "Error"],
    answer: "false",
  },
  {
    id: 5,
    code: `console.log(0 === "0")`,
    options: ["true", "false", "NaN", "Error"],
    answer: "false",
  },
]

const ROUND_SECONDS = 12

function EditorChrome({ label }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-pink-200/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-50/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-caribbeangreen-100/70" />
      </div>
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-richblack-300">
        <FiTerminal className="text-xs" />
        {label}
      </div>
      <div className="w-12" />
    </div>
  )
}

function SyntaxMatcher() {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null) // "correct" | "wrong" | null

  const puzzle = SYNTAX_PUZZLES[index % SYNTAX_PUZZLES.length]

  const handlePick = (opt) => {
    if (result) return
    const correct = opt === puzzle.answer
    setSelected(opt)
    setResult(correct ? "correct" : "wrong")
    if (correct) setScore((s) => s + 10)
    else setLives((l) => Math.max(0, l - 1))

    setTimeout(() => {
      setSelected(null)
      setResult(null)
      setIndex((i) => i + 1)
    }, 800)
  }

  const reset = () => {
    setIndex(0)
    setScore(0)
    setLives(3)
    setSelected(null)
    setResult(null)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-richblack-900/70 backdrop-blur-xl">
      <EditorChrome label="syntax-matcher.js" />

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="chip-neutral">
              Score <span className="ml-1 text-cyan-300">{score}</span>
            </span>
            <span className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    i < lives ? "bg-pink-200 shadow-[0_0_8px_rgba(239,71,111,0.6)]" : "bg-white/10"
                  }`}
                />
              ))}
            </span>
          </div>
          <span className="text-richblack-400">
            Pick the correct {puzzle.blankLabel}
          </span>
        </div>

        {lives === 0 ? (
          <GameOver score={score} onReset={reset} />
        ) : (
          <>
            <pre className="mb-5 overflow-x-auto rounded-xl border border-white/[0.06] bg-black/30 p-4 font-mono text-[13px] leading-6 text-richblack-100">
              <code>{puzzle.code}</code>
            </pre>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {puzzle.options.map((opt) => {
                const isSelected = selected === opt
                const isCorrectPick = isSelected && result === "correct"
                const isWrongPick = isSelected && result === "wrong"
                return (
                  <motion.button
                    key={opt}
                    disabled={!!result}
                    onClick={() => handlePick(opt)}
                    whileHover={!result ? { scale: 1.04, y: -2 } : {}}
                    whileTap={!result ? { scale: 0.96 } : {}}
                    animate={
                      isWrongPick
                        ? { x: [0, -6, 6, -4, 4, 0] }
                        : { x: 0 }
                    }
                    transition={SPRING}
                    className={`rounded-xl border px-3 py-3 font-mono text-sm font-semibold backdrop-blur-md transition-colors duration-200
                      ${
                        isCorrectPick
                          ? "border-caribbeangreen-100/60 bg-caribbeangreen-100/15 text-caribbeangreen-5 shadow-[0_0_20px_rgba(6,214,160,0.35)]"
                          : isWrongPick
                          ? "border-pink-200/60 bg-pink-200/15 text-pink-5 shadow-[0_0_20px_rgba(239,71,111,0.35)]"
                          : "border-white/[0.08] bg-white/[0.03] text-richblack-100 hover:border-cyan-400/30 hover:bg-white/[0.06]"
                      }`}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      {isCorrectPick && <FiCheck />}
                      {isWrongPick && <FiX />}
                      {opt}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function LogicSpeedrun() {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)
  const [finished, setFinished] = useState(false)

  const puzzle = SPEEDRUN_PUZZLES[index % SPEEDRUN_PUZZLES.length]

  useEffect(() => {
    if (finished || result) return
    if (timeLeft <= 0) {
      setResult("timeout")
      setStreak(0)
      const t = setTimeout(advance, 700)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, result, finished])

  const advance = () => {
    setSelected(null)
    setResult(null)
    setTimeLeft(ROUND_SECONDS)
    setIndex((i) => {
      const next = i + 1
      if (next >= SPEEDRUN_PUZZLES.length) setFinished(true)
      return next
    })
  }

  const handlePick = (opt) => {
    if (result || finished) return
    const correct = opt === puzzle.answer
    setSelected(opt)
    setResult(correct ? "correct" : "wrong")
    if (correct) {
      setScore((s) => s + Math.max(5, timeLeft))
      setStreak((s) => s + 1)
    } else {
      setStreak(0)
    }
    setTimeout(advance, 700)
  }

  const reset = () => {
    setIndex(0)
    setScore(0)
    setStreak(0)
    setTimeLeft(ROUND_SECONDS)
    setSelected(null)
    setResult(null)
    setFinished(false)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-richblack-900/70 backdrop-blur-xl">
      <EditorChrome label="logic-speedrun.js" />

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="chip-neutral">
              Score <span className="ml-1 text-cyan-300">{score}</span>
            </span>
            <span className="flex items-center gap-1 text-yellow-25">
              <HiOutlineLightningBolt /> {streak} streak
            </span>
          </div>
          {!finished && (
            <span className="flex items-center gap-1.5 text-richblack-300">
              <FiClock className={timeLeft <= 4 ? "text-pink-200" : ""} />
              <span
                className={`font-mono ${
                  timeLeft <= 4 ? "text-pink-200" : "text-richblack-200"
                }`}
              >
                {timeLeft}s
              </span>
            </span>
          )}
        </div>

        {finished ? (
          <GameOver score={score} onReset={reset} label="Run complete!" />
        ) : (
          <>
            <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                key={`${index}-${timeLeft}`}
                initial={{ width: "100%" }}
                animate={{ width: `${(timeLeft / ROUND_SECONDS) * 100}%` }}
                transition={{ duration: 1, ease: "linear" }}
                className={`h-full ${
                  timeLeft <= 4 ? "bg-pink-200" : "bg-cyan-400"
                }`}
              />
            </div>

            <pre className="mb-5 overflow-x-auto rounded-xl border border-white/[0.06] bg-black/30 p-4 font-mono text-[13px] leading-6 text-richblack-100">
              <code>{puzzle.code}</code>
            </pre>

            <div className="grid grid-cols-2 gap-3">
              {puzzle.options.map((opt) => {
                const isSelected = selected === opt
                const isCorrectPick = isSelected && result === "correct"
                const isWrongPick = isSelected && result === "wrong"
                return (
                  <motion.button
                    key={opt}
                    disabled={!!result}
                    onClick={() => handlePick(opt)}
                    whileHover={!result ? { scale: 1.04, y: -2 } : {}}
                    whileTap={!result ? { scale: 0.96 } : {}}
                    animate={isWrongPick ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                    transition={SPRING}
                    className={`rounded-xl border px-3 py-3 font-mono text-sm font-semibold backdrop-blur-md transition-colors duration-200
                      ${
                        isCorrectPick
                          ? "border-caribbeangreen-100/60 bg-caribbeangreen-100/15 text-caribbeangreen-5 shadow-[0_0_20px_rgba(6,214,160,0.35)]"
                          : isWrongPick
                          ? "border-pink-200/60 bg-pink-200/15 text-pink-5 shadow-[0_0_20px_rgba(239,71,111,0.35)]"
                          : "border-white/[0.08] bg-white/[0.03] text-richblack-100 hover:border-cyan-400/30 hover:bg-white/[0.06]"
                      }`}
                  >
                    {opt}
                  </motion.button>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function GameOver({ score, onReset, label = "Out of lives!" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={SPRING}
      className="flex flex-col items-center gap-4 py-10 text-center"
    >
      <div className="text-3xl">🏁</div>
      <p className="text-lg font-semibold text-richblack-5">{label}</p>
      <p className="text-sm text-richblack-300">
        Final score:{" "}
        <span className="font-mono text-cyan-300">{score}</span>
      </p>
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={SPRING}
        onClick={onReset}
        className="rounded-xl bg-yellow-50 px-5 py-2 text-sm font-semibold text-richblack-900 shadow-[0_0_20px_rgba(255,214,10,0.2)] transition-shadow hover:shadow-[0_0_28px_rgba(255,214,10,0.32)]"
      >
        Play Again
      </motion.button>
    </motion.div>
  )
}

const TABS = [
  { key: "syntax", label: "Syntax Matcher", icon: FiTerminal },
  { key: "speedrun", label: "Logic Speedrun", icon: FiZap },
]

function CodingGameZone() {
  const [tab, setTab] = useState("syntax")

  const activeGame = useMemo(
    () => (tab === "syntax" ? <SyntaxMatcher /> : <LogicSpeedrun />),
    [tab]
  )

  return (
    <div className="relative w-full py-10">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/[0.06] blur-[120px]" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-richblack-200 backdrop-blur-md">
          <HiOutlineLightningBolt className="text-yellow-25" />
          Playable
        </div>
        <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
          Step into the
          <HighlightText text="Coding Arena" />
        </h2>
        <p className="max-w-xl text-sm text-richblack-300 lg:text-base">
          Sharpen your instincts with quick-fire syntax and logic puzzles —
          built right into the syntax editor you already know.
        </p>
      </div>

      {/* Tabs */}
      <div className="relative mt-8 flex justify-center">
        <div className="flex gap-1 rounded-full border border-white/[0.08] bg-richblack-800/80 p-1.5 backdrop-blur-sm">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
                ${
                  tab === key
                    ? "bg-richblack-900 text-white shadow-[0_0_12px_rgba(0,0,0,0.4)]"
                    : "text-richblack-300 hover:text-richblack-100 hover:bg-richblack-700/60"
                }`}
            >
              <Icon className="text-xs" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Game window */}
      <div className="relative mx-auto mt-8 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={SPRING}
          >
            {activeGame}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CodingGameZone
