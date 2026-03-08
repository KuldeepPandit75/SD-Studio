"use client";

import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
  const { primaryColor, secondaryColor } = useThemeStore();

  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set("#logoImg", { y: -20 });
    gsap.set("#line1", { x: -200, opacity: 1 });
    gsap.set("#line2", { x: -200, opacity: 1 });
    gsap.set("#line3", { y: -200, opacity: 1 });
    gsap.set("#line4", { y: -500, opacity: 1 });
    gsap.set("#logoText p", { x: -100 });
    gsap.set("#nav-links>ul li", { y: -20, opacity: 0 });
    gsap.set("#contact-btn", { y: -20, opacity: 0 });

    tl.to("#logoImg", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    });
    tl.to(
      "#line3",
      {
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "<",
    );
    tl.to(
      "#line4",
      {
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "<",
    );
    tl.to(
      "#logoText p",
      {
        stagger: 0.1,
        x: 0,
        duration: 0.8,
        opacity: 1,
        ease: "power2.out",
      },
      "-=0.7",
    );
    tl.to(
      "#line1",
      {
        x: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "<",
    );
    tl.to(
      "#line2",
      {
        x: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "<",
    );
    tl.to(
      "#nav-links>ul li",
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.4",
    );
    tl.to(
      "#contact-btn",
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.4",
    );
  });

  return (
    <>
      <header className="stikcy top-0 w-full flex justify-between items-center font-avant h-[100px] px-[3vw] z-100">
        <div id="logo" className="flex items-center gap-[40px] relative">
          <Image
            src="/icons/logoB.svg"
            id="logoImg"
            alt="Logo"
            className="opacity-0"
            width={60}
            height={60}
          />
          <span
            id="logoText"
            className="relative bottom-1 overflow-hidden w-[100px]"
          >
            <p className="font-black text-4xl py-1 opacity-0" id="sd">
              SD
            </p>
            <p
              id="studio"
              className="font-beach opacity-0 text-2xl absolute top-[20px] left-[40px]"
            >
              Studio
            </p>
          </span>
          <div className="absolute" id="lines">
            <div className="relative opacity-70 flex flex-col gap-1">
              <hr
                id="line1"
                className="border-black absolute -left-[3vw] -top-[35px] w-[200px] opacity-0"
              />
              <hr
                id="line2"
                className="border-black absolute -left-[3vw] -bottom-[35px] w-[160px] opacity-0"
              />
              <hr
                id="line3"
                className="border-black absolute -left-[50px] rotate-90 w-[250px] opacity-0"
              />
              <hr
                id="line4"
                className="border-black absolute -left-[340px] rotate-90 w-[650px] opacity-0"
              />
            </div>
          </div>
        </div>
        <div id="nav-links">
          <ul className="flex w-[25vw] justify-between font-bold text-lg">
            <li className="opacity-0">
              <a href="#">Services</a>
            </li>
            <li className="opacity-0">
              <a href="#">Projects</a>
            </li>
            <li className="opacity-0">
              <a href="#">About</a>
            </li>
          </ul>
        </div>
        <div
          id="contact-btn"
          className="font-black rounded-full px-6 py-2 opacity-0 cursor-pointer"
          style={{ backgroundColor: primaryColor, color: secondaryColor }}
          onClick={() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          <button className="pointer-events-none">Let's Talk</button>
        </div>
      </header>
    </>
  );
};
export default Navbar;
