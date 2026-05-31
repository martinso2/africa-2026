export interface RareSpecies {
  id: string;
  commonName: string;
  /** Short punchy main headline — few words, all caps */
  mainHeadline: string;
  /** Grey subhead beneath the main headline */
  subhead: string;
  genus: string;
  species: string;
  family: string;
  order: string;
  conservationStatus: string;
  habitat: string;
  range: string;
  description: string;
  morphology: string;
  image: string;
  photoCredit?: string;
}

export const RARE_SPECIES: RareSpecies[] = [
  {
    id: "static-watt-crane",
    commonName: "Greater Static-Watt Crane",
    mainHeadline: "Never Lands Clean",
    subhead: "Why won't this bird land like a normal animal?",
    genus: "Aurumcristatus",
    species: "magnificus",
    family: "Gruidae (aff. crowned cranes)",
    order: "Gruiformes",
    conservationStatus: "Least Concern (too dramatic to fail)",
    habitat: "Anywhere with an audience",
    range: "Pan-African; most visible when backlit",
    description:
      "A gruiform bird distinguished by an elaborate golden crest, crimson gular sac, and maroon secondary plumage. Though superficially resembling Balearica regulorum, Aurumcristatus magnificus exceeds its congener in self-esteem and wattage output.",
    morphology:
      "Crest: radiating golden filoplumes, erectile, visible from 2 km. Gular sac: inflatable, scarlet, used in courtship and small appliance charging (unconfirmed). Legs: disproportionately long; gait described in the literature as \"statuesque with commitment issues.\"",
    image: "/images/species/static-watt-crane.jpg",
    photoCredit: "Martin Expedition · Laikipia, 2026",
  },
  {
    id: "vizsla-bird",
    commonName: "Vizsla Bird",
    mainHeadline: "Love You Back",
    subhead: "Can a duck truly love you back?",
    genus: "Canis",
    species: "volatilis",
    family: "Anatidae × Canidae (affectionate hybrid)",
    order: "Charadriiformes (emotionally)",
    conservationStatus: "Endangered (by loneliness)",
    habitat: "Shallow wetlands at golden hour",
    range: "Laikipia escarpment; follows the person with the camera",
    description:
      "A waterfowl with the devoted gaze of a Hungarian vizsla and the wings of a very patient goose. Observers report that it wags its entire body when praised, which is biologically improbable and emotionally devastating.",
    morphology:
      "Head: russet, velvety, with soulful amber eyes capable of silent judgment. Neck: elongated, transitions from fur to iridescent bronze-and-charcoal remiges. Legs: slender, wading, slightly damp from sincerity.",
    image: "/images/species/Vizsla-Bird.jpeg",
    photoCredit: "Martin Expedition · Wetland fringe, 2026",
  },
  {
    id: "corgi-lion",
    commonName: "Corgi Lion",
    mainHeadline: "King of Low",
    subhead: "Is this the king of the savannah — or just very close to the ground?",
    genus: "Panthera",
    species: "corgicus",
    family: "Felidae (short stack edition)",
    order: "Carnivora",
    conservationStatus: "Critically Adorable",
    habitat: "Dirt paths with excellent visibility",
    range: "Maasai Mara; wherever dignity meets stubby legs",
    description:
      "A lion cub in all facial respects, mounted on the chassis of a corgi. Field biologists agree it possesses the heart of a apex predator and the ground clearance of a mailbox.",
    morphology:
      "Mane: embryonic but earnest. Torso: elongated, low-slung, floofy. Paws: oversized, round, and somehow always dusty. Tail: present, optimistic.",
    image: "/images/species/corgi-lion.png",
    photoCredit: "Martin Expedition · Mara track, 2026",
  },
  {
    id: "maga-mango",
    commonName: "Maga Mango",
    mainHeadline: "All In A Name",
    subhead: "Everything gets named after me, right?",
    genus: "Namus Maximus",
    species: "chromatica",
    family: "Cercopithecidae (high saturation)",
    order: "Primates",
    conservationStatus: "Not Evaluated (too loud)",
    habitat: "Anywhere that has cameras",
    range: "Central Africa; occasionally trending",
    description:
      "A mandrill whose facial palette exceeds the gamut of most monitors. The red nose alone has been mistaken for a traffic signal. Scientists describe the expression as \"formal portrait of someone who has opinions.\"",
    morphology:
      "Cheek ridges: cobalt, corrugated. Nasal region: scarlet, prominent, politically incorrect).",
    image: "/images/species/Maga-Mango.jpeg",
    photoCredit: "Martin Expedition · Forest edge, 2026",
  },
  {
    id: "corgi-marsh-hopper",
    commonName: "Corgi Marsh Hopper",
    mainHeadline: "Reed Hopper",
    subhead: "How did a corgi learn to hop through the reeds?",
    genus: "Canis",
    species: "paludis",
    family: "Canidae (amphibious enthusiasm)",
    order: "Carnivora",
    conservationStatus: "Data Deficient (too quick)",
    habitat: "Reed beds, papyrus margins, soggy optimism",
    range: "Eastern Mara wetlands",
    description:
      "A compact canid adapted for bouncing through marsh grass like a furry pogo stick. Distinguished from ordinary corgis by webbed enthusiasm and an inability to respect dry socks.",
    morphology:
      "Ears: alert, satellite-dish scale. Body: loaf-shaped, buoyant. Coat: golden, water-repellent except when it isn't. Legs: short, powerful, spring-loaded.",
    image: "/images/species/corgi-marsh-hopper.webp",
    photoCredit: "Martin Expedition · Reed channel, 2026",
  },
  {
    id: "corgi-potomus",
    commonName: "Corgi Potomus",
    mainHeadline: "Tiny Snorts",
    subhead: "Why do the wetlands echo with tiny hippo snorts?",
    genus: "Choeropsis",
    species: "corgii",
    family: "Hippopotamidae (pocket edition)",
    order: "Artiodactyla",
    conservationStatus: "Vulnerable to chin scratches",
    habitat: "Shallow river margins",
    range: "Laikipia; prefers water deep enough to look important",
    description:
      "A hippopotamus the size of a very confident corgi, or a corgi wearing the world's most serious snout. Either reading is correct and neither is less alarming at dawn.",
    morphology:
      "Snout: wide, grey, equipped with modest tusks and maximum sincerity. Ears: corgi-grade, rotate independently when gossiping. Body: barrel-shaped, plush, surprisingly buoyant.",
    image: "/images/species/corgi-potomus.jpeg",
    photoCredit: "Martin Expedition · River shallows, 2026",
  },
  {
    id: "rosiepotamus",
    commonName: "Rosiepotamus",
    mainHeadline: "Gentlest Giant",
    subhead: "Could this be the gentlest giant on the Mara?",
    genus: "Hippopotamus",
    species: "rosieae",
    family: "Hippopotamidae × Canidae (gentle merger)",
    order: "Artiodactyla",
    conservationStatus: "Near Threatened (by cuteness overload)",
    habitat: "Slow rivers at golden hour",
    range: "Southern Kenya; wherever the light is flattering",
    description:
      "A full-size hippopotamus bearing the warm, copper face of a vizsla who has never once raised its voice. Witnesses describe the encounter as \"meeting a therapist who weighs two tons.\"",
    morphology:
      "Head: russet, soft-eared, radiating calm. Body: classic hippo, glistening, with folds that catch sunset like sculpture. Feet: wide, patient, excellent for standing in meaning.",
    image: "/images/species/Rosiepotamus.png",
    photoCredit: "Martin Expedition · Mara river, 2026",
  },
  {
    id: "corgi-leopard",
    commonName: "Corgi Leopard",
    mainHeadline: "Built Like Loaf",
    subhead: "Why is the fastest predator built like a loaf?",
    genus: "Acinonyx",
    species: "corgatus",
    family: "Felidae (low profile)",
    order: "Carnivora",
    conservationStatus: "Least Concern (very concerned about snacks)",
    habitat: "Open savanna, short grass preferred",
    range: "Loisaba to Mara corridor",
    description:
      "A spotted felid with cheetah markings and corgi proportions — nature's attempt to make a sports car out of a dinner roll. Still achieves impressive bursts of speed, mostly toward food.",
    morphology:
      "Coat: golden with hyena-grade spots. Legs: famously short, surprisingly fast. Ears: large, radar-dish, always listening for treat bags. Expression: innocent, slightly guilty.",
    image: "/images/species/corgi-leopard.png",
    photoCredit: "Martin Expedition · Loisaba plains, 2026",
  },
  {
    id: "incredulous-guenon",
    commonName: "Incredulous Guenon",
    mainHeadline: "Who's Gonna Run",
    subhead: "They only need 100 days notice!?",
    genus: "Cercopithecus",
    species: "incredulus",
    family: "Cercopithecidae (reacts to everything)",
    order: "Primates",
    conservationStatus: "Everything is Endangered",
    habitat: "Forest margins, anywhere news travels fast",
    range: "Eastern Kenya; follows safari vehicles for updates",
    description:
      "A guenon distinguished by silver-tipped crown fur, wide amber eyes, and a permanent expression of having just been briefed on something implausible. Hands frequently raised in a bilateral shrug posture not documented in any primate ethogram prior to 2026.",
    morphology:
      "Pelage: dark olive-grey with frosted dorsal cap and pale throat ruff. Palms: leathery, upturned, ideal for pointing out problems. Brow: permanently elevated; believed to have never come up with a solution.",
    image: "/images/species/what-the-Fuck.jpeg",
    photoCredit: "Martin Expedition · Forest edge, 2026",
  },
];
