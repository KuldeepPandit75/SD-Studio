"use client";

import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { useCounter, handleTilt, handleTiltReset } from "./utils";

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const { primaryColor, secondaryColor, tertialColor } = useThemeStore();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Animated counters
  const projectCount = useCounter(50, 2000, statsVisible);
  const clientCount = useCounter(50, 2000, statsVisible);
  const yearCount = useCounter(5, 1500, statsVisible);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: () => setStatsVisible(true),
        once: true,
      });

      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
        }
      );
    },
    { scope: statsRef }
  );

  return (
    <div
      ref={statsRef}
      className="py-16 sm:py-24 px-5 sm:px-10 lg:px-20 relative"
      style={{
        background: `linear-gradient(135deg, ${tertialColor} 0%, ${tertialColor}ee 100%)`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {[
            { value: `${projectCount}+`, label: "Projects Delivered", suffix: "and counting" },
            { value: `${clientCount}+`, label: "Happy Clients", suffix: "across India" },
            { value: `${yearCount}+`, label: "Years of Experience", suffix: "" },
            { value: "100%", label: "Client Satisfaction", suffix: "our commitment" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="stat-card text-center p-5 sm:p-8 rounded-2xl border transition-all duration-300 hover:border-transparent"
              style={{
                borderColor: `${secondaryColor}10`,
                backgroundColor: `${secondaryColor}05`,
              }}
              onMouseMove={handleTilt}
              onMouseLeave={handleTiltReset}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${primaryColor}12`;
              }}
            >
              <p className="font-avant text-3xl sm:text-4xl md:text-5xl font-black mb-1"
                style={{ color: primaryColor }}>
                {stat.value}
              </p>
              <p className="font-avant font-bold text-xs sm:text-sm tracking-wide uppercase mb-1"
                style={{ color: secondaryColor }}>
                {stat.label}
              </p>
              <p className="font-avenir text-[10px] sm:text-xs" style={{ color: `${secondaryColor}55` }}>
                {stat.suffix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
