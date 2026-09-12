export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category?: string;
  phase?: "Before" | "After";
};

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "national-theatre-1",
    src: "/images/portfolio/rooftop-garden-1.jpg",
    alt: "Hexagonal concrete planters with tropical foliage at the National Theatre, Lagos",
    category: "National Theatre",
  },
  {
    id: "national-theatre-2",
    src: "/images/portfolio/rooftop-garden-2.jpg",
    alt: "National Theatre landscaped walkway with the Lagos skyline in the background",
    category: "National Theatre",
  },
  {
    id: "national-theatre-3",
    src: "/images/portfolio/rooftop-garden-3.jpg",
    alt: "Concrete bench seating area at the National Theatre, Lagos",
    category: "National Theatre",
  },
  {
    id: "golden-park",
    src: "/images/portfolio/golden-park-estate-ajah.jpg",
    alt: "Golden Park Estate road landscaping, Ajah, Lagos",
    category: "Estate",
  },
  {
    id: "precious-estate",
    src: "/images/portfolio/precious-estate-ido-ibadan.jpg",
    alt: "Precious Estate gated entrance landscaping, Ido, Ibadan",
    category: "Estate",
  },
  {
    id: "adebambo-residence",
    src: "/images/portfolio/adebambo-residence-eleyele-ibadan.jpg",
    alt: "Adebambo Residence planting installation, Eleyele, Ibadan",
    category: "Residential",
  },
  {
    id: "urban-homes",
    src: "/images/portfolio/urban-homes.jpg",
    alt: "Estate road landscaping for the Urban Homes project",
    category: "Residential",
  },
  {
    id: "national-theatre-before-1",
    src: "/images/gallery/before-1.jpg",
    alt: "National Theatre grounds before landscaping work, Lagos",
    phase: "Before",
  },
  {
    id: "national-theatre-before-2",
    src: "/images/gallery/before-2.jpg",
    alt: "National Theatre grounds before landscaping work, Lagos",
    phase: "Before",
  },
  {
    id: "national-theatre-before-3",
    src: "/images/gallery/before-3.jpg",
    alt: "National Theatre grounds before landscaping work, Lagos",
    phase: "Before",
  },
  {
    id: "national-theatre-after-1",
    src: "/images/gallery/after-1.jpg",
    alt: "National Theatre grounds after landscaping work, Lagos",
    phase: "After",
  },
  {
    id: "national-theatre-after-2",
    src: "/images/gallery/after-2.jpg",
    alt: "National Theatre grounds after landscaping work, Lagos",
    phase: "After",
  },
  {
    id: "national-theatre-after-3",
    src: "/images/gallery/after-3.jpg",
    alt: "National Theatre grounds after landscaping work, Lagos",
    phase: "After",
  },
  {
    id: "national-theatre-after-4",
    src: "/images/gallery/after-4.jpg",
    alt: "National Theatre grounds after landscaping work, Lagos",
    phase: "After",
  },
];