export interface PackingNotes {
  morning: string;
  midday: string;
  evening: string;
  rainShell: string;
}

export interface PhotographyNotes {
  overview: string;
  lensSuggestions: string[];
  dustOrMoistureWarning: string;
  tips: string[];
}

export interface SafariStop {
  id: string;
  propertyName: string;
  location: string;
  region: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  coordinates: {
    lat: number;
    lon: number;
  };
  description: string;
  weatherLocationName: string;
  photoFolder: string;
  heroImage: string;
  galleryImages: string[];
  placeholderHero: string;
  placeholderGallery: string[];
  packingNotes: PackingNotes;
  photographyNotes: PhotographyNotes;
}

export const TRIP = {
  title: "Martin Family Safari 2026",
  dates: "June 5–15, 2026",
  subtitle: "Nairobi, Laikipia, Loisaba, and the Maasai Mara",
  startDate: "2026-06-05",
  endDate: "2026-06-15",
} as const;

export const ITINERARY: SafariStop[] = [
  {
    id: "hemingways",
    propertyName: "Hemingways Hotel",
    location: "Nairobi, Kenya",
    region: "Nairobi",
    checkIn: "2026-06-05",
    checkOut: "2026-06-06",
    nights: 1,
    coordinates: { lat: -1.3192, lon: 36.7073 },
    description:
      "An elegant boutique hotel in Karen — the perfect soft landing after the long flight, with refined comfort before the bush.",
    weatherLocationName: "Nairobi",
    photoFolder: "/images/hemingways",
    heroImage: "/images/hemingways/hero.jpg",
    galleryImages: [
      "/images/hemingways/room.jpg",
      "/images/hemingways/lounge.jpg",
      "/images/hemingways/garden.jpg",
    ],
    placeholderHero:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    placeholderGallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      "https://images.unsplash.com/photo-1611892440505-42a988e24f32?w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    ],
    packingNotes: {
      morning:
        "Light layers for Nairobi's cool mornings — long-sleeve shirt and comfortable trousers after the flight.",
      midday:
        "Breathable cotton or linen; Nairobi sits around 1,800 m and stays mild even at midday.",
      evening:
        "Smart-casual for hotel dining — a light sweater or wrap as temperatures dip after sunset.",
      rainShell:
        "Pack a compact rain shell; June can bring brief afternoon showers in Nairobi.",
    },
    photographyNotes: {
      overview:
        "Urban and garden scenes at Hemingways — relaxed compositions before the intensity of the bush.",
      lensSuggestions: [
        "24–70mm for hotel architecture and candid family moments",
        "16–24mm for garden and terrace wide shots",
      ],
      dustOrMoistureWarning:
        "Low dust risk in Nairobi; keep gear in your bag until on the terrace or in the garden.",
      tips: [
        "Golden hour on the Karen hillside is worth a short walk with the 24–70mm",
        "Charge all batteries tonight — limited charging opportunities start tomorrow in camp",
      ],
    },
  },
  {
    id: "enasoit",
    propertyName: "Enasoit Camp",
    location: "Laikipia, Kenya",
    region: "Laikipia",
    checkIn: "2026-06-06",
    checkOut: "2026-06-09",
    nights: 3,
    coordinates: { lat: 0.2833, lon: 37.0667 },
    description:
      "A private wilderness camp on the Laikipia Plateau — exclusive game drives, dramatic landscapes, and star-filled nights.",
    weatherLocationName: "Laikipia",
    photoFolder: "/images/enasoit",
    heroImage: "/images/enasoit/hero.jpg",
    galleryImages: [
      "/images/enasoit/tent.jpg",
      "/images/enasoit/landscape.jpg",
      "/images/enasoit/wildlife.jpg",
    ],
    placeholderHero:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80",
    placeholderGallery: [
      "https://images.unsplash.com/photo-1549366021-9f761d040683?w=800&q=80",
      "https://images.unsplash.com/photo-1504177847869-7624238d9975?w=800&q=80",
      "https://images.unsplash.com/photo-1489392197819-41fb497a678e?w=800&q=80",
    ],
    packingNotes: {
      morning:
        "Warm layers essential — fleece or light down jacket, gloves optional. Game drives start cold on the plateau.",
      midday:
        "Strip to a breathable shirt; sun hat and SPF 50+. Neutral khaki or olive tones blend with the bush.",
      evening:
        "Warm fleece under a safari jacket for sundowners and dinner. Closed shoes for walking around camp.",
      rainShell:
        "Lightweight waterproof shell in your day pack — Laikipia mornings can be misty in June.",
    },
    photographyNotes: {
      overview:
        "Laikipia offers diverse subjects — reticulated giraffe, Grevy's zebra, and dramatic escarpment light.",
      lensSuggestions: [
        "200–500mm with 1.4× teleconverter for distant wildlife on the plateau",
        "24–70mm for camp scenes and landscape context shots",
        "16–24mm for Milky Way and starscape over the tent (check moon phase)",
      ],
      dustOrMoistureWarning:
        "Red dust on the plateau — keep lenses capped between shots. Use a rain cover on the 200–500mm during drives.",
      tips: [
        "Pre-focus on a mid-tone subject before the drive; autofocus can hunt in low morning light",
        "Shoot at 1/1000s minimum for moving animals with the telephoto",
        "Bring lens wipes — morning dew on the front element is common",
      ],
    },
  },
  {
    id: "loisaba",
    propertyName: "Loisaba Lodo Springs",
    location: "Loisaba Conservancy, Kenya",
    region: "Loisaba",
    checkIn: "2026-06-09",
    checkOut: "2026-06-12",
    nights: 3,
    coordinates: { lat: 0.6333, lon: 37.2833 },
    description:
      "Ultra-luxury tented camp perched on an escarpment — sweeping views over the Northern Frontier, camel treks, and night drives.",
    weatherLocationName: "Loisaba Conservancy",
    photoFolder: "/images/loisaba",
    heroImage: "/images/loisaba/hero.jpg",
    galleryImages: [
      "/images/loisaba/tent.jpg",
      "/images/loisaba/view.jpg",
      "/images/loisaba/pool.jpg",
    ],
    placeholderHero:
      "https://images.unsplash.com/photo-1504280390367-361c66d9e289?w=1200&q=80",
    placeholderGallery: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    ],
    packingNotes: {
      morning:
        "Warmest layers of the trip — escarpment mornings can be chilly. Buff or scarf for open vehicle drives.",
      midday:
        "Light safari shirt, zip-off trousers optional. Wide-brim hat with chin strap for windy viewpoints.",
      evening:
        "Layer up again for night drives — headlamp useful for walking to your tent after dark.",
      rainShell:
        "Pack rain shell in the vehicle; escarpment weather can shift quickly with cloud build-up.",
    },
    photographyNotes: {
      overview:
        "Loisaba's escarpment views and night skies are standout subjects. Elephant, lion, and leopard are possible.",
      lensSuggestions: [
        "200–500mm + 1.4× TC for predators and elephants on the plains below",
        "16–24mm for escarpment panoramas at sunrise",
        "24–70mm for camp lifestyle and camel trek scenes",
      ],
      dustOrMoistureWarning:
        "Fine dust on the escarpment roads — clean sensors carefully. Night drives: watch for condensation when returning to warm tent.",
      tips: [
        "Sunrise from the escarpment: arrive 20 minutes early with the 16–24mm on a tripod",
        "Night drive: bump ISO to 6400–12800, accept noise — moments are fleeting",
        "Polarizer useful for midday landscape shots over the valley",
      ],
    },
  },
  {
    id: "naboisho",
    propertyName: "Naboisho Camp",
    location: "Naboisho Conservancy, Maasai Mara",
    region: "Maasai Mara",
    checkIn: "2026-06-12",
    checkOut: "2026-06-15",
    nights: 3,
    coordinates: { lat: -1.4167, lon: 35.2 },
    description:
      "Intimate camp in the Mara ecosystem — big cats, vast savanna, and some of the finest wildlife viewing in Africa.",
    weatherLocationName: "Maasai Mara",
    photoFolder: "/images/naboisho",
    heroImage: "/images/naboisho/hero.jpg",
    galleryImages: [
      "/images/naboisho/tent.jpg",
      "/images/naboisho/savanna.jpg",
      "/images/naboisho/wildlife.jpg",
    ],
    placeholderHero:
      "https://images.unsplash.com/photo-1511735111819-9a3f0d0b4a78?w=1200&q=80",
    placeholderGallery: [
      "https://images.unsplash.com/photo-1547970810-dc77054a2179?w=800&q=80",
      "https://images.unsplash.com/photo-1456926631395-248aba679134?w=800&q=80",
      "https://images.unsplash.com/photo-1535338454772-d7245134d665?w=800&q=80",
    ],
    packingNotes: {
      morning:
        "Standard safari layers — warm jacket for 6 AM departures. Neutral colors only; avoid bright white and blue.",
      midday:
        "Lightweight long sleeves protect from sun. Bandana or buff for dust on dry savanna tracks.",
      evening:
        "Comfortable camp wear for bush dinners. Insect repellent for dusk around the fire pit.",
      rainShell:
        "June is dry season but brief storms happen — keep a packable shell in the game drive vehicle.",
    },
    photographyNotes: {
      overview:
        "The Mara finale — big cats, golden grass, and iconic African light. This is why you brought the 200–500mm.",
      lensSuggestions: [
        "200–500mm + 1.4× TC as your primary wildlife lens — lions, cheetah, leopard",
        "24–70mm for herd scenes, wildebeest crossings (if timing aligns), and camp",
        "16–24mm sparingly for dramatic sky and acacia silhouette shots",
      ],
      dustOrMoistureWarning:
        "Heavy red dust on Mara tracks — lens caps on always between subjects. Clean the 200–500mm daily with a rocket blower.",
      tips: [
        "Shoot wide open at f/5.6–f/8 with the teleconverter for sharpness sweet spot on the D850",
        "Back-button focus + continuous AF for tracking moving cats",
        "Golden hour last two evenings: prioritize Mara over camp — light is extraordinary",
        "Carry two camera bodies if possible to avoid lens changes in dusty conditions",
      ],
    },
  },
];
