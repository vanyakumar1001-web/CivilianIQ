# CivilianIQ — Setup in 5 minutes

## Prerequisites
- Node.js 18+ installed (download from https://nodejs.org)
- An Anthropic API key (get from https://console.anthropic.com)

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
Then edit `.env.local` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
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
Follow the prompts. Add your ANTHROPIC_API_KEY in Vercel dashboard > Settings > Environment Variables.

That's it. You'll get a live URL like https://civilianiq.vercel.app

## Testing
- Try "cop stopped me wants my phone" in the search
- Try Hindi: "police ne roka hai phone maang raha hai"
- Go to Record page and allow camera + microphone
- Speak near the phone and watch transcription appear
- Tap "Analyze now" to get AI coaching

## Important
- Chrome/Edge work best for speech recognition
- Camera permission needed for recording
- Works on Android phones in Chrome browser
- Add to home screen for app-like experience (PWA)
