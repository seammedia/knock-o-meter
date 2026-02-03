import type { MissionStatus } from '../types';

// Pre-defined mission status messages based on knock count ranges
const missionMessages: { [key: string]: { messages: string[]; threatLevel: MissionStatus['threatLevel'] } } = {
  low: {
    messages: [
      "COMMAND TO UNIT: RADAR CLEAR. MAINTAIN POSITION.",
      "SECTOR SWEEP NEGATIVE. HOLDING PERIMETER.",
      "ALL CHANNELS QUIET. RECOMMEND CONTINUED PATROL.",
      "MINIMAL CONTACT DETECTED. STANDARD OPERATIONS.",
    ],
    threatLevel: 'LOW'
  },
  medium: {
    messages: [
      "COMMAND TO UNIT: INCREASED MACHINE ACTIVITY DETECTED ON SENSORS.",
      "ALERT: HOSTILE SIGNATURES MULTIPLYING. STAY SHARP.",
      "RADAR SHOWS GROWING ENEMY PRESENCE. WEAPONS HOT.",
      "ENGAGEMENT ZONE EXPANDING. ADVISE TACTICAL CAUTION.",
    ],
    threatLevel: 'MEDIUM'
  },
  high: {
    messages: [
      "COMMAND TO UNIT: HEAVY HOSTILE CONTACT. WEAPONS FREE.",
      "EMERGENCY: MACHINE SWARM DETECTED. ALL UNITS ENGAGE.",
      "CRITICAL THRESHOLD REACHED. FULL COMBAT PROTOCOL.",
      "WARNING: OVERWHELMING FORCE INCOMING. DIG IN.",
    ],
    threatLevel: 'HIGH'
  },
  extreme: {
    messages: [
      "COMMAND TO UNIT: SIXTY CONFIRMED MACHINE SCRAP-DOWNS ON LOCAL SENSOR SWEEP, ATMOSPHERIC IONIZATION PEAKING, EXPECT HOSTILE INTERCEPTORS.",
      "RED ALERT: APEX PREDATOR SIGNATURE DETECTED. RECOMMEND IMMEDIATE EXTRACTION.",
      "CRITICAL: COMBAT METRICS OFF THE CHARTS. LEGENDARY STATUS IMMINENT.",
      "MAXIMUM THREAT LEVEL: YOU'VE GOT THEIR FULL ATTENTION NOW, RAIDER.",
    ],
    threatLevel: 'EXTREME'
  }
};

export const getMissionStatus = (knocks: number): MissionStatus => {
  let category: string;

  if (knocks < 20) {
    category = 'low';
  } else if (knocks < 50) {
    category = 'medium';
  } else if (knocks < 80) {
    category = 'high';
  } else {
    category = 'extreme';
  }

  const categoryData = missionMessages[category];
  const randomMessage = categoryData.messages[Math.floor(Math.random() * categoryData.messages.length)];

  return {
    message: randomMessage,
    threatLevel: categoryData.threatLevel,
    timestamp: new Date().toISOString()
  };
};
