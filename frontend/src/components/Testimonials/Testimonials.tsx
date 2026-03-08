"use client";
import React, { useRef } from "react";
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
    quote: `"We've been doing business with Sandeep 3D for several years now. They are the best in their domain and I would recommend them to anyone who needs this kind of service."`,
    name: "Kuldeep Kumar",
    role: "CEO, VaultMeet",
  },
];

const Testimonials = () => {
  const { tertialColor, secondaryColor } = useThemeStore();

  const sectionRef = useRef<HTMLElement>(null);

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
      className="py-24 px-[100px] flex flex-col justify-center min-h-screen py-[80px]"
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

      {/* Cards */}
      <div className="flex gap-10 justify-between items-stretch">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="relative w-1/3 rounded-2xl p-10 flex flex-col scale-90 test-card"
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
              <p className="text-lg leading-[1.6] text-white/90 font-light font-avant pr-4">
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
              <p className="text-sm text-white/60 font-light">
                {testimonial.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
