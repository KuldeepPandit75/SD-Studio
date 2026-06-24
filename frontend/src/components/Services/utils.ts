import { useState, useEffect, useCallback } from "react";
import gsap from "gsap";

/* ------------------------------------------------------------------ */
/*  ANIMATED COUNTER HOOK                                              */
/* ------------------------------------------------------------------ */
export function useCounter(end: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [trigger, end, duration]);
  return count;
}

/* ------------------------------------------------------------------ */
/*  MAGNETIC BUTTON EFFECT                                         */
/* ------------------------------------------------------------------ */
export const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
};

export const handleMagneticLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
};

/* ------------------------------------------------------------------ */
/*  3D TILT CARD EFFECT                                            */
/* ------------------------------------------------------------------ */
export const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  gsap.to(card, {
    rotateY: x * 12,
    rotateX: -y * 12,
    duration: 0.4,
    ease: "power2.out",
    transformPerspective: 800,
  });
};

export const handleTiltReset = (e: React.MouseEvent<HTMLDivElement>) => {
  gsap.to(e.currentTarget, {
    rotateY: 0,
    rotateX: 0,
    duration: 0.6,
    ease: "elastic.out(1, 0.5)",
  });
};
