import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Reusable GSAP scroll-reveal hook for the new marketing pages
// (LearnMore / BookDemo). Does not touch any existing animation logic.
export default function useScrollReveal(selector = "[data-reveal]", options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(selector);

      targets.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: options.y ?? 32 },
          {
            opacity: 1,
            y: 0,
            duration: options.duration ?? 0.8,
            ease: "power3.out",
            delay: (i % (options.staggerGroup ?? 1)) * (options.stagger ?? 0.08),
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector, options]);

  return containerRef;
}
