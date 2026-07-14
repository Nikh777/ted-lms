import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5000, suffix: "+", label: "Active Students", color: "blue" },
  { value: 120, suffix: "+", label: "Expert Mentors", color: "green" },
  { value: 300, suffix: "+", label: "Courses Available", color: "yellow" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", color: "pink" },
];

const colorGlow = {
  blue: "hover:border-blue-400/30 hover:shadow-[0_0_28px_rgba(96,165,250,0.12)]",
  green: "hover:border-emerald-400/30 hover:shadow-[0_0_28px_rgba(52,211,153,0.12)]",
  yellow: "hover:border-yellow-50/30 hover:shadow-[0_0_28px_rgba(255,214,10,0.12)]",
  pink: "hover:border-pink-400/30 hover:shadow-[0_0_28px_rgba(244,114,182,0.12)]",
};

const Statistics = () => {
  const containerRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = { val: 0 };
        gsap.to(target, {
          val: stats[i].value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            el.textContent = Math.floor(target.val).toLocaleString() + stats[i].suffix;
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-richblack-900 py-20">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[360px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.06] blur-[120px]" />

      <div className="relative mx-auto w-11/12 max-w-maxContent">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-1 rounded-2xl border border-white/[0.07] bg-richblack-800/60 py-10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 ${colorGlow[s.color]}`}
            >
              <h3
                ref={(el) => (numberRefs.current[i] = el)}
                className="text-[34px] font-bold tracking-tight text-richblack-5"
              >
                0{s.suffix}
              </h3>
              <p className="text-[14px] font-medium text-richblack-300">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
