export interface AstroPhotographyGuide {
  photoPillsSearch: string;
  suggestedDates: string[];
}

/** Shared Kenya night-sky workflow — stop-specific search & dates only */
export const KENYA_ASTRO_GUIDE = {
  title: "PhotoPills Quick Start · Kenya",
  plannerSteps: [
    "Open PhotoPills → Planner",
    "Search for your camp location (below)",
    "Set the date for the night you're shooting",
    "Move the time slider through evening hours",
    "Tap AR (Augmented Reality)",
    "Hold phone up to the sky and scout the Milky Way path",
  ],
  timeSliderHours: ["8:00 PM", "9:00 PM", "10:00 PM"],
  arLookFor: ["Milky Way", "Galactic Center", "Direction of rise and movement"],
  preSunsetScouting: [
    "Find a lone acacia tree",
    "Find a rock outcrop",
    "Find a tent silhouette",
    "Use AR to see where the Milky Way will appear",
  ],
  d850Settings: [
    { label: "Lens", value: "14mm" },
    { label: "Aperture", value: "f/2.8" },
    { label: "Shutter", value: "15 sec" },
    { label: "ISO", value: "6400" },
    { label: "Format", value: "RAW" },
    { label: "Mode", value: "Manual Focus" },
  ],
  focusSteps: [
    "Live View on",
    "Zoom in on the brightest star",
    "Manually focus until the star is the smallest point possible",
  ],
  checklist: [
    "Tripod",
    "Remote release or 2-second timer",
    "Headlamp with red light",
    "Fully charged batteries",
    "Empty memory cards",
  ],
  goalShot: "Acacia tree silhouette + Milky Way core above it.",
  reminder: "Composition matters more than camera settings.",
} as const;

export const STOP_ASTRO_GUIDES: Record<string, AstroPhotographyGuide> = {
  enasoit: {
    photoPillsSearch: "Enasoit Camp, Kenya",
    suggestedDates: ["June 7, 2026", "June 8, 2026"],
  },
  loisaba: {
    photoPillsSearch: "Loisaba Lodo Springs, Kenya",
    suggestedDates: ["June 10, 2026", "June 11, 2026"],
  },
};
