import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DayNightMode = 'day' | 'night' | 'deepBlack';

interface MoonPhaseData {
  phase: number;
  phaseName: string;
  illumination: number;
}

interface DayNightState {
  mode: DayNightMode;
  timezone: string;
  currentTime: Date;
  moonPhase: MoonPhaseData;
  toggleMode: () => void;
  cycleMode: () => void;
  setMode: (mode: DayNightMode) => void;
  updateTime: () => void;
}

function calculateMoonPhase(date: Date): MoonPhaseData {
  const knownNewMoon = new Date('2000-01-06T18:14:00Z');
  const lunarCycle = 29.530588853;
  
  const daysSinceKnownNewMoon = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  
  let phase = (daysSinceKnownNewMoon % lunarCycle) / lunarCycle;
  if (phase < 0) phase += 1;
  
  const phaseIndex = Math.floor(phase * 8);
  
  const phaseNames = [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent'
  ];

  let illumination: number;
  if (phase < 0.5) {
    illumination = phase * 2 * 100;
  } else {
    illumination = (1 - (phase - 0.5) * 2) * 100;
  }

  return {
    phase: phase,
    phaseName: phaseNames[phaseIndex],
    illumination: Math.round(illumination)
  };
}

function getLocalTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function isNightTime(date: Date): boolean {
  const hours = date.getHours();
  return hours >= 18 || hours < 6;
}

const modeOrder: DayNightMode[] = ['day', 'night', 'deepBlack'];

export const useDayNight = create<DayNightState>()(
  persist(
    (set, get) => ({
      mode: 'night' as DayNightMode,
      timezone: getLocalTimezone(),
      currentTime: new Date(),
      moonPhase: calculateMoonPhase(new Date()),
      
      toggleMode: () => {
        const currentMode = get().mode;
        const newMode: DayNightMode = currentMode === 'day' ? 'night' : 'day';
        set({ mode: newMode });
      },
      
      cycleMode: () => {
        const currentMode = get().mode;
        const currentIndex = modeOrder.indexOf(currentMode);
        const nextIndex = (currentIndex + 1) % modeOrder.length;
        set({ mode: modeOrder[nextIndex] });
      },
      
      setMode: (mode: DayNightMode) => {
        set({ mode });
      },
      
      updateTime: () => {
        const now = new Date();
        set({
          currentTime: now,
          moonPhase: calculateMoonPhase(now),
          timezone: getLocalTimezone()
        });
      }
    }),
    {
      name: 'akashvahini-daynight',
      partialize: (state) => ({ mode: state.mode })
    }
  )
);

export { calculateMoonPhase, isNightTime };
