"use client";

import { useEffect, useState } from "react";

type BadgeState = "checking" | "downloading" | "ready" | "offline" | "unsupported";

export default function OfflineStatusBadge() {
  const [state, setState] = useState<BadgeState>("checking");

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      setState("unsupported");
      return;
    }

    const syncOnlineState = () => {
      setState((current) => {
        if (!navigator.onLine) return "offline";
        if (current === "downloading") return "downloading";
        return "ready";
      });
    };

    const onMessage = (event: MessageEvent) => {
      if (event.data?.type === "PRECACHE_COMPLETE") {
        setState(navigator.onLine ? "ready" : "offline");
      }
    };

    window.addEventListener("online", syncOnlineState);
    window.addEventListener("offline", syncOnlineState);
    navigator.serviceWorker.addEventListener("message", onMessage);

    navigator.serviceWorker.ready
      .then(async () => {
        if (!navigator.onLine) {
          setState("offline");
          return;
        }

        try {
          const cache = await caches.open("africa-2026-v2");
          const tripReady = await cache.match("/images/enasoit/hero.jpg");
          setState(tripReady ? "ready" : "downloading");
        } catch {
          setState("ready");
        }
      })
      .catch(() => setState("unsupported"));

    return () => {
      window.removeEventListener("online", syncOnlineState);
      window.removeEventListener("offline", syncOnlineState);
      navigator.serviceWorker.removeEventListener("message", onMessage);
    };
  }, []);

  const copy: Record<BadgeState, { label: string; className: string }> = {
    checking: {
      label: "Checking offline pack…",
      className: "bg-safari-sand/40 text-safari-charcoal/70",
    },
    downloading: {
      label: "Downloading trip pack…",
      className: "bg-amber-100 text-amber-900",
    },
    ready: {
      label: "Offline ready",
      className: "bg-emerald-100 text-emerald-800",
    },
    offline: {
      label: "Offline — cached trip",
      className: "bg-slate-200 text-slate-800",
    },
    unsupported: {
      label: "Online only",
      className: "bg-safari-sand/40 text-safari-charcoal/60",
    },
  };

  const { label, className } = copy[state];

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{label}</span>
  );
}
