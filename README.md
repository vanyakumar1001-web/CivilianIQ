# CivilianIQ

**Real-time AI legal rights coach for citizen-police encounters.**

> Know your rights. In the moment it matters.

Built by Vanya Kumar · "The Law in Your Language"

## What it does

CivilianIQ is a real-time, AI-powered legal rights advisor that helps citizens
understand and assert their rights during police encounters. It combines:

1. **Situation search** — Describe what's happening (in English, Hindi, or Hinglish)
   and get your rights card with the exact words to say
2. **Live recording** — Record the encounter with camera, GPS, and timestamp metadata
3. **AI legal coach** — Real-time speech transcription analyzes what the officer is
   saying and suggests what you should say back, grounded in verified statutes

## Tech stack

- **Next.js 14** — React framework with API routes
- **Tailwind CSS** — Utility-first styling
- **Claude API (Sonnet)** — AI classification and real-time coaching
- **Web Speech API** — Browser-native speech-to-text for live transcription
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

# 2. Add your Anthropic API key
cp .env.local.example .env.local
# Edit .env.local and add: ANTHROPIC_API_KEY=sk-ant-xxxxx

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
│   │   ├── page.js           # Main search + rights card
│   │   ├── record/page.js    # Recording + live AI coach
│   │   ├── api/
│   │   │   ├── classify/     # AI situation classification
│   │   │   └── coach/        # Real-time transcript analysis
│   │   ├── layout.js
│   │   └── globals.css
│   ├── components/
│   │   └── RightsCard.js     # Rights card with EN/HI toggle
│   └── data/
│       └── srt-india.js      # Situational Rights Taxonomy
├── public/
│   └── manifest.json         # PWA manifest
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
