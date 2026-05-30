"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { href: "#overview", label: "Overview" },
  { href: "#international-flights", label: "To Kenya" },
  { href: "#stops", label: "Stops" },
  { href: "#itinerary", label: "Itinerary" },
  { href: "#return-flights", label: "Home" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-safari-sand/60 bg-safari-ivory/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="font-serif text-lg tracking-wide text-safari-green">
          Africa 2026
        </a>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-safari-green sm:hidden"
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

        <ul className="hidden gap-1 sm:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-safari-charcoal transition hover:bg-safari-sand/50 hover:text-safari-green"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <ul className="border-t border-safari-sand/60 px-4 py-3 sm:hidden">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-safari-charcoal hover:bg-safari-sand/50 hover:text-safari-green"
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
