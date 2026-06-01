const CACHE_NAME = "africa-2026-v2";
const OFFLINE_URL = "/offline.html";
const APP_SHELL = [
  "/",
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/precache-manifest.json",
  "/favicon.ico",
  "/safari.ico",
  "/safari.png",
];

async function putInCache(cache, request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response);
      return true;
    }
  } catch {
    // Best-effort precache — one failed asset should not block the rest.
  }
  return false;
}

async function cacheUrlList(urls) {
  const cache = await caches.open(CACHE_NAME);
  let cached = 0;

  for (const url of urls) {
    if (await putInCache(cache, url)) cached += 1;
  }

  return cached;
}

async function precacheTripPack() {
  const shellCached = await cacheUrlList(APP_SHELL);

  try {
    const manifestResponse = await fetch("/precache-manifest.json");
    if (!manifestResponse.ok) return shellCached;

    const manifest = await manifestResponse.json();
    const tripAssets = (manifest.assets ?? []).filter((url) => !APP_SHELL.includes(url));
    const tripCached = await cacheUrlList(tripAssets);

    const clients = await self.clients.matchAll({ type: "window" });
    clients.forEach((client) => {
      client.postMessage({
        type: "PRECACHE_COMPLETE",
        cached: shellCached + tripCached,
        total: APP_SHELL.length + tripAssets.length,
      });
    });

    return shellCached + tripCached;
  } catch {
    return shellCached;
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(precacheTripPack());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  if (request.headers.has("range")) return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;
  const isNavigation = request.mode === "navigate";
  const isStaticAsset =
    sameOrigin &&
    (url.pathname.startsWith("/_next/static/") ||
      url.pathname.startsWith("/images/") ||
      url.pathname.startsWith("/video/") ||
      url.pathname === "/favicon.ico" ||
      url.pathname === "/safari.ico" ||
      url.pathname === "/safari.png" ||
      url.pathname === "/precache-manifest.json");
  const isWeatherApi = sameOrigin && url.pathname.startsWith("/api/weather");

  if (isNavigation) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone)).catch(() => {});
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          if (cachedPage) return cachedPage;
          return (await caches.match("/")) || (await caches.match(OFFLINE_URL)) || Response.error();
        }),
    );
    return;
  }

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networkFetch = fetch(request)
          .then((response) => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone)).catch(() => {});
            return response;
          })
          .catch(() => cached);
        return cached || networkFetch;
      }),
    );
    return;
  }

  if (isWeatherApi) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone)).catch(() => {});
          return response;
        })
        .catch(async () => (await caches.match(request)) || Response.error()),
    );
  }
});
