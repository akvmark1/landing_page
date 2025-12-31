import { useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDayNight } from '../../lib/stores/useDayNight';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDelay: number;
}

const CELESTIAL_POSITION = { right: '8%', top: '15%' };
const ANIMATION_DURATION = 1.5;

function RealisticMoon() {
  const { moonPhase, updateTime } = useDayNight();

  useEffect(() => {
    updateTime();
  }, [updateTime]);

  const getShadowStyle = () => {
    const phase = moonPhase.phase;
    const illumination = moonPhase.illumination;
    
    if (phase < 0.02 || phase > 0.98) {
      return { background: 'rgba(0, 0, 0, 0.95)', opacity: 0.95 };
    } else if (phase >= 0.48 && phase <= 0.52) {
      return { background: 'transparent', opacity: 0 };
    } else if (phase < 0.5) {
      const shadowPercent = 100 - illumination;
      return {
        background: `linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.95) ${shadowPercent}%, transparent ${shadowPercent}%)`,
        opacity: 1
      };
    } else {
      const shadowPercent = 100 - illumination;
      return {
        background: `linear-gradient(270deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.95) ${shadowPercent}%, transparent ${shadowPercent}%)`,
        opacity: 1
      };
    }
  };

  const shadowStyle = getShadowStyle();

  return (
    <motion.div
      initial={{
        x: '100vw',
        y: '50vh',
        opacity: 0,
        scale: 0.5,
        rotate: 90,
      }}
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      exit={{
        x: '-100vw',
        y: '50vh',
        opacity: 0,
        scale: 0.5,
        rotate: -90,
      }}
      transition={{
        type: 'spring',
        stiffness: 40,
        damping: 12,
        duration: ANIMATION_DURATION,
      }}
      className="absolute rounded-full"
      style={{
        right: CELESTIAL_POSITION.right,
        top: CELESTIAL_POSITION.top,
        width: '80px',
        height: '80px',
      }}
    >
      <div 
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #f5f5f5 20%, #e8e8e8 40%, #d4d4d4 60%, #b8b8b8 80%, #a0a0a0 100%)',
          boxShadow: '0 0 60px rgba(255, 255, 255, 0.6), 0 0 100px rgba(255, 255, 255, 0.3), inset -8px -8px 20px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div 
          className="absolute rounded-full"
          style={{
            width: '15px',
            height: '15px',
            left: '15px',
            top: '20px',
            background: 'radial-gradient(circle, rgba(180, 180, 180, 0.6) 0%, rgba(160, 160, 160, 0.3) 100%)',
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{
            width: '10px',
            height: '10px',
            left: '45px',
            top: '35px',
            background: 'radial-gradient(circle, rgba(170, 170, 170, 0.5) 0%, rgba(150, 150, 150, 0.2) 100%)',
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{
            width: '12px',
            height: '12px',
            left: '25px',
            top: '50px',
            background: 'radial-gradient(circle, rgba(175, 175, 175, 0.5) 0%, rgba(155, 155, 155, 0.2) 100%)',
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{
            width: '8px',
            height: '8px',
            left: '55px',
            top: '55px',
            background: 'radial-gradient(circle, rgba(165, 165, 165, 0.4) 0%, rgba(145, 145, 145, 0.2) 100%)',
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{
            width: '6px',
            height: '6px',
            left: '35px',
            top: '15px',
            background: 'radial-gradient(circle, rgba(160, 160, 160, 0.4) 0%, rgba(140, 140, 140, 0.2) 100%)',
          }}
        />
        
        <motion.div
          className="absolute inset-0"
          animate={shadowStyle}
          transition={{ duration: 0.5 }}
        />
        
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <motion.div
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <p className="text-[10px] text-white/40 font-medium">{moonPhase.phaseName}</p>
      </motion.div>
    </motion.div>
  );
}

function RealisticSun() {
  return (
    <motion.div
      initial={{
        x: '100vw',
        y: '50vh',
        opacity: 0,
        scale: 0.5,
        rotate: 90,
      }}
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      exit={{
        x: '-100vw',
        y: '50vh',
        opacity: 0,
        scale: 0.5,
        rotate: -90,
      }}
      transition={{
        type: 'spring',
        stiffness: 40,
        damping: 12,
        duration: ANIMATION_DURATION,
      }}
      className="absolute"
      style={{
        right: CELESTIAL_POSITION.right,
        top: CELESTIAL_POSITION.top,
        width: '80px',
        height: '80px',
      }}
    >
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #FFF7E0 0%, #FFD700 30%, #FFA500 70%, #FF8C00 100%)',
          boxShadow: '0 0 60px rgba(255, 215, 0, 0.8), 0 0 100px rgba(255, 165, 0, 0.5), 0 0 150px rgba(255, 140, 0, 0.3)',
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, transparent 50%)',
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
      </div>
      
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-6 bg-gradient-to-t from-yellow-500/80 to-yellow-200/60 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transformOrigin: '50% 50%',
            transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-55px)`,
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
    </motion.div>
  );
}

function GalaxySystem() {
  const orbitingPlanets = [
    { size: 12, orbitRadius: 50, duration: 8, color: '#22d3ee', delay: 0 },
    { size: 10, orbitRadius: 70, duration: 12, color: '#a78bfa', delay: 2 },
    { size: 8, orbitRadius: 90, duration: 18, color: '#fb923c', delay: 4 },
  ];

  return (
    <motion.div
      initial={{
        x: '100vw',
        y: '50vh',
        opacity: 0,
        scale: 0.3,
        rotate: 180,
      }}
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      exit={{
        x: '-100vw',
        y: '50vh',
        opacity: 0,
        scale: 0.3,
        rotate: -180,
      }}
      transition={{
        type: 'spring',
        stiffness: 40,
        damping: 12,
        duration: ANIMATION_DURATION,
      }}
      className="absolute"
      style={{
        right: '5%',
        top: '10%',
        width: '200px',
        height: '200px',
      }}
    >
      {orbitingPlanets.map((planet, i) => (
        <motion.div
          key={`orbit-${i}`}
          className="absolute rounded-full border border-white/10"
          style={{
            left: '50%',
            top: '50%',
            width: planet.orbitRadius * 2,
            height: planet.orbitRadius * 2,
            marginLeft: -planet.orbitRadius,
            marginTop: -planet.orbitRadius,
          }}
        />
      ))}

      {orbitingPlanets.map((planet, i) => (
        <motion.div
          key={`planet-container-${i}`}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            width: planet.orbitRadius * 2,
            height: planet.orbitRadius * 2,
            marginLeft: -planet.orbitRadius,
            marginTop: -planet.orbitRadius,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: planet.duration,
            repeat: Infinity,
            ease: "linear",
            delay: planet.delay,
          }}
        >
          <motion.div
            className="absolute rounded-full"
            style={{
              width: planet.size,
              height: planet.size,
              top: 0,
              left: '50%',
              marginLeft: -planet.size / 2,
              marginTop: -planet.size / 2,
              background: `radial-gradient(circle at 30% 30%, ${planet.color} 0%, ${planet.color}88 100%)`,
              boxShadow: `0 0 ${planet.size}px ${planet.color}66`,
            }}
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: planet.duration,
              repeat: Infinity,
              ease: "linear",
              delay: planet.delay,
            }}
          />
        </motion.div>
      ))}

      <motion.div 
        className="absolute rounded-full overflow-hidden"
        style={{
          left: '50%',
          top: '50%',
          width: '60px',
          height: '60px',
          marginLeft: '-30px',
          marginTop: '-30px',
          background: 'radial-gradient(circle at 35% 35%, #5b21b6 0%, #4c1d95 25%, #3b0764 50%, #2e1065 75%, #1e1b4b 100%)',
          boxShadow: '0 0 40px rgba(139, 92, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.2), inset -10px -10px 30px rgba(0, 0, 0, 0.6)',
        }}
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(167, 139, 250, 0.15) 6px, rgba(167, 139, 250, 0.15) 8px)',
            transform: 'rotate(-10deg)',
          }}
        />
        
        <div
          className="absolute rounded-full"
          style={{
            width: '20px',
            height: '12px',
            left: '20%',
            top: '25%',
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.4) 0%, rgba(76, 29, 149, 0.2) 100%)',
            transform: 'rotate(-15deg)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '15px',
            height: '10px',
            left: '55%',
            top: '50%',
            background: 'radial-gradient(ellipse at center, rgba(167, 139, 250, 0.3) 0%, rgba(91, 33, 182, 0.2) 100%)',
            transform: 'rotate(10deg)',
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 40%)',
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
      </motion.div>

      <motion.div
        className="absolute rounded-full"
        style={{
          left: '50%',
          top: '50%',
          width: '60px',
          height: '60px',
          marginLeft: '-30px',
          marginTop: '-30px',
        }}
        animate={{
          boxShadow: [
            '0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
            '0 0 40px rgba(139, 92, 246, 0.6), 0 0 80px rgba(139, 92, 246, 0.4)',
            '0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap"
        style={{ bottom: '-25px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <p className="text-[10px] text-violet-400/60 font-medium">Galaxy System</p>
      </motion.div>
    </motion.div>
  );
}

export function SpaceBackgroundFull() {
  const { mode } = useDayNight();
  const isDay = mode === 'day';
  const isNight = mode === 'night';
  const isDeepBlack = mode === 'deepBlack';
  
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleDelay: Math.random() * 5,
    }));
  }, []);

  const deepBlackStars = useMemo<Star[]>(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i + 200,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.3 + 0.1,
      twinkleDelay: Math.random() * 8,
    }));
  }, []);

  const dayBackground = 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 15%, #ADD8E6 30%, #87CEEB 45%, #87CEFA 55%, #6EB5FF 70%, #4A9EFF 85%, #3D8BFF 100%)';
  const nightBackground = 'linear-gradient(180deg, #1a1a4e 0%, #2d2a6e 15%, #3a3580 30%, #4a3a8c 45%, #4d4590 55%, #3d5a7c 70%, #3d7a8c 85%, #4a9090 100%)';
  const deepBlackBackground = 'linear-gradient(180deg, #000000 0%, #050508 15%, #080810 30%, #0a0a15 45%, #0c0c18 55%, #0a0a12 70%, #050508 85%, #000000 100%)';

  const getBackground = () => {
    switch (mode) {
      case 'day': return dayBackground;
      case 'night': return nightBackground;
      case 'deepBlack': return deepBlackBackground;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: getBackground(),
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      
      <AnimatePresence>
        {isNight && (
          <motion.div
            key="night-stars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                }}
                animate={{
                  opacity: [star.opacity * 0.4, star.opacity, star.opacity * 0.4],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 3 + star.twinkleDelay,
                  repeat: Infinity,
                  delay: star.twinkleDelay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeepBlack && (
          <motion.div
            key="deep-black-stars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {deepBlackStars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(139, 92, 246, 0.2) 100%)',
                }}
                animate={{
                  opacity: [star.opacity * 0.3, star.opacity * 0.8, star.opacity * 0.3],
                  scale: [0.8, 1.3, 0.8],
                }}
                transition={{
                  duration: 4 + star.twinkleDelay,
                  repeat: Infinity,
                  delay: star.twinkleDelay,
                  ease: "easeInOut",
                }}
              />
            ))}
            
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`nebula-${i}`}
                className="absolute rounded-full blur-3xl"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 15}%`,
                  width: '200px',
                  height: '200px',
                  background: `radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)`,
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="sync">
        {isDay && <RealisticSun key="sun" />}
        {isNight && <RealisticMoon key="moon" />}
        {isDeepBlack && <GalaxySystem key="galaxy" />}
      </AnimatePresence>
    </div>
  );
}
