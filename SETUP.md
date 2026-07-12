# CivilianIQ — Setup in 5 minutes

## Prerequisites
- Node.js 18+ installed (download from https://nodejs.org)
- An Anthropic API key (get from https://console.anthropic.com)
- A Deepgram API key (get a free one from https://console.deepgram.com) — powers live,
  speaker-separated transcription on the Record page

## Steps

### 1. Extract this folder and open terminal in it
```
cd civilianiq
```

### 2. Install dependencies
```
npm install
```

### 3. Create your .env.local file
```
cp .env.local.example .env.local
```
Then edit `.env.local` and add your API keys:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
DEEPGRAM_API_KEY=your-deepgram-key-here
```

### 4. Run locally
```
npm run dev
```
Open http://localhost:3000 in Chrome

### 5. Deploy to Vercel (free, takes 30 seconds)
```
npm install -g vercel
vercel
```
Follow the prompts. Add both ANTHROPIC_API_KEY and DEEPGRAM_API_KEY in Vercel dashboard >
Settings > Environment Variables.

That's it. You'll get a live URL like https://civilianiq.vercel.app

## Testing
- Try "cop stopped me wants my phone" in the search — results appear in English and Hindi,
  with a plain-language glossary for any legal jargon
- Try Hindi: "police ne roka hai phone maang raha hai"
- Go to the Record page, pick your speaking language (English/Hindi), and allow camera +
  microphone
- Speak near the phone — you'll see a live, speaker-separated ("Officer" vs "You")
  transcript build up
- The AI coach analyzes automatically a few seconds after you pause, or tap "Analyze now"

## Important
- Chrome/Edge work best; recording needs camera + microphone permission
- Live transcription and speaker separation require a working DEEPGRAM_API_KEY — without
  one, the Record page still records video/audio but won't show a live transcript
- Works on Android phones in Chrome browser
- Add to home screen for app-like experience (PWA)
