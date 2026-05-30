"use client";

import dynamic from "next/dynamic";
import SafariImage from "@/components/SafariImage";
import {
  formatInternationalDate,
  formatShortDay,
  getJourneyWaypoints,
  INTERNATIONAL_FLIGHT_HERO,
  INTERNATIONAL_FLIGHT_HERO_ALT,
  type InternationalJourney,
  type InternationalLeg,
  type DubaiLayover,
} from "@/data/internationalFlights";
import { formatMiles, formatTotalRouteMiles } from "@/lib/geo";

const InternationalRouteMap = dynamic(
  () => import("@/components/InternationalRouteMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-safari-sand/80 bg-safari-ivory/50 sm:h-80">
        <p className="text-sm text-safari-charcoal/50">Loading map…</p>
      </div>
    ),
  },
);

function LegRow({ leg }: { leg: InternationalLeg }) {
  const distance = formatMiles(leg.from.coordinates, leg.to.coordinates);

  return (
    <div className="rounded-xl border border-safari-sand/60 bg-safari-ivory/40 p-4 sm:p-5">
      <p className="text-sm font-medium text-safari-green">
        {formatInternationalDate(leg.date)}
      </p>
      <p className="mt-1 text-xs text-safari-charcoal/50">
        {leg.airline} · {leg.flightNumber} · {leg.duration} · {distance}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-safari-charcoal/50">
            Depart
          </p>
          <p className="mt-1 font-serif text-lg text-safari-charcoal">{leg.from.code}</p>
          <p className="text-sm text-safari-charcoal/70">{leg.from.city}</p>
          <p className="mt-1 text-xs text-safari-charcoal/50">{leg.from.airport}</p>
          <p className="mt-2 text-sm font-semibold text-safari-green">{leg.from.time}</p>
        </div>

        <div className="hidden text-center text-2xl text-safari-charcoal/30 sm:block">
          ✈
        </div>

        <div className="sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-wider text-safari-charcoal/50">
            Arrive
          </p>
          <p className="mt-1 font-serif text-lg text-safari-charcoal">{leg.to.code}</p>
          <p className="text-sm text-safari-charcoal/70">{leg.to.city}</p>
          <p className="mt-1 text-xs text-safari-charcoal/50">{leg.to.airport}</p>
          <p className="mt-2 text-sm font-semibold text-safari-green">
            {leg.to.time}
            {leg.to.nextDay && (
              <span className="ml-1 text-xs font-normal text-safari-charcoal/50">
                (+1 day)
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function DubaiLayoverPanel({ layover }: { layover: DubaiLayover }) {
  const sameDay = layover.arriveDate === layover.departDate;

  return (
    <div className="overflow-hidden rounded-xl border border-safari-sand/60 bg-safari-ivory/40">
      <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[21/9]">
        <SafariImage
          src={layover.image}
          fallbackSrc={layover.image}
          alt={layover.imageAlt}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
            Layover · Dubai (DXB)
          </p>
          <p className="mt-1 font-serif text-xl text-white sm:text-2xl">
            {layover.duration} on the ground
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-safari-charcoal/50">
              Land
            </p>
            <p className="mt-1 text-sm font-medium text-safari-green">
              {formatInternationalDate(layover.arriveDate)}
            </p>
            <p className="text-sm text-safari-charcoal/70">{layover.arriveTime}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-safari-charcoal/50">
              Depart
            </p>
            <p className="mt-1 text-sm font-medium text-safari-green">
              {formatInternationalDate(layover.departDate)}
              {!sameDay && (
                <span className="ml-1 text-xs font-normal text-safari-charcoal/50">
                  (+1 day)
                </span>
              )}
            </p>
            <p className="text-sm text-safari-charcoal/70">{layover.departTime}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-safari-charcoal/70">
          {layover.note}
        </p>
      </div>
    </div>
  );
}

interface InternationalJourneySectionProps {
  journey: InternationalJourney;
  sectionId: string;
  footnote?: string;
}

export function InternationalJourneySection({
  journey,
  sectionId,
  footnote,
}: InternationalJourneySectionProps) {
  const waypoints = getJourneyWaypoints(journey.id as "outbound" | "return");
  const totalMiles = formatTotalRouteMiles(waypoints);

  return (
    <section id={sectionId} className="scroll-mt-20">
      <article className="overflow-hidden rounded-2xl border border-safari-sand/80 bg-white shadow-sm">
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
          <SafariImage
            src={INTERNATIONAL_FLIGHT_HERO}
            fallbackSrc={INTERNATIONAL_FLIGHT_HERO}
            alt={INTERNATIONAL_FLIGHT_HERO_ALT}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-5 sm:p-6">
            <h3 className="font-serif text-2xl text-white sm:text-3xl">
              {journey.title}
            </h3>
            <p className="mt-1 text-sm text-white/85">
              {journey.route} · Emirates First Class
            </p>
          </div>
        </div>

        <div className="border-b border-safari-sand/60 bg-safari-green/5 px-5 py-4 sm:px-6">
          <p className="text-sm text-safari-charcoal/60">{totalMiles}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {journey.legs.map((leg) => (
              <span
                key={`${journey.id}-${leg.date}-${leg.flightNumber}`}
                className="rounded-full bg-safari-sand/40 px-3 py-1 text-xs font-medium text-safari-charcoal"
              >
                {formatShortDay(leg.date)}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5 sm:p-6">
          {journey.legs.map((leg, index) => (
            <div key={`${leg.flightNumber}-${leg.date}`} className="contents">
              {index === 1 && journey.layover && (
                <DubaiLayoverPanel layover={journey.layover} />
              )}
              <LegRow leg={leg} />
            </div>
          ))}
        </div>

        <div className="border-t border-safari-sand/60 p-5 sm:p-6">
          <InternationalRouteMap
            waypoints={waypoints}
            routeLabel={journey.route}
            legDistances={journey.legs.map((leg) =>
              `${leg.from.code}→${leg.to.code} ${formatMiles(leg.from.coordinates, leg.to.coordinates)}`,
            )}
          />
        </div>
      </article>

      {footnote && (
        <p className="mt-4 text-center text-xs text-safari-charcoal/50">{footnote}</p>
      )}
    </section>
  );
}
