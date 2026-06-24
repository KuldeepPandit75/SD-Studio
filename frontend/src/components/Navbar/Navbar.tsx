"use client";

import { useState } from "react";
import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { primaryColor, secondaryColor,tertialColor } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isServicesPage = pathname === "/services";

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
      <header className="absolute top-0 w-full flex justify-between items-center font-avant h-[80px] sm:h-[100px] px-[20px] sm:px-[3vw] z-[100]">
        <div id="logo" className={`flex items-center gap-[10px] sm:gap-[40px] relative ${isServicesPage ? "" : "mix-blend-difference"}`}>
          <Image
            src={isServicesPage ? "/icons/logoG.svg" : "/icons/logoB.svg"}
            id="logoImg"
            alt="Logo"
            className="opacity-0 w-[50px] sm:w-[60px]"
            width={60}
            height={60}
          />
          <span
            id="logoText"
            className="relative bottom-1 overflow-hidden w-[100px]"
            style={{ color: isServicesPage ? secondaryColor : "inherit" }}
          >
            <p className="font-black text-3xl sm:text-4xl py-1 opacity-0" id="sd">
              SD
            </p>
            <p
              id="studio"
              className="font-beach opacity-0 text-xl sm:text-2xl absolute top-[20px] left-[40px]"
              style={{color: primaryColor}}
            >
              Studio
            </p>
          </span>
          <div className="absolute hidden sm:block" id="lines">
            <div className="relative opacity-70 flex flex-col gap-1">
              <hr
                id="line1"
                className="absolute -left-[3vw] -top-[35px] w-[200px] opacity-0"
                style={{ borderColor: isServicesPage ? primaryColor : "black" }}
              />
              <hr
                id="line2"
                className="absolute -left-[3vw] -bottom-[35px] w-[160px] opacity-0"
                style={{ borderColor: isServicesPage ? primaryColor : "black" }}
              />
              <hr
                id="line3"
                className="absolute -left-[50px] rotate-90 w-[250px] opacity-0"
                style={{ borderColor: isServicesPage ? primaryColor : "black" }}
              />
              <hr
                id="line4"
                className="absolute -left-[340px] rotate-90 w-[650px] opacity-0"
                style={{ borderColor: isServicesPage ? primaryColor : "black" }}
              />
            </div>
          </div>
        </div>
        <div id="nav-links" className="hidden md:block" style={{ color: isServicesPage ? secondaryColor : "inherit" }}>
          <ul className="flex w-[25vw] justify-between font-bold text-lg">
            <li className="opacity-0">
              <Link href="/services">Services</Link>
            </li>
            <li className="opacity-0">
              <Link href="/project">Projects</Link>
            </li>
            <li className="opacity-0">
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
        <div
          id="contact-btn"
          className="hidden md:block font-black rounded-full px-6 py-2 opacity-0 cursor-pointer"
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 scale-80 sm:scale-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span
            className={`block w-8 h-1 rounded transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
            style={{ backgroundColor: primaryColor }}
          ></span>
          <span
            className={`block w-8 h-1 rounded transition-opacity duration-300 ease-in-out ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
            style={{ backgroundColor: primaryColor }}
          ></span>
          <span
            className={`block w-8 h-1 rounded transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
            style={{ backgroundColor: primaryColor }}
          ></span>
        </button>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden absolute top-[calc(100%-1px)] left-0 right-0 shadow-[0_40px_80px_rgba(0,0,0,0.15)] rounded-b-[1rem] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] transform origin-top overflow-hidden ${
            isMenuOpen
              ? "opacity-100 scale-y-100"
              : "opacity-0 scale-y-95 pointer-events-none"
          }`}
          style={{ backgroundColor: secondaryColor }}
        >
          <div className="flex flex-col px-8 py-10 gap-2">
            {[
              { name: "Services", href: "/services" },
              { name: "Projects", href: "/project" },
              { name: "About", href: "/about" },
            ].map((item, i) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`group flex items-center justify-between py-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isMenuOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                  style={{ 
                    color: tertialColor, 
                    
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-avant font-bold text-xl sm:text-4xl tracking-tight ">{item.name}</span>
                  <span className="opacity-50 transform group-hover:translate-x-2 transition-transform duration-300">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </span>
                </Link>
                <div 
                  className="w-full h-[1px] opacity-10" 
                  style={{ backgroundColor: primaryColor }}
                ></div>
              </div>
            ))}
            
            <button
              className={`group flex items-center justify-center w-full rounded-full py-2 mt-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
              }`}
              style={{ 
                color: secondaryColor,
                backgroundColor: primaryColor,
                transitionDelay: isMenuOpen ? "400ms" : "0ms" 
              }}
              onClick={() => {
                setIsMenuOpen(false);
                window.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: "smooth",
                });
              }}
            >
              <span className="font-avant font-bold text-xl tracking-wide">Let's Talk</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
export default Navbar;
