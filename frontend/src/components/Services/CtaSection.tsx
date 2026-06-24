"use client";

import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import { handleMagneticMove, handleMagneticLeave } from "./utils";

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const { primaryColor, secondaryColor, tertialColor } = useThemeStore();
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cta-inner",
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 80%" },
        }
      );
    },
    { scope: ctaRef }
  );

  return (
    <div
      ref={ctaRef}
      className="py-24 sm:py-36 px-5 sm:px-10 lg:px-20 relative overflow-hidden"
      style={{ backgroundColor: secondaryColor }}
    >
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${primaryColor}, transparent 70%)` }} />
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-[0.06] pointer-events-none"
        style={{ backgroundColor: primaryColor }} />
      <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full opacity-[0.04] pointer-events-none"
        style={{ backgroundColor: primaryColor }} />

      <div className="cta-inner max-w-3xl mx-auto text-center relative z-10">
        <p className="font-avant text-xs sm:text-sm tracking-[0.25em] uppercase mb-4"
          style={{ color: primaryColor }}>
          Let's Create Together
        </p>
        <h2 className="font-avant text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6"
          style={{ color: tertialColor }}>
          Your Space Deserves to Be{" "}
          <span style={{ color: primaryColor }}>Seen</span> Before It's{" "}
          <span style={{ color: primaryColor }}>Built</span>
        </h2>
        <p className="font-avenir text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-12"
          style={{ color: `${tertialColor}88` }}>
          Whether you're an architect presenting to a client, a builder pitching
          to an investor, or a homeowner dreaming of a new space — we're ready to
          make your project real.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className="font-avant font-bold px-10 py-4 rounded-full text-base sm:text-lg transition-transform duration-300"
            style={{ backgroundColor: primaryColor, color: secondaryColor }}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onClick={() => {
              window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
            }}
          >
            Start Your Project
          </button>
          <Link
            href="/project"
            className="font-avant font-bold px-10 py-4 rounded-full text-base sm:text-lg border-2 transition-all duration-300 hover:scale-105 inline-block"
            style={{ borderColor: tertialColor, color: tertialColor }}
          >
            View Portfolio
          </Link>
        </div>

        {/* Trust Nudge */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {["Free Consultation", "No Hidden Costs", "Quick Turnaround"].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="7" fill={primaryColor} fillOpacity="0.15" />
                <path d="M4 7L6 9L10 5" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-avenir text-xs sm:text-sm" style={{ color: `${tertialColor}88` }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
