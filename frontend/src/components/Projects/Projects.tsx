"use client";
import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { tertialColor, secondaryColor, primaryColor } = useThemeStore();
  const router = useRouter();

  const row1 = [
    { id: 1, src: "/images/interior.jpg", width: "w-[210px]", height: "h-[210px]" },
    { id: 2, src: "/images/exterior.jpg", width: "w-[210px]", height: "h-[210px]" },
    { id: 3, src: "/images/proj1.jpg", width: "w-[210px]", height: "h-[210px]" },
    { id: 4, src: "/images/proj2.jpg", width: "w-[210px]", height: "h-[210px]" },
    { id: 5, src: "/images/projApex.jpeg", width: "w-[210px]", height: "h-[210px]" },
    { id: 6, src: "/images/interior3.jpeg", width: "w-[210px]", height: "h-[210px]" },
  ];

  const row2 = [
    { id: 7, src: "/images/proj3.jpg", width: "w-[210px]", height: "h-[210px]" },
    { id: 8, src: "/images/proj4.jpg", width: "w-[210px]", height: "h-[210px]" },
    { id: 9, src: "/images/proj5.jpg", width: "w-[210px]", height: "h-[210px]" },
    { id: 10, src: "/images/projArcadia.jpeg", width: "w-[210px]", height: "h-[210px]" },
    { id: 11, src: "/images/proj10.jpg", width: "w-[210px]", height: "h-[210px]" },
    { id: 12, src: "/images/projCanopy.jpeg", width: "w-[210px]", height: "h-[210px]" },
  ];

  const row3 = [
    { id: 13, src: "/images/proj6.jpg", width: "w-[210px]", height: "h-[210px]" },
    { id: 14, src: "/images/proj7.jpg", width: "w-[210px]", height: "h-[210px]" },
    { id: 15, src: "/images/proj8.jpg", width: "w-[210px]", height: "h-[210px]" },
    { id: 16, src: "/images/proj9.jpg", width: "w-[210px]", height: "h-[210px]" },
    { id: 17, src: "/images/projObsidian.jpeg", width: "w-[210px]", height: "h-[210px]" },
    { id: 18, src: "/images/interior1.jpeg", width: "w-[210px]", height: "h-[210px]" },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        ".proj-text",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
      );

      tl.fromTo(
        ".proj-row",
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" },
        "-=0.5",
      );
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="min-h-screen px-[20px] sm:px-[100px] overflow-hidden relative flex sm:items-center sm:justify-between py-[10vh] flex-col sm:flex-row"
      style={{ backgroundColor: tertialColor }}
    >
      <Image
        src="/images/map.png"
        alt="Interior"
        width={1000}
        height={1000}
        className="w-full h-full object-cover opacity-20 absolute inset-0 pointer-events-none"
      />
      <style>{`
        @media (max-width: 639px) {
          .marquee-right {
            animation: scroll-right 20s linear infinite;
          }
          .marquee-left {
            animation: scroll-left 20s linear infinite;
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          @keyframes scroll-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        }
      `}</style>

      <div className="z-50 flex gap-5 flex-col w-[70%] sm:w-[45%] shrink-0 proj-text">
        <h2
          className="font-avant text-sm sm:text-xl tracking-[0.2em] font-medium"
          style={{ color: secondaryColor }}
        >
          RECENT PROJECTS
        </h2>
        <p
          className="font-bold text-[2.5rem] sm:text-[3.5rem] leading-[1.1] font-avant"
          style={{ color: secondaryColor }}
        >
          A <span style={{ color: primaryColor }}>glimpse</span> into the
          <br /> spaces we’ve
          <br /> brought to life.
        </p>
      </div>

      <div
        id="proj-gallery"
        className="group peer z-50 flex flex-col gap-6 w-[65%] h-full justify-center overflow-visible ml-20 transition-transform duration-700 ease-in-out -translate-x-[200px] sm:translate-x-0 sm:scale-100 scale-80 hover:-translate-x-[180px] sm:hover:translate-x-[20px] cursor-pointer"
        onClick={() => router.push("/projects")}
      >
        {/* Row 1 */}
        <div className="proj-row">
          <div className="flex gap-6 pr-6 min-w-max sm:translate-x-[40px] max-sm:ml-[40px] marquee-right">
            {row1.map((img) => (
              <div
                key={img.id}
                className={`${img.width} ${img.height} relative rounded-2xl overflow-hidden shadow-2xl shrink-0 group-hover:scale-95 transition-transform duration-700 ease-in-out`}
              >
                <Image
                  src={img.src}
                  alt="Project"
                  fill
                  className="object-cover "
                />
              </div>
            ))}
            {row1.map((img) => (
              <div
                key={`dup-${img.id}`}
                className={`${img.width} ${img.height} relative rounded-2xl overflow-hidden shadow-2xl shrink-0 sm:hidden`}
              >
                <Image
                  src={img.src}
                  alt="Project"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="proj-row">
          <div className="flex gap-6 pr-6 min-w-max sm:translate-x-[120px] max-sm:ml-[120px] marquee-left">
            {row2.map((img) => (
              <div
                key={img.id}
                className={`${img.width} ${img.height} relative rounded-2xl overflow-hidden shadow-2xl shrink-0 group-hover:scale-95 transition-transform duration-700 ease-in-out`}
              >
                <Image
                  src={img.src}
                  alt="Project"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {row2.map((img) => (
              <div
                key={`dup-${img.id}`}
                className={`${img.width} ${img.height} relative rounded-2xl overflow-hidden shadow-2xl shrink-0 sm:hidden`}
              >
                <Image
                  src={img.src}
                  alt="Project"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 */}
        <div className="proj-row">
          <div className="flex gap-6 pr-6 min-w-max sm:-translate-x-[10px] max-sm:-ml-[10px] marquee-right">
            {row3.map((img) => (
              <div
                key={img.id}
                className={`${img.width} ${img.height} relative rounded-2xl overflow-hidden shadow-2xl shrink-0 group-hover:scale-95 transition-transform duration-700 ease-in-out`}
              >
                <Image
                  src={img.src}
                  alt="Project"
                  fill
                  // className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                  className="object-cover"
                />
              </div>
            ))}
            {row3.map((img) => (
              <div
                key={`dup-${img.id}`}
                className={`${img.width} ${img.height} relative rounded-2xl overflow-hidden shadow-2xl shrink-0 sm:hidden`}
              >
                <Image
                  src={img.src}
                  alt="Project"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Gradient Overlay on Hover */}
      <Link 
        href="/projects" 
        className="absolute right-0 top-0 bottom-0 w-[100px] sm:w-[140px] z-[60] flex items-center justify-center opacity-0 peer-hover:opacity-100 hover:opacity-100 transition-opacity duration-700 ease-in-out cursor-pointer"
        style={{ background: `linear-gradient(to right, transparent, ${primaryColor})` }}
      >
        <div 
          className="font-avant text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase -rotate-90 whitespace-nowrap"
          style={{ color: secondaryColor }}
        >
          Explore Projects
        </div>
      </Link>
    </div>
  );
};

export default Projects;
