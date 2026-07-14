import React from "react"

import FoundingStory from "../assets/Images/FoundingStory.png"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponenet from "../components/core/AboutPage/Stats"
import HighlightText from "../components/core/HomePage/HighlightText"
import ReviewSlider from "../components/common/ReviewSlider"
import Footer from "../components/common/Footer"

const storyBlocks = [
  {
    step: "01",
    title: "Our Founding Story",
    accent: "from-blue-100 to-caribbeangreen-100",
    image: FoundingStory,
    paragraphs: [
      "Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.",
      "As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.",
    ],
  },
  {
    step: "02",
    title: "Our Vision",
    accent: "from-yellow-50 to-brown-50",
    paragraphs: [
      "With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.",
    ],
  },
  {
    step: "03",
    title: "Our Mission",
    accent: "from-pink-100 to-blue-100",
    paragraphs: [
      "Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.",
    ],
  },
]

const About = () => {
  return (
    <div className="bg-richblack-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-[460px] w-[460px] rounded-full bg-blue-500/[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute top-40 right-10 h-[240px] w-[240px] rounded-full bg-yellow-50/[0.05] blur-[100px]" />

        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 pt-24 text-center text-white">
          <header className="mx-auto text-4xl font-semibold leading-tight tracking-tight lg:w-[70%] lg:text-5xl">
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <p className="mx-auto mt-5 text-center text-base font-medium text-richblack-300 lg:w-[85%]">
              TED is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>

          <div className="relative mx-auto mt-6 grid w-full max-w-4xl translate-y-16 grid-cols-3 gap-3 lg:gap-5">
            {[BannerImage1, BannerImage2, BannerImage3].map((img, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-white/[0.08] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[0.16]"
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="h-[90px] sm:h-[70px] lg:h-[150px]" />
        </div>
      </section>

      {/* Quote */}
      <section className="border-b border-white/[0.06] bg-richblack-900">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 pt-16">
          <Quote />
        </div>
      </section>

      {/* Founding Story / Vision / Mission — sequential narrative */}
      <section className="relative overflow-hidden bg-richblack-900">
        <div className="mx-auto w-11/12 max-w-maxContent py-20">
          <div className="relative flex flex-col gap-14">
            {/* connecting line for large screens */}
            <div className="pointer-events-none absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-white/[0.14] via-white/[0.08] to-transparent lg:block" />

            {storyBlocks.map((block, i) => (
              <div key={i} className="relative flex flex-col gap-8 lg:flex-row lg:items-center">
                {/* step marker */}
                <div className="relative z-10 hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-richblack-800 text-sm font-bold text-richblack-200 lg:flex">
                  {block.step}
                </div>

                <div
                  className={`flex flex-1 flex-col gap-8 lg:flex-row lg:items-center ${
                    i === 1 ? "lg:justify-between" : ""
                  }`}
                >
                  <div className="flex flex-1 flex-col gap-4">
                    <h2
                      className={`bg-gradient-to-r ${block.accent} bg-clip-text text-3xl font-semibold tracking-tight text-transparent lg:text-4xl`}
                    >
                      {block.title}
                    </h2>
                    {block.paragraphs.map((p, pi) => (
                      <p
                        key={pi}
                        className="max-w-2xl text-[15px] font-medium leading-7 text-richblack-300"
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  {block.image && (
                    <div className="shrink-0 lg:w-[38%]">
                      <img
                        src={block.image}
                        alt=""
                        className="rounded-2xl border border-white/[0.08] shadow-[0_0_40px_rgba(96,165,250,0.08)]"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsComponenet />

      {/* Learning Grid + Contact */}
      <section className="bg-richblack-900">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-20 py-20">
          <LearningGrid />
          <ContactFormSection />
        </div>
      </section>

      {/* Reviews */}
      <div className="relative mx-auto mb-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <h1 className="text-center text-4xl font-semibold tracking-tight">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      <Footer />
    </div>
  )
}

export default About
