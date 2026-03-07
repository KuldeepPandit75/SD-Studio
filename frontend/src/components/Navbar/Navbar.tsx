"use client";

import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";
import Image from "next/image";

const Navbar = () => {
  const { primaryColor, secondaryColor } = useThemeStore();
  return (
    <>
      <header className="fixed top-0 w-full flex justify-between items-center font-avant h-[100px] px-[3vw]">
        <div id="logo" className="flex items-center gap-[40px] relative">
          <Image src="/icons/logoB.svg" alt="Logo" width={60} height={60} />
          <span className="relative bottom-1">
            <p className="font-black text-4xl">SD</p>
            <p className="font-beach text-2xl absolute top-[20px] left-[40px]">
              Studio
            </p>
          </span>
          <div
            className="absolute"
            id="lines"
          >
            <div className="relative opacity-70 flex flex-col gap-1">
              <hr className="border-black absolute -left-[3vw] -top-[35px] w-[200px]" />
              <hr className="border-black absolute -left-[3vw] -bottom-[35px] w-[160px]" />
              <hr className="border-black absolute -left-[50px] rotate-90 w-[250px]" />
              <hr className="border-black absolute -left-[340px] rotate-90 w-[650px]" />
            </div>
          </div>
        </div>
        <div id="nav-links">
          <ul className="flex w-[25vw] justify-between font-bold text-lg">
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Projects</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </div>
        <div
          id="contact-btn"
          className="font-black rounded-full px-6 py-2"
          style={{ backgroundColor: primaryColor, color: secondaryColor }}
        >
          <button>Let's Talk -&gt;</button>
        </div>
      </header>
    </>
  );
};
export default Navbar;
