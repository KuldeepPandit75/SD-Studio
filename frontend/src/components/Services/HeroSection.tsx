"use client";

import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { handleMagneticMove, handleMagneticLeave } from "./utils";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { primaryColor, secondaryColor, tertialColor } = useThemeStore();
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Cinematic text reveal — word by word
      tl.fromTo(
        ".hero-word",
        { y: 120, rotateX: 90, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
        }
      );

      tl.fromTo(
        ".hero-subtitle-line",
        { y: 30, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      );

      tl.fromTo(
        ".hero-cta-group",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.3"
      );

      // Floating badge animation
      gsap.to(".floating-badge", {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      // Parallax video
      gsap.to(".hero-video-bg", {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Hero content fade out on scroll
      gsap.to(".hero-content-inner", {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "60% center",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: heroRef }
  );

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background Video */}
      <video
        src="/videos/services.mp4"
        className="hero-video-bg absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-115"
        loop
        muted
        autoPlay
        playsInline
      />

      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 z-[1]" style={{
        background: `linear-gradient(180deg, ${tertialColor}ee 0%, ${tertialColor}aa 40%, ${tertialColor}cc 70%, ${tertialColor}ff 100%)`
      }} />
      <div className="absolute inset-0 z-[2] opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(${secondaryColor} 1px, transparent 1px)`,
        backgroundSize: "30px 30px",
      }} />


      {/* Content */}
      <div className="hero-content-inner relative z-10 text-center px-4 sm:px-6 w-full max-w-[95vw] xl:max-w-7xl mx-auto mt-14">
        {/* Eyebrow */}
        <div className="overflow-hidden mb-6">
          <p
            className="hero-word font-avant text-xs sm:text-sm tracking-[0.35em] uppercase"
            style={{ color: primaryColor }}
          >
            — Our Services —
          </p>
        </div>

        {/* Main Title with word-by-word reveal */}
        <div className="mb-8" style={{ perspective: "1000px" }}>
          <h1
            className="font-avant text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.1]"
            style={{ color: secondaryColor }}
          >
            {["We", "Don't", "Just", "Design"].map((word, i) => (
              <span key={`w1-${i}`} className="inline-block overflow-hidden mx-[0.15em]">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
            <span className="inline-block overflow-hidden mx-[0.15em]">
              <span className="hero-word inline-block" style={{ color: primaryColor }}>
                Spaces.
              </span>
            </span>
            <span className="inline-block w-[0.2em] sm:w-[0.4em]"></span>
            {["We", "Build"].map((word, i) => (
              <span key={`w2-${i}`} className="inline-block overflow-hidden mx-[0.15em]">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
            <span className="inline-block overflow-hidden mx-[0.15em]">
              <span className="hero-word inline-block" style={{ color: primaryColor }}>
                Emotions.
              </span>
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="max-w-4xl mx-auto mb-14">
          <p className="hero-subtitle-line font-avenir text-base sm:text-xl leading-relaxed"
            style={{ color: `${secondaryColor}bb` }}>
            From the first sketch to the final photorealistic render — we transform architectural ideas into visual experiences that inspire confidence and ignite imagination.
          </p>
        </div>

        {/* CTAs */}
        <div className="hero-cta-group flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className="font-avant font-bold px-10 py-4 rounded-full text-base sm:text-lg transition-transform duration-300"
            style={{ backgroundColor: primaryColor, color: tertialColor }}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onClick={() => {
              document.getElementById("services-showcase")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore What We Do
          </button>
          <button
            className="font-avant font-bold px-10 py-4 rounded-full text-base sm:text-lg border transition-all duration-300"
            style={{ borderColor: `${secondaryColor}44`, color: secondaryColor }}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onClick={() => {
              window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
            }}
          >
            Get a Free Quote
          </button>
        </div>
      </div>
    </div>
  );
}
