import Carousel from "./Carousel";
import ProjectsOverlay from "./ProjectsOverlay";

export const metadata = {
  title: "Projects | Sanova Architects",
  description:
    "Explore our portfolio of architectural projects — villas, residences, commercial spaces, interiors, and landscapes brought to life by Sanova Architects.",
};

export default function ProjectPage() {
  return (
    <div className="projects-page">
      <Carousel />
      <ProjectsOverlay />
    </div>
  );
}
