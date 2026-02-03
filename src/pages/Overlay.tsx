import { useEffect, useState } from 'react';
import KnockMeter from '../components/KnockMeter';
import { subscribeToKnocks } from '../config/firebase';
import type { KnockData } from '../config/firebase';

// This page is for OBS Browser Source
// URL: /overlay
// Transparent background, just the meter widget
const Overlay = () => {
  const [knockData, setKnockData] = useState<KnockData>({
    knocks: 0,
    maxKnocks: 100,
    lastUpdated: Date.now()
  });

  useEffect(() => {
    // Subscribe to real-time updates from Firebase
    const unsubscribe = subscribeToKnocks((data) => {
      setKnockData(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-transparent">
      {/* Scanline Effect Overlay */}
      <div className="scanline"></div>

      {/* The Widget - positioned for OBS capture */}
      <div className="p-4">
        <KnockMeter knocks={knockData.knocks} maxKnocks={knockData.maxKnocks} />
      </div>
    </div>
  );
};

export default Overlay;
