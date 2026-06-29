"use client";

import { useEffect, useRef } from "react";
import { PROJECTS } from "@/src/components/Services/data";

const CYCLE_HEIGHT = 3000;

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;
      
      const scrollY = window.scrollY;

      // Calculate angle: 1 cycle height corresponds to 360 degrees
      const scrollFraction = scrollY / CYCLE_HEIGHT;
      const angle = scrollFraction * 360;
      
      carouselRef.current.style.transform = `rotateY(${angle}deg)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // The wrapper height is exactly 1 cycle + window height.
    // Lenis infinite will seamlessly loop this exact distance!
    <div style={{ height: `calc(${CYCLE_HEIGHT}px + 100vh)` }} className="w-full">
      {/* Sticky makes the carousel stay on screen while scrolling */}
      <div id="gallery-crousel" className="sticky top-0 h-[100dvh] w-full perspective-[1000px] overflow-hidden flex items-center justify-center">
        <div className="absolute translate-z-[1000px] transform-3d">
          <div ref={carouselRef} className="transform-3d -translate-y-[300px]" style={{ transform: "rotateY(0deg)" }}>
            {PROJECTS.map((project, index) => {
              // 10 projects, so 360 / 10 = 36 degrees apart
              const angle = index * 36;
              const isTop = index % 2 === 0;
              
              const yTranslateClass = isTop
                ? "-translate-y-[600px]"
                : "translate-y-[100px]";
              const xRotateClass = isTop ? "-rotate-x-20" : "rotate-x-20";
              const zTranslateClass = index === 0 ? "-translate-z-[3000px]" : "-translate-z-[2800px]";

              return (
                <div
                  key={project.id}
                  id={`pic${index + 1}`}
                  className="absolute transform-3d"
                  style={{ transform: `rotateY(${angle}deg)` }}
                >
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 ${zTranslateClass} ${yTranslateClass} ${xRotateClass}`}
                  >
                    {/* Standard img tag guarantees the div perfectly wraps the intrinsic image size */}
                    <div className="relative group overflow-hidden cursor-pointer shadow-2xl rounded-[40px]">
                      <img 
                        src={project.image} 
                        alt={project.name.replace('\n', ' ')} 
                        className="block max-w-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-center items-center p-6 sm:p-12 text-white text-center">
                        <h2 className="font-avant text-5xl sm:text-8xl font-bold mb-10 whitespace-pre-line leading-tight tracking-tight">{project.name.replace('\\n', '\n')}</h2>
                        <div className="grid grid-cols-[auto_1fr] gap-x-16 gap-y-6 text-2xl sm:text-4xl font-avenir text-left">
                          <div className="font-light text-white/70 uppercase tracking-[0.2em] text-[14px] sm:text-[18px] self-center text-right">Year</div>
                          <div className="font-light">{project.year}</div>
                          
                          <div className="font-light text-white/70 uppercase tracking-[0.2em] text-[14px] sm:text-[18px] self-center text-right">Location</div>
                          <div className="font-light">{project.location}</div>
                          
                          <div className="font-light text-white/70 uppercase tracking-[0.2em] text-[14px] sm:text-[18px] self-center text-right">Category</div>
                          <div className="font-light">{project.type}</div>
                          
                          <div className="font-light text-white/70 uppercase tracking-[0.2em] text-[14px] sm:text-[18px] self-center text-right">Area</div>
                          <div className="font-light">{project.size}</div>

                          <div className="font-light text-white/70 uppercase tracking-[0.2em] text-[14px] sm:text-[18px] self-center text-right">Status</div>
                          <div className="font-light">{project.status}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
