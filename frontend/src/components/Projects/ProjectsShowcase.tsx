"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import gsap from "gsap";
import Link from "next/link";
import ProjectCard, { type ProjectData } from "./ProjectCard";
import { PROJECTS } from "@/src/components/Services/data";

const TOTAL = PROJECTS.length;

const wrapIndex = (i: number) => ((i % TOTAL) + TOTAL) % TOTAL;

const ProjectsShowcase = () => {
  const { primaryColor, secondaryColor, tertialColor } = useThemeStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);

  // The "track" holds 3 cards. We translate it on drag/swipe.
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const offsetY = useRef(0); // current track offset in px
  const isDragging = useRef(false);

  const prevIndex = wrapIndex(currentIndex - 1);
  const nextIndex = wrapIndex(currentIndex + 1);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Apply offset to the track (moves all 3 cards together)
  const applyOffset = useCallback((px: number) => {
    offsetY.current = px;
    if (trackRef.current) {
      gsap.set(trackRef.current, { y: px });
    }
  }, []);

  // Snap to a neighboring card
  const snapTo = useCallback((direction: 1 | -1) => {
    // direction: 1 = swipe up (go to next), -1 = swipe down (go to prev)
    if (isAnimating.current) return;
    isAnimating.current = true;

    const targetY =
      direction === 1
        ? -window.innerHeight // move track up → reveals next card
        : window.innerHeight; // move track down → reveals prev card

    gsap.to(trackRef.current, {
      y: targetY,
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => {
        // flushSync forces React to re-render the DOM synchronously
        // BEFORE we reset the track position. This prevents the 1-2 frame
        // jitter where the track is at y:0 but still showing old card content.
        flushSync(() => {
          setCurrentIndex((prev) => wrapIndex(prev + direction));
        });
        // Now the DOM has new prev/current/next cards rendered.
        // Reset track — the on-screen card stays visually in the same spot.
        offsetY.current = 0;
        gsap.set(trackRef.current, { y: 0 });
        isAnimating.current = false;
      },
    });
  }, []);

  // Snap back to current card
  const snapBack = useCallback(() => {
    gsap.to(trackRef.current, {
      y: 0,
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => {
        offsetY.current = 0;
      },
    });
  }, []);

  // ── Touch / Mouse handlers ──────────────────────────────────────────

  const handlePointerDown = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (isAnimating.current) return;
      isDragging.current = true;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      touchStartY.current = clientY;
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!isDragging.current || isAnimating.current) return;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const delta = clientY - touchStartY.current;

      // Small deadzone to prevent clicks from triggering drag
      if (Math.abs(delta) < 5) return;

      applyOffset(delta);
    },
    [applyOffset],
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const delta = offsetY.current;
    const threshold = window.innerHeight * 0.12;

    if (delta < -threshold) {
      // Swiped up → go to next
      snapTo(1);
    } else if (delta > threshold) {
      // Swiped down → go to prev
      snapTo(-1);
    } else {
      snapBack();
    }
  }, [snapTo, snapBack]);

  // ── Wheel handler (capture before Lenis) ────────────────────────────

  useEffect(() => {
    let wheelLocked = false;

    const handleWheel = (e: WheelEvent) => {
      const showcase = document.getElementById("projects-showcase");
      if (!showcase) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      if (isAnimating.current || wheelLocked) return;

      if (Math.abs(e.deltaY) > 30) {
        wheelLocked = true;
        const direction: 1 | -1 = e.deltaY > 0 ? 1 : -1;
        snapTo(direction);
        setTimeout(() => {
          wheelLocked = false;
        }, 600);
      }
    };

    window.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel, {
        capture: true,
      } as EventListenerOptions);
    };
  }, [snapTo]);

  // ── Keyboard handler ────────────────────────────────────────────────

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        snapTo(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        snapTo(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [snapTo]);

  // ── Jump to specific index (for dot navigation) ─────────────────────

  const jumpToIndex = useCallback(
    (targetIdx: number) => {
      if (isAnimating.current || targetIdx === currentIndex) return;
      isAnimating.current = true;

      const direction = targetIdx > currentIndex ? 1 : -1;
      const targetY =
        direction === 1 ? -window.innerHeight : window.innerHeight;

      // Temporarily swap the prev/next card content to the target
      // by setting index, then animate
      setCurrentIndex((prev) => {
        // We need to set the adjacent card to the target first
        // This is a two-step: first update the card content, then animate
        return prev; // keep current for now
      });

      // For dot jumps: directly animate to neighbor, then update
      // For far jumps, we fake it by immediately setting the adjacent slot
      // to the target and animating to it
      gsap.to(trackRef.current, {
        y: targetY,
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => {
          flushSync(() => {
            setCurrentIndex(targetIdx);
          });
          offsetY.current = 0;
          gsap.set(trackRef.current, { y: 0 });
          isAnimating.current = false;
        },
      });
    },
    [currentIndex],
  );

  return (
    <div
      id="projects-showcase"
      className="w-full h-full overflow-hidden select-none touch-none"
      style={{ backgroundColor: tertialColor }}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
    >
      {/* Back button */}
      <Link
        href="/"
        className="fixed top-6 left-5 z-50 flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-105 group"
        style={{
          backgroundColor: `${tertialColor}90`,
          border: `1px solid ${secondaryColor}15`,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={secondaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70 group-hover:opacity-100 transition-opacity"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span
          className="font-avant text-[0.65rem] font-bold tracking-[0.15em] uppercase opacity-70 group-hover:opacity-100 transition-opacity"
          style={{ color: secondaryColor }}
        >
          Back
        </span>
      </Link>

      {/* Sanova Architects wordmark */}
      <div className="fixed top-6 right-5 z-50">
        <span
          className="font-avant font-bold text-sm tracking-[0.1em] opacity-40"
          style={{ color: secondaryColor }}
        >
          Sanova Architects
        </span>
      </div>

      {/* ── 3-Card Track ── */}
      {/* This div moves on drag/swipe. Contains prev, current, next. */}
      <div
        ref={trackRef}
        className="absolute inset-0 w-full"
        style={{ height: "100%", willChange: "transform" }}
      >
        {/* Previous card: positioned 1 viewport above */}
        <div
          className="absolute left-0 w-full"
          style={{ height: "100%", top: "-100%" }}
        >
          <ProjectCard project={PROJECTS[prevIndex]} isActive={false} />
        </div>

        {/* Current card: positioned at 0 */}
        <div
          className="absolute left-0 w-full"
          style={{ height: "100%", top: "0" }}
        >
          <ProjectCard
            project={PROJECTS[currentIndex]}
            isActive={!isAnimating.current}
          />
        </div>

        {/* Next card: positioned 1 viewport below */}
        <div
          className="absolute left-0 w-full"
          style={{ height: "100%", top: "100%" }}
        >
          <ProjectCard project={PROJECTS[nextIndex]} isActive={false} />
        </div>
      </div>

      {/* Side Progress Rail */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-[6px] z-30">
        {PROJECTS.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              jumpToIndex(idx);
            }}
            className="group relative flex items-center p-[2px]"
            aria-label={`Go to project ${idx + 1}`}
          >
            <div
              className="rounded-full transition-all duration-500 ease-out"
              style={{
                width: "3px",
                height: idx === currentIndex ? "20px" : "6px",
                backgroundColor:
                  idx === currentIndex ? primaryColor : `${secondaryColor}25`,
                boxShadow:
                  idx === currentIndex ? `0 0 10px ${primaryColor}50` : "none",
              }}
            />
          </button>
        ))}
      </div>

      {/* Bottom Counter */}
      <div className="fixed bottom-5 left-6 z-30 flex items-baseline gap-1">
        <span
          className="font-avant font-bold text-[1.4rem] tabular-nums"
          style={{ color: primaryColor }}
        >
          {String(currentIndex + 1).padStart(2, "0")}
        </span>
        <span
          className="font-avant text-[0.65rem] opacity-35 tracking-wide"
          style={{ color: secondaryColor }}
        >
          / {String(TOTAL).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom filter pill */}
      <div className="fixed bottom-5 right-5 z-30">
        <div
          className="px-3 py-1.5 rounded-full backdrop-blur-xl text-[0.55rem] font-avant font-bold tracking-[0.12em] uppercase cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            backgroundColor: `${primaryColor}18`,
            color: primaryColor,
            border: `1px solid ${primaryColor}25`,
          }}
        >
          All Projects
        </div>
      </div>
    </div>
  );
};

export default ProjectsShowcase;
