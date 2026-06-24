import Image from "next/image";
import Hero from "../components/Hero/Hero";
import OurServices from "../components/OurServices/OurServices";
import Projects from "../components/Projects/Projects";
import Testimonials from "../components/Testimonials/Testimonials";
import FaqSection from "../components/Services/FaqSection";
import CtaSection from "../components/Services/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <OurServices />
      <Projects/>
      <Testimonials/>
      <FaqSection/>
      <CtaSection/>
    </>
  );
}
