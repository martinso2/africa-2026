import {
  KENYA_ASTRO_GUIDE,
  type AstroPhotographyGuide,
} from "@/data/astroPhotography";

interface AstroPhotoGuideProps {
  guide: AstroPhotographyGuide;
}

export default function AstroPhotoGuide({ guide }: AstroPhotoGuideProps) {
  const g = KENYA_ASTRO_GUIDE;

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-safari-green/30 bg-gradient-to-br from-[#0c1420] via-[#121a28] to-[#0a1018] text-safari-ivory shadow-lg">
      <div className="border-b border-white/10 px-4 py-4 sm:px-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300/90">
          Night Sky
        </p>
        <h4 className="mt-1 font-serif text-lg text-safari-ivory sm:text-xl">{g.title}</h4>
        <p className="mt-1 text-sm text-white/55">
          Planner · AR scouting · D850 starting point
        </p>
      </div>

      <div className="grid gap-5 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
        {/* PhotoPills workflow */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-300/80">
            PhotoPills Planner
          </p>
          <ol className="mt-3 space-y-2.5">
            {g.plannerSteps.slice(0, 1).map((step) => (
              <li key={step} className="flex gap-3 text-sm leading-snug text-white/85">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-xs font-bold text-amber-300">
                  1
                </span>
                {step}
              </li>
            ))}
            <li className="flex gap-3 text-sm leading-snug text-white/85">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-xs font-bold text-amber-300">
                2
              </span>
              <span>
                Search for:{" "}
                <strong className="font-semibold text-amber-200">{guide.photoPillsSearch}</strong>
              </span>
            </li>
            <li className="flex gap-3 text-sm leading-snug text-white/85">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-xs font-bold text-amber-300">
                3
              </span>
              <span>
                Set date:{" "}
                {guide.suggestedDates.map((date) => (
                  <span
                    key={date}
                    className="mr-1.5 inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-amber-100"
                  >
                    {date}
                  </span>
                ))}
                <span className="text-white/50">or the night you&apos;re shooting</span>
              </span>
            </li>
            <li className="flex gap-3 text-sm leading-snug text-white/85">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-xs font-bold text-amber-300">
                4
              </span>
              <span>
                Move time slider to:{" "}
                {g.timeSliderHours.map((hour) => (
                  <span
                    key={hour}
                    className="mr-1 inline-block rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-white/90"
                  >
                    {hour}
                  </span>
                ))}
              </span>
            </li>
            {g.plannerSteps.slice(4).map((step, i) => (
              <li key={step} className="flex gap-3 text-sm leading-snug text-white/85">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-xs font-bold text-amber-300">
                  {i + 5}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
              In AR, look for
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {g.arLookFor.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 text-xs text-amber-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pre-sunset scouting + D850 */}
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-300/80">
              Before Sunset
            </p>
            <ul className="mt-3 space-y-2">
              {g.preSunsetScouting.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-white/80">
                  <span className="text-amber-400/70">◦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              D850 Starting Settings
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.d850Settings.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/10 bg-[#0a1018]/80 px-3 py-2 text-center"
                >
                  <p className="text-[10px] uppercase tracking-wider text-white/40">{label}</p>
                  <p className="font-mono text-sm font-semibold text-amber-200">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-white/45">
              Focus
            </p>
            <ol className="mt-2 space-y-1.5">
              {g.focusSteps.map((step) => (
                <li key={step} className="text-sm text-white/75">
                  · {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Checklist + goal */}
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-300/80">
              Checklist
            </p>
            <ul className="mt-3 space-y-2">
              {g.checklist.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-white/85">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-emerald-400/40 bg-emerald-400/10 text-xs text-emerald-300">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-amber-400/30 bg-gradient-to-r from-amber-400/10 to-transparent p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              Goal Shot
            </p>
            <p className="mt-2 font-serif text-base leading-snug text-safari-ivory sm:text-lg">
              {g.goalShot}
            </p>
            <p className="mt-3 border-t border-white/10 pt-3 text-sm italic text-white/55">
              {g.reminder}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
