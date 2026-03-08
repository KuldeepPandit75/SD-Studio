"use client";

import React from "react";
import { useThemeStore } from "@/src/Zustand_Store/ThemeStore";

const Footer = () => {
  const { primaryColor, secondaryColor, tertialColor } = useThemeStore();

  return (
    <footer
      className="relative w-full text-white overflow-hidden pt-20 pb-8 px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: tertialColor }}
    >
      {/* Background Graphic */}
      <div className="absolute bottom-0 left-0 pointer-events-none z-0">
        <img
          src="/images/footer.svg"
          alt="footer bg architectural"
          style={{}}
          className="relative bottom-0 left-0"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
        {/* Left Side: Contact Info */}
        <div className="flex-1 flex flex-col justify-center space-y-10 lg:pr-10">
          <div>
            <p className="tracking-widest text-[#B0B0B0] font-medium text-sm lg:text-base uppercase mb-8">
              Contact Us
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold font-avant leading-[1.2] tracking-tight">
              Have a <span style={{ color: primaryColor }}>project</span> in
              mind? 
              Let’s bring{" "}
              <span style={{ color: primaryColor }}>your vision</span> to{" "}
              <span style={{ color: primaryColor }}>life.</span>
            </h2>
          </div>

          <div className="space-y-4 text-[#D1D5DB] font-avenir text-lg">
            <div className="border-b border-gray-700/60 pb-2 inline-block">
              <span className="font-bold text-white w-20 inline-block font-avant">
                Phone:
              </span>{" "}
              +91 7048917199
            </div>
            <br />
            <div className="border-b border-gray-700/60 pb-2 inline-block">
              <span className="font-bold text-white w-20 inline-block font-avant">
                Email:
              </span>{" "}
              sandeep3dstudio@gmail.com
            </div>
          </div>

          <div className="pt-6">
            <h3 className="font-bold text-xl mb-4 text-white font-avant">
              Quick Links
            </h3>
            <ul className="flex flex-wrap gap-x-8 gap-y-4 text-gray-300 font-avenir text-lg">
              <li>
                <a href="#" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Projects
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 flex justify-end">
          <div
            className="w-full max-w-[500px] p-8 md:p-12 shadow-2xl relative"
            style={{ backgroundColor: secondaryColor }}
          >
            <form className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-[#E5E9EC] text-gray-800 placeholder-gray-500 rounded-[10px] px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#7A9E7E] font-avenir text-[15px]"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-[#E5E9EC] text-gray-800 placeholder-gray-500 rounded-[10px] px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#7A9E7E] font-avenir text-[15px]"
                />
              </div>

              <input
                type="email"
                placeholder="Email ID"
                className="w-full bg-[#E5E9EC] text-gray-800 placeholder-gray-500 rounded-[10px] px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#7A9E7E] font-avenir text-[15px]"
              />

              <div className="relative">
                <input
                  type="tel"
                  placeholder="Phone No."
                  className="w-full bg-[#E5E9EC] text-gray-800 placeholder-gray-500 rounded-[10px] px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#7A9E7E] pr-12 font-avenir text-[15px]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 border border-gray-400 rounded-full p-0.5 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </div>

              <input
                type="text"
                placeholder="Project Type"
                className="w-full bg-[#E5E9EC] text-gray-800 placeholder-gray-500 rounded-[30px] px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#7A9E7E] font-avenir text-[15px]"
              />

              <textarea
                placeholder="Message / Project Details"
                rows={5}
                className="w-full bg-[#E5E9EC] text-gray-800 placeholder-gray-500 rounded-[10px] px-5 py-4 outline-none focus:ring-2 focus:ring-[#7A9E7E] resize-none font-avenir text-[15px]"
              ></textarea>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-[20px] font-bold font-avenir transition transform hover:scale-105"
                  style={{ backgroundColor: primaryColor, color: tertialColor }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom Row */}
      <div className="relative z-10 w-full max-w-7xl mx-auto border-t border-gray-700/60 pt-6 flex flex-col md:flex-row justify-between items-center text-[13px] md:text-sm text-[#B0B0B0] font-avenir gap-6">
        <p>© 2026 Sandeep3DStudio. All Rights Reserved.</p>
        <div className="flex flex-col md:flex-row gap-4 md:space-x-8 items-center text-center">
          <a href="#" className="hover:text-white transition">
            Terms & Conditions
          </a>
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-white transition flex items-center md:pl-28"
          >
            Let's go top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
