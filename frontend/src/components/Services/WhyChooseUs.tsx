"use client";

import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { handleTilt, handleTiltReset } from "./utils";

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const { primaryColor, secondaryColor, tertialColor } = useThemeStore();
  const whyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".why-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: whyRef.current, start: "top 80%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".why-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, rotateY: 8 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    },
    { scope: whyRef }
  );

  return (
    <div
      ref={whyRef}
      className="py-20 sm:py-32 px-5 sm:px-10 lg:px-20"
      style={{ backgroundColor: secondaryColor }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="why-header text-center mb-14 sm:mb-20">
          <p className="font-avant text-xs sm:text-sm tracking-[0.25em] uppercase mb-3"
            style={{ color: primaryColor }}>
            The SD Studio Promise
          </p>
          <h2 className="font-avant text-3xl sm:text-4xl md:text-5xl leading-tight"
            style={{ color: tertialColor }}>
            Why <span className="font-black">150+ Clients</span> Trust Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "Pixel-Perfect Realism",
              desc: "Our renders are so detailed that clients often mistake them for photographs. Every reflection, shadow, and grain of texture is intentionally placed.",
              emoji: "🎯",
            },
            {
              title: "Speed Without Compromise",
              desc: "Most projects are delivered in under a week. We've built workflows that let us move fast without cutting corners on quality.",
              emoji: "⚡",
            },
            {
              title: "Transparent Pricing",
              desc: "No hidden fees, no surprise charges. We quote upfront, and that's what you pay. Premium quality at rates that make sense for your project.",
              emoji: "💎",
            },
            {
              title: "Revisions Until Perfect",
              desc: "We don't believe in 'close enough.' Your project gets as many refinement rounds as it needs until every detail is exactly right.",
              emoji: "🔄",
            },
            {
              title: "Direct Communication",
              desc: "No account managers, no middlemen. You work directly with the designer who's bringing your vision to life. Questions get answered in hours, not days.",
              emoji: "💬",
            },
            {
              title: "End-to-End Delivery",
              desc: "From floor plans to photorealistic renders to walkthrough videos — we handle every stage so you don't have to coordinate between multiple vendors.",
              emoji: "🏗️",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="why-card p-7 sm:p-9 rounded-2xl border transition-all duration-500 cursor-default group"
              style={{
                borderColor: `${tertialColor}10`,
                backgroundColor: `${tertialColor}03`,
              }}
              onMouseMove={handleTilt}
              onMouseLeave={(e) => {
                handleTiltReset(e);
                e.currentTarget.style.borderColor = `${tertialColor}10`;
                e.currentTarget.style.backgroundColor = `${tertialColor}03`;
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${primaryColor}33`;
                e.currentTarget.style.backgroundColor = `${primaryColor}08`;
              }}
            >
              <span className="text-3xl sm:text-4xl block mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                {item.emoji}
              </span>
              <h3 className="font-avant font-bold text-base sm:text-lg mb-3"
                style={{ color: tertialColor }}>
                {item.title}
              </h3>
              <p className="font-avenir text-sm leading-relaxed"
                style={{ color: `${tertialColor}77` }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
