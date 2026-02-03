import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';

// Firebase config - you'll need to replace these with your own values
// Get these from: https://console.firebase.google.com/
// 1. Create a new project
// 2. Go to Project Settings > General > Your apps > Add web app
// 3. Copy the config values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "YOUR_DATABASE_URL",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export interface KnockData {
  knocks: number;
  maxKnocks: number;
  lastUpdated: number;
}

const knocksRef = ref(database, 'knockometer');

export const subscribeToKnocks = (callback: (data: KnockData) => void) => {
  return onValue(knocksRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback(data);
    } else {
      // Initialize with defaults if no data exists
      const defaultData: KnockData = { knocks: 0, maxKnocks: 100, lastUpdated: Date.now() };
      callback(defaultData);
    }
  });
};

export const updateKnocks = async (knocks: number, maxKnocks: number = 100) => {
  await set(knocksRef, {
    knocks,
    maxKnocks,
    lastUpdated: Date.now()
  });
};

export const getKnocks = async (): Promise<KnockData> => {
  const snapshot = await get(knocksRef);
  return snapshot.val() || { knocks: 0, maxKnocks: 100, lastUpdated: Date.now() };
};

export { database };
