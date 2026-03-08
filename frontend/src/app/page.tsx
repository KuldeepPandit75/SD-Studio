import Image from "next/image";
import Hero from "../components/Hero/Hero";
import OurServices from "../components/OurServices/OurServices";
import Projects from "../components/Projects/Projects";
import Testimonials from "../components/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <OurServices />
      <Projects/>
      <Testimonials/>
    </>
  );
}
