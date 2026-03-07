import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";

import LenisProvider from "../components/LenisProvider/LenisProvider";
import Footer from "../components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SD Studio",
  description:
    "Our layout designs focus on efficient space planning and structural clarity. We create detailed architectural layouts that help visualize room placement, circulation, and functional design before construction begins. With accurate planning and modern design principles, we ensure every space is optimized for both aesthetics and usability.",
  keywords: [
    "SD Studio",
    "Architectural layouts",
    "residential layout design",
    "home layout design",
    "building layout design",
    "interior design",
    "architectural design",
    "layout design",
    "space planning",
    "structural clarity",
    "functional design",
    "modern design principles",
    "optimized space",
    "aesthetics and usability",
  ],
  authors: [
    {
      name: "SD Studio",
      url: "https://sandeep3d.studio",
    },
  ],
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <LenisProvider>
            <Navbar />
            {children}
            <Footer />
          </LenisProvider>
        </div>
      </body>
    </html>
  );
}
