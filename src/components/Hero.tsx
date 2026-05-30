import { TRIP } from "@/data/itinerary";

export default function Hero() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden bg-safari-green text-safari-ivory"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-safari-green/95 via-safari-green/65 to-safari-green/10" />
      <div className="absolute inset-0 bg-linear-to-t from-safari-green/50 via-transparent to-safari-green/20" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-24">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-safari-sand sm:tracking-[0.2em]">
          Kenya Safari
        </p>
        <h1 className="font-serif text-3xl leading-tight sm:text-5xl lg:text-6xl">
          {TRIP.title}
        </h1>
        <p className="mt-4 text-lg text-safari-sand sm:text-2xl">{TRIP.dates}</p>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-safari-ivory/85 sm:text-lg">
          {TRIP.subtitle}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#stops"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-safari-sand px-6 py-3 text-sm font-semibold text-safari-green transition hover:bg-safari-ivory"
          >
            View Stops
          </a>
          <a
            href="#itinerary"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-safari-sand/50 px-6 py-3 text-sm font-semibold text-safari-ivory transition hover:bg-safari-sand/20"
          >
            Full Itinerary
          </a>
        </div>
      </div>
    </section>
  );
}
