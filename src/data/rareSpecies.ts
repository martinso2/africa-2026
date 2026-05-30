export interface RareSpecies {
  id: string;
  commonName: string;
  genus: string;
  species: string;
  family: string;
  order: string;
  conservationStatus: string;
  habitat: string;
  range: string;
  description: string;
  morphology: string;
  behavior: string;
  image: string;
}

export const RARE_SPECIES: RareSpecies[] = [
  {
    id: "static-watt-crane",
    commonName: "Greater Static-Watt Crane",
    genus: "Aurumcristatus",
    species: "magnificus",
    family: "Gruidae (aff. crowned cranes)",
    order: "Gruiformes",
    conservationStatus: "Least Concern (too dramatic to fail)",
    habitat: "Wet savanna, shallow pans, anywhere with an audience",
    range: "Pan-African; most visible when backlit",
    description:
      "A gruiform bird distinguished by an elaborate golden crest, crimson gular sac, and maroon secondary plumage. Though superficially resembling Balearica regulorum, Aurumcristatus magnificus exceeds its congener in self-esteem and wattage output.",
    morphology:
      "Crest: radiating golden filoplumes, erectile, visible from 2 km. Gular sac: inflatable, scarlet, used in courtship and small appliance charging (unconfirmed). Legs: disproportionately long; gait described in the literature as 'statuesque with commitment issues.'",
    behavior:
      "Crepuscular display specialist. Inflates gular sac to emit ultrasonic honks believed to stun insects and impress photographers. Crest acts as a biological satellite dish; pairs synchronize head angles to 'boost signal' before duetting. Never lands gracefully; native call is \"What? What?\"",
    image: "/images/species/static-watt-crane.jpg",
  },
  {
    id: "spectrum-glider",
    commonName: "Spectrum Glider",
    genus: "Spectraludus",
    species: "polychroma",
    family: "Chimeridae",
    order: "Impossibilia",
    conservationStatus: "Data Deficient (suspected)",
    habitat: "Open Acacia savanna, dawn and dusk",
    range: "Laikipia Plateau; reported only during golden hour",
    description:
      "A medium-sized ungulate distinguished by iridescent pelage that shifts from amber through magenta to teal along the dorsal line. First described in a single observer report from the Laikipia escarpment (2024). Taxonomic placement remains contested.",
    morphology:
      "Slender build (~45 kg). Raptorial beak adapted for seed predation. Paired filiform horns exceeding 80 cm, used in display rather than combat. Feathered nuchal crest; photonic fur hypothesized to refract ambient light for camouflage at sunset.",
    behavior:
      "Crepuscular. Known to stand motionless facing the setting sun for up to forty minutes, during which observers report a faint humming sound. Local guides insist it is 'calibrating its colors.' Never photographed eating; presumed to subsist entirely on dew and good lighting.",
    image: "/images/species/spectrum-glider.jpg",
  },
  {
    id: "stripephant",
    commonName: "Striped Savanna Elephant",
    genus: "Loxodonta",
    species: "zebrina",
    family: "Elephantidae",
    order: "Proboscidea",
    conservationStatus: "Presumed Extinct (literature only)",
    habitat: "Mixed woodland–grassland mosaic",
    range: "Maasai Mara; one specimen documented near a zebra herd",
    description:
      "An aberrant morph of African elephant bearing complete Equid-style striping across the integument, including the trunk and pinnae. The National Geographic field annotation (unverified) suggests possible lateral gene transfer via 'prolonged association with overly persuasive zebras.'",
    morphology:
      "Standard Loxodonta body plan. Stripes follow dermatoglyphic folds, suggesting ontogenetic patterning rather than pigmentation alone. Tusks present; stripe contrast highest on forelimbs.",
    behavior:
      "Exhibits strong herd-following behavior toward Equus quagga, often positioning itself at the rear of the column 'as if hoping nobody notices.' Trunk employed in stripe-alignment grooming of nearby zebras. Emits low-frequency rumbles indistinguishable from a normal elephant except for a slight syncopation, as though counting stripes.",
    image: "/images/species/stripephant.png",
  },
  {
    id: "mandrill-cat",
    commonName: "Savanna Howler-Speeder",
    genus: "Papio",
    species: "celeritas",
    family: "Cercopithecidae × Felidae (interordinal hybrid, disputed)",
    order: "Primata / Carnivora",
    conservationStatus: "Not Evaluated",
    habitat: "Short-grass plains, active during impala stampedes",
    range: "Eastern Mara; solitary individuals only",
    description:
      "A cursorial primate–felid chimera combining the cranial morphology of Papio with the spotted, aerodynamic chassis of Acinonyx. Biologists remain divided on whether it represents a hybrid, a hoax, or 'what happens when a baboon outruns its responsibilities.'",
    morphology:
      "Head: olive baboon. Body: cheetah-grade musculature and spot pattern. Tail: felid, used as rudder at speeds exceeding 90 km/h. Dentition unsuitable for either parent taxon; suited instead for catching regrets.",
    behavior:
      "Diurnal pursuit predator with primate vocal repertoire. While sprinting, produces staccato bark-grunts that disorient prey and junior safari guides alike. Known to pause mid-chase to make direct eye contact with Land Cruisers, as if requesting a rating on form and technique.",
    image: "/images/species/mandrill-cat.jpg",
  },
  {
    id: "monohorn-gnu",
    commonName: "Monohorn Striped Gnu",
    genus: "Equus",
    species: "monoceros striatus",
    family: "Equidae (with rhinocerotine appendage)",
    order: "Perissodactyla (mostly)",
    conservationStatus: "Vulnerable to taxonomy",
    habitat: "Dry savanna grassland",
    range: "Southern Kenya; prefers horizons with insufficient explanation",
    description:
      "A large perissodactyl–artiodactyl amalgam bearing zebra striping on the hindquarters, transitional tan banding on the thorax, and a single recurved horn arising from the nasal region. Horn length suggests rhinocerotine influence; stripe polarity suggests the animal cannot decide which migration it is attending.",
    morphology:
      "Shoulder hump present. Horn: keratinous, black, arcuate. Stripes fade to russet anteriorly—a condition field workers call 'sun-bleached taxonomy.' Tail: equine, tufted.",
    behavior:
      "Ambulates with the deliberate pace of an animal that has read its own species description and found it unfair. Horn reportedly used to tap termite mounds in a rhythmic pattern consistent with morse code for 'help.' Grazes selectively on grasses that match its outfit.",
    image: "/images/species/monohorn-gnu.png",
  },
];
