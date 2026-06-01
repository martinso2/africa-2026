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
  /** PhotoPills + D850 night-sky guide for dark-sky camps */
  astroGuide?: boolean;
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
  /** Brief history or context — shown on the accommodation card */
  campHistory?: string;
  /** Signature wildlife for bush camps — omit if already covered in description */
  wildlifeKnownFor?: string[];
  websiteUrl: string;
  weatherLocationName: string;
  photoFolder: string;
  heroImage: string;
  heroVideo?: string;
  galleryImages: string[];
  placeholderHero: string;
  placeholderGallery: string[];
  packingNotes: PackingNotes;
  photographyNotes: PhotographyNotes;
}

export const TRIP = {
  title: "Martin Family Safari 2026",
  dates: "June 4–16, 2026",
  subtitle: "Nairobi, Laikipia, Loisaba, and the Maasai Mara",
  startDate: "2026-06-04",
  endDate: "2026-06-16",
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
    coordinates: { lat: -1.3324, lon: 36.7117 },
    description:
      "An elegant boutique hotel in Karen — the perfect soft landing after the long flight, with refined comfort before the bush.",
    campHistory:
      "Named for Ernest Hemingway, who hunted and wrote in Kenya in the 1930s. The hotel sits in Karen — the Nairobi suburb named for Karen Blixen, whose farm and memoir Out of Africa lie minutes away at the foot of the Ngong Hills.",
    websiteUrl: "https://www.hemingways-collection.com/nairobi/",
    weatherLocationName: "Nairobi",
    photoFolder: "/images/hemingways",
    heroImage: "/images/hemingways/hero.jpg",
    heroVideo: "/video/Nairobi-Loop_SML.mp4",
    galleryImages: [
      "/images/hemingways/room.jpg",
      "/images/hemingways/lounge.jpg",
      "/images/hemingways/garden.jpg",
    ],
    placeholderHero:
      "https://www.hemingways-collection.com/wp-content/uploads/2025/06/Property-Aerial-View-3-scaled.jpg",
    placeholderGallery: [
      "https://www.hemingways-collection.com/wp-content/uploads/2025/08/Deluxe-Suite-Double-Bedroom-1-scaled.jpg",
      "https://www.hemingways-collection.com/wp-content/uploads/2025/07/Hemingways_Nairobi_033-scaled.jpg",
      "https://www.hemingways-collection.com/wp-content/uploads/2025/07/Hemingways_Nairobi_Spa_pool_12-scaled.jpg",
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
      "A private wilderness camp on the Laikipia Plateau — exclusive game drives, dramatic landscapes, and star-filled nights. Enasoit may end up being the best astrophotography location of the entire trip.",
    campHistory:
      "Enasoit means \"rock\" in Maa — a nod to the formations on this 4,500-acre private reserve. A Scandinavian family who came to Kenya for safari ended up making this their home, protecting a natural wildlife corridor between the Lolldaiga Hills and neighboring conservancies.",
    wildlifeKnownFor: [
      "Morning and evening gatherings at the camp waterhole — elephant, giraffe, zebra, and antelope",
      "African wild dog and resident lion prides on the private reserve",
    ],
    websiteUrl: "https://enasoitcollection.com/",
    weatherLocationName: "Laikipia",
    photoFolder: "/images/enasoit",
    heroImage: "/images/enasoit/hero.jpg",
    galleryImages: [
      "/images/enasoit/tent.jpg",
      "/images/enasoit/landscape.jpg",
      "/images/enasoit/wildlife.jpg",
    ],
    placeholderHero:
      "https://enasoitcollection.com/wp-content/uploads/2020/04/ENASOIT_Silverless1019_126-1024x683.jpg",
    placeholderGallery: [
      "https://enasoitcollection.com/wp-content/uploads/2020/04/ENASOIT_Silverless1019_045_1200px-1-1024x692.jpg",
      "https://enasoitcollection.com/wp-content/uploads/2020/04/ENASOIT_Silverless1019_178_1200px-1-1024x683.jpg",
      "https://enasoitcollection.com/wp-content/uploads/2020/04/ENASOIT_Silverless1019_309_1200px-1-1024x683.jpg",
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
        "Laikipia offers diverse subjects — reticulated giraffe, Grevy's zebra, and dramatic escarpment light. Enasoit may end up being the best astrophotography location of the entire trip — dark plateau skies, minimal light pollution, and tents open to the night.",
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
        "Prioritize clear nights here for Milky Way and star trails — this may be the trip's best astro spot",
      ],
      astroGuide: true,
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
    campHistory:
      "Loisaba is a 58,000-acre working conservancy on a former cattle ranch, protected in perpetuity since 2014 under the Loisaba Community Trust with The Nature Conservancy. Lodo Springs opened in 2019 on the escarpment — a newer camp on land that has become one of Kenya's most important elephant corridors.",
    wildlifeKnownFor: [
      "Northern Kenya specials: Grevy's zebra, reticulated giraffe, beisa oryx, gerenuk, and Somali ostrich",
      "African wild dog and cheetah on the conservancy plains",
      "Black rhino sanctuary — rhinos restored to this landscape after decades away",
    ],
    websiteUrl: "https://www.loisaba.com/accommodation/lodo-springs/",
    weatherLocationName: "Loisaba Conservancy",
    photoFolder: "/images/loisaba",
    heroImage: "/images/loisaba/hero.jpg",
    galleryImages: [
      "/images/loisaba/tent.jpg",
      "/images/loisaba/view.jpg",
      "/images/loisaba/pool.jpg",
      "/images/loisaba/lodge.jpg",
    ],
    placeholderHero: "/images/loisaba/hero.jpg",
    placeholderGallery: [
      "/images/loisaba/tent.jpg",
      "/images/loisaba/view.jpg",
      "/images/loisaba/pool.jpg",
      "/images/loisaba/lodge.jpg",
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
        "Loisaba's escarpment views and night skies are standout subjects. Elephant, lion, and leopard by day; Milky Way over the Northern Frontier by night.",
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
      astroGuide: true,
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
    campHistory:
      "Naboisho means \"coming together\" in Maa. In 2010, more than 500 Maasai landowners leased their land into this 50,000-acre community conservancy — reversing overgrazing and fragmentation while keeping livestock on a managed, rotational system.",
    wildlifeKnownFor: [
      "Among the highest lion densities in Africa — several established prides",
      "Large elephant and buffalo herds on the conservancy year-round",
      "Fewer vehicles than the main Mara reserve — walking safaris and night drives allowed here",
    ],
    websiteUrl: "https://www.asiliaafrica.com/camps-lodges/naboisho-camp/",
    weatherLocationName: "Maasai Mara",
    photoFolder: "/images/naboisho",
    heroImage: "/images/naboisho/hero.jpg",
    galleryImages: [
      "/images/naboisho/tent.jpg",
      "/images/naboisho/savanna.jpg",
      "/images/naboisho/wildlife.jpg",
      "/images/naboisho/lounge.jpg",
    ],
    placeholderHero: "/images/naboisho/hero.jpg",
    placeholderGallery: [
      "/images/naboisho/tent.jpg",
      "/images/naboisho/savanna.jpg",
      "/images/naboisho/wildlife.jpg",
      "/images/naboisho/lounge.jpg",
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
