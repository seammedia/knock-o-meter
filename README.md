# Arc Raiders Knock-o-Meter

A live, reactive stream overlay widget for tracking your knock count in Arc Raiders. Updates in real-time across OBS and your control panel.

## How It Works

- **Control Panel** (`/control`) - Open in your browser to adjust the knock count
- **Overlay** (`/overlay`) - Add to OBS as a browser source - updates live!
- **Firebase Realtime Database** - Syncs changes instantly between control panel and OBS

## Setup

### 1. Create Firebase Project (Free)

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

1. In OBS, add a new "Browser" source
2. Set URL to: `https://your-app.vercel.app/overlay`
3. Set Width: `340`, Height: `300`
4. Check "Shutdown source when not visible"
5. Position where you want on your stream

### 7. Control Your Stream

Open `https://your-app.vercel.app/control` in your browser while streaming. Any changes you make will instantly appear on your OBS overlay!

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Keyboard Shortcuts (Control Panel)

- `+` / `=` - Increment knock count
- `-` / `_` - Decrement knock count
- `H` - Toggle help panel

## Securing Firebase (Optional but Recommended)

After testing, update your Firebase Realtime Database rules:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

For production, consider adding authentication.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Firebase Realtime Database
- Vercel (hosting)
