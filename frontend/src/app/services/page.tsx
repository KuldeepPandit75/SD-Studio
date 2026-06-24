import { Metadata } from "next";
import HeroSection from "@/src/components/Services/HeroSection";
import Marquee from "@/src/components/Services/Marquee";
import ServicesShowcase from "@/src/components/Services/ServicesShowcase";
import ProcessTimeline from "@/src/components/Services/ProcessTimeline";
import Toolkit from "@/src/components/Services/Toolkit";
import StatsSection from "@/src/components/Services/StatsSection";
// import WhyChooseUs from "@/src/components/Services/WhyChooseUs";
import FaqSection from "@/src/components/Services/FaqSection";
import CtaSection from "@/src/components/Services/CtaSection";

export const metadata: Metadata = {
  title: "Services | SD Studio",
  description:
    "Explore our professional 3D visualization, architectural planning, interior design, and landscape design services. We bring your ideas to life with photorealistic renders.",
};

export default function ServicesPage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <Marquee />
      <ServicesShowcase />
      <ProcessTimeline />
      <Toolkit />
      <StatsSection />
      {/* <WhyChooseUs /> */}
      <FaqSection />
      <CtaSection />
    </main>
  );
}
