"use client";
import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const RENDER = {
  src: "/images/exterior1.jpeg",
  caption: "The Griha",
  detail: "Residence",
};

// First three match the service names in Services/data.ts.
const DISCIPLINES = [
  "Architectural Planning",
  "Exterior & Elevation",
  "Interior Design",
  "Landscape",
  "3D Visualization",
];

/*
 * Line-drawing filter:
 * grayscale → soften noise → edge detect → invert into dark lines on white →
 * tint lines to the brand ink (#03191E) and paper to the brand cream (#FFF3E9).
 * LINE_STRENGTH controls how dark/dense the pencil lines are.
 */
const LINE_STRENGTH = 4.5;
const SketchFilter = () => (
  <svg aria-hidden="true" width="0" height="0" className="absolute">
    <filter id="hero-sketch" colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
      <feColorMatrix type="saturate" values="0" />
      <feGaussianBlur stdDeviation="0.7" />
      <feConvolveMatrix
        order="3"
        kernelMatrix="-1 -1 -1  -1 8 -1  -1 -1 -1"
        preserveAlpha="true"
        edgeMode="duplicate"
      />
      <feComponentTransfer>
        <feFuncR type="linear" slope={-LINE_STRENGTH} intercept="1" />
        <feFuncG type="linear" slope={-LINE_STRENGTH} intercept="1" />
        <feFuncB type="linear" slope={-LINE_STRENGTH} intercept="1" />
      </feComponentTransfer>
      <feComponentTransfer>
        <feFuncR type="table" tableValues="0.012 1" />
        <feFuncG type="table" tableValues="0.098 0.953" />
        <feFuncB type="table" tableValues="0.118 0.914" />
      </feComponentTransfer>
    </filter>
  </svg>
);

const Hero = () => {
  const { primaryColor, secondaryColor, tertialColor } = useThemeStore();

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [interacted, setInteracted] = useState(false);

  // Lens state lives in refs so the rAF loop never re-renders React.
  const lens = useRef({
    x: 0, y: 0, tx: 0, ty: 0, // current + target position (px, stage space)
    w: 0, h: 0,               // stage size
    scale: 0,                 // intro pop (0 → 1)
    scroll: 0,                // 0 → 1 as the hero scrolls away
    lastMove: -Infinity,
  });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const s = lens.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      s.w = stage.clientWidth;
      s.h = stage.clientHeight;
      if (!s.x) {
        s.x = s.tx = s.w * 0.55;
        s.y = s.ty = s.h * 0.45;
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);

    let frame: number;
    const tick = (now: number) => {
      const idle = now - s.lastMove > 2200;
      if (idle && !reduced) {
        const t = now / 1000;
        s.tx = s.w * (0.52 + 0.2 * Math.sin(t * 0.33));
        s.ty = s.h * (0.46 + 0.18 * Math.sin(t * 0.47 + 1.2));
      }
      const ease = idle ? 0.03 : 0.12;
      s.x += (s.tx - s.x) * ease;
      s.y += (s.ty - s.y) * ease;

      const base = Math.min(Math.max(Math.min(s.w, s.h) * 0.2, 80), 180);
      const full = Math.hypot(s.w, s.h);
      const grow = s.scroll * s.scroll * (3 - 2 * s.scroll); // smoothstep
      const r = base * s.scale + (full - base * s.scale) * grow;

      stage.style.setProperty("--lx", `${s.x.toFixed(1)}px`);
      stage.style.setProperty("--ly", `${s.y.toFixed(1)}px`);
      stage.style.setProperty("--lr", `${r.toFixed(1)}px`);
      stage.style.setProperty("--ring", `${Math.max(0, 1 - grow * 3)}`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const s = lens.current;
    s.tx = e.clientX - rect.left;
    s.ty = e.clientY - rect.top;
    s.lastMove = performance.now();
    if (!interacted) setInteracted(true);
  };

  useGSAP(
    () => {
      const s = lens.current;

      // Scroll: the lens grows until the whole drawing has become the render.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          s.scroll = self.progress;
        },
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ delay: 0.25 });
        // The drawing "plots" onto the paper top to bottom.
        tl.fromTo(
          ".hero-drawing",
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 2, ease: "power2.inOut" },
        )
          .from(".hero-line", { yPercent: 105, duration: 1.2, stagger: 0.1, ease: "expo.out" }, 0.5)
          .from(".hero-fade", { y: 14, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 1)
          .to(s, { scale: 1, duration: 1.1, ease: "back.out(1.4)" }, 1.7);

        gsap.to(".hero-copy", {
          y: -80,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "55% top",
            scrub: true,
          },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        s.scale = 1;
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const ink = tertialColor;
  const faint = `${tertialColor}8c`;

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Sanova Architects"
      className="relative h-[100svh] min-h-[640px] overflow-hidden"
      style={{
        backgroundColor: secondaryColor,
        color: ink,
        backgroundImage: `linear-gradient(${tertialColor}0a 1px, transparent 1px), linear-gradient(90deg, ${tertialColor}0a 1px, transparent 1px)`,
        backgroundSize: "36px 36px",
      }}
    >
      <SketchFilter />

      {/* ── Stage: drawing + render lens ─────────────────── */}
      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        className="absolute inset-x-0 bottom-0 h-[54%] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[58%] touch-pan-y"
      >
        {/* The drawing, trailing off into the paper */}
        <div
          aria-hidden="true"
          className="hero-drawing absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_35%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_32%)]"
          style={{ willChange: "transform" }}
        >
          <Image
            src={RENDER.src}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-center"
            style={{ filter: "url(#hero-sketch)" }}
          />
        </div>

        {/* The render, seen through the lens */}
        <div
          className="absolute inset-0"
          style={{ clipPath: "circle(var(--lr, 0px) at var(--lx, 50%) var(--ly, 50%))" }}
        >
          <Image
            src={RENDER.src}
            alt={`${RENDER.caption}, a residence designed by Sanova Architects`}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Lens ring + label */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0"
          style={{
            width: "calc(var(--lr, 0px) * 2)",
            height: "calc(var(--lr, 0px) * 2)",
            transform: "translate(calc(var(--lx, 0px) - var(--lr, 0px)), calc(var(--ly, 0px) - var(--lr, 0px)))",
            opacity: "var(--ring, 1)",
          }}
        >
          <div className="absolute inset-0 rounded-full border" style={{ borderColor: `${secondaryColor}cc` }} />
          <span
            className="absolute left-[85%] top-[8%] whitespace-nowrap font-beach text-2xl"
            style={{ color: primaryColor }}
          >
            the finished space
          </span>
        </div>

        {/* Interaction hint */}
        <p
          aria-hidden="true"
          className={`hero-fade pointer-events-none absolute bottom-6 right-5 sm:right-[3vw] font-avant text-[10px] uppercase tracking-[0.3em] transition-opacity duration-700 ${interacted ? "opacity-0" : "opacity-100"}`}
          style={{ color: faint }}
        >
          Move across the drawing
        </p>
      </div>

      {/* ── Copy ─────────────────────────────────────────── */}
      <div className="hero-copy pointer-events-none relative z-10 flex h-[46%] lg:h-full flex-col px-5 sm:px-[3vw] pt-[96px] sm:pt-[120px] lg:pb-12">
        {/* <p
          className="hero-fade font-avant text-[10px] sm:text-[11px] uppercase tracking-[0.3em]"
          style={{ color: faint }}
        >
          Sanova Architects
        </p> */}

        <div className="mt-5 lg:mt-auto lg:mb-auto">
          <h1 className="font-posterama uppercase leading-[0.9] tracking-[-0.015em] text-[clamp(46px,6.4vw,124px)]">
            <span className="block overflow-hidden pb-[0.05em]">
              <span className="hero-line block">From plan</span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <span className="hero-line block">
                to <span style={{ color: primaryColor }}>place.</span>
              </span>
            </span>
          </h1>

          <p
            className="hero-fade mt-4 lg:mt-7 max-w-[38ch] font-avenir text-[14px] sm:text-[17px] leading-relaxed"
            style={{ color: `${tertialColor}b3` }}
          >
            We plan, design and visualize buildings, interiors and landscapes,
            taking every project from its first drawing to a space you can live in.
          </p>

          {/* Disciplines, listed like a drawing register */}
          <ol
            className="hero-fade mt-5 lg:mt-8 hidden max-w-[50%] sm:flex flex-wrap gap-x-5 gap-y-1.5 font-avant text-[10px] sm:text-[11px] uppercase tracking-[0.2em]"
            style={{ color: faint }}
          >
            {DISCIPLINES.map((d, i) => (
              <li key={d} className="whitespace-nowrap">
                <span className="tabular-nums">({String(i + 1).padStart(2, "0")})</span>{" "}
                <span style={{ color: tertialColor }}>{d}</span>
              </li>
            ))}
          </ol>

          <Link
            href="/projects"
            className="hero-fade pointer-events-auto group mt-5 lg:mt-8 inline-flex items-center gap-3 font-avant text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ outlineColor: primaryColor }}
          >
            <span className="relative">
              See the work
              <span
                aria-hidden="true"
                className="absolute left-0 -bottom-1 h-px w-full origin-right transition-transform duration-500 group-hover:origin-left group-hover:scale-x-0"
                style={{ backgroundColor: ink }}
              />
            </span>
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <p
          className="hero-fade hidden lg:block font-avant text-[10px] uppercase tracking-[0.3em]"
          style={{ color: faint }}
        >
          Fig. 01 <span className="mx-2">—</span>
          <span style={{ color: ink }}>{RENDER.caption}</span>, {RENDER.detail}
        </p>
      </div>
    </section>
  );
};

export default Hero;
