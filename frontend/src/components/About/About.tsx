"use client";

import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { primaryColor, secondaryColor, tertialColor } = useThemeStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Hero Text Reveal with blur and scale
      gsap.fromTo(".hero-title",
        { opacity: 0, y: 100, rotateZ: 3, scale: 0.9, filter: "blur(15px)" },
        { 
          opacity: 1, y: 0, rotateZ: 0, scale: 1, filter: "blur(0px)",
          duration: 2, ease: "expo.out"
        }
      );

      // 2. Parallax Images with scale scrub
      const parallaxImages = gsap.utils.toArray(".parallax-img");
      parallaxImages.forEach((img: any) => {
        gsap.fromTo(img,
          { yPercent: -15, scale: 1.2 },
          {
            yPercent: 15,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1, // Smooth scrub
            }
          }
        );
      });

      // 3. Stats Section Counter & 3D Reveal
      gsap.fromTo(".stats-title-reveal",
        { opacity: 0, x: -50, filter: "blur(10px)" },
        {
          opacity: 1, x: 0, filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-container",
            start: "top 80%",
          }
        }
      );

      const statItems = gsap.utils.toArray(".stat-item");
      statItems.forEach((item: any, i) => {
        const numberElement = item.querySelector(".stat-number");
        const targetValue = parseInt(numberElement.getAttribute("data-target") || "0");
        const suffix = numberElement.getAttribute("data-suffix") || "";
        
        // 3D slide-in
        gsap.fromTo(item,
          { opacity: 0, y: 80, rotateX: -40, transformPerspective: 1000 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ".stats-container",
              start: "top 75%",
            },
            delay: i * 0.15
          }
        );

        // Counter tween
        if (targetValue > 0) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: targetValue,
            duration: 2.5,
            ease: "expo.out",
            onUpdate: () => {
              if(numberElement) {
                numberElement.innerHTML = Math.floor(obj.val) + suffix;
              }
            },
            scrollTrigger: {
              trigger: ".stats-container",
              start: "top 75%",
            },
            delay: i * 0.15
          });
        }
      });

      // 4. Services List Stagger with skew
      const services = gsap.utils.toArray(".service-item");
      gsap.fromTo(services,
        { opacity: 0, x: -50, skewX: 5 },
        {
          opacity: 1, x: 0, skewX: 0, stagger: 0.15, duration: 1.2, ease: "expo.out",
          scrollTrigger: {
            trigger: ".services-container",
            start: "top 80%",
          }
        }
      );

      // 5. Process Steps Stagger
      const processSteps = gsap.utils.toArray(".process-step");
      gsap.fromTo(processSteps,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.2, duration: 1.5, ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-container",
            start: "top 75%",
          }
        }
      );

      // 6. Generic Text Reveal updates (add blur)
      const textRevealElements = gsap.utils.toArray(".text-reveal");
      textRevealElements.forEach((el: any) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0, filter: "blur(5px)" },
          { 
            y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      className="w-full min-h-screen font-avenir overflow-hidden selection:bg-black selection:text-white"
      style={{ backgroundColor: secondaryColor, color: tertialColor }}
      ref={containerRef}
    >
      {/* 1. HERO BANNER */}
      <section className="w-full pt-[150px] sm:pt-[200px] pb-[100px] px-[5vw] flex flex-col justify-end min-h-[50vh]">
        <h1 
          className="hero-title font-avant font-black text-[clamp(60px,10vw,150px)] uppercase tracking-tighter leading-[0.85]"
          style={{ color: primaryColor }}
        >
          About Us
        </h1>
      </section>

      {/* 2. VISION / ELEGANT PRECISION */}
      <section className="w-full px-[5vw] py-[100px] border-t" style={{ borderColor: `${primaryColor}30` }}>
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center lg:sticky lg:top-[20vh] self-start">
            <h2 className="text-sm uppercase tracking-[0.2em] mb-6 font-bold text-reveal" style={{ color: primaryColor }}>
              Elegant precision
            </h2>
            <div className="font-avant text-3xl sm:text-4xl lg:text-5xl leading-[1.2] uppercase text-reveal">
              We create interiors and architecture that balance form, function, and emotion.
            </div>
            <div className="mt-8 text-lg sm:text-xl opacity-80 leading-relaxed font-light text-reveal max-w-lg">
              Guided by light, material, and proportion, our work is dedicated to shaping timeless spaces that feel both purposeful and inspiring.
            </div>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 sm:gap-6 mt-12 lg:mt-0">
             <div className="col-span-2 h-[40vh] sm:h-[50vh] relative overflow-hidden rounded-xl">
               <Image src="/images/projNirvana.jpeg" alt="Architecture" fill className="object-cover parallax-img" />
             </div>
             <div className="col-span-1 h-[30vh] sm:h-[40vh] relative overflow-hidden rounded-xl">
               <Image src="/images/exterior1.jpeg" alt="Interior" fill className="object-cover parallax-img" />
             </div>
             <div className="col-span-1 h-[30vh] sm:h-[40vh] relative overflow-hidden rounded-xl">
               <Image src="/images/interior2.jpeg" alt="Detail" fill className="object-cover parallax-img" />
             </div>
          </div>
        </div>
      </section>

      {/* 3. STATISTICS */}
      <section className="w-full px-[5vw] py-[100px] bg-black text-white" style={{ backgroundColor: primaryColor, color: secondaryColor }}>
         <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            
            <div className="w-full lg:w-1/2 stats-container">
               <div className="text-sm uppercase tracking-[0.2em] mb-12 font-bold opacity-80 stats-title-reveal">
                 STATISTICS
               </div>
               <h3 className="font-avant text-4xl sm:text-5xl uppercase leading-[1.1] mb-16 max-w-md stats-title-reveal">
                 Measuring Our Impact
               </h3>

               <div className="grid grid-cols-2 gap-y-16 gap-x-8">
                  <div className="stat-item flex flex-col">
                     <span className="stat-number font-avant text-5xl sm:text-6xl font-black mb-2" data-target="50" data-suffix="+">0+</span>
                     <span className="text-sm font-bold uppercase tracking-wider mb-2">Projects Delivered</span>
                     <span className="text-sm opacity-80 font-light">and counting.</span>
                  </div>
                  <div className="stat-item flex flex-col">
                     <span className="stat-number font-avant text-5xl sm:text-6xl font-black mb-2" data-target="50" data-suffix="+">0+</span>
                     <span className="text-sm font-bold uppercase tracking-wider mb-2">Happy Clients</span>
                     <span className="text-sm opacity-80 font-light">across India.</span>
                  </div>
                  <div className="stat-item flex flex-col">
                     <span className="stat-number font-avant text-5xl sm:text-6xl font-black mb-2" data-target="5" data-suffix="+">0+</span>
                     <span className="text-sm font-bold uppercase tracking-wider mb-2">Years of Experience</span>
                     <span className="text-sm opacity-80 font-light">blending function with lasting form.</span>
                  </div>
                  <div className="stat-item flex flex-col">
                     <span className="stat-number font-avant text-5xl sm:text-6xl font-black mb-2" data-target="100" data-suffix="%">0%</span>
                     <span className="text-sm font-bold uppercase tracking-wider mb-2">Client Satisfaction</span>
                     <span className="text-sm opacity-80 font-light">our commitment.</span>
                  </div>
               </div>
            </div>

            <div className="w-full lg:w-1/2 h-[60vh] sm:h-[80vh] relative overflow-hidden rounded-xl">
               <Image src="/images/proj5.jpg" alt="Statistics" fill className="object-cover parallax-img grayscale hover:grayscale-0 transition-all duration-1000" />
            </div>

         </div>
      </section>

      {/* 4. WHAT WE DO */}
      <section className="w-full px-[5vw] py-[150px]">
         <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-8 text-reveal">
           <div>
             <div className="text-sm uppercase tracking-[0.2em] font-bold mb-4" style={{ color: primaryColor }}>What We Do</div>
             <h3 className="font-avant text-5xl sm:text-7xl uppercase leading-[0.9]">Expertise</h3>
           </div>
           <Link href="/our-services" className="text-sm font-bold uppercase tracking-[0.1em] border-b pb-1 hover:opacity-50 transition-opacity" style={{ borderColor: primaryColor }}>
             View All Services
           </Link>
         </div>

         <div className="services-container flex flex-col w-full border-t" style={{ borderColor: `${primaryColor}30` }}>
            {[
              { title: "Architecture", img: "/images/projArcadia.jpeg" },
              { title: "Interior Design", img: "/images/interior1.jpeg" },
              { title: "Master Planning", img: "/images/map.png" },
              { title: "Urban Planning", img: "/images/projNirvana.jpeg" },
              { title: "Residential", img: "/images/projGuest.jpeg" },
              { title: "Commercial", img: "/images/projNexus.jpeg" },
            ].map((srv, i) => (
              <div key={i} className="service-item group relative flex flex-col md:flex-row justify-between items-start md:items-center py-8 md:py-12 border-b cursor-pointer overflow-hidden" style={{ borderColor: `${primaryColor}30` }}>
                 <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 sm:gap-6">
                    <span className="font-avant text-sm sm:text-lg opacity-40 font-bold">0{i+1}</span>
                    <h4 className="font-avant text-3xl sm:text-5xl uppercase transition-transform duration-500 group-hover:translate-x-4" style={{ color: primaryColor }}>{srv.title}</h4>
                 </div>
                 <div className="hidden md:block text-sm uppercase tracking-widest z-10 font-bold mt-4 md:mt-0 transition-all duration-500 group-hover:-translate-x-4">
                    Explore
                 </div>
                 {/* Hover Image */}
                 <div className="absolute right-[10%] md:right-[20%] top-1/2 -translate-y-1/2 w-[250px] md:w-[350px] h-[150px] md:h-[220px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 overflow-hidden rounded-lg">
                    <Image src={srv.img} alt={srv.title} fill className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* 5. PROCESS */}
      <section className="w-full px-[5vw] py-[100px] border-t" style={{ borderColor: `${primaryColor}30` }}>
         <div className="text-sm uppercase tracking-[0.2em] font-bold mb-4 text-reveal" style={{ color: primaryColor }}>PROCESS</div>
         <h3 className="font-avant text-5xl sm:text-7xl uppercase leading-[0.9] mb-20 text-reveal">Our Process</h3>
         
         <div className="process-container grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="process-step flex flex-col">
               <div className="text-6xl sm:text-8xl font-avant font-black opacity-20 mb-6 leading-none">01</div>
               <h4 className="text-2xl font-bold uppercase mb-4 tracking-wider">Discovery</h4>
               <p className="opacity-80 font-light mb-6 text-lg">We start by understanding the context, site conditions, and your unique vision to set a solid foundation.</p>
               <div className="flex flex-wrap gap-2">
                 <span className="px-4 py-2 border rounded-full text-xs uppercase font-bold" style={{ borderColor: primaryColor }}>Site Analysis</span>
                 <span className="px-4 py-2 border rounded-full text-xs uppercase font-bold" style={{ borderColor: primaryColor }}>Initial Sketch</span>
               </div>
            </div>
            <div className="process-step flex flex-col">
               <div className="text-6xl sm:text-8xl font-avant font-black opacity-20 mb-6 leading-none">02</div>
               <h4 className="text-2xl font-bold uppercase mb-4 tracking-wider">Definition</h4>
               <p className="opacity-80 font-light mb-6 text-lg">We refine the concepts into detailed designs, selecting materials and establishing space planning.</p>
               <div className="flex flex-wrap gap-2">
                 <span className="px-4 py-2 border rounded-full text-xs uppercase font-bold" style={{ borderColor: primaryColor }}>3D Modeling</span>
                 <span className="px-4 py-2 border rounded-full text-xs uppercase font-bold" style={{ borderColor: primaryColor }}>Material Select</span>
               </div>
            </div>
            <div className="process-step flex flex-col">
               <div className="text-6xl sm:text-8xl font-avant font-black opacity-20 mb-6 leading-none">03</div>
               <h4 className="text-2xl font-bold uppercase mb-4 tracking-wider">Execution</h4>
               <p className="opacity-80 font-light mb-6 text-lg">The final phase involves delivering precise technical drawings and overseeing the realization of the project.</p>
               <div className="flex flex-wrap gap-2">
                 <span className="px-4 py-2 border rounded-full text-xs uppercase font-bold" style={{ borderColor: primaryColor }}>Technical Drawings</span>
                 <span className="px-4 py-2 border rounded-full text-xs uppercase font-bold" style={{ borderColor: primaryColor }}>Project Handover</span>
               </div>
            </div>
         </div>
      </section>

      {/* 6. TEAM / OWNER */}
      <section className="w-full px-[5vw] py-[100px] sm:py-[150px] flex flex-col items-center border-t" style={{ borderColor: `${primaryColor}30` }}>
         <div className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold mb-8 sm:mb-12 text-reveal text-center" style={{ color: primaryColor }}>Leadership</div>
         
         <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden group text-reveal">
            <div className="w-full h-[50vh] sm:h-[80vh] relative cursor-pointer">
               <Image src="/images/Owner.jpg" alt="Sandeep - Founder" fill className="object-cover object-center grayscale-0 sm:grayscale group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 sm:p-12 text-white opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h4 className="font-avant text-2xl sm:text-6xl uppercase font-black mb-1 sm:mb-2">Sandeep</h4>
                  <p className="text-sm sm:text-xl uppercase tracking-[0.2em] opacity-80 mb-0 sm:mb-6">Founder & Principal Architect</p>
                  <p className="hidden sm:block max-w-xl font-light text-base leading-relaxed opacity-90">
                    "Architecture is the art of giving form to the invisible. Every line drawn and material chosen is a deliberate step toward an enduring legacy."
                  </p>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default About;
