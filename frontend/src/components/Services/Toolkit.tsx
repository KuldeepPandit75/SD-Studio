"use client";

import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { tools } from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function Toolkit() {
  const { primaryColor, secondaryColor, tertialColor } = useThemeStore();
  const toolsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".tools-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: toolsRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".tool-pill",
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(2)",
          scrollTrigger: { trigger: toolsRef.current, start: "top 75%" },
        }
      );
    },
    { scope: toolsRef }
  );

  return (
    <div
      ref={toolsRef}
      className="py-16 sm:py-20 px-5 sm:px-10 lg:px-20"
      style={{ backgroundColor: secondaryColor }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="tools-header flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <p className="font-avant text-xs sm:text-sm tracking-[0.25em] uppercase mb-3"
              style={{ color: primaryColor }}>
              Our Toolkit
            </p>
            <h2 className="font-avant text-2xl sm:text-3xl md:text-4xl leading-tight"
              style={{ color: tertialColor }}>
              Industry-Leading <span className="font-black">Software</span>
            </h2>
          </div>
          <p className="font-avenir text-sm max-w-sm leading-relaxed"
            style={{ color: `${tertialColor}88` }}>
            We use the same tools trusted by top architectural firms worldwide to deliver renders that rival reality.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="tool-pill group flex items-center gap-3 px-5 sm:px-7 py-3.5 sm:py-4 rounded-full border cursor-default transition-all duration-400 hover:shadow-lg"
              style={{
                borderColor: `${tertialColor}12`,
                backgroundColor: `${tertialColor}04`,
                color: tertialColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tertialColor;
                e.currentTarget.style.borderColor = tertialColor;
                e.currentTarget.style.color = secondaryColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${tertialColor}04`;
                e.currentTarget.style.borderColor = `${tertialColor}12`;
                e.currentTarget.style.color = tertialColor;
              }}
            >
              <span className="font-avant font-bold text-sm sm:text-base transition-colors duration-300">
                {tool.name}
              </span>
              <span className="font-avenir text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full transition-all duration-300 group-hover:bg-white/15 group-hover:text-white/70"
                style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                {tool.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
