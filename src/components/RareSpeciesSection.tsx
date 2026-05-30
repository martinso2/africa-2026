import SafariImage from "@/components/SafariImage";
import { RARE_SPECIES } from "@/data/rareSpecies";

function SpeciesEntry({
  entry,
  index,
}: {
  entry: (typeof RARE_SPECIES)[number];
  index: number;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-safari-sand/80 bg-white shadow-sm">
      <div className="relative overflow-hidden bg-safari-sand/20">
        <SafariImage
          src={entry.image}
          fallbackSrc={entry.image}
          alt={`${entry.commonName} (${entry.genus} ${entry.species})`}
          className="h-auto w-full object-contain"
        />
        <span className="absolute left-3 top-3 rounded bg-safari-charcoal/75 px-2.5 py-1 font-mono text-xs text-safari-ivory sm:left-4 sm:top-4">
          Fig. {index + 1}
        </span>
      </div>

      <div className="p-4 sm:p-6">
        <header className="border-b border-safari-sand/60 pb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-safari-charcoal/50">
            Field Catalogue · East Africa
          </p>
          <h3 className="mt-2 font-serif text-xl text-safari-green sm:text-2xl">
            {entry.commonName}
          </h3>
          <p className="mt-1 break-words font-serif italic text-safari-charcoal/80">
            {entry.genus} {entry.species}
          </p>
          <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-safari-charcoal/45">
                Family
              </dt>
              <dd className="text-safari-charcoal/80">{entry.family}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-safari-charcoal/45">
                Order
              </dt>
              <dd className="text-safari-charcoal/80">{entry.order}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-safari-charcoal/45">
                Status
              </dt>
              <dd>
                <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-900">
                  {entry.conservationStatus}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-safari-charcoal/45">
                Range
              </dt>
              <dd className="text-safari-charcoal/80">{entry.range}</dd>
            </div>
          </dl>
        </header>

        <div className="mt-4 space-y-4 text-sm leading-relaxed text-safari-charcoal/80">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-safari-green">
              Description
            </h4>
            <p className="mt-1">{entry.description}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-safari-green">
              Morphology
            </h4>
            <p className="mt-1">{entry.morphology}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-safari-green">
              Behavior &amp; Ecology
            </h4>
            <p className="mt-1">{entry.behavior}</p>
          </div>
          <p className="border-t border-safari-sand/50 pt-3 text-xs italic text-safari-charcoal/50">
            Habitat: {entry.habitat}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function RareSpeciesSection() {
  return (
    <section id="rare-species" className="scroll-mt-20">
      <div className="mb-6 sm:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-safari-warm sm:tracking-[0.2em]">
          Supplementary Field Notes
        </p>
        <h2 className="mt-2 font-serif text-2xl text-safari-green sm:text-3xl">
          Rare Species in Africa to Watch
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-safari-charcoal/70">
          Annotated sightings compiled for the Martin expedition. Entries follow
          standard zoological format; veracity follows standard safari humor.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {RARE_SPECIES.map((entry, index) => (
          <SpeciesEntry key={entry.id} entry={entry} index={index} />
        ))}
      </div>

      <p className="mt-6 px-2 text-center text-xs italic leading-relaxed text-safari-charcoal/45 sm:mt-8">
        East African Field Catalogue, informal edition · not peer-reviewed · not
        even peer-adjacent
      </p>
    </section>
  );
}
