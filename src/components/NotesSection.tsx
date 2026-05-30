import type { SafariStop } from "@/data/itinerary";

interface NotesSectionProps {
  stop: SafariStop;
}

export default function NotesSection({ stop }: NotesSectionProps) {
  const { packingNotes, photographyNotes } = stop;

  return (
    <article className="overflow-hidden rounded-2xl border border-safari-sand/80 bg-white shadow-sm">
      <div className="border-b border-safari-sand/60 px-5 py-4 sm:px-6">
        <h3 className="font-serif text-xl text-safari-green">{stop.propertyName}</h3>
        <p className="text-sm text-safari-charcoal/60">Packing & Photography</p>
      </div>

      <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-safari-green">
            What to Wear
          </h4>
          <dl className="space-y-3">
            {[
              { label: "Morning", value: packingNotes.morning },
              { label: "Midday", value: packingNotes.midday },
              { label: "Evening", value: packingNotes.evening },
              { label: "Rain Shell", value: packingNotes.rainShell },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-safari-ivory/80 p-3">
                <dt className="text-xs font-semibold text-safari-green">{item.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-safari-charcoal/80">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-safari-green">
            Photography — Nikon D850
          </h4>
          <p className="mb-3 text-sm leading-relaxed text-safari-charcoal/80">
            {photographyNotes.overview}
          </p>

          <div className="mb-3 rounded-lg bg-safari-sand/20 p-3">
            <p className="text-xs font-semibold text-safari-charcoal/60">Lens Kit</p>
            <ul className="mt-2 space-y-1">
              {photographyNotes.lensSuggestions.map((lens) => (
                <li key={lens} className="text-sm text-safari-charcoal/80">
                  · {lens}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-3 rounded-lg border border-amber-200/80 bg-amber-50/50 p-3">
            <p className="text-xs font-semibold text-amber-800">Dust / Moisture</p>
            <p className="mt-1 text-sm text-amber-900/80">
              {photographyNotes.dustOrMoistureWarning}
            </p>
          </div>

          <ul className="space-y-2">
            {photographyNotes.tips.map((tip) => (
              <li
                key={tip}
                className="flex gap-2 text-sm leading-relaxed text-safari-charcoal/75"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-safari-green" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
