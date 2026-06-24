"use client";

import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { faqs } from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function FaqSection() {
  const { primaryColor, secondaryColor, tertialColor } = useThemeStore();
  const faqRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".faq-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: faqRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".faq-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: faqRef.current, start: "top 75%" },
        }
      );
    },
    { scope: faqRef }
  );

  return (
    <div
      ref={faqRef}
      className="py-20 sm:py-28 px-5 sm:px-10 lg:px-20"
      style={{ backgroundColor: tertialColor }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="faq-header text-center mb-14 sm:mb-20">
          <p className="font-avant text-xs sm:text-sm tracking-[0.25em] uppercase mb-3"
            style={{ color: primaryColor }}>
            Common Questions
          </p>
          <h2 className="font-avant text-3xl sm:text-4xl md:text-5xl leading-tight"
            style={{ color: secondaryColor }}>
            Everything You Need to{" "}
            <span className="font-black">Know</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="faq-item rounded-xl overflow-hidden border transition-all duration-400 cursor-pointer"
                style={{
                  borderColor: isOpen ? `${primaryColor}33` : `${secondaryColor}10`,
                  backgroundColor: isOpen ? `${primaryColor}08` : `${secondaryColor}04`,
                }}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between p-5 sm:p-6 gap-4">
                  <h3
                    className="font-avant font-bold text-sm sm:text-base transition-colors duration-300"
                    style={{ color: isOpen ? primaryColor : secondaryColor }}
                  >
                    {faq.q}
                  </h3>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-400"
                    style={{
                      backgroundColor: isOpen ? `${primaryColor}22` : `${secondaryColor}10`,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4L6 8L10 4" stroke={isOpen ? primaryColor : secondaryColor}
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div
                  className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}
                >
                  <p
                    className="px-5 sm:px-6 pb-5 sm:pb-6 font-avenir text-sm leading-relaxed"
                    style={{ color: `${secondaryColor}88` }}
                  >
                    {faq.a}
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
