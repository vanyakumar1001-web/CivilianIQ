# CivilianIQ

**Real-time AI legal rights coach for citizen-police encounters.**

> Know your rights. In the moment it matters.

Built by Vanya Kumar · "The Law in Your Language"

## What it does

CivilianIQ is a real-time, AI-powered legal rights advisor that helps citizens
understand and assert their rights during police encounters. It combines:

1. **Situation search** — Describe what's happening (in English, Hindi, or Hinglish)
   and get a bilingual (EN/HI) rights card with the exact words to say, plus a
   plain-language glossary for any legal jargon
2. **Live recording** — Record the encounter with camera, GPS, and timestamp metadata,
   with a live, speaker-separated transcript ("Officer" vs "You")
3. **AI legal coach** — Analyzes the live transcript (automatically, a few seconds after
   you pause, or on demand) and suggests what right applies and what to say back —
   grounded in verified statutes, in both English and Hindi

## Tech stack

- **Next.js 14** — React framework with API routes
- **Tailwind CSS** — Utility-first styling
- **Claude API (Sonnet)** — AI classification, bilingual translation, and real-time coaching
- **Deepgram (Nova-2)** — Live, speaker-diarized speech-to-text over WebSocket
- **MediaRecorder API** — Video/audio evidence capture
- **Geolocation API** — GPS metadata for evidence

## Dataset

The Situational Rights Taxonomy (SRT) v2.0 contains 18 encounter types across
25 entries, grounded in:

- **9 Indian statutes** (BNSS 2023, Motor Vehicles Act, Constitution, IT Act, etc.)
- **13 Supreme Court landmark cases** (D.K. Basu, Lalita Kumari, Puttaswamy, etc.)
- **Hindi + English scripts** for every right

## Quick start

```bash
# 1. Clone and install
git clone https://github.com/YOUR_USERNAME/civilianiq.git
cd civilianiq
npm install

# 2. Add your API keys
cp .env.local.example .env.local
# Edit .env.local and add:
#   ANTHROPIC_API_KEY=sk-ant-xxxxx
#   DEEPGRAM_API_KEY=xxxxx        (free key from console.deepgram.com)

# 3. Run locally
npm run dev
# Open http://localhost:3000

# 4. Deploy to Vercel (free)
npx vercel
```

## Project structure

```
civilianiq/
├── src/
│   ├── app/
│   │   ├── page.js              # Main search + rights cards + glossary
│   │   ├── record/page.js       # Recording + live diarized transcript + AI coach
│   │   ├── api/
│   │   │   ├── classify/        # AI situation classification (bilingual)
│   │   │   ├── coach/           # Real-time transcript analysis (bilingual)
│   │   │   └── deepgram-token/  # Mints short-lived Deepgram keys for the browser
│   │   ├── layout.js
│   │   └── globals.css
│   ├── components/
│   │   ├── RightsCard.js        # Rights card with bilingual EN/HI content
│   │   ├── Bilingual.js         # BiBlock / BiInline bilingual text helpers
│   │   └── Glossary.js          # Plain-language legal jargon glossary
│   ├── data/
│   │   └── srt-india.js         # Situational Rights Taxonomy
│   └── lib/
│       └── anthropic.js         # Shared Anthropic client
├── public/
│   └── manifest.json            # PWA manifest
└── package.json
```

## Competition targets

- ISEF — Behavioral & Social Sciences / Systems Software
- IRIS — Computer Science + Social Innovation
- Conrad Challenge — Cybersecurity & Ethics
- Diamond Challenge — Social Entrepreneurship

## Disclaimer

CivilianIQ provides general legal information, NOT legal advice.
For your specific case, consult a qualified lawyer.
NALSA Free Legal Aid Helpline: 15100

## License

MIT — Open source for civic good.
