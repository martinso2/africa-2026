# Africa 2026 Safari

A mobile-first travel app for the **Martin Family Safari in Kenya**, June 5–15, 2026. View accommodations, the full itinerary, weather forecasts, and location-specific packing and photography notes.

Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and the **App Router** — ready for GitHub and Vercel deployment.

## Itinerary

| Dates | Property | Location |
|-------|----------|----------|
| Jun 5–6 | Hemingways Hotel | Nairobi |
| Jun 6–9 | Enasoit Camp | Laikipia |
| Jun 9–12 | Loisaba Lodo Springs | Loisaba Conservancy |
| Jun 12–15 | Naboisho Camp | Maasai Mara |

## Quick Start

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run lint
npm run build
npm start
```

## Adding Photos

Drop your accommodation photos into these folders:

```
public/images/hemingways/
public/images/enasoit/
public/images/loisaba/
public/images/naboisho/
```

Expected filenames (defined in `src/data/itinerary.ts`):

- **Hemingways:** `hero.jpg`, `room.jpg`, `lounge.jpg`, `garden.jpg`
- **Enasoit:** `hero.jpg`, `tent.jpg`, `landscape.jpg`, `wildlife.jpg`
- **Loisaba:** `hero.jpg`, `tent.jpg`, `view.jpg`, `pool.jpg`
- **Naboisho:** `hero.jpg`, `tent.jpg`, `savanna.jpg`, `wildlife.jpg`

The app tries local images first and falls back to placeholder photos until yours are added.

## Weather API Key

Weather uses the [OpenWeatherMap One Call API 3.0](https://openweathermap.org/api/one-call-3). Without a key, the app shows **clearly labeled sample forecast data** and works fully otherwise.

1. Copy the example env file:

   ```bash
   cp .env.example .env.local
   ```

2. Add your API key (prefer server-only `WEATHER_API_KEY`):

   ```
   WEATHER_API_KEY=your_actual_api_key
   ```

3. Restart the dev server.

Weather is fetched by latitude/longitude from `src/data/itinerary.ts`.

## Firecrawl — Live Property Highlights

When `FIRECRAWL_API_KEY` is set, each accommodation card includes a **Property Spotlight** section scraped from the official property website — live highlights, excerpt, and a link to the source.

```
FIRECRAWL_API_KEY=fc-your_actual_api_key
```

Results are cached for 24 hours. Without a key, accommodation cards still work with static descriptions.

## Push to GitHub

```bash
git init          # if not already initialized
git add .
git commit -m "Initial Africa 2026 safari app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/africa-2026.git
git push -u origin main
```

**Never commit** `.env.local` or real API keys. Only `.env.example` belongs in the repo.

## Deploy on Vercel

1. Push the repo to GitHub (see above).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js — no extra build settings needed.
4. Add the environment variable in **Project Settings → Environment Variables**:

   | Name | Value |
   |------|-------|
   | `WEATHER_API_KEY` | Your OpenWeatherMap API key |
   | `FIRECRAWL_API_KEY` | Your Firecrawl API key (optional) |

5. Deploy. Preview URLs are created on every push; production deploys from `main`.

## Project Structure

```
src/
├── app/              # App Router pages and API routes
├── components/       # UI components
├── data/             # Itinerary and trip data
└── lib/              # Weather, dates, and image helpers
public/
└── images/           # Accommodation photos (drop yours here)
```

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- OpenWeatherMap API (optional)

## License

Private — Martin Family Safari 2026.
