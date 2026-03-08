"use client";
import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { tertialColor, secondaryColor, primaryColor } = useThemeStore();

  const row1 = [
    {
      id: 1,
      src: "/images/interior.jpg",
      width: "w-[210px]",
      height: "h-[210px]",
    },
    {
      id: 2,
      src: "/images/exterior.jpg",
      width: "w-[210px]",
      height: "h-[210px]",
    },
    { id: 3, src: "/images/arch.jpg", width: "w-[210px]", height: "h-[210px]" },
    {
      id: 4,
      src: "/images/exterior.jpg",
      width: "w-[210px]",
      height: "h-[210px]",
    },
  ];

  const row2 = [
    { id: 4, src: "/images/arch.jpg", width: "w-[210px]", height: "h-[210px]" },
    {
      id: 5,
      src: "/images/exterior.jpg",
      width: "w-[210px]",
      height: "h-[210px]",
    },
    {
      id: 6,
      src: "/images/interior.jpg",
      width: "w-[210px]",
      height: "h-[210px]",
    },
  ];

  const row3 = [
    {
      id: 7,
      src: "/images/exterior.jpg",
      width: "w-[210px]",
      height: "h-[210px]",
    },
    {
      id: 8,
      src: "/images/interior.jpg",
      width: "w-[210px]",
      height: "h-[210px]",
    },
    { id: 9, src: "/images/arch.jpg", width: "w-[210px]", height: "h-[210px]" },
    {
      id: 10,
      src: "/images/service.jpg",
      width: "w-[210px]",
      height: "h-[210px]",
    },
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
      className="min-h-screen px-[100px] overflow-hidden relative flex items-center justify-between py-[10vh]"
      style={{ backgroundColor: tertialColor }}
    >
      <Image
        src="/images/map.png"
        alt="Interior"
        width={1000}
        height={1000}
        className="w-full h-full object-cover opacity-20 absolute inset-0 pointer-events-none"
      />

      <div className="z-50 flex gap-5 flex-col w-[45%] shrink-0 proj-text">
        <h2
          className="font-avant text-2xl tracking-[0.2em] font-medium"
          style={{ color: secondaryColor }}
        >
          RECENT PROJECTS
        </h2>
        <p
          className="font-bold text-[3.5rem] leading-[1.1] font-avant"
          style={{ color: secondaryColor }}
        >
          A <span style={{ color: primaryColor }}>glimpse</span> into the
          <br /> spaces we’ve
          <br /> brought to life.
        </p>
      </div>

      <div
        id="proj-gallery"
        className="z-50 flex flex-col gap-6 w-[65%] h-full justify-center overflow-visible ml-20 group hover:translate-x-[20px] transition-transform duration-700 ease-in-out"
      >
        {/* Row 1 */}
        <div className="proj-row">
          <div className="flex gap-6 min-w-max translate-x-[40px]">
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
          </div>
        </div>

        {/* Row 2 */}
        <div className="proj-row">
          <div className="flex gap-6 min-w-max translate-x-[120px]">
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
          </div>
        </div>

        {/* Row 3 */}
        <div className="proj-row">
          <div className="flex gap-6 min-w-max -translate-x-[10px]">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
