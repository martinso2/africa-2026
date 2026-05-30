import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Africa 2026 Safari | Martin Family",
  description:
    "Martin Family Safari 2026 — Kenya, June 4–16. Accommodations, itinerary, weather, and photography notes.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} h-full`}>
      <body className="min-h-full bg-safari-ivory font-sans text-safari-charcoal antialiased">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
