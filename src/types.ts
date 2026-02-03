export interface MissionStatus {
  message: string;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  timestamp: string;
}

export const ThemeColors = {
  PRIMARY: '#ff6b00', // Arc Raiders Orange
  SECONDARY: '#00d4ff', // Tech Blue
  BG_DARK: '#0a0a0c',
  SURFACE: '#1a1a1e',
} as const;
