# CivilianIQ — Supabase Edge Functions

Ports of the app's server-side logic to Supabase Edge Functions (Deno), so
the backend can be called from a non-Next.js frontend — e.g. a Lovable
project (Vite + React) — that can't run Next.js API routes.

## Functions

- `classify` — matches a citizen's description to rights-taxonomy entries and translates the result. Mirrors `src/app/api/classify/route.ts`.
- `coach` — analyzes a live transcript and returns real-time coaching. Mirrors `src/app/api/coach/route.ts`.
- `deepgram-token` — mints a short-lived, scoped Deepgram key for live transcription. Mirrors `src/app/api/deepgram-token/route.ts`.
- `_shared/` — CORS headers, the Anthropic Messages API caller, and the six country rights datasets, all bundled per-function at deploy time.

## Deploy

```bash
npx supabase login
npx supabase link --project-ref <your-project-ref>

npx supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
npx supabase secrets set DEEPGRAM_API_KEY=...

npx supabase functions deploy classify
npx supabase functions deploy coach
npx supabase functions deploy deepgram-token
```

Each function is then reachable at:
`https://<your-project-ref>.supabase.co/functions/v1/classify` (etc.)

## Calling from the frontend

POST JSON, same shape the Next.js routes expect, e.g.:

```js
fetch('https://<project-ref>.supabase.co/functions/v1/classify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query, country, language }),
});
```

`verify_jwt` is disabled for all three functions in `config.toml`, so no
Supabase auth token is required — matching the current public, unauthenticated
Next.js routes.

## What this does NOT do

Lovable's platform runs Vite + React, not Next.js App Router — it cannot
host the pages in `src/app/`. These edge functions give you a working,
framework-agnostic backend; the frontend (pages, layout, RSC) still needs
to be ported to Vite + React Router before the whole app can run inside
Lovable itself. Until then, keep the frontend deployed on Vercel and point
it at these functions if you want to test them, or use them as the backend
for a separately-built Lovable/Vite frontend.
