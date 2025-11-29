import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeType = 'dark' | 'light' | 'cyberpunk' | 'ocean' | 'sunset' | 'forest';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  glow: string;
  glowSecondary: string;
}

export const themes: Record<ThemeType, ThemeColors> = {
  dark: {
    primary: '#00d4ff',
    secondary: '#0066ff',
    accent: '#22d3ee',
    background: '#000000',
    backgroundSecondary: '#0a0a0a',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textMuted: 'rgba(255, 255, 255, 0.4)',
    border: 'rgba(255, 255, 255, 0.05)',
    glow: 'rgba(0, 212, 255, 0.3)',
    glowSecondary: 'rgba(0, 102, 255, 0.3)',
  },
  light: {
    primary: '#0066ff',
    secondary: '#00d4ff',
    accent: '#0891b2',
    background: '#f8fafc',
    backgroundSecondary: '#ffffff',
    text: '#0f172a',
    textSecondary: 'rgba(15, 23, 42, 0.7)',
    textMuted: 'rgba(15, 23, 42, 0.5)',
    border: 'rgba(15, 23, 42, 0.1)',
    glow: 'rgba(0, 102, 255, 0.2)',
    glowSecondary: 'rgba(0, 212, 255, 0.2)',
  },
  cyberpunk: {
    primary: '#ff00ff',
    secondary: '#00ffff',
    accent: '#ffff00',
    background: '#0d0015',
    backgroundSecondary: '#1a0026',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    textMuted: 'rgba(255, 255, 255, 0.5)',
    border: 'rgba(255, 0, 255, 0.2)',
    glow: 'rgba(255, 0, 255, 0.4)',
    glowSecondary: 'rgba(0, 255, 255, 0.4)',
  },
  ocean: {
    primary: '#06b6d4',
    secondary: '#0284c7',
    accent: '#22d3ee',
    background: '#0c1929',
    backgroundSecondary: '#0f2136',
    text: '#e0f2fe',
    textSecondary: 'rgba(224, 242, 254, 0.7)',
    textMuted: 'rgba(224, 242, 254, 0.4)',
    border: 'rgba(6, 182, 212, 0.15)',
    glow: 'rgba(6, 182, 212, 0.3)',
    glowSecondary: 'rgba(2, 132, 199, 0.3)',
  },
  sunset: {
    primary: '#f97316',
    secondary: '#ef4444',
    accent: '#fbbf24',
    background: '#1c0f0a',
    backgroundSecondary: '#2a1610',
    text: '#fef3c7',
    textSecondary: 'rgba(254, 243, 199, 0.7)',
    textMuted: 'rgba(254, 243, 199, 0.4)',
    border: 'rgba(249, 115, 22, 0.15)',
    glow: 'rgba(249, 115, 22, 0.3)',
    glowSecondary: 'rgba(239, 68, 68, 0.3)',
  },
  forest: {
    primary: '#22c55e',
    secondary: '#16a34a',
    accent: '#4ade80',
    background: '#0a1410',
    backgroundSecondary: '#0f1f17',
    text: '#dcfce7',
    textSecondary: 'rgba(220, 252, 231, 0.7)',
    textMuted: 'rgba(220, 252, 231, 0.4)',
    border: 'rgba(34, 197, 94, 0.15)',
    glow: 'rgba(34, 197, 94, 0.3)',
    glowSecondary: 'rgba(22, 163, 74, 0.3)',
  },
};

export const themeNames: Record<ThemeType, string> = {
  dark: 'Dark Mode',
  light: 'Light Mode',
  cyberpunk: 'Cyberpunk',
  ocean: 'Ocean Blue',
  sunset: 'Sunset Orange',
  forest: 'Forest Green',
};

interface ThemeState {
  theme: ThemeType;
  colors: ThemeColors;
  setTheme: (theme: ThemeType) => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      colors: themes.dark,
      setTheme: (theme: ThemeType) => {
        set({ theme, colors: themes[theme] });
        applyThemeToDOM(theme);
      },
    }),
    {
      name: 'akashvahini-theme',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyThemeToDOM(state.theme);
        }
      },
    }
  )
);

function applyThemeToDOM(theme: ThemeType) {
  const colors = themes[theme];
  const root = document.documentElement;
  
  root.style.setProperty('--primary-cyan', colors.primary);
  root.style.setProperty('--primary-blue', colors.secondary);
  root.style.setProperty('--dark-bg', colors.background);
  root.style.setProperty('--dark-secondary', colors.backgroundSecondary);
  root.style.setProperty('--text-primary', colors.text);
  root.style.setProperty('--text-secondary', colors.textSecondary);
  root.style.setProperty('--text-muted', colors.textMuted);
  root.style.setProperty('--glow-cyan', `0 0 60px ${colors.glow}`);
  root.style.setProperty('--glow-blue', `0 0 60px ${colors.glowSecondary}`);
  
  if (theme === 'light') {
    root.classList.add('light-theme');
    root.classList.remove('dark-theme');
  } else {
    root.classList.remove('light-theme');
    root.classList.add('dark-theme');
  }
}
