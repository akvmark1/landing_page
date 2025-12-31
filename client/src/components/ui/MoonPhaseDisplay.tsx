import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDayNight } from '../../lib/stores/useDayNight';

export function MoonPhaseDisplay() {
  const { moonPhase, timezone, currentTime, updateTime, mode } = useDayNight();

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [updateTime]);

  const getShadowOffset = useMemo(() => {
    const phase = moonPhase.phase;
    const illumination = moonPhase.illumination / 100;
    const size = 80;
    const r = size / 2;
    
    if (phase < 0.02 || phase > 0.98) {
      return { offset: 0, shadowR: r, isNewMoon: true, isFullMoon: false };
    }
    
    if (phase >= 0.48 && phase <= 0.52) {
      return { offset: r * 3, shadowR: r, isNewMoon: false, isFullMoon: true };
    }
    
    const isWaxing = phase < 0.5;
    const direction = isWaxing ? -1 : 1;
    const offset = direction * 2 * r * illumination;
    
    return { offset, shadowR: r, isNewMoon: false, isFullMoon: false };
  }, [moonPhase.phase, moonPhase.illumination]);

  const formatTimeLocal = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      timeZone: timezone 
    });
  };

  const formatDateLocal = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: timezone 
    });
  };

  if (mode === 'day') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative"
      >
        <div 
          className="relative w-20 h-20 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #FFF7E0 0%, #FFD700 30%, #FFA500 70%, #FF8C00 100%)',
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.6), 0 0 80px rgba(255, 165, 0, 0.4), 0 0 120px rgba(255, 140, 0, 0.2)',
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)',
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-4 bg-gradient-to-t from-yellow-500/80 to-yellow-200/60 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: '50% 50%',
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-50px)`,
              }}
              animate={{
                scaleY: [1, 1.4, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative"
    >
      <svg 
        width="80" 
        height="80" 
        viewBox="0 0 80 80"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 40px rgba(200, 200, 255, 0.3))',
        }}
      >
        <defs>
          <radialGradient id="moonSurface" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#f5f5f5" />
            <stop offset="40%" stopColor="#e8e8e8" />
            <stop offset="60%" stopColor="#d4d4d4" />
            <stop offset="80%" stopColor="#b8b8b8" />
            <stop offset="100%" stopColor="#a0a0a0" />
          </radialGradient>
          <radialGradient id="crater1" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(180, 180, 180, 0.6)" />
            <stop offset="100%" stopColor="rgba(160, 160, 160, 0.3)" />
          </radialGradient>
          <radialGradient id="crater2" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(170, 170, 170, 0.5)" />
            <stop offset="100%" stopColor="rgba(150, 150, 150, 0.2)" />
          </radialGradient>
          <clipPath id="moonClip">
            <circle cx="40" cy="40" r="40" />
          </clipPath>
        </defs>
        
        <circle cx="40" cy="40" r="40" fill="url(#moonSurface)" />
        
        <g clipPath="url(#moonClip)">
          <circle cx="16" cy="24" r="6" fill="url(#crater1)" />
          <circle cx="44" cy="40" r="4" fill="url(#crater2)" />
          <circle cx="28" cy="52" r="3" fill="url(#crater2)" />
          <circle cx="52" cy="20" r="5" fill="url(#crater1)" />
          <circle cx="20" cy="44" r="2.5" fill="url(#crater2)" />
          
          {!getShadowOffset.isFullMoon && (
            <motion.circle
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              cx={40 + getShadowOffset.offset}
              cy="40"
              r={getShadowOffset.shadowR}
              fill="rgba(0, 0, 0, 0.92)"
            />
          )}
        </g>
        
        <motion.circle
          cx="40"
          cy="40"
          r="40"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="0.5"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
}

export function MoonPhaseCard() {
  const { moonPhase, timezone, currentTime, updateTime, mode } = useDayNight();

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

  const formatTimeLocal = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      timeZone: timezone 
    });
  };

  const formatDateLocal = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: timezone 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-6 rounded-2xl overflow-hidden"
      style={{
        background: mode === 'day' 
          ? 'linear-gradient(135deg, rgba(135, 206, 235, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(26, 26, 78, 0.8) 0%, rgba(45, 42, 110, 0.8) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-center gap-6">
        <MoonPhaseDisplay />
        
        <div className="flex-1">
          <motion.div
            key={currentTime.getSeconds()}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-white mb-1 font-mono"
          >
            {formatTimeLocal(currentTime)}
          </motion.div>
          <div className="text-sm text-white/60 mb-3">
            {formatDateLocal(currentTime)}
          </div>
          <div className="flex items-center gap-3">
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: mode === 'day' 
                  ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 165, 0, 0.3) 100%)'
                  : 'linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(79, 70, 229, 0.3) 100%)',
                color: mode === 'day' ? '#FFD700' : '#a78bfa',
              }}
            >
              {moonPhase.phaseName}
            </span>
            <span className="text-xs text-white/40">
              {moonPhase.illumination}% illuminated
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40">Timezone</span>
          <span className="text-white/70">{timezone.replace(/_/g, ' ')}</span>
        </div>
      </div>
    </motion.div>
  );
}
