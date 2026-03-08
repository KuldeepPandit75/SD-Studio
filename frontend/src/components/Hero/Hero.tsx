"use client";
import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const { primaryColor, tertialColor } = useThemeStore();

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const videosRef = useRef<(HTMLVideoElement | null)[]>([]);
  const [positions, setPositions] = useState([0, 1, 2]);
  const [isInitialAnimationDone, setIsInitialAnimationDone] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLOTS = [
    { x: -350, rotateZ: -20, scale: 0.6, zIndex: 10, opacity: 0.9 }, // 0: Left
    { x: 0, rotateZ: 0, scale: 1, zIndex: 20, opacity: 1 }, // 1: Center
    { x: 350, rotateZ: 10, scale: 0.6, zIndex: 10, opacity: 0.9 }, // 2: Right
  ];

  const videosList = [
    "/videos/interior2.mp4",
    "/videos/interior1.mp4",
    "/videos/landscape.mp4",
  ];

  const handleVideoEnded = (index: number) => {
    if (positions[index] === 1) {
      setPositions((prev) => prev.map((slot) => (slot + 1) % 3));
    }
  };

  const handleTimeUpdate = (index: number) => {
    if (positions[index] === 1 && videosRef.current[index]) {
      const video = videosRef.current[index];
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress || 0);
    }
  };

  useEffect(() => {
    if (!isInitialAnimationDone) {
      videosRef.current.forEach((v) => v?.pause());
      return;
    }
    videosRef.current.forEach((video, index) => {
      if (!video) return;
      if (positions[index] === 1) {
        video.currentTime = 0;
        video.play().catch((e) => console.log("Autoplay prevented:", e));
      } else {
        video.pause();
      }
    });
  }, [positions, isInitialAnimationDone]);

  const createStar = () => {
    const star = document.createElement("div");
    star.className = "star absolute w-[3px] h-[3px] rounded-full opacity-80";

    const space = document.getElementById("starBg");
    const spaceHeight = space?.clientHeight || 0;
    const spaceWidth = space?.clientWidth || 0;

    const initialX = Math.floor(Math.random() * spaceWidth) + 1;
    const initialY = Math.floor(Math.random() * spaceHeight) + 1;

    star.style.top = `${initialY}px`;
    star.style.left = `${initialX}px`;

    star.style.backgroundColor = primaryColor;

    const dir = Math.floor(Math.random() * 4) + 1;
    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 0.02; // pixels per millisecond

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      const distance = speed * deltaTime;

      let currentTop = Number(star.style.top.slice(0, -2));
      let currentLeft = Number(star.style.left.slice(0, -2));

      if (dir === 1) {
        currentTop += distance;
        currentLeft += distance;
      } else if (dir === 2) {
        currentTop -= distance;
        currentLeft += distance;
      } else if (dir === 3) {
        currentTop += distance;
        currentLeft -= distance;
      } else {
        currentTop -= distance;
        currentLeft -= distance;
      }

      // Wrap around if out of bounds to simulate new stars appearing
      if (currentTop > spaceHeight) currentTop = 0;
      else if (currentTop < 0) currentTop = spaceHeight;

      if (currentLeft > spaceWidth) currentLeft = 0;
      else if (currentLeft < 0) currentLeft = spaceWidth;

      star.style.top = `${currentTop}px`;
      star.style.left = `${currentLeft}px`;

      animationFrameId = requestAnimationFrame(animate);
    };

    space?.append(star);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      star.remove();
    };
  };

  useEffect(() => {
    const cleanupFunctions: (() => void)[] = [];

    // Create initial stars
    for (let i = 0; i <= 30; i++) {
      const cleanup = createStar();
      cleanupFunctions.push(cleanup);
    }

    const checkBoundaries = () => {
      const stars = document.querySelectorAll(".star");
      const space = document.querySelector("#starBg");

      stars.forEach((star) => {
        const htmlStar = star as HTMLElement;
        const top = Number(htmlStar.style.top.slice(0, -2));
        const left = Number(htmlStar.style.left.slice(0, -2));

        const height = space?.clientHeight || 0;
        const width = space?.clientWidth || 0;

        if (top < -100 || left < 0 || top > height || left > width) {
          htmlStar.remove();
          const cleanup = createStar();
          cleanupFunctions.push(cleanup);
        }
      });
    };

    const boundaryInterval = setInterval(checkBoundaries, 50);

    return () => {
      clearInterval(boundaryInterval);
      // Clean up all stars and their animations
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 1,
      onComplete: () => {
        setIsInitialAnimationDone(true);
        gsap.to("#grid", {
          y: 20,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      },
    });

    tl.to("#hero-text", {
      bottom: "18vh",
      duration: 1,
      ease: "power2.out",
    });

    tl.to(
      "#gallery",
      {
        bottom: "-2.5rem",
        duration: 1,
        ease: "power2.out",
      },
      "<",
    );

    tl.add("spread", "-=0.4");

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const slotIndex = positions[index];
      const slot = SLOTS[slotIndex];
      tl.to(
        card,
        {
          x: slot.x,
          rotateZ: slot.rotateZ,
          scale: slot.scale,
          zIndex: slot.zIndex,
          opacity: slot.opacity,
          duration: 1,
          ease: "power2.out",
        },
        "spread",
      );
    });

    tl.to(
      "#grid",
      {
        bottom: 0,
        rotateZ: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4",
    );
    const tl2 = gsap.timeline();
    tl2.to("#hero", {
      y: 80,
      ease: "power2.out",
    });
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top 100px",
      end: "bottom top",
      scrub: 1,
      animation: tl2,
    });
  }, []); // Run once on mount!

  useGSAP(() => {
    if (!isInitialAnimationDone) return;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const slotIndex = positions[index];
      const slot = SLOTS[slotIndex];
      gsap.to(card, {
        x: slot.x,
        rotateZ: slot.rotateZ,
        scale: slot.scale,
        zIndex: slot.zIndex,
        opacity: slot.opacity,
        duration: 0.8,
        ease: "power2.inOut",
      });
    });
  }, [positions, isInitialAnimationDone]);

  return (
    <>
      <div
        id="hero"
        className="flex justify-center flex-col items-center overflow-hidden relative"
      >
        <div
          id="starBg"
          className="absolute inset-0 overflow-hidden pointer-events-none"
        ></div>
        <div
          id="hero-text"
          className="h-[calc(100vh-100px)] flex flex-col justify-center items-center gap-5 relative bottom-[4vh] z-10 pointer-events-none"
        >
          <h1 className="text-center font-avant font-bold text-5xl w-[60vw]">
            Bringing Architecture to Life with Stunning Visuals.
          </h1>
          <p
            className="text-center font-beach text-3xl w-[40vw]"
            style={{ color: primaryColor }}
          >
            From interior design to architectural planning and 3D modeling, we
            bring your ideas to life.
          </p>
        </div>
        <div
          id="gallery"
          className="absolute -bottom-96 w-full h-[350px] flex justify-center items-start z-10"
        >
          {videosList.map((src, idx) => (
            <div
              key={idx}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="absolute w-[600px] h-[350px] rounded-[28px] overflow-hidden border-[#FFF3E9] border-2 shadow-xl origin-bottom"
              style={{
                zIndex: idx === 1 ? 20 : 10, // Initial stacking before GSAP spreads them
              }}
            >
              <video
                ref={(el) => {
                  videosRef.current[idx] = el;
                }}
                src={src}
                className={`object-cover w-full h-full ${src=="/videos/landscape.mp4"?"scale-130": "scale-110"}`}
                muted
                playsInline
                onEnded={() => handleVideoEnded(idx)}
                onTimeUpdate={() => handleTimeUpdate(idx)}
              />
            </div>
          ))}

          {/* Tracking Bar */}
          <div className="absolute bottom-14 flex items-center gap-3 z-30 px-6 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
            {[1, 0, 2].map((idx) => {
              const isActive = positions[idx] === 1;
              return (
                <div
                  key={`track-${idx}`}
                  className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-500 ease-in-out ${
                    isActive ? "w-20 bg-white/20" : "w-2.5 bg-white/40"
                  }`}
                >
                  <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-75 ease-linear"
                    style={{
                      width: isActive ? `${progress}%` : "0%",
                      backgroundColor: primaryColor,
                      boxShadow: isActive ? `0 0 12px ${primaryColor}` : "none",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <Image
          src="/images/grid.svg"
          id="grid"
          alt="Grid"
          className="absolute right-0 -bottom-40 -rotate-z-40 origin-right"
          width={509}
          height={379}
        />
      </div>
    </>
  );
};

export default Hero;
