// Icons Import
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

// Image and Video Import
import Banner from "../assets/Images/banner.mp4"
// Component Imports
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import CodingGameZone from "../components/core/HomePage/CodingGameZone"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import HighlightText from "../components/core/HomePage/HighlightText"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import StatsStrip from "../components/core/HomePage/StatsStrip"
import TimelineSection from "../components/core/HomePage/TimelineSection"
import DataStreamBackground from "../components/common/DataStreamBackground"

// Background Animation Import
import LocalCodeBackground from "../components/common/LocalCodeBackground"

function Home() {
  return (
    <div className="pt-16 bg-richblack-900">
      
      {/* Section 1 — Hero */}
      <div className="relative overflow-hidden mx-auto flex w-11/12 max-w-[1300px] flex-col items-center gap-8 text-white pt-12 pb-4">
        
        <LocalCodeBackground />

        {/* Ambient glow orbs */}
        <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-blue-500/[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute top-56 right-16 h-[280px] w-[280px] rounded-full bg-cyan-400/[0.06] blur-[100px]" />
        <div className="pointer-events-none absolute top-36 left-8 h-[240px] w-[240px] rounded-full bg-yellow-400/[0.05] blur-[100px]" />

        {/* Become an Instructor pill */}
        <Link to="/signup">
          <div className="group mt-16 flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-2 text-sm text-richblack-200 backdrop-blur-md transition-all duration-300 hover:border-yellow-50/40 hover:bg-white/[0.07] hover:text-white hover:shadow-[0_0_28px_rgba(255,214,10,0.12)]">
            <span>Become an Instructor</span>
            <FaArrowRight className="text-yellow-50 text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </Link>

        {/* Main Heading */}
        <div className="max-w-4xl text-center text-5xl font-extrabold leading-[1.15] tracking-tight lg:text-6xl">
          Empower Your Future with{" "}
          <HighlightText text={"Coding Skills"} />
        </div>

        {/* Sub Heading */}
        <div className="max-w-2xl text-center text-base leading-7 text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        {/* CTA Buttons */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <CTAButton active={true} linkto="/learn-more">
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto="/book-demo">
            Book a Demo
          </CTAButton>
        </div>

        {/* ========================================================= */}
        {/* REDESIGNED FEATURE CARDS: STRIPE / LINEAR TIER SYSTEM     */}
        {/* ========================================================= */}
        <div className="mt-16 grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10 font-mono">
          {[
            {
              type: "architecture",
              title: "CORE ARCHITECTURE",
              desc: "Gives structural depth and logic routing patterns so processors parse nested application states seamlessly.",
              metrics: { difficulty: "MID-CORE", duration: "3-4 WKS", projects: "04 COMP", category: "COMPILER" },
              color: "purple"
            },
            {
              type: "metrics",
              title: "ELITE METRICS",
              desc: "Direct integration tracks with core maintainers across serverless environments and deployment engines.",
              metrics: { difficulty: "UNIVERSAL", duration: "LIVE SYNC", projects: "02 COMP", category: "AI CORE" },
              color: "cyan"
            },
            {
              type: "engine",
              title: "CI/CD ENGINE",
              desc: "Automates orchestration deployment chains, pipeline caching systems, and container isolated state hooks.",
              metrics: { difficulty: "ADVANCED", duration: "2-3 WKS", projects: "05 COMP", category: "DEV.OPS" },
              color: "orange"
            },
            {
              type: "topology",
              title: "EDGE TOPOLOGY",
              desc: "Highly distributed localized node routers rendering instant dynamic database queries globally.",
              metrics: { difficulty: "BASE-LEVEL", duration: "INFINITE", projects: "03 COMP", category: "NETWORKS" },
              color: "pink"
            }
          ].map((card, i) => (
            <div
              key={i}
              className={`group relative flex flex-col justify-between rounded-[24px] border border-white/[0.05] bg-[#0c0d12]/90 p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-[#12141d]
                ${card.color === 'purple' && 'hover:border-purple-500/30 hover:shadow-[0_20px_40px_rgba(168,85,247,0.06)]'}
                ${card.color === 'cyan' && 'hover:border-cyan-500/30 hover:shadow-[0_20px_40px_rgba(6,182,212,0.06)]'}
                ${card.color === 'orange' && 'hover:border-orange-500/30 hover:shadow-[0_20px_40px_rgba(249,115,22,0.06)]'}
                ${card.color === 'pink' && 'hover:border-pink-500/30 hover:shadow-[0_20px_40px_rgba(236,72,153,0.06)]'}
              `}
            >
              <div>
                {/* Top Module Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    {/* Glowing Glass Icon Frame Render via Conditional Check */}
                    <div className="relative p-2 rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 group-hover:scale-105 group-hover:bg-white/[0.04]">
                      {card.type === "architecture" && (
                        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
                        </svg>
                      )}
                      {card.type === "metrics" && (
                        <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {card.type === "engine" && (
                        <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                      )}
                      {card.type === "topology" && (
                        <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="text-[13px] font-black tracking-wider text-white uppercase leading-none">
                        {card.title}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                          card.color === 'purple' ? 'bg-purple-400 shadow-[0_0_8px_#a855f7]' : 
                          card.color === 'cyan' ? 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]' : 
                          card.color === 'orange' ? 'bg-orange-400 shadow-[0_0_8px_#f97316]' : 'bg-pink-400 shadow-[0_0_8px_#ec4899]'
                        }`} />
                        <span className="text-[8px] text-zinc-500 tracking-widest font-sans">LIVE STATE</span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-full border ${
                    card.color === 'purple' ? 'text-purple-400 bg-purple-500/10 border-purple-500/20' :
                    card.color === 'cyan' ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' :
                    card.color === 'orange' ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' :
                    'text-pink-400 bg-pink-500/10 border-pink-500/20'
                  }`}>
                    NODE.//0{i+1}
                  </span>
                </div>

                {/* Middle Paragraph Description */}
                <div className="mb-4 min-h-[54px]">
                  <p className="text-[12.5px] leading-relaxed text-zinc-400 font-sans group-hover:text-zinc-200 transition-colors duration-300">
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Structural Spec Metrics */}
              <div className="mt-auto">
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 pt-3.5 border-t border-white/[0.05] text-[10px] text-zinc-400">
                  <div>
                    <span className="text-zinc-600 block text-[7.5px] font-bold tracking-widest uppercase">DIFFICULTY</span>
                    <span className="text-white font-medium">{card.metrics.difficulty}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 block text-[7.5px] font-bold tracking-widest uppercase">DURATION</span>
                    <span className="text-white font-medium">{card.metrics.duration}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 block text-[7.5px] font-bold tracking-widest uppercase">PROJECTS</span>
                    <span className="text-white font-medium">{card.metrics.projects}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 block text-[7.5px] font-bold tracking-widest uppercase">CATEGORY</span>
                    <span className="text-zinc-300 font-medium text-[9px] truncate block max-w-[85px]">{card.metrics.category}</span>
                  </div>
                </div>

                {/* Luxury Futuristic Slide-in Action Footer */}
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-white/[0.03] overflow-hidden">
                  <span className="text-[10px] font-bold tracking-widest text-zinc-500 group-hover:text-white transition-colors duration-300">
                    LAUNCH COMPONENT
                  </span>
                  <div className="flex items-center text-zinc-400 group-hover:text-white transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <span className="text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">Launch</span>
                    <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </div>
                </div>
              </div>

              {/* Bottom Line Laser Glow Accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-[1.5px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-[24px] ${
                card.color === 'purple' ? 'bg-purple-500' :
                card.color === 'cyan' ? 'bg-cyan-500' :
                card.color === 'orange' ? 'bg-orange-500' : 'bg-pink-500'
              }`} />
            </div>
          ))}
        </div>

        {/* Video Container */}
        <div className="relative mt-8 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/[0.08] bg-richblack-800/40 p-[3px] shadow-[0_0_60px_rgba(56,189,248,0.08)] backdrop-blur-sm">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
          <video className="w-full rounded-[14px]" muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}
        <div className="w-full">
          <CodeBlocks
            position="lg:flex-row"
            heading={
              <div className="text-4xl font-semibold leading-tight">
                Unlock your{" "}
                <HighlightText text="coding potential" /> with our online
                courses.
              </div>
            }
            subheading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            ctabtn1={{ btnText: "Try it Yourself", link: "/signup", active: true }}
            ctabtn2={{ btnText: "Learn More", link: "/signup", active: false }}
            codeColor="text-yellow-25"
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute" />}
          />
        </div>

        {/* Code Section 2 */}
        <div className="w-full">
          <CodeBlocks
            position="lg:flex-row-reverse"
            heading={
              <div className="w-full text-4xl font-semibold leading-tight lg:w-[50%]">
                Start{" "}
                <HighlightText text="coding in seconds" />
              </div>
            }
            subheading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            ctabtn1={{ btnText: "Continue Lesson", link: "/signup", active: true }}
            ctabtn2={{ btnText: "Learn More", link: "/signup", active: false }}
            codeColor="text-white"
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute" />}
          />
        </div>

        {/* Explore Section */}
        <ExploreMore />

        {/* Gamified Coding Arena */}
        <CodingGameZone />
      </div>

      {/* Section 2 — Pure White Background Zone */}
      <div className="bg-pure-greys-5 text-richblack-700 relative overflow-hidden">
        
        <DataStreamBackground />

        <div className="homepage_bg h-[320px] relative z-10">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <StatsStrip />
            <div className="flex flex-row gap-6 text-white lg:mt-8">
              <CTAButton active={true} linkto="/catalog">
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto="/login">
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 relative z-10">
          {/* Job that is in Demand */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%]">
              Get the skills you need for a{" "}
              <HighlightText text="job that is in demand." />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px] text-richblack-600">
                The modern TED dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto="/signup">
                Learn More
              </CTAButton>
            </div>
          </div>

          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 — Lower Black Zone */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <InstructorSection />

        <h1 className="text-center text-4xl font-semibold mt-8 tracking-tight">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      <Footer />
    </div>
  )
}

export default Home;