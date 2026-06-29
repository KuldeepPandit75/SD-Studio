"use client";
import Image from "next/image";
import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

export interface ProjectData {
  id: number;
  slug: string;
  name: string;
  type: string;
  location: string;
  status: "Completed" | "Ongoing" | "Concept";
  size: string;
  image: string;
  year: string;
  orientation: "landscape" | "portrait";
}

const TYPE_COLORS: Record<string, string> = {
  Villa: "#7A9E7E",
  Residence: "#8B7EC8",
  Commercial: "#C8A87E",
  Office: "#7EAAC8",
  Interior: "#C87E9E",
  Landscape: "#9EC87E",
  "Mixed Use": "#C8B07E",
};

const STATUS_CONFIG: Record<string, { icon: string; color: string }> = {
  Completed: { icon: "✓", color: "#7A9E7E" },
  Ongoing: { icon: "●", color: "#C8A87E" },
  Concept: { icon: "◇", color: "#8B7EC8" },
};

interface ProjectCardProps {
  project: ProjectData;
  isActive: boolean;
}

const ProjectCard = ({ project, isActive }: ProjectCardProps) => {
  const { primaryColor, secondaryColor, tertialColor } = useThemeStore();
  const imageRef = useRef<HTMLDivElement>(null);

  const isLandscape = project.orientation === "landscape";
  const typeColor = TYPE_COLORS[project.type] || "#7A9E7E";
  const statusConfig = STATUS_CONFIG[project.status];

  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const showGalleryLayout = mounted
    ? (!isDesktop && isLandscape)
    : isLandscape; // SSR fallback

  // Ken Burns slow zoom on active card
  useEffect(() => {
    if (!imageRef.current) return;
    const imgEl = imageRef.current.querySelector("img");
    if (!imgEl) return;

    if (isActive) {
      gsap.fromTo(
        imgEl,
        { scale: 1 },
        { scale: showGalleryLayout ? 1.04 : 1.08, duration: 8, ease: "none" },
      );
    } else {
      gsap.set(imgEl, { scale: 1 });
    }
  }, [isActive, showGalleryLayout]);



  // ─── GALLERY LAYOUT: Centered Frame ────────────────────
  if (showGalleryLayout) {
    return (
      <Link href={`/project/${project.slug}`}
        className="absolute inset-0 w-full h-full overflow-hidden flex flex-col block"
        style={{ backgroundColor: tertialColor }}
      >
        {/* Top: Project number + year */}
        <div className="flex-shrink-0 pt-[100px] px-6 flex justify-between items-start z-10">
          <span
            className="font-avant text-[0.7rem] tracking-[0.3em] font-bold opacity-50"
            style={{ color: secondaryColor }}
          >
            {String(project.id).padStart(2, "0")} / PROJECT
          </span>
          <span
            className="font-avant text-[0.7rem] tracking-[0.3em] font-bold opacity-50"
            style={{ color: secondaryColor }}
          >
            {project.year}
          </span>
        </div>

        {/* Center: Gallery Frame — image in natural ratio */}
        <div className="flex-1 flex items-center justify-center px-5 pt-3 pb-2">
          <div
            ref={imageRef}
            className="relative w-full rounded-2xl overflow-hidden shrink-0"
            style={{
              aspectRatio: isLandscape ? "16 / 9" : "3 / 4",
              maxWidth: isLandscape ? "calc(42vh * 16 / 9)" : "calc(60vh * 3 / 4)",
              maxHeight: isLandscape ? "42vh" : "60vh",
              boxShadow: `0 24px 64px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px ${secondaryColor}08`,
            }}
          >
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="90vw"
              priority={isActive}
            />
            {/* Subtle inner border glow */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                boxShadow: `inset 0 0 0 1px ${secondaryColor}10, inset 0 1px 0 0 ${secondaryColor}15`,
              }}
            />
          </div>
        </div>

        {/* Bottom: Info Panel — spacious layout */}
        <div
          className="flex-shrink-0 px-6 pb-10 pt-5 z-10"
        >
          {/* Type Badge + Status */}
          <div className="mb-3 flex items-center gap-3">
            <span
              className="px-3 py-1 rounded-full text-[0.65rem] font-avant font-bold tracking-[0.15em] uppercase"
              style={{
                backgroundColor: `${typeColor}25`,
                color: typeColor,
                border: `1px solid ${typeColor}40`,
              }}
            >
              {project.type}
            </span>
            <span
              className="flex items-center gap-1.5 text-[0.65rem] font-avant font-bold tracking-[0.1em]"
              style={{ color: statusConfig.color }}
            >
              <span className="text-[0.5rem]">{statusConfig.icon}</span>
              {project.status}
            </span>
          </div>

          {/* Project Name */}
          <h2
            className="font-avant font-bold text-[1.85rem] leading-[1.1] mb-3"
            style={{ color: secondaryColor }}
          >
            {project.name}
          </h2>

          {/* Info Row */}
          <div className="flex items-center gap-4 mb-4">
            {/* Location */}
            <div className="flex items-center gap-1.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke={secondaryColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-60"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span
                className="font-avant text-[0.75rem] tracking-wide opacity-70"
                style={{ color: secondaryColor }}
              >
                {project.location}
              </span>
            </div>

            {/* Divider */}
            <div
              className="w-[1px] h-3 opacity-20"
              style={{ backgroundColor: secondaryColor }}
            />

            {/* Size */}
            <div className="flex items-center gap-1.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke={secondaryColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-60"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              <span
                className="font-avant text-[0.75rem] tracking-wide opacity-70"
                style={{ color: secondaryColor }}
              >
                {project.size}
              </span>
            </div>
          </div>

          {/* Divider line */}
          <div
            className="w-full h-[1px] opacity-10"
            style={{ backgroundColor: secondaryColor }}
          />

          {/* Swipe hint */}
          <div className="flex justify-center mt-3">
            <div className="flex flex-col items-center gap-1 opacity-30">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={secondaryColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-bounce"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
              <span
                className="font-avant text-[0.5rem] tracking-[0.2em] uppercase"
                style={{ color: secondaryColor }}
              >
                Swipe
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // ─── FULL-BLEED / DEFAULT LAYOUT: Immersive ─────────────────
  const isCenterPillar = mounted && isDesktop && !isLandscape;

  return (
    <Link href={`/project/${project.slug}`}
      className="absolute inset-0 w-full h-full overflow-hidden block"
      style={{ backgroundColor: tertialColor }}
    >
      {/* Hero Image */}
      <div className="absolute inset-0 w-full h-full flex justify-center items-center">
        <div
          ref={imageRef}
          className={isCenterPillar ? "relative h-full shrink-0" : "absolute inset-0 w-full h-full"}
          style={isCenterPillar ? { aspectRatio: "3 / 4" } : {}}
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            sizes={isCenterPillar ? "50vw" : "100vw"}
            priority={isActive}
          />
        </div>
      </div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, 
            ${tertialColor}CC 0%, 
            transparent 25%, 
            transparent 45%, 
            ${tertialColor}E6 75%, 
            ${tertialColor} 100%)`,
        }}
      />

      {/* Top: Project number + year */}
      <div className="absolute top-0 left-0 right-0 pt-[100px] px-6 flex justify-between items-start z-10">
        <span
          className="font-avant text-[0.7rem] tracking-[0.3em] font-bold opacity-50"
          style={{ color: secondaryColor }}
        >
          {String(project.id).padStart(2, "0")} / PROJECT
        </span>
        <span
          className="font-avant text-[0.7rem] tracking-[0.3em] font-bold opacity-50"
          style={{ color: secondaryColor }}
        >
          {project.year}
        </span>
      </div>

      {/* Bottom: Info Panel */}
      <div
        className="absolute bottom-0 left-0 right-0 px-6 pb-10 z-10"
      >
        {/* Type Badge */}
        <div className="mb-4 flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-[0.65rem] font-avant font-bold tracking-[0.15em] uppercase"
            style={{
              backgroundColor: `${typeColor}25`,
              color: typeColor,
              border: `1px solid ${typeColor}40`,
            }}
          >
            {project.type}
          </span>
          <span
            className="flex items-center gap-1.5 text-[0.65rem] font-avant font-bold tracking-[0.1em]"
            style={{ color: statusConfig.color }}
          >
            <span className="text-[0.5rem]">{statusConfig.icon}</span>
            {project.status}
          </span>
        </div>

        {/* Project Name */}
        <h2
          className="font-avant font-bold text-[2rem] leading-[1.05] mb-3"
          style={{ color: secondaryColor }}
        >
          {project.name}
        </h2>

        {/* Info Row */}
        <div className="flex items-center gap-4 mb-5">
          {/* Location */}
          <div className="flex items-center gap-1.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke={secondaryColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span
              className="font-avant text-[0.75rem] tracking-wide opacity-70"
              style={{ color: secondaryColor }}
            >
              {project.location}
            </span>
          </div>

          {/* Divider */}
          <div
            className="w-[1px] h-3 opacity-20"
            style={{ backgroundColor: secondaryColor }}
          />

          {/* Size */}
          <div className="flex items-center gap-1.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke={secondaryColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            <span
              className="font-avant text-[0.75rem] tracking-wide opacity-70"
              style={{ color: secondaryColor }}
            >
              {project.size}
            </span>
          </div>
        </div>

        {/* Glassmorphic divider line */}
        <div
          className="w-full h-[1px] opacity-10"
          style={{ backgroundColor: secondaryColor }}
        />

        {/* Swipe hint */}
        <div className="flex justify-center mt-4">
          <div className="flex flex-col items-center gap-1 opacity-30">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={secondaryColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            <span
              className="font-avant text-[0.55rem] tracking-[0.2em] uppercase"
              style={{ color: secondaryColor }}
            >
              Swipe
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
