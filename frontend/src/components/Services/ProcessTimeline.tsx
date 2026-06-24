"use client";

import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { processSteps } from "./data";
import { handleTilt, handleTiltReset } from "./utils";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessTimeline() {
  const { primaryColor, secondaryColor, tertialColor } = useThemeStore();
  const processRef = useRef<HTMLDivElement>(null);
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  useGSAP(
    () => {
      gsap.fromTo(
        ".process-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: processRef.current, start: "top 80%" },
        }
      );

      // Animate process steps on scroll
      gsap.utils.toArray<HTMLElement>(".process-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              onEnter: () => setActiveProcessStep(i),
            },
          }
        );
      });
    },
    { scope: processRef }
  );

  return (
    <div
      ref={processRef}
      className="py-20 sm:py-32 px-5 sm:px-10 lg:px-20 relative overflow-hidden"
      style={{ backgroundColor: tertialColor }}
    >
      {/* Decorative glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: `radial-gradient(circle, ${primaryColor}, transparent)` }} />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.03]"
        style={{ background: `radial-gradient(circle, ${primaryColor}, transparent)` }} />

      {/* Header */}
      <div className="process-header max-w-6xl mx-auto mb-16 sm:mb-20 text-center">
        <p className="font-avant text-xs sm:text-sm tracking-[0.25em] uppercase mb-3"
          style={{ color: primaryColor }}>
          How We Work
        </p>
        <h2 className="font-avant text-3xl sm:text-4xl md:text-5xl leading-tight"
          style={{ color: secondaryColor }}>
          Your Project Journey,{" "}
          <span className="font-black">Step by Step</span>
        </h2>
        <p className="font-avenir text-base mt-4 max-w-xl mx-auto"
          style={{ color: `${secondaryColor}77` }}>
          Every great render begins with a conversation. Here's how we turn your ideas into pixel-perfect reality.
        </p>
      </div>

      {/* Timeline Cards */}
      <div className="max-w-5xl mx-auto relative">
        {/* Vertical timeline line */}
        <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px"
          style={{ backgroundColor: `${secondaryColor}15` }}>
          {/* Animated progress */}
          <div
            className="absolute top-0 left-0 w-full transition-all duration-700 ease-out rounded-full"
            style={{
              height: `${((activeProcessStep + 1) / processSteps.length) * 100}%`,
              backgroundColor: primaryColor,
              boxShadow: `0 0 12px ${primaryColor}66`,
            }}
          />
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          {processSteps.map((step, idx) => {
            const isActive = idx <= activeProcessStep;
            return (
              <div
                key={step.step}
                className="process-card flex items-start gap-6 sm:gap-10 md:pl-20 relative"
              >
                {/* Timeline Node */}
                <div className="hidden md:flex absolute left-0 top-8 items-center justify-center">
                  <div
                    className="w-[17px] h-[17px] rounded-full border-[3px] transition-all duration-500 z-10"
                    style={{
                      borderColor: isActive ? primaryColor : `${secondaryColor}33`,
                      backgroundColor: isActive ? primaryColor : "transparent",
                      boxShadow: isActive ? `0 0 16px ${primaryColor}55` : "none",
                    }}
                  />
                </div>

                {/* Card */}
                <div
                  className="flex-1 p-6 sm:p-8 rounded-2xl border transition-all duration-500"
                  style={{
                    borderColor: isActive ? `${primaryColor}33` : `${secondaryColor}10`,
                    backgroundColor: isActive ? `${primaryColor}08` : `${secondaryColor}05`,
                  }}
                  onMouseMove={handleTilt}
                  onMouseLeave={handleTiltReset}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-4">
                      <span
                        className="font-avant text-3xl sm:text-4xl font-black transition-colors duration-500"
                        style={{ color: isActive ? primaryColor : `${secondaryColor}22` }}
                      >
                        {step.step}
                      </span>
                      <h3
                        className="font-avant font-bold text-lg sm:text-xl transition-colors duration-500"
                        style={{ color: isActive ? secondaryColor : `${secondaryColor}66` }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <span
                      className="font-avenir text-xs px-3 py-1.5 rounded-full whitespace-nowrap self-start"
                      style={{
                        backgroundColor: `${primaryColor}15`,
                        color: primaryColor,
                      }}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <p
                    className="font-avenir text-sm sm:text-[15px] leading-relaxed transition-colors duration-500"
                    style={{ color: isActive ? `${secondaryColor}aa` : `${secondaryColor}44` }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
