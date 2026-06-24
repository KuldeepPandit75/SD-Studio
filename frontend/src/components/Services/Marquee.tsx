"use client";

import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { services } from "./data";

export default function Marquee() {
  const { primaryColor, tertialColor } = useThemeStore();
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const marquee = marqueeRef.current;
      if (!marquee) return;
      const inner = marquee.querySelector(".marquee-inner");
      if (!inner) return;

      gsap.to(inner, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    },
    { scope: marqueeRef }
  );

  return (
    <div
      ref={marqueeRef}
      className="py-5 overflow-hidden"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="marquee-inner flex whitespace-nowrap w-max">
        {[...Array(4)].map((_, repeat) =>
          services.map((s, i) => (
            <span
              key={`${repeat}-${i}`}
              className="font-avant font-bold text-sm sm:text-base tracking-[0.15em] uppercase mx-8 sm:mx-12"
              style={{ color: tertialColor }}
            >
              {s.name} <span className="opacity-30 mx-3">✦</span>
            </span>
          ))
        )}
      </div>
    </div>
  );
}
