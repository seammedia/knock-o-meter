import { useEffect, useState, useCallback } from 'react';
import KnockMeter from '../components/KnockMeter';
import ControlPanel from '../components/ControlPanel';
import { subscribeToKnocks, updateKnocks } from '../config/firebase';
import type { KnockData } from '../config/firebase';

// This page is for the streamer to control the counter
// URL: /control
const Control = () => {
  const [knockData, setKnockData] = useState<KnockData>({
    knocks: 0,
    maxKnocks: 100,
    lastUpdated: Date.now()
  });
  const [showHelp, setShowHelp] = useState(true);

  useEffect(() => {
    // Subscribe to real-time updates from Firebase
    const unsubscribe = subscribeToKnocks((data) => {
      setKnockData(data);
    });

    return () => unsubscribe();
  }, []);

  const handleSetKnocks = useCallback(async (newKnocks: number) => {
    await updateKnocks(newKnocks, knockData.maxKnocks);
  }, [knockData.maxKnocks]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        handleSetKnocks(Math.min(knockData.maxKnocks, knockData.knocks + 1));
      }
      if (e.key === '-' || e.key === '_') {
        handleSetKnocks(Math.max(0, knockData.knocks - 1));
      }
      if (e.key.toLowerCase() === 'h') {
        setShowHelp((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [knockData.knocks, knockData.maxKnocks, handleSetKnocks]);

  return (
    <div className="relative min-h-screen arc-grid overflow-hidden bg-[#0a0a0c]">
      {/* Scanline Effect Overlay */}
      <div className="scanline"></div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-zinc-900/90 border-b border-zinc-700 p-4 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white font-['Orbitron',sans-serif]">KNOCK-O-METER CONTROL</h1>
            <p className="text-[10px] text-zinc-500 font-mono">REAL-TIME SYNC ACTIVE</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-green-400 font-mono">CONNECTED</span>
            </div>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="px-3 py-1 text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded font-mono"
            >
              {showHelp ? 'HIDE HELP' : 'SHOW HELP'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Instructions */}
          {showHelp && (
            <div className="mb-8 p-4 bg-zinc-900/90 border-l-4 border-[#ff6b00] rounded-r-lg">
              <h3 className="text-[#ff6b00] font-bold text-sm mb-2">SETUP INSTRUCTIONS</h3>
              <div className="text-[11px] text-zinc-400 space-y-2 font-mono">
                <p><strong>1.</strong> Add this URL as a Browser Source in OBS: <code className="bg-zinc-800 px-2 py-0.5 rounded">{window.location.origin}/overlay</code></p>
                <p><strong>2.</strong> Set Browser Source size to <code className="bg-zinc-800 px-2 py-0.5 rounded">340 x 300</code> pixels</p>
                <p><strong>3.</strong> Position the overlay where you want it on your stream</p>
                <p><strong>4.</strong> Use this control panel to adjust the knock count - it updates live!</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview */}
            <div>
              <h2 className="text-zinc-500 text-[10px] font-mono mb-4">LIVE PREVIEW</h2>
              <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                <KnockMeter knocks={knockData.knocks} maxKnocks={knockData.maxKnocks} />
              </div>
            </div>

            {/* Controls */}
            <div>
              <h2 className="text-zinc-500 text-[10px] font-mono mb-4">CONTROLS</h2>
              <ControlPanel
                knocks={knockData.knocks}
                setKnocks={handleSetKnocks}
                maxKnocks={knockData.maxKnocks}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative HUD corners */}
      <div className="fixed top-20 left-4 w-12 h-12 border-t-2 border-l-2 border-white/10 pointer-events-none"></div>
      <div className="fixed top-20 right-4 w-12 h-12 border-t-2 border-r-2 border-white/10 pointer-events-none"></div>
      <div className="fixed bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white/10 pointer-events-none"></div>
      <div className="fixed bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-white/10 pointer-events-none"></div>
    </div>
  );
};

export default Control;
