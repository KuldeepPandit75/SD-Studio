export const services = [
  {
    id: "architectural",
    name: "Architectural Planning",
    tagline: "Blueprint Your Vision with Precision",
    shortDesc:
      "Detailed architectural layouts for efficient space planning and structural clarity.",
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
    galleryImgs: [
      "/images/proj2.jpg",
      "/images/proj4.jpg",
      "/images/proj8.jpg",
    ],
    accent: "#8B7355",
  },

  {
    id: "exterior",
    name: "Exterior & Elevation",
    tagline: "Make a Statement from the Street",
    shortDesc:
      "Stunning exterior rendering with precise detailing and exceptional visual appeal.",
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
    img: "/images/projNirvana.jpeg",
    galleryImgs: [
      "/images/exterior1.jpeg",
      "/images/proj4.jpg",
      "/images/projGrand.jpeg",
    ],
    accent: "#5B7B8A",
  },
  {
    id: "interior",
    name: "Interior Design",
    tagline: "Feel the Space Before It Exists",
    shortDesc:
      "Realistic interior renders that showcase lighting, materials, and atmosphere.",
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
    img: "/images/interior2.jpeg",
    galleryImgs: [
      "/images/proj1.jpg",
      "/images/interior3.jpeg",
      "/images/interior1.jpeg",
    ],
    accent: "#7A9E7E",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "We listen. You share your vision, budget, timeline, and reference images. We ask the right questions to truly understand what you want to create.",
    duration: "30 min call",
  },
  {
    step: "02",
    title: "Concept & Moodboard",
    description:
      "We curate a visual moodboard — colors, textures, styles, and spatial ideas — to align our creative direction with your taste before any modeling begins.",
    duration: "2-3 days",
  },
  {
    step: "03",
    title: "3D Modeling",
    description:
      "Our team builds your space in three dimensions — every wall, window, and finish is modeled with millimeter precision using industry-leading software.",
    duration: "3-5 days",
  },
  {
    step: "04",
    title: "Lighting & Materials",
    description:
      "We simulate real-world physics — how light bounces off marble, filters through curtains, and casts shadows at the golden hour. This is where renders become real.",
    duration: "1-2 days",
  },
  {
    step: "05",
    title: "Review & Refine",
    description:
      "You review, we refine. We offer revision rounds until every pixel matches your vision. Move a lamp, swap a texture, change the time of day — it's all possible.",
    duration: "2-3 rounds",
  },
  {
    step: "06",
    title: "Final Delivery",
    description:
      "High-resolution renders, walkthroughs, and all project files delivered in your preferred formats. Your project, ready to impress clients and break ground.",
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

export const PROJECTS = [
  {
    id: 1,
    name: "Nirvana\nGuraidhoo",
    slug: "nirvana-guraidhoo",
    type: "Commercial",
    location: "Guraidhoo Island, Maldives",
    status: "Ongoing",
    size: "250 sq mtr",
    image: "/images/projNirvana.jpeg",
    year: "2026",
    orientation: "landscape",
    description:
      "A boutique hospitality retreat on Guraidhoo Island that draws from the Maldivian vernacular — open-air circulation, coral stone materiality, and a direct relationship between built form and the Indian Ocean horizon. The design prioritises cross-ventilation and shaded outdoor gathering spaces, creating an architecture that belongs to its place.",
    scope: [
      "Master Planning",
      "Exterior Design",
      "Landscape",
      "Interior Concept",
    ],
    gallery: [
      "/images/projNirvana.jpeg",
    ],
    highlights: [
      "Open-air pavilion structures with thatched roofing",
      "Coral stone and reclaimed teak material palette",
      "Infinity-edge pool integrated with natural rock formations",
      "Cross-ventilated guest suites oriented toward prevailing winds",
    ],
    client: {
      name: "Abdulla Rasheed",
      quote:
        "SD Studio understood the island context in a way we hadn't seen before. They designed with the wind, the tide, and the light — not against them.",
    },
  },
  {
    id: 2,
    name: "Apex\nHouse",
    slug: "apex-house",
    type: "Residence",
    location: "Sector 12, Noida (Near Adobe Regional Office)",
    status: "Ongoing",
    size: "250 sq mtr",
    image: "/images/projApex.jpeg",
    year: "2025",
    orientation: "portrait",
    description:
      "A compact urban residence that maximises vertical space through a series of split-level floors connected by a central light well. The facade employs angled aluminium fins that filter harsh western sun while creating a distinctive street presence. Every square metre is designed to work harder.",
    scope: ["Architectural Planning", "Exterior Design", "Interior Design"],
    gallery: [
      "/images/projApex.jpeg",
    ],
    highlights: [
      "Split-level floor plates maximising spatial perception",
      "Central light well bringing daylight to every floor",
      "Angled aluminium fin facade for solar shading",
      "Rooftop terrace with city views",
    ],
    client: {
      name: "Rajesh & Priya Malhotra",
      quote:
        "We had a narrow plot and big aspirations. SD Studio turned our constraints into the defining character of the house.",
    },
  },
  {
    id: 3,
    name: "The Jain's\nCommercial",
    slug: "jains-commercial",
    type: "Commercial",
    location: "Sector 93B, Noida",
    status: "Ongoing",
    size: "350 sq mtr",
    image: "/images/projJains.jpeg",
    year: "2026",
    orientation: "landscape",
    description:
      "The Jain's Commercial is a mixed-use building designed to serve as a hub for commerce and community. With retail spaces on the ground floor and office spaces on the upper floors, the building is designed to be a landmark in the neighbourhood.",
    scope: [
      "Architectural Planning",
      "Commercial Design",
      "Facade Design",
      "Retail Planning",
    ],
    gallery: [
      "/images/projJains.jpeg",
      "/images/skylineInt.png",
      "/images/skylineInt2.png",
      "/images/skylineInt3.png"
    ],
    highlights: [
      "Retail spaces on the ground floor for maximum footfall",
      "Premium office spaces on upper floors with flexible layouts",
      "Modern facade design acting as a local landmark",
      "Efficient circulation and parking management",
    ],
    client: {
      name: "Jain Developers",
      quote:
        "SD Studio delivered a design that perfectly balances retail visibility with premium office functionality.",
    },
  },
  {
    id: 4,
    name: "The Griha",
    slug: "griha-residence",
    type: "Residence",
    location: "Sector 56, Noida",
    status: "Ongoing",
    size: "350 sq mtr",
    image: "/images/projGriha.jpeg",
    year: "2026",
    orientation: "portrait",
    description:
      "Griha is a contemporary residence located in Sector 56, Noida, currently under construction with the foundation laid. The design focuses on maximizing natural light and ventilation, with large openings and a central courtyard that serves as the heart of the home.",
    scope: [
      "Architectural Planning",
      "Residential Design",
      "Vastu Compliance",
      "Interior Layout",
    ],
    gallery: [
      "/images/projGriha.jpeg",
    ],
    highlights: [
      "Central courtyard designed as the heart of the home",
      "Large strategic openings to maximize natural light",
      "Cross-ventilation prioritized across all living spaces",
      "Contemporary architectural language with deep overhangs",
    ],
    client: {
      name: "The Gupta Family",
      quote:
        "Even at the foundation stage, we can see our dream home taking shape. The courtyard concept is exactly what we envisioned for our family.",
    },
  },
  {
    id: 5,
    name: "The Grand\nFrame",
    slug: "the-grand-frame",
    type: "Residence",
    location: "Sector 100, Noida",
    status: "Ongoing",
    size: "250 sq mtr",
    image: "/images/projGrand.jpeg",
    year: "2025",
    orientation: "portrait",
    description:
      "Named for its bold structural expression, The Grand Frame uses exposed concrete portal frames as both structure and ornament. The interiors flow between framed views of the garden, with floor-to-ceiling glazing dissolving the boundary between inside and out. A house that celebrates the honesty of its construction.",
    scope: [
      "Architectural Planning",
      "Structural Expression",
      "Interior Design",
      "Landscape",
    ],
    gallery: [
      "/images/projGrand.jpeg",
    ],
    highlights: [
      "Exposed concrete portal frame as design feature",
      "Floor-to-ceiling glazing on garden elevation",
      "Double-height living room with mezzanine library",
      "Sunken courtyard connecting basement to ground level",
    ],
    client: {
      name: "Vikram Sehgal",
      quote:
        "They showed us that structure doesn't need to be hidden. The frames became the identity of our home.",
    },
  },
  {
    id: 6,
    name: "The Obsidian\nHouse",
    slug: "the-obsidian-house",
    type: "Residence",
    location: "Sector Delta 3, Greater Noida",
    status: "Ongoing",
    size: "450 sq mtr",
    image: "/images/projObsidian.jpeg",
    year: "2026",
    orientation: "landscape",
    description:
      "A commanding residence clad in dark Kadappa stone and charcoal-finished metal, The Obsidian House makes a deliberate statement of restraint. The monochromatic exterior gives way to warm timber and textured plaster interiors, creating a journey from public formality to private warmth. The plan wraps around a central water court that brings reflected light deep into the house.",
    scope: [
      "Exterior Design",
      "Interior Design",
      "Landscape",
      "Lighting Design",
    ],
    gallery: [
      "/images/projObsidian.jpeg",
    ],
    highlights: [
      "Kadappa stone and charcoal metal cladding",
      "Central water court with reflected light",
      "Warm timber and textured plaster interiors",
      "Automated lighting scenes for day-to-night transitions",
      "Private rooftop garden with lap pool",
    ],
    client: {
      name: "Amit & Neha Kapoor",
      quote:
        "SD Studio created a house that feels powerful from the street but incredibly warm once you step inside. That duality is exactly what we wanted.",
    },
  },
  {
    id: 7,
    name: "Urban Oasis\nRooftop",
    slug: "urban-oasis-rooftop",
    type: "Commercial (Terrace Garden)",
    location: "Salendpur Village, Begusarai, Bihar",
    status: "Ongoing",
    size: "400 sq m",
    image: "/images/projOasis.jpeg",
    year: "2025",
    orientation: "landscape",
    description:
      "Transforming a bare concrete rooftop into a layered garden retreat, Urban Oasis creates three distinct zones — a productive kitchen garden, a contemplative seating grove, and a social entertainment deck. The design uses lightweight planters, a drip irrigation system, and carefully selected species that thrive in Bihar's humid subtropical climate.",
    scope: [
      "Landscape Design",
      "Terrace Garden",
      "Irrigation Planning",
      "Structural Assessment",
    ],
    gallery: [
      "/images/projOasis.jpeg",
    ],
    highlights: [
      "Three-zone garden layout: productive, contemplative, social",
      "Lightweight planter system for structural safety",
      "Automated drip irrigation with rainwater harvesting",
      "Native and climate-adapted plant species",
    ],
    client: {
      name: "Dr. Sanjay Prasad",
      quote:
        "They turned our forgotten rooftop into the most-used space in the building. The garden practically takes care of itself.",
    },
  },
  {
    id: 8,
    name: "The Nexus\nResidence",
    slug: "the-nexus-residence",
    type: "Residence",
    location: "Sector 100, Noida",
    status: "Ongoing",
    size: "250 sq mtr",
    image: "/images/projNexus.jpeg",
    year: "2025",
    orientation: "portrait",
    description:
      "The Nexus Residence is conceived as a series of interlocking volumes, each housing a distinct family function — living, dining, private quarters, and a home studio. The junctions between volumes become the most interesting spaces: double-height voids, skylit staircases, and framed garden views that connect the separate worlds of the house.",
    scope: ["Architectural Planning", "Exterior Design", "Interior Design"],
    gallery: [
      "/images/projNexus.jpeg",
    ],
    highlights: [
      "Interlocking volume composition",
      "Skylit staircase connecting all levels",
      "Dedicated home studio with acoustic treatment",
      "Framed garden views at volume junctions",
    ],
    client: {
      name: "Arjun & Kavita Reddy",
      quote:
        "We needed a house where everyone could have their own space but still feel connected. The interlocking plan does exactly that.",
    },
  },
  {
    id: 9,
    name: "Arcadia\nResidence",
    slug: "arcadia-residence",
    type: "Residence",
    location: "Sector 63, Noida",
    status: "Ongoing",
    size: "450 sq mtr",
    image: "/images/projArcadia.jpeg",
    year: "2025",
    orientation: "landscape",
    description:
      "Arcadia is a generous family home that places landscape at the heart of its plan. A mature neem tree anchors the central courtyard, around which all living spaces are arranged. The architecture steps back at upper levels to create deep terraces planted with jasmine and bougainvillea, blurring the line between garden and house.",
    scope: [
      "Architectural Planning",
      "Exterior Design",
      "Landscape",
      "Interior Design",
    ],
    gallery: [
      "/images/projArcadia.jpeg",
    ],
    highlights: [
      "Central courtyard built around an existing neem tree",
      "Stepped-back upper floors with planted terraces",
      "Natural stone flooring continuous from inside to outside",
      "Passive cooling through courtyard stack ventilation",
    ],
    client: {
      name: "The Sharma Family",
      quote:
        "Our children play in the courtyard, we have morning tea on the terrace surrounded by jasmine — SD Studio designed a home, not just a building.",
    },
  },
  {
    id: 10,
    name: "Canopy\nHouse",
    slug: "canopy-house",
    type: "Residence",
    location: "Sector 63, Noida",
    status: "Ongoing",
    size: "450 sq mtr",
    image: "/images/projCanopy.jpeg",
    year: "2025",
    orientation: "landscape",
    description:
      "Canopy House takes its name from its defining architectural gesture — a broad, floating concrete roof plane that extends well beyond the building envelope, creating deep shaded verandas on all sides. Beneath this protective canopy, the living spaces open generously to the garden through folding glass walls, making the house feel twice its size.",
    scope: [
      "Architectural Planning",
      "Exterior Design",
      "Interior Design",
      "Landscape",
    ],
    gallery: [
      "/images/projCanopy.jpeg",
    ],
    highlights: [
      "Cantilevered concrete roof extending 3 metres beyond walls",
      "Folding glass walls dissolving indoor-outdoor boundary",
      "Deep shaded verandas on all orientations",
      "Integrated rainwater collection through roof drainage",
    ],
    client: {
      name: "Deepak & Sunita Joshi",
      quote:
        "The overhanging roof changed everything. We live with our doors open eight months of the year now. It's a completely different way of life.",
    },
  },
  {
    id: 11,
    name: "The Linear\nResidence",
    slug: "the-linear-residence",
    type: "Residence",
    location: "Sector 51, Noida",
    status: "Ongoing",
    size: "93 sq mtr",
    image: "/images/projLinear.jpeg",
    year: "2026",
    orientation: "portrait",
    description:
      "A masterclass in small-footprint design, The Linear Residence arranges all functions along a single east-west axis, ensuring every room receives direct sunlight and natural ventilation. At just 93 square metres, the home feels spacious through careful use of built-in furniture, continuous flooring, and a private rear garden that extends the living room visually.",
    scope: ["Architectural Planning", "Interior Design", "Space Optimisation"],
    gallery: [
      "/images/projLinear.jpeg",
    ],
    highlights: [
      "Single-axis plan for maximum light and ventilation",
      "Built-in furniture reducing spatial clutter",
      "Continuous flooring from entrance to rear garden",
      "Compact yet complete home in under 100 sq mtr",
    ],
    client: {
      name: "Sneha Chatterjee",
      quote:
        "Everyone told me 93 square metres would feel cramped. SD Studio proved them wrong — my home feels open, bright, and genuinely spacious.",
    },
  },
  {
    id: 12,
    name: "The Guest\nHouse",
    slug: "the-guest-house",
    type: "Commercial",
    location: "Sector 117, Noida",
    status: "Completed",
    size: "340 sq mtr",
    image: "/images/projGuest.jpeg",
    year: "2025",
    orientation: "portrait",
    description:
      "A boutique guest house designed to offer the warmth of a private home with the efficiency of a hospitality operation. Six individually themed suites are arranged around a shared lounge and breakfast courtyard, each with its own material identity — terrazzo, exposed brick, polished concrete, timber — creating a distinct sense of place in every room.",
    scope: [
      "Architectural Planning",
      "Interior Design",
      "Branding & Signage",
      "Landscape",
    ],
    gallery: [
      "/images/projGuest.jpeg",
    ],
    highlights: [
      "Six individually themed guest suites",
      "Shared courtyard with breakfast seating",
      "Distinct material identity per room",
      "Integrated branding and wayfinding signage",
      "First completed project in the SD Studio portfolio",
    ],
    client: {
      name: "Manish & Ritu Agarwal",
      quote:
        "Our guests always comment on how each room feels like a different experience. SD Studio gave us a guest house with real character.",
    },
  },
];
