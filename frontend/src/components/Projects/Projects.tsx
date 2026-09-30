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
      className="min-h-screen px-[20px] sm:px-[100px] overflow-hidden relative flex justify-center sm:items-center sm:justify-between gap-10 sm:gap-0 py-[12vh] sm:py-[10vh] flex-col sm:flex-row"
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
        .marquee-scroll {
          animation: marquee-left-scroll 25s linear infinite;
        }
        /* Tiles fade out toward the left edge. Shorter fade on phones. */
        .proj-mask {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 18%, black 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 18%, black 100%);
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
        }
        @media (min-width: 640px) {
          .proj-mask {
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 30%, black 100%);
            mask-image: linear-gradient(to right, transparent 0%, black 30%, black 100%);
          }
        }
        @keyframes marquee-left-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="z-50 flex gap-4 sm:gap-5 flex-col w-full sm:w-[45%] shrink-0 proj-text">
        <h2
          className="font-avant text-xs sm:text-xl tracking-[0.2em] font-medium"
          style={{ color: secondaryColor }}
        >
          RECENT PROJECTS
        </h2>
        <p
          className="font-bold text-[clamp(1.75rem,8.2vw,2.5rem)] sm:text-[3.5rem] leading-[1.1] font-avant"
          style={{ color: secondaryColor }}
        >
          A <span style={{ color: primaryColor }}>glimpse</span> into the
          <br /> spaces we’ve
          <br /> brought to life.
        </p>
      </div>

      {/* Phones: full-bleed edge to edge. Desktop: right 65%, bleeding off the right edge. */}
      <div className="proj-mask group z-50 flex items-center relative w-[calc(100%+40px)] -mx-[20px] sm:ml-0 sm:-mr-[100px] sm:w-[65%] sm:h-full">
        {/* Colorless blur that only affects the tiles, strongest at the left edge */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[20%] sm:w-[35%] z-[55] pointer-events-none backdrop-blur-md"
          style={{
            maskImage: "linear-gradient(to right, black 0%, black 30%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, black 0%, black 30%, transparent 100%)",
          }}
        />

        <div
          id="proj-gallery"
          className="flex flex-col gap-3 sm:gap-6 w-full h-full justify-center sm:ml-20 transition-transform duration-700 ease-in-out sm:group-hover:translate-x-[20px] cursor-pointer"
          onClick={() => router.push("/projects")}
        >
          {/* Row 1 */}
          <div className="proj-row">
            <div className="flex gap-3 pr-3 sm:gap-6 sm:pr-6 min-w-max marquee-scroll">
              {[...row1, ...row1].map((img, i) => (
                <div
                  key={`r1-${i}`}
                  className={`w-[140px] h-[140px] sm:w-[210px] sm:h-[210px] relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shrink-0 group-hover:scale-95 transition-transform duration-700 ease-in-out`}
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
            <div className="flex gap-3 pr-3 sm:gap-6 sm:pr-6 min-w-max marquee-scroll" style={{ animationDuration: '30s', animationDelay: '-5s' }}>
              {[...row2, ...row2].map((img, i) => (
                <div
                  key={`r2-${i}`}
                  className={`w-[140px] h-[140px] sm:w-[210px] sm:h-[210px] relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shrink-0 group-hover:scale-95 transition-transform duration-700 ease-in-out`}
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
            <div className="flex gap-3 pr-3 sm:gap-6 sm:pr-6 min-w-max marquee-scroll" style={{ animationDuration: '22s', animationDelay: '-10s' }}>
              {[...row3, ...row3].map((img, i) => (
                <div
                  key={`r3-${i}`}
                  className={`w-[140px] h-[140px] sm:w-[210px] sm:h-[210px] relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shrink-0 group-hover:scale-95 transition-transform duration-700 ease-in-out`}
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
          className="absolute right-0 top-0 bottom-0 w-[100px] sm:w-[140px] z-[60] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out cursor-pointer"
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
    </div>
  );
};

export default Projects;
