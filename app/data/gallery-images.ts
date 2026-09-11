export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  /** Optional grouping tag shown as a filter chip in the gallery. */
  category?: string;
};

// To add more photos: drop the file in /public/images/gallery/ (or reuse an
// existing /public/images/... path) and add one entry below. New entries can
// go anywhere in the array — order here is the display order, newest-first
// is a reasonable default.
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "rooftop-1",
    src: "/images/portfolio/rooftop-garden-1.jpg",
    alt: "Hexagonal concrete planters with tropical foliage on a Lagos rooftop garden",
    category: "Commercial",
  },
  {
    id: "rooftop-2",
    src: "/images/portfolio/rooftop-garden-2.jpg",
    alt: "Rooftop garden walkway with Lagos skyline in the background",
    category: "Commercial",
  },
  {
    id: "rooftop-3",
    src: "/images/portfolio/rooftop-garden-3.jpg",
    alt: "Concrete bench seating area on a landscaped rooftop garden",
    category: "Commercial",
  },
  {
    id: "golden-park",
    src: "/images/portfolio/golden-park-estate-ajah.jpg",
    alt: "Golden Park Estate road landscaping, before and after, Ajah, Lagos",
    category: "Estate",
  },
  {
    id: "precious-estate",
    src: "/images/portfolio/precious-estate-ido-ibadan.jpg",
    alt: "Precious Estate gated entrance landscaping, before and after, Ido, Ibadan",
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
];
