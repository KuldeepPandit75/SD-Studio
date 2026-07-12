"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { PROJECTS } from "@/src/components/Services/data";
import "./projects-page.css";
import Link from "next/link";

const CYCLE_HEIGHT = 3000;
const TOTAL = PROJECTS.length;
const ANGLE_PER_PROJECT = 360 / TOTAL; // 36°

/**
 * Calculate the currently "focused" project index based on scroll position.
 * Mirrors the carousel's own rotation math without coupling to it.
 */
function getActiveIndex(scrollY: number): number {
  const angleDeg = (scrollY / CYCLE_HEIGHT) * 360;
  // Normalize to [0, 360) then find nearest project
  const normalizedAngle = ((angleDeg % 360) + 360) % 360;
  const rawIndex = Math.round(normalizedAngle / ANGLE_PER_PROJECT) % TOTAL;
  return rawIndex;
}

/** Pad a number to 2 digits: 1 → "01" */
function pad(n: number): string {
  return String(n).padStart(2, "0");
}

// ─── Corner Bracket SVG Paths ────────────────────────────────────

function CornerTL() {
  return (
    <div className="proj-corner proj-corner--tl">
      <svg viewBox="0 0 24 24">
        <polyline points="0,16 0,0 16,0" />
      </svg>
    </div>
  );
}

function CornerTR() {
  return (
    <div className="proj-corner proj-corner--tr">
      <svg viewBox="0 0 24 24">
        <polyline points="8,0 24,0 24,16" />
      </svg>
    </div>
  );
}

function CornerBL() {
  return (
    <div className="proj-corner proj-corner--bl">
      <svg viewBox="0 0 24 24">
        <polyline points="0,8 0,24 16,24" />
      </svg>
    </div>
  );
}

function CornerBR() {
  return (
    <div className="proj-corner proj-corner--br">
      <svg viewBox="0 0 24 24">
        <polyline points="8,24 24,24 24,8" />
      </svg>
    </div>
  );
}

// ─── Arrow Icons ─────────────────────────────────────────────────

function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ─── Main Overlay ────────────────────────────────────────────────

export default function ProjectsOverlay() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const prevIndexRef = useRef(0);

  // ── Scroll listener ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const newIndex = getActiveIndex(scrollY);

      if (newIndex !== prevIndexRef.current) {
        prevIndexRef.current = newIndex;
        setActiveIndex(newIndex);
      }

      if (!hasScrolled && scrollY > 50) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialise
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasScrolled]);

  // ── Navigate to a specific project by scrolling ──────────────
  const scrollToProject = useCallback((index: number) => {
    // Determine the nearest scroll position for the target angle
    const currentScroll = window.scrollY;
    const currentAngle = (currentScroll / CYCLE_HEIGHT) * 360;
    const currentFullRotations = Math.floor(currentAngle / 360);
    
    const targetAngle = currentFullRotations * 360 + index * ANGLE_PER_PROJECT;
    
    // Choose the shortest path
    let finalAngle = targetAngle;
    if (Math.abs(targetAngle - currentAngle) > 180) {
      if (targetAngle > currentAngle) {
        finalAngle = targetAngle - 360;
      } else {
        finalAngle = targetAngle + 360;
      }
    }

    const targetScroll = (finalAngle / 360) * CYCLE_HEIGHT;

    window.scrollTo({
      top: Math.max(0, targetScroll),
      behavior: "smooth",
    });
  }, []);

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % TOTAL;
    scrollToProject(next);
  }, [activeIndex, scrollToProject]);

  const goPrev = useCallback(() => {
    const prev = (activeIndex - 1 + TOTAL) % TOTAL;
    scrollToProject(prev);
  }, [activeIndex, scrollToProject]);

  // ── Touch / Swipe handling for mobile ────────────────────────
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;

      // Only trigger if horizontal swipe is dominant and significant
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) {
          goNext();
        } else {
          goPrev();
        }
      }
      touchStartRef.current = null;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goNext, goPrev]);


  return (
    <>
      {/* ── Corner Brackets ─────────────────────────────────────── */}
      <CornerTL />
      <CornerTR />
      <CornerBL />
      <CornerBR />

      {/* ── Vertical Timeline (right edge) ──────────────────────── */}
      <div className="proj-timeline" aria-label="Project timeline">
        <div className="proj-timeline__track">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              className={`proj-timeline__tick${i === activeIndex ? " is-active" : ""}`}
              onClick={() => scrollToProject(i)}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Scroll Indicator ────────────────────────────────────── */}
      <div className={`proj-scroll-indicator${hasScrolled ? " is-hidden" : ""}`}>
        <span className="proj-scroll-indicator__text">Scroll to explore</span>
        <div className="proj-scroll-indicator__line" />
      </div>

      {/* ── Main Overlay Grid ───────────────────────────────────── */}
      <div className="projects-overlay">
        {/* ── Header (top-left) ─────────────────────────────────── */}
        <div className="proj-header">
          <Link href="/" className="proj-header__label hover:scale-105 transition duration-[0.1s] cursor-pointer">Sanova Architects — Portfolio</Link>
          <div className="proj-header__rule" />
          <h1 className="proj-header__title">Selected Works</h1>
          <p className="proj-header__statement">
            Designing spaces that shape how people live, work, and connect.
          </p>
        </div>

        {/* ── Counter (top-right) ───────────────────────────────── */}
        <div className="proj-counter" aria-live="polite">
          <div className="proj-counter__numbers">
            <span className="proj-counter__current">
              <span className="proj-counter__current-inner" key={activeIndex}>
                {pad(activeIndex + 1)}
              </span>
            </span>
            <span className="proj-counter__separator">/</span>
            <span className="proj-counter__total">{pad(TOTAL)}</span>
          </div>
          <div className="proj-counter__bar">
            <div
              className="proj-counter__bar-fill"
              style={{ width: `${((activeIndex + 1) / TOTAL) * 100}%` }}
            />
          </div>
        </div>


        {/* ── Navigation (bottom-right) ─────────────────────────── */}
        <div className="proj-nav-area">
          <span className="proj-nav__label">Navigate</span>
          <div className="proj-nav">
            <button
              className="proj-nav__btn"
              onClick={goPrev}
              aria-label="Previous project"
            >
              <ArrowLeft />
            </button>
            <button
              className="proj-nav__btn"
              onClick={goNext}
              aria-label="Next project"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
