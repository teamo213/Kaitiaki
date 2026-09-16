export type OperationalMode = 'KŌRERO' | 'WHAKAARO' | 'TIKI';

export interface MirrorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode?: OperationalMode;
  timestamp: number;
  frequency?: string;
  source?: 'gemini_live' | 'sovereign_fallback';
}

export interface HarmonicFrequency {
  frequency: number;
  name: string;
  significance: string;
}

export interface RipplePoint {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  intensity: number;
  speed: number;
}
