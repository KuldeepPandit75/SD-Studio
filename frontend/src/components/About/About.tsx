"use client";

import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { primaryColor, secondaryColor, tertialColor } = useThemeStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".about-image-reveal",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(
      ".about-text-reveal",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
      "-=0.8"
    );
    
    const sections = gsap.utils.toArray(".about-section");
    sections.forEach((section: any) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div 
      className="w-full min-h-screen pt-[120px] sm:pt-[150px] pb-20 px-[20px] sm:px-[3vw] font-avenir overflow-hidden" 
      style={{ backgroundColor: secondaryColor, color: tertialColor }}
      ref={containerRef}
    >
      {/* Owner Section */}
      <section className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center lg:items-stretch max-w-[1400px] mx-auto min-h-[70vh]">
        
        {/* Image side */}
        <div className="w-full lg:w-1/2 relative about-image-reveal h-[60vh] lg:h-auto overflow-hidden rounded-[2rem]">
          <Image 
            src="/images/Owner.jpg"
            alt="Owner of SD Studio"
            fill
            className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Text side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 sm:space-y-10 py-10 lg:py-0">
          <div>
            <h1 className="font-avant font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter uppercase about-text-reveal" style={{ color: primaryColor }}>
              Visionary
            </h1>
            <h2 className="font-beach text-3xl sm:text-4xl lg:text-5xl mt-2 about-text-reveal">
              Behind the Studio
            </h2>
          </div>
          
          <div className="space-y-6 text-lg sm:text-xl font-light leading-relaxed about-text-reveal">
            <p>
              Every great space begins with a visionary who understands the profound impact of architecture and design on the human experience. At SD Studio, our founder has always believed that spaces should do more than just exist—they should inspire, comfort, and endure.
            </p>
            <p>
              With a background rooted in both classical architecture and modern aesthetics, the journey started with a simple notebook and a passion for creating. Over the years, that passion has transformed into a multidisciplinary studio that redefines how we interact with our environments.
            </p>
          </div>

          <div className="pt-8 border-t about-text-reveal" style={{ borderColor: primaryColor }}>
            <h3 className="font-avant font-bold text-2xl uppercase tracking-widest">
              Sandeep
            </h3>
            <p className="opacity-70 mt-1">Founder & Principal Designer</p>
          </div>
        </div>
      </section>

      {/* About The Company Section */}
      <section className="about-section mt-32 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
           <div className="w-full lg:w-1/2 lg:order-2">
             <div className="relative h-[40vh] sm:h-[50vh] w-full overflow-hidden rounded-[2rem]">
                <Image 
                  src="/images/arch.jpg"
                  alt="SD Studio Architecture"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
             </div>
           </div>
           
           <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 lg:order-1">
              <h2 className="font-avant font-black text-4xl sm:text-6xl tracking-tighter uppercase" style={{ color: primaryColor }}>
                Our Studio
              </h2>
              <div className="space-y-6 text-lg sm:text-xl font-light leading-relaxed">
                <p>
                  SD Studio is a premier architectural and interior design firm dedicated to crafting spaces that tell a unique story. We merge functionality with striking aesthetics to build environments that elevate everyday living.
                </p>
                <p>
                  Our team consists of passionate architects, innovative designers, and meticulous project managers who collaborate closely with each client. We pride ourselves on a process that is transparent, highly personalized, and driven by an uncompromising attention to detail.
                </p>
                <p>
                  From concept to completion, we approach every project as an opportunity to push boundaries and create something timeless.
                </p>
              </div>
           </div>
        </div>
      </section>
      
      {/* Philosophy Section */}
      <section className="about-section mt-32 max-w-[1400px] mx-auto mb-20 text-center px-4 sm:px-10 py-20 rounded-[2rem]" style={{ backgroundColor: primaryColor, color: secondaryColor }}>
        <h2 className="font-avant font-black text-4xl sm:text-6xl tracking-tighter uppercase mb-10">
          Our Philosophy
        </h2>
        <p className="font-avenir text-xl sm:text-3xl max-w-4xl mx-auto leading-relaxed font-light">
          "Design is not just what it looks like and feels like. Design is how it works. We believe in creating harmonious spaces where form gracefully meets function, leaving a lasting impression for generations."
        </p>
      </section>

    </div>
  );
};

export default About;
