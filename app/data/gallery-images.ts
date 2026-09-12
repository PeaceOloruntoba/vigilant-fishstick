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
    id: "national-theatre-1",
    src: "/images/portfolio/rooftop-garden-1.jpg",
    alt: "Hexagonal concrete planters with tropical foliage on the National Theatre rooftop garden, Lagos",
    category: "National Theatre",
  },
  {
    id: "national-theatre-2",
    src: "/images/portfolio/rooftop-garden-2.jpg",
    alt: "National Theatre rooftop garden walkway with the Lagos skyline in the background",
    category: "National Theatre",
  },
  {
    id: "national-theatre-3",
    src: "/images/portfolio/rooftop-garden-3.jpg",
    alt: "Concrete bench seating area on the National Theatre rooftop garden, Lagos",
    category: "National Theatre",
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

// Notes:
// - /images/hero/hero-image.jpg is intentionally NOT listed here — it's the
//   same National Theatre photo as national-theatre-3 above, just saved at
//   different compression for the hero background. Listing both would show
//   the same photo twice.
// - /images/editorial/about-section.jpg (the About section photo) is also
//   NOT listed — it's about to be replaced with new photography, so there's
//   nothing stable to caption yet. Once the new photo is in, add an entry
//   for it here with real alt text.