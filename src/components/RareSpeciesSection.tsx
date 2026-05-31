import { Barlow_Semi_Condensed, Inter } from "next/font/google";
import SafariImage from "@/components/SafariImage";
import { RARE_SPECIES } from "@/data/rareSpecies";

/** Verlag & Neue Haas Grotesk are Adobe/commercial only — NG-style substitutes for this section */
const ngDisplay = Barlow_Semi_Condensed({
  weight: ["200", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ng-display",
  display: "swap",
});

const ngText = Inter({
  subsets: ["latin"],
  variable: "--font-ng-text",
  display: "swap",
});

const NG_DISPLAY = "font-[family-name:var(--font-ng-display)]";
const NG_TEXT = "font-[family-name:var(--font-ng-text)]";

const NG_DARK = "#060809";
const NG_PANEL = "#060809";
const NG_YELLOW = "#FFDE00";
const CONTENT_WIDTH = "mx-auto max-w-6xl px-4 sm:px-6";
/** NG style sheet tracking (/1000 em) */
const TRACKING_HEADLINE = "0.25em";
const TRACKING_SUBHEAD = "0.14em";
const NG_GREY = "text-white/45";

/** NG section type sizes (+10% from prior pass) */
const NG_FONT = {
  label: "text-[13.75px] sm:text-[15.4px]",
  mastheadMain: "text-[2.0625rem] sm:text-[2.578125rem] lg:text-[3.09375rem]",
  spreadMain: "text-[1.71875rem] sm:text-[2.0625rem] lg:text-[2.578125rem]",
  body: "text-[1.16875rem]",
  bodySmall: "text-[1.1rem]",
  caption: "text-[1.203125rem]",
  intro: "text-[1.203125rem] sm:text-[1.375rem]",
  toc: "text-[1.203125rem]",
  fine: "text-[1.03125rem]",
} as const;

/** Nat Geo TV promo style sheet */
const NG_STYLE = {
  colors: { dark: NG_DARK, yellow: NG_YELLOW, grey: NG_GREY },
  tracking: { headline: TRACKING_HEADLINE, subhead: TRACKING_SUBHEAD },
  weight: { overline: "font-normal", main: "font-extralight", label: "font-semibold" },
  font: NG_FONT,
} as const;

function NgHeadlineStack({
  overline,
  mainHeadline,
  subhead,
  align = "left",
  mainClassName = NG_FONT.mastheadMain,
}: {
  overline: string;
  mainHeadline: string;
  subhead: string;
  align?: "left" | "center";
  mainClassName?: string;
}) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={alignClass}>
      <p
        className={`${NG_DISPLAY} ${NG_FONT.label} ${NG_STYLE.weight.overline} uppercase ${NG_GREY}`}
        style={{ letterSpacing: TRACKING_HEADLINE }}
      >
        {overline}
      </p>
      <h2
        className={`${NG_DISPLAY} mt-2 ${NG_STYLE.weight.main} uppercase leading-[1.05] text-white ${mainClassName}`}
        style={{ letterSpacing: TRACKING_HEADLINE }}
      >
        {mainHeadline}
      </h2>
      <p
        className={`${NG_DISPLAY} mt-2 ${NG_FONT.label} ${NG_STYLE.weight.overline} uppercase ${NG_GREY}`}
        style={{ letterSpacing: TRACKING_SUBHEAD }}
      >
        {subhead}
      </p>
    </div>
  );
}

function NatGeoCorners({ className = "" }: { className?: string }) {
  const corner =
    "pointer-events-none absolute h-6 w-6 sm:h-8 sm:w-8";
  return (
    <>
      <span className={`${corner} left-4 top-4 border-l-2 border-t-2 sm:left-8 sm:top-8 ${className}`} style={{ borderColor: NG_YELLOW }} />
      <span className={`${corner} bottom-4 right-4 border-b-2 border-r-2 sm:bottom-8 sm:right-8 ${className}`} style={{ borderColor: NG_YELLOW }} />
    </>
  );
}

function SpeciesSpread({
  entry,
  index,
}: {
  entry: (typeof RARE_SPECIES)[number];
  index: number;
}) {
  const imageFirst = index % 2 === 0;

  return (
    <article
      id={entry.id}
      className="scroll-mt-24 border-t border-white/10"
      style={{ backgroundColor: NG_DARK }}
    >
      <div
        className={`flex flex-col lg:min-h-[420px] lg:flex-row ${
          imageFirst ? "" : "lg:flex-row-reverse"
        }`}
      >
        {/* Photo — 66% */}
        <figure className="relative flex flex-col lg:w-2/3">
          <div className="pt-5 sm:pt-6">
            <NgHeadlineStack
              overline={entry.commonName.toUpperCase()}
              mainHeadline={entry.mainHeadline.toUpperCase()}
              subhead={entry.subhead}
              mainClassName={NG_FONT.spreadMain}
            />
          </div>

          <div
            className="flex flex-1 items-center justify-center py-3 lg:py-4"
            style={{ backgroundColor: NG_DARK }}
          >
            <div className="relative mx-auto w-fit max-w-full">
              <SafariImage
                src={entry.image}
                fallbackSrc={entry.image}
                alt={entry.commonName}
                className="block h-auto max-h-[420px] w-full max-w-full object-contain lg:max-h-[520px]"
              />

              {/* Figure caption — below image on mobile, overlay on desktop */}
              <figcaption
                className="mt-2 w-full border-l-[3px] px-3 py-2.5 sm:px-4 sm:py-3 lg:absolute lg:bottom-4 lg:left-4 lg:mt-0 lg:max-w-[min(20rem,75%)] lg:w-auto lg:backdrop-blur-[2px]"
                style={{ borderColor: NG_YELLOW, backgroundColor: "rgb(6 8 9 / 0.88)" }}
              >
                <p
                  className={`${NG_DISPLAY} ${NG_FONT.label} ${NG_STYLE.weight.label} uppercase`}
                  style={{ color: NG_YELLOW, letterSpacing: TRACKING_SUBHEAD }}
                >
                  Fig. {index + 1} · {entry.commonName}
                </p>
                <p className={`${NG_TEXT} mt-1 ${NG_FONT.caption} italic text-white/85`}>
                  {entry.genus} {entry.species}
                </p>
              </figcaption>
            </div>
          </div>
        </figure>

        {/* Text panel — 33% */}
        <div
          className={`relative flex flex-col justify-center px-4 py-6 sm:px-5 sm:py-8 lg:w-1/3 lg:py-10 ${
            imageFirst ? "lg:border-l lg:border-white/10" : "lg:border-r lg:border-white/10"
          }`}
          style={{ backgroundColor: NG_PANEL }}
        >
          <div className={`space-y-3 ${NG_TEXT} ${NG_FONT.body} leading-[1.55] text-white/80`}>
            <p>{entry.description}</p>
            <p
              className={`border-l-2 border-white/20 pl-3 ${NG_FONT.bodySmall} italic text-white/60`}
            >
              {entry.morphology}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function RareSpeciesSection() {
  return (
    <section
      id="rare-species"
      className={`${ngDisplay.variable} ${ngText.variable} scroll-mt-20 w-full py-8 sm:py-14`}
      style={{ backgroundColor: NG_DARK }}
    >
      <div className={CONTENT_WIDTH}>
        {/* Magazine opener — dark Nat Geo */}
        <div
          className="relative border-y border-white/10 py-8 sm:py-10"
          style={{ backgroundColor: NG_DARK }}
        >
          <NatGeoCorners />

          <NgHeadlineStack
            overline="Martin Geographic"
            mainHeadline="They're Looking Back"
            subhead="East Africa · June 2026 · Field notes from the Mara"
            align="center"
          />

          <p className={`${NG_TEXT} mx-auto mt-6 max-w-xl text-center ${NG_FONT.intro} leading-relaxed text-white/65`}>
            Annotated sightings from the Martin expedition. Entries follow standard
            zoological format.
          </p>
        </div>

        {/* Table of contents */}
        <nav
          aria-label="Species table of contents"
          className="border-b border-white/10 py-6"
          style={{ backgroundColor: NG_PANEL }}
        >
          <p
            className={`${NG_DISPLAY} ${NG_FONT.label} font-bold uppercase text-white/50`}
            style={{ letterSpacing: TRACKING_SUBHEAD }}
          >
            In This Issue
          </p>
          <ul className="mt-4 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
            {RARE_SPECIES.map((entry) => (
              <li key={entry.id} className="mb-2 break-inside-avoid">
                <a
                  href={`#${entry.id}`}
                  className={`group flex items-baseline gap-2 ${NG_TEXT} ${NG_FONT.toc} text-white/75 transition hover:text-white`}
                >
                  <span className={`${NG_DISPLAY} ${NG_FONT.label} text-white/30 group-hover:text-[#FFDE00]`}>
                    ·
                  </span>
                  {entry.commonName}
                </a>
              </li>
            ))}
          </ul>
          <p className={`${NG_TEXT} mt-4 ${NG_FONT.fine} italic text-white/40`}>
            Page numbers withheld by editorial policy. 
          </p>
        </nav>

        {/* Spreads */}
        <div>
          {RARE_SPECIES.map((entry, index) => (
            <SpeciesSpread key={entry.id} entry={entry} index={index} />
          ))}
        </div>

        <p className={`${NG_TEXT} py-6 text-center ${NG_FONT.fine} italic leading-relaxed text-white/40`}>
          East African Field Catalogue, 2026 edition · not peer-reviewed · blame global warming
        </p>
      </div>
    </section>
  );
}
