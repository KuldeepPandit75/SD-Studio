export const services = [
  {
    id: "interior",
    name: "Interior Design",
    tagline: "Feel the Space Before It Exists",
    shortDesc: "Realistic interior renders that showcase lighting, materials, and atmosphere.",
    description:
      "Step inside your dream space — before it's built. Our photorealistic interior renders go beyond mere visualization. We simulate the play of morning light on marble countertops, the warmth of wooden textures under ambient lighting, and the spatial harmony of carefully curated furniture layouts. Every render tells a story of the life that will unfold within those walls.",
    deliverables: [
      "High-resolution photorealistic renders (4K+)",
      "Multiple camera angles & perspectives",
      "Day & night mood variations",
      "Material & finish specification sheets",
      "Furniture layout recommendations",
      "360° virtual walkthrough (optional)",
    ],
    idealFor: "Homeowners, Interior Designers, Real Estate Developers",
    turnaround: "5-7 working days",
    img: "/images/interior.jpg",
    galleryImgs: ["/images/proj1.jpg", "/images/proj3.jpg", "/images/proj9.jpg"],
    accent: "#7A9E7E",
  },
  {
    id: "architectural",
    name: "Architectural Planning",
    tagline: "Blueprint Your Vision with Precision",
    shortDesc: "Detailed architectural layouts for efficient space planning and structural clarity.",
    description:
      "Great buildings begin with great plans. Our architectural planning service doesn't just draw lines on paper — we engineer experiences. Every corridor has purpose, every room has optimal proportions, and every structural element is placed with both beauty and building science in mind. We translate your ideas into technically accurate, aesthetically refined blueprints ready for construction.",
    deliverables: [
      "Detailed floor plans with dimensions",
      "Site layout & orientation analysis",
      "Structural column & beam layout",
      "Plumbing & electrical pathway planning",
      "Vastu/Feng Shui compliance (on request)",
      "AutoCAD & PDF deliverables",
    ],
    idealFor: "Architects, Builders, Contractors, Homeowners",
    turnaround: "7-10 working days",
    img: "/images/arch.jpg",
    galleryImgs: ["/images/proj2.jpg", "/images/proj4.jpg", "/images/proj8.jpg"],
    accent: "#8B7355",
  },
  {
    id: "exterior",
    name: "Exterior & Elevation",
    tagline: "Make a Statement from the Street",
    shortDesc: "Stunning exterior rendering with precise detailing and exceptional visual appeal.",
    description:
      "Your building's face tells its story to the world. We craft exterior visualizations that capture the soul of your architecture — the way sunset paints golden hues across a modern facade, how rain-washed concrete gleams under street lights, or how a classical elevation commands respect from the streetscape. Our renders don't just show what your building looks like; they show how it feels.",
    deliverables: [
      "Photorealistic exterior renders (4K+)",
      "Front, rear & side elevation designs",
      "Material palette with cladding options",
      "Contextual renders with surroundings",
      "Day, dusk & night scene variations",
      "Drone-perspective aerial views",
    ],
    idealFor: "Real Estate Developers, Architects, Property Sellers",
    turnaround: "5-7 working days",
    img: "/images/exterior.jpg",
    galleryImgs: ["/images/proj5.jpg", "/images/proj6.jpg", "/images/proj7.jpg"],
    accent: "#5B7B8A",
  },
  {
    id: "landscape",
    name: "Landscape & Terrace Gardens",
    tagline: "Where Nature Meets Architecture",
    shortDesc: "Transforming outdoor spaces into serene, functional environments.",
    description:
      "We believe every building deserves a relationship with nature. Our landscape and terrace garden designs create breathing spaces — rooftop retreats where you can touch the sky, garden pathways that guide you through curated greenery, and outdoor living areas that extend the warmth of home into the open air. From compact balcony gardens to expansive villa landscapes, we design nature into every project.",
    deliverables: [
      "3D landscape visualization renders",
      "Plant species selection & layout",
      "Hardscape & pathway design",
      "Water feature & irrigation planning",
      "Terrace garden structural analysis",
      "Seasonal bloom planning guide",
    ],
    idealFor: "Villa Owners, Farmhouse Projects, Commercial Spaces",
    turnaround: "7-10 working days",
    img: "/images/proj5.jpg",
    galleryImgs: ["/images/proj10.jpg", "/images/proj11.jpg", "/images/proj12.jpg"],
    accent: "#6B8E6B",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    description: "We listen. You share your vision, budget, timeline, and reference images. We ask the right questions to truly understand what you want to create.",
    duration: "30 min call",
  },
  {
    step: "02",
    title: "Concept & Moodboard",
    description: "We curate a visual moodboard — colors, textures, styles, and spatial ideas — to align our creative direction with your taste before any modeling begins.",
    duration: "2-3 days",
  },
  {
    step: "03",
    title: "3D Modeling",
    description: "Our team builds your space in three dimensions — every wall, window, and finish is modeled with millimeter precision using industry-leading software.",
    duration: "3-5 days",
  },
  {
    step: "04",
    title: "Lighting & Materials",
    description: "We simulate real-world physics — how light bounces off marble, filters through curtains, and casts shadows at the golden hour. This is where renders become real.",
    duration: "1-2 days",
  },
  {
    step: "05",
    title: "Review & Refine",
    description: "You review, we refine. We offer revision rounds until every pixel matches your vision. Move a lamp, swap a texture, change the time of day — it's all possible.",
    duration: "2-3 rounds",
  },
  {
    step: "06",
    title: "Final Delivery",
    description: "High-resolution renders, walkthroughs, and all project files delivered in your preferred formats. Your project, ready to impress clients and break ground.",
    duration: "Digital delivery",
  },
];

export const tools = [
  { name: "3ds Max", category: "3D Modeling" },
  { name: "V-Ray", category: "Rendering" },
  { name: "SketchUp", category: "3D Modeling" },
  { name: "AutoCAD", category: "Drafting" },
  { name: "Photoshop", category: "Post-production" },
  { name: "Lumion", category: "Real-time Viz" },
  { name: "Enscape", category: "Real-time Viz" },
  { name: "Corona", category: "Rendering" },
];

export const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most projects are delivered within 5-10 working days depending on complexity. Interior renders typically take 5-7 days, while full architectural planning can take 7-10 days. Rush delivery is available for urgent projects at an additional fee.",
  },
  {
    q: "What do you need from me to get started?",
    a: "We typically need your floor plans (hand-drawn sketches work too!), reference images of styles you like, and any specific material or color preferences. For architectural planning, we'll need the plot dimensions and any local building regulations you're aware of.",
  },
  {
    q: "How many revisions are included?",
    a: "Every project includes 2-3 rounds of revisions at no additional cost. We want you to be completely satisfied. Major scope changes (like redesigning an entire room) may incur additional charges, which we'll always discuss beforehand.",
  },
  {
    q: "Can you work with my existing architect or builder?",
    a: "Absolutely! We regularly collaborate with architects, builders, and interior designers. We can work from their CAD files, adapt to their specifications, and deliver files in formats compatible with their workflow.",
  },
  {
    q: "Do you offer walkthrough videos?",
    a: "Yes! We create cinematic 3D walkthrough videos that let you 'walk' through your space. These are perfect for client presentations, marketing materials, and pre-construction approval meetings.",
  },
  {
    q: "What is the pricing structure?",
    a: "Pricing depends on the project scope, complexity, and number of views required. We offer competitive rates starting from ₹2,000 per view for interior renders. Contact us for a custom quote tailored to your specific project needs.",
  },
];
