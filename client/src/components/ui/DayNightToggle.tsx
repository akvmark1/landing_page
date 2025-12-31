import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDayNight, DayNightMode } from '../../lib/stores/useDayNight';

export function DayNightToggle() {
  const { mode, setMode, updateTime } = useDayNight();

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [updateTime]);

  const modes: { id: DayNightMode; icon: JSX.Element }[] = [
    {
      id: 'day',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ),
    },
    {
      id: 'night',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ),
    },
    {
      id: 'deepBlack',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <ellipse cx="12" cy="12" rx="9" ry="3" />
          <circle cx="19" cy="7" r="1.5" fill="currentColor" />
          <circle cx="6" cy="16" r="1" fill="currentColor" />
        </svg>
      ),
    },
  ];

  const getModeIndex = () => modes.findIndex((m) => m.id === mode);

  const getActiveColor = () => {
    switch (mode) {
      case 'day':
        return 'bg-amber-500';
      case 'night':
        return 'bg-cyan-500';
      case 'deepBlack':
        return 'bg-violet-500';
    }
  };

  const getIconColor = (modeId: DayNightMode) => {
    if (mode === modeId) {
      return 'text-white';
    }
    return 'text-white/50';
  };

  return (
    <div className="relative flex items-center">
      <div className="relative flex items-center gap-0 p-1 rounded-full bg-slate-800/80 backdrop-blur-xl border border-white/10 shadow-lg">
        <motion.div
          className={`absolute top-1 bottom-1 rounded-full ${getActiveColor()} shadow-lg`}
          initial={false}
          animate={{
            x: getModeIndex() * 36,
            width: 36,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          style={{
            boxShadow: mode === 'day' 
              ? '0 0 20px rgba(251, 191, 36, 0.5)' 
              : mode === 'night' 
              ? '0 0 20px rgba(34, 211, 238, 0.5)' 
              : '0 0 20px rgba(139, 92, 246, 0.5)',
          }}
        />

        {modes.map((m) => (
          <motion.button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`relative z-10 w-9 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${getIconColor(m.id)}`}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${m.id} mode`}
          >
            <motion.div
              animate={{
                scale: mode === m.id ? 1.1 : 1,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {m.icon}
            </motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
