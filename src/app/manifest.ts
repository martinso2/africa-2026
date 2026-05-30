import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Martin Family Safari 2026",
    short_name: "Safari 2026",
    description:
      "Mobile safari itinerary with accommodations, weather, and photography planning.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f2e8",
    theme_color: "#1f3a35",
    icons: [
      {
        src: "/safari.png",
        sizes: "1024x1024",
        type: "image/png",
      },
      {
        src: "/safari.ico",
        sizes: "256x256",
        type: "image/x-icon",
      },
    ],
  };
}
