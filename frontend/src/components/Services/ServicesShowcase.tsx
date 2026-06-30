"use client";

import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { services } from "./data";

gsap.registerPlugin(ScrollTrigger);

function ServicesShowcaseContent() {
  const { primaryColor, secondaryColor, tertialColor } = useThemeStore();
  const showcaseRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab = tabParam ? parseInt(tabParam, 10) : 0;
  
  const [activeTab, setActiveTab] = useState<number>(
    !isNaN(initialTab) && initialTab >= 0 && initialTab < services.length ? initialTab : 0
  );

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      const tab = parseInt(tabParam, 10);
      if (!isNaN(tab) && tab >= 0 && tab < services.length) {
        setActiveTab(tab);
      }
    }
  }, [searchParams]);

  // Animate content when tab changes
  useGSAP(
    () => {
      gsap.fromTo(
        ".tab-content-anim",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out" }
      );
    },
    { dependencies: [activeTab], scope: contentRef }
  );

  // Initial scroll animation
  useGSAP(
    () => {
      gsap.fromTo(
        ".showcase-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: showcaseRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".showcase-tabs",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: showcaseRef.current, start: "top 80%" },
        }
      );
    },
    { scope: showcaseRef }
  );

  const activeService = services[activeTab];

  return (
    <div
      id="services-showcase"
      ref={showcaseRef}
      className="py-20 sm:py-32 px-5 sm:px-10 lg:px-20"
      style={{ backgroundColor: secondaryColor }}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header */}
      <div className="showcase-header max-w-7xl mx-auto mb-10 sm:mb-14">
        <p
          className="font-avant text-xs sm:text-sm tracking-[0.25em] uppercase mb-3"
          style={{ color: primaryColor }}
        >
          What We Offer
        </p>
        <h2
          className="font-avant text-3xl sm:text-4xl md:text-5xl leading-tight"
          style={{ color: tertialColor }}
        >
          Services Designed to
          <br />
          <span className="font-black">Elevate Your Project</span>
        </h2>
      </div>

      {/* Tabs Navigation */}
      <div className="showcase-tabs max-w-7xl mx-auto mb-10 sm:mb-16 relative">
        {/* Mobile horizontal scroll hint fade */}
        <div 
          className="md:hidden absolute -right-5 top-0 bottom-[17px] w-12 sm:w-20 pointer-events-none z-10" 
          style={{ background: `linear-gradient(to right, transparent, ${secondaryColor})` }} 
        />
        <div 
          className="md:hidden absolute -left-5 top-0 bottom-[17px] w-12 sm:w-20 pointer-events-none z-10" 
          style={{ background: `linear-gradient(to left, transparent, ${secondaryColor})` }} 
        />
        <div
          className="flex overflow-x-auto hide-scrollbar gap-2 sm:gap-3 pb-4 border-b -mx-5 px-5 sm:mx-0 sm:px-0"
          style={{ borderColor: `${tertialColor}15` }}
        >
          {services.map((s, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(idx)}
                className="whitespace-nowrap px-6 py-3 rounded-full font-avant font-bold text-sm sm:text-base transition-all duration-300"
                style={{
                  backgroundColor: isActive ? primaryColor : "transparent",
                  color: isActive ? secondaryColor : `${tertialColor}aa`,
                  border: `1px solid ${isActive ? primaryColor : `${tertialColor}15`}`,
                }}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div ref={contentRef} className="max-w-7xl mx-auto min-h-[600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column (Content) */}
          <div className="lg:col-span-5 flex flex-col gap-8 order-2 lg:order-1">
            <div className="tab-content-anim">
              <h3
                className="font-avant text-2xl sm:text-4xl font-black mb-2"
                style={{ color: tertialColor }}
              >
                {activeService.name}
              </h3>
              <p
                className="font-beach text-lg sm:text-xl"
                style={{ color: primaryColor }}
              >
                {activeService.tagline}
              </p>
            </div>

            <div className="tab-content-anim">
              <p
                className="font-avenir text-sm sm:text-[15px] leading-relaxed"
                style={{ color: `${tertialColor}bb` }}
              >
                {activeService.description}
              </p>
            </div>

            <div
              className="tab-content-anim p-6 sm:p-8 rounded-2xl border"
              style={{
                borderColor: `${tertialColor}10`,
                backgroundColor: `${tertialColor}03`,
              }}
            >
              <p
                className="font-avant font-bold text-xs tracking-[0.15em] uppercase mb-5"
                style={{ color: primaryColor }}
              >
                What You Get
              </p>
              <ul className="flex flex-col gap-3.5">
                {activeService.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <span
                      className="font-avenir text-sm"
                      style={{ color: `${tertialColor}cc` }}
                    >
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="tab-content-anim flex flex-wrap gap-8 sm:gap-12 pt-4 border-t"
              style={{ borderColor: `${tertialColor}15` }}
            >
              <div>
                <p
                  className="font-avant text-[10px] tracking-wider uppercase mb-1.5"
                  style={{ color: `${tertialColor}66` }}
                >
                  Ideal For
                </p>
                <p
                  className="font-avenir text-sm font-medium"
                  style={{ color: tertialColor }}
                >
                  {activeService.idealFor}
                </p>
              </div>
              <div>
                <p
                  className="font-avant text-[10px] tracking-wider uppercase mb-1.5"
                  style={{ color: `${tertialColor}66` }}
                >
                  Turnaround
                </p>
                <p
                  className="font-avenir text-sm font-medium"
                  style={{ color: primaryColor }}
                >
                  {activeService.turnaround}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (Images) */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4 order-1 lg:order-2">
            <div className="tab-content-anim relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] w-full group">
              <Image
                src={activeService.img}
                alt={activeService.name}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {activeService.galleryImgs.map((img, i) => (
                <div
                  key={i}
                  className="tab-content-anim relative rounded-xl overflow-hidden aspect-square sm:aspect-[4/3] group/thumb"
                >
                  <Image
                    src={img}
                    alt={`Gallery ${i}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-black/5 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesShowcase() {
  return (
    <Suspense fallback={<div className="min-h-screen py-20" />}>
      <ServicesShowcaseContent />
    </Suspense>
  );
}
