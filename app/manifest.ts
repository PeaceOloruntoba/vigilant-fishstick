import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Landfairy Global Investment Ltd",
    short_name: "Landfairy",
    description:
      "Landscape architecture, horticulture and property maintenance across Nigeria.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#022c22",
    icons: [
      {
        src: "/icon.png",
        sizes: "520x520",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
