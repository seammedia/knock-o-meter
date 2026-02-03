# Arc Raiders Knock-o-Meter

A live, reactive stream overlay widget for tracking your knock count in Arc Raiders. Updates in real-time across OBS and your control panel with dramatic explosion animations.

![Knock-o-Meter Preview](https://img.shields.io/badge/Arc%20Raiders-Knock--o--Meter-ff6b00?style=for-the-badge)

## Live Demo

- **Control Panel**: https://knock-o-meter.vercel.app/control
- **Overlay (for OBS)**: https://knock-o-meter.vercel.app/overlay

## Features

- **Real-time sync** - Changes appear instantly on your stream via Firebase
- **Dramatic explosion effects** - Circle shakes, particles burst, numbers animate
- **Dynamic signal bars** - EXT_SIGNAL indicator fluctuates based on knock count
- **Threat level system** - LOW/MEDIUM/HIGH/EXTREME based on your kill count
- **Mission status messages** - Rotating sci-fi radio chatter
- **Arc Raiders aesthetic** - Matches the game's UI style
- **Transparent background** - Perfect for OBS browser source overlay

## How It Works

- **Control Panel** (`/control`) - Open in your browser to adjust the knock count
- **Overlay** (`/overlay`) - Add to OBS as a browser source - updates live!
- **Firebase Realtime Database** - Syncs changes instantly between control panel and OBS

## Setup

### 1. Create Firebase Project (Free - Spark Plan)

Firebase Spark plan is completely free with no credit card required:
- 1GB storage
- 10GB/month downloads
- 100 simultaneous connections

Steps:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" (or use existing)
3. Name it something like "knock-o-meter"
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Set Up Realtime Database

1. In Firebase Console, click "Build" > "Realtime Database"
2. Click "Create Database"
3. Choose your region (closest to you)
4. Start in **test mode** (we'll secure it later)
5. Click "Enable"

### 3. Get Firebase Config

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register app (name doesn't matter)
5. Copy the config values

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Deploy to Vercel

1. Push to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repo
4. Add environment variables in Vercel dashboard (same as `.env`)
5. Deploy!

### 6. Add to OBS

1. In OBS, click **+** under Sources
2. Select **Browser**
3. Name it "Knock-o-Meter"
4. Set URL to: `https://your-app.vercel.app/overlay`
5. Set Width: **340**, Height: **300**
6. Check "Shutdown source when not visible"
7. Click **OK**
8. Position where you want on your stream

### 7. Control Your Stream

Open `https://your-app.vercel.app/control` in your browser while streaming. Any changes you make will instantly appear on your OBS overlay!

## Animation Features

When the knock count changes, the following animations trigger:

1. **Circle shake/wobble** - The entire counter shakes violently
2. **Central flash** - Big orange explosion in the center
3. **Expanding ring** - Shockwave ring expands outward
4. **Particle burst** - 12 particles fly out in all directions
5. **Sparks** - 8 elongated sparks shoot outward
6. **Number wipe-out** - Old number scales up, rotates, and blurs away
7. **Number appear** - New number bounces in from nothing
8. **Glow effect** - New number pulses bright orange then settles

### Signal Bars

The EXT_SIGNAL bars animate based on your knock count:
- 0-24 knocks: 1 bar (weak signal)
- 25-49 knocks: 2 bars (medium signal)
- 50+ knocks: 3 bars (strong signal)
- Random fluctuations add realism

### Threat Levels

- **LOW** (0-19): Blue indicator
- **MEDIUM** (20-49): Yellow indicator
- **HIGH** (50-79): Orange indicator
- **EXTREME** (80+): Red indicator with glow

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Keyboard Shortcuts (Control Panel)

| Key | Action |
|-----|--------|
| `+` / `=` | Increment knock count |
| `-` / `_` | Decrement knock count |
| `H` | Toggle help panel |

## Project Structure

```
knock-o-meter/
├── src/
│   ├── components/
│   │   ├── KnockMeter.tsx      # Main overlay widget with animations
│   │   └── ControlPanel.tsx    # Control buttons/slider
│   ├── pages/
│   │   ├── Overlay.tsx         # /overlay route for OBS
│   │   └── Control.tsx         # /control route for streamer
│   ├── config/
│   │   └── firebase.ts         # Firebase real-time sync
│   ├── services/
│   │   └── missionStatus.ts    # Mission chatter messages
│   ├── types.ts
│   ├── index.css               # Tailwind + animations
│   ├── App.tsx                 # Router
│   └── main.tsx
├── .env.example                # Template for Firebase config
├── vercel.json                 # SPA routing for Vercel
└── README.md
```

## Securing Firebase (Optional but Recommended)

The default test mode rules allow anyone to read/write. For personal use this is fine, but for production consider:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Or add authentication for write access.

## Tech Stack

- **React 19** + TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Firebase Realtime Database** - Real-time sync
- **Vercel** - Hosting with automatic deployments
- **React Router** - Client-side routing

## Cost

**$0/month** - Everything used is on free tiers:
- Firebase Spark plan (free)
- Vercel hobby plan (free)
- GitHub (free)

## License

MIT
