# CivilianIQ (Lovable / Vite port)

This is a Vite + React + React Router + Tailwind port of [CivilianIQ](https://github.com/vanyakumar1001-web/CivilianIQ), built so the app can be imported into and edited inside [Lovable](https://lovable.dev).

The original app is a Next.js 14 App Router project. Lovable's platform runs Vite + React and can't host Next.js API routes or React Server Components, so:

- The frontend (`src/`) is a straight port of `src/app/page.tsx` and `src/app/record/page.tsx` into React Router pages, with all shared components, i18n, and rights-taxonomy data carried over unchanged.
- The backend (`/api/classify`, `/api/coach`, `/api/deepgram-token`) is ported to Supabase Edge Functions in the main repo's `supabase/functions/` directory — see that repo's `supabase/README.md` for deploying them.

## Import into Lovable

1. Push this project to its own GitHub repo (root of the repo = this folder's contents).
2. In Lovable, create a new project and choose **Import from GitHub**, then select that repo.
3. Deploy the Supabase Edge Functions (`classify`, `coach`, `deepgram-token`) from the main CivilianIQ repo's `supabase/` directory — see its README for the `supabase` CLI steps. Lovable can also provision a Supabase project for you via its built-in Supabase integration if you'd rather host the functions there directly.
4. Set the `VITE_SUPABASE_FUNCTIONS_URL` environment variable (in Lovable's project settings, or a local `.env` for `npm run dev`) to `https://<your-project-ref>.supabase.co/functions/v1`.

## Local development

```bash
npm install
cp .env.example .env   # then fill in VITE_SUPABASE_FUNCTIONS_URL
npm run dev
```

## What's ported

- Country/language picker (`CountryGate`), bilingual text rendering (`Bilingual`), rights search (`RightsCard`, `Glossary`)
- All six country rights datasets (India, USA, China, Russia, Brazil, UK) and every language option
- Live recording + transcription page (Deepgram WebSocket + AI coach), unchanged apart from calling Supabase functions instead of Next.js API routes
- The deep-brown / butter / peach / blush theme and animations, via the same Tailwind config

## What's different from the Next.js app

- Routing is `react-router-dom` instead of the Next.js App Router
- Fonts (Lora, Noto Sans Devanagari) are loaded via a Google Fonts `<link>` in `index.html` instead of `next/font/google`
- API calls go to Supabase Edge Functions instead of same-origin `/api/*` routes
