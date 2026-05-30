"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { href: "#overview", label: "Overview" },
  { href: "#international-flights", label: "To Kenya" },
  { href: "#weather-summary", label: "Weather" },
  { href: "#stops", label: "Stops" },
  { href: "#itinerary", label: "Itinerary" },
  { href: "#return-flights", label: "Home" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-safari-sand/60 bg-safari-ivory/95 backdrop-blur-md supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#overview"
          className="font-serif text-lg tracking-wide text-safari-green"
          onClick={() => setOpen(false)}
        >
          Africa 2026
        </a>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-safari-green lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <ul className="hidden gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-lg px-2.5 py-2 text-sm font-medium text-safari-charcoal transition hover:bg-safari-sand/50 hover:text-safari-green xl:px-3"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <ul className="border-t border-safari-sand/60 px-4 py-2 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-safari-charcoal hover:bg-safari-sand/50 hover:text-safari-green"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
