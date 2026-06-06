"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: `"We've been doing business with Sandeep 3D for several years now. They are the best in their domain and I would recommend them to anyone who needs this kind of service."`,
    name: "Ram Jatan Pandit",
    role: "Proprietor, Sandeep Constrution",
  },
  {
    quote:
      "Sandeep 3D is one of the most valuable parts of my design business. They bring my presentations to another level of excellence. Dependable, affordable, and always on trend.",
    name: "Avinash Sinde",
    role: "Founder, Spacescape",
  },
  {
    quote: `"Working with Sandeep 3D has been a fantastic experience. Their attention to detail and realistic visualizations helped us present our projects with complete confidence. The team is professional, responsive, and always delivers high-quality work."`,
    name: "Kuldeep Kumar",
    role: "CEO, VaultMeet",
  },
];

const Testimonials = () => {
  const { tertialColor, secondaryColor } = useThemeStore();

  const sectionRef = useRef<HTMLElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const lastFrameTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);
  const touchStartRef = useRef<number>(0);

  // Reset progress when activeTestimonial changes
  useEffect(() => {
    accumulatedTimeRef.current = 0;
    setProgress(0);
  }, [activeTestimonial]);

  useEffect(() => {
    let animationFrameId: number;

    const animateProgress = (timestamp: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;

      if (!isPaused) {
        accumulatedTimeRef.current += deltaTime;
        const newProgress = Math.min((accumulatedTimeRef.current / 5000) * 100, 100);
        setProgress(newProgress);

        if (accumulatedTimeRef.current >= 5000) {
          setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }
      }

      animationFrameId = requestAnimationFrame(animateProgress);
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lastFrameTimeRef.current = 0;
    };
  }, [isPaused]);

  const handlePointerDown = () => {
    touchStartRef.current = Date.now();
    setIsPaused(true);
  };

  const handlePointerUp = () => {
    setIsPaused(false);
    const touchDuration = Date.now() - touchStartRef.current;
    if (touchDuration < 200) {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }
  };

  const handlePointerLeave = () => {
    if (isPaused) {
      setIsPaused(false);
    }
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        ".test-header",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );

      tl.fromTo(
        ".test-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.5)",
        },
        "-=0.4",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="px-[20px] sm:px-[100px] flex flex-col justify-center min-h-screen py-[80px]"
      style={{ backgroundColor: secondaryColor }}
    >
      {/* Header */}
      <div className="mb-16 mt-5 test-header">
        <p
          className="font-avant text-sm tracking-[0.2em] mb-4 uppercase"
          style={{ color: tertialColor }}
        >
          TESTIMONIALS
        </p>
        <h2
          className="text-[2.5rem] font-avant leading-tight"
          style={{ color: tertialColor }}
        >
          The <span className="font-black">Trust</span> We{" "}
          <span className="font-black">Build</span>
        </h2>
      </div>

      {/* Cards Desktop */}
      <div className="sm:flex gap-10 justify-between items-stretch hidden select-none">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="relative min-w-[350px] w-1/3 rounded-2xl p-10 flex flex-col scale-90 test-card"
            style={{ backgroundColor: tertialColor, color: secondaryColor }}
          >
            {/* Quote Icon */}
            <div className="absolute -top-12 -right-4 w-28 h-28 select-none pointer-events-none">
              <Image
                src="/icons/‘’.svg"
                alt="Quote"
                fill
                className="object-contain drop-shadow-lg"
              />
            </div>

            {/* Top Icon Area */}
            <div className="mb-8">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6ZM12 20C9.68 20 7.6 18.9 6.26 17.18C6.31 15.28 10.1 14.2 12 14.2C13.88 14.2 17.69 15.28 17.74 17.18C16.4 18.9 14.32 20 12 20Z"
                  fill={secondaryColor}
                />
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1 mb-[5rem]">
              <p className="text-lg leading-[1.6] text-white/90 font-light font-avant pr-4 select-none">
                {testimonial.quote}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-auto">
              <p
                className="font-amsterdam text-[1.5rem] tracking-wide leading-none mb-3 text-white/90 mb-10"
                style={{ transform: "rotate(-2deg)" }}
              >
                {testimonial.name}
              </p>
              <p className="text-sm text-white/60 font-light font-avant">
                {testimonial.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Cards Container */}
      <div className="sm:hidden flex flex-col items-center mt-4 test-card">
        <div 
          className="grid w-full"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onPointerCancel={handlePointerLeave}
        >
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className={`col-start-1 row-start-1 w-full rounded-2xl p-8 flex flex-col transition-opacity duration-700 ease-in-out ${
                idx === activeTestimonial
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
              style={{ backgroundColor: tertialColor, color: secondaryColor }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-6 -right-2 w-20 h-20 select-none pointer-events-none">
                <Image
                  src="/icons/‘’.svg"
                  alt="Quote"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>

              {/* Top Icon Area */}
              <div className="mb-6">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6ZM12 20C9.68 20 7.6 18.9 6.26 17.18C6.31 15.28 10.1 14.2 12 14.2C13.88 14.2 17.69 15.28 17.74 17.18C16.4 18.9 14.32 20 12 20Z"
                    fill={secondaryColor}
                  />
                </svg>
              </div>

              {/* Text */}
              <div className="flex-1 mb-[3rem]">
                <p className="text-base leading-[1.6] text-white/90 font-light font-avant pr-2">
                  {testimonial.quote}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-auto">
                <p
                  className="font-amsterdam text-[1.2rem] tracking-wide leading-none mb-4 text-white/90"
                  style={{ transform: "rotate(-2deg)" }}
                >
                  {testimonial.name}
                </p>
                <p className="text-xs text-white/60 font-light font-avant">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div className="flex items-center gap-2 mt-8 w-full max-w-[150px]">
          {testimonials.map((_, idx) => {
            const isActive = idx === activeTestimonial;
            return (
              <div
                key={idx}
                className="relative flex-1 h-[3px] rounded-full cursor-pointer overflow-hidden transition-all duration-500 ease-in-out"
                onClick={() => setActiveTestimonial(idx)}
              >
                {/* Track background */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: tertialColor, opacity: 0.2 }}
                />
                {/* Progress foreground */}
                <div
                  className="absolute top-0 left-0 h-full rounded-full transition-none"
                  style={{
                    width: isActive ? `${progress}%` : "0%",
                    backgroundColor: tertialColor,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
