import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Sanova Architects",
  description:
    "Our layout designs focus on efficient space planning and structural clarity. We create detailed architectural layouts that help visualize room placement, circulation, and functional design before construction begins. With accurate planning and modern design principles, we ensure every space is optimized for both aesthetics and usability.",
  keywords: [
    "Sanova Architects",
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
      name: "Sanova Architects",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
