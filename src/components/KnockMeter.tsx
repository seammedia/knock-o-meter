import { useEffect, useState, useRef } from 'react';
import type { MissionStatus } from '../types';
import { getMissionStatus } from '../services/missionStatus';

interface KnockMeterProps {
  knocks: number;
  maxKnocks: number;
}

const KnockMeter = ({ knocks, maxKnocks }: KnockMeterProps) => {
  const [missionStatus, setMissionStatus] = useState<MissionStatus | null>(null);
  const [showExplosion, setShowExplosion] = useState(false);
  const [signalBars, setSignalBars] = useState([true, true, false]);
  const prevKnocks = useRef(knocks);
  const percentage = Math.min((knocks / maxKnocks) * 100, 100);

  // Trigger explosion effect when knocks change
  useEffect(() => {
    if (prevKnocks.current !== knocks) {
      setShowExplosion(true);
      const timer = setTimeout(() => setShowExplosion(false), 400);
      prevKnocks.current = knocks;
      return () => clearTimeout(timer);
    }
  }, [knocks]);

  useEffect(() => {
    // Update mission status when knocks change
    setMissionStatus(getMissionStatus(knocks));
  }, [knocks]);

  // Refresh mission status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setMissionStatus(getMissionStatus(knocks));
    }, 30000);
    return () => clearInterval(interval);
  }, [knocks]);

  // Animate signal bars randomly
  useEffect(() => {
    const interval = setInterval(() => {
      // Random signal strength based on activity
      const baseStrength = Math.min(3, Math.floor(knocks / 25) + 1);
      const variation = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
      const strength = Math.max(1, Math.min(3, baseStrength + variation));

      setSignalBars([
        strength >= 1,
        strength >= 2,
        strength >= 3
      ]);
    }, 800 + Math.random() * 400);

    return () => clearInterval(interval);
  }, [knocks]);

  const getThreatColor = (level?: string) => {
    switch (level) {
      case 'EXTREME': return 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]';
      case 'HIGH': return 'text-orange-500';
      case 'MEDIUM': return 'text-yellow-500';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="relative w-80 p-6 bg-[#0a0a0c]/80 border-l-4 border-[#ff6b00] overflow-hidden backdrop-blur-md font-['Orbitron',sans-serif]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-1 opacity-20">
        <div className="text-[8px] font-mono leading-none">
          ARC-RD_UNIT_77<br/>
          ST_ID: {Math.random().toString(16).slice(2, 8).toUpperCase()}<br/>
          AUTH_LEVEL: OVERRIDE
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-[10px] tracking-[0.3em] text-[#ff6b00] font-bold uppercase mb-1">Combat Metric</h2>
          <h1 className="text-3xl font-black italic tracking-tighter text-white">KNOCK-O-METER</h1>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-500 font-mono">EXT_SIGNAL</div>
          <div className="flex gap-1 items-end h-4">
            <div
              className={`w-1 transition-all duration-200 ${
                signalBars[0] ? 'h-2 bg-[#ff6b00] shadow-[0_0_4px_#ff6b00]' : 'h-2 bg-gray-700'
              }`}
            />
            <div
              className={`w-1 transition-all duration-200 ${
                signalBars[1] ? 'h-3 bg-[#ff6b00] shadow-[0_0_4px_#ff6b00]' : 'h-3 bg-gray-700'
              }`}
            />
            <div
              className={`w-1 transition-all duration-200 ${
                signalBars[2] ? 'h-4 bg-[#ff6b00] shadow-[0_0_4px_#ff6b00]' : 'h-4 bg-gray-700'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Main Counter Section */}
      <div className="flex items-center gap-4 mb-6 relative">
        <div className="relative flex items-center justify-center">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-gray-800"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * percentage) / 100}
              className="text-[#ff6b00] transition-all duration-500 ease-out"
              strokeLinecap="butt"
            />
          </svg>

          {/* Explosion effect */}
          {showExplosion && (
            <>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-[#ff6b00]/30 animate-ping" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-[#ff6b00]/50 animate-pulse" />
              </div>
              {/* Particle burst */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-[#ff6b00] rounded-full animate-particle"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 45}deg) translateY(-20px)`,
                    animationDelay: `${i * 30}ms`
                  }}
                />
              ))}
            </>
          )}

          <div className={`absolute inset-0 flex flex-col items-center justify-center leading-none transition-transform duration-100 ${showExplosion ? 'scale-110' : 'scale-100'}`}>
            <span className={`text-3xl font-black text-white transition-all duration-100 ${showExplosion ? 'text-[#ff6b00] drop-shadow-[0_0_10px_#ff6b00]' : ''}`}>
              {knocks}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">/ {maxKnocks}</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>PROGRESSION</span>
              <span>{Math.round(percentage)}%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ff6b00] shadow-[0_0_8px_#ff6b00] transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-current animate-pulse ${getThreatColor(missionStatus?.threatLevel)}`}></div>
            <span className={`text-[10px] font-bold tracking-widest ${getThreatColor(missionStatus?.threatLevel)}`}>
              THREAT: {missionStatus?.threatLevel || 'CALCULATING'}
            </span>
          </div>
        </div>
      </div>

      {/* Mission Chatter */}
      <div className="mt-4 pt-4 border-t border-white/5 font-mono text-[10px]">
        <div className="flex justify-between text-gray-500 mb-1">
          <span>MISSION_STATUS</span>
          <span>{new Date().toLocaleTimeString([], { hour12: false })}</span>
        </div>
        <div className="text-gray-300 leading-tight italic uppercase min-h-[2.5em] animate-pulse">
          &gt; {missionStatus?.message || "INITIATING RAID LINK... STANDBY."}
        </div>
      </div>

      {/* Bottom Bar Decor - animated */}
      <div className="mt-4 flex gap-1 h-1">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 transition-all duration-300 ${
              i < knocks / 5
                ? 'bg-[#ff6b00] shadow-[0_0_4px_#ff6b00]'
                : 'bg-white/10'
            }`}
            style={{
              transitionDelay: `${i * 20}ms`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default KnockMeter;
