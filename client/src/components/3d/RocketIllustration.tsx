import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

const propellerStyles = `
  @keyframes spinCW {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes spinCCW {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(-360deg); }
  }
  @keyframes ledBlink {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
  @keyframes ledBlinkFast {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
  .propeller-cw {
    animation: spinCW 0.15s linear infinite;
    transform-origin: 0px -3px;
    will-change: transform;
  }
  .propeller-ccw {
    animation: spinCCW 0.15s linear infinite;
    transform-origin: 0px -3px;
    will-change: transform;
  }
  .led-blink {
    animation: ledBlink 0.8s ease-in-out infinite;
  }
  .led-blink-fast {
    animation: ledBlinkFast 0.5s ease-in-out infinite;
  }
  .led-blink-slow {
    animation: ledBlink 1.5s ease-in-out infinite;
  }
  .lens-pulse {
    animation: lensPulse 1.5s ease-in-out infinite;
    transform-origin: center;
  }
  @keyframes lensPulse {
    0%, 100% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(1.25); opacity: 0.1; }
  }
  .antenna-sway {
    animation: antennaSway 2.5s ease-in-out infinite;
    transform-origin: 0px 0px;
  }
  @keyframes antennaSway {
    0%, 100% { transform: rotate(-1deg); }
    50% { transform: rotate(1deg); }
  }
`;

interface DroneIllustrationProps {
  scrollProgress?: number;
}

export function RocketIllustration({ scrollProgress = 0 }: DroneIllustrationProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasTakenOff, setHasTakenOff] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollProgress > 0.35 && !hasTakenOff) {
      setHasTakenOff(true);
    } else if (scrollProgress <= 0.25 && hasTakenOff) {
      setHasTakenOff(false);
    }
  }, [scrollProgress, hasTakenOff]);

  // Smooth animation based on scroll progress
  const smoothProgress = Math.min(Math.max((scrollProgress - 0.25) / 0.15, 0), 1);
  const yOffset = hasTakenOff ? -400 * smoothProgress : 0;
  const droneScale = hasTakenOff ? 1 - (0.5 * smoothProgress) : 1;
  const droneOpacity = hasTakenOff ? 1 - (0.3 * smoothProgress) : 1;

  const hexRotorPositions = useMemo(() => {
    const radius = 65;
    const offsetAngle = 15;
    const angles = [0, 60, 120, 180, 240, 300].map(a => a + offsetAngle);
    const leds = ['green', 'green', 'amber', 'red', 'red', 'green'];
    const rotations = [360, -360, 360, -360, 360, -360];
    
    return angles.map((angle, i) => ({
      x: Math.round(radius * Math.sin((angle * Math.PI) / 180)),
      y: Math.round(-radius * Math.cos((angle * Math.PI) / 180)),
      led: leds[i],
      rotation: rotations[i],
      delay: i * 0.1,
    }));
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{propellerStyles}</style>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ 
              y: yOffset, 
              opacity: droneOpacity,
              scale: droneScale
            }}
            exit={{ opacity: 0, y: -150 }}
            transition={{ 
              type: "spring",
              stiffness: 30,
              damping: 20,
              mass: 1.2,
              opacity: { duration: 0.8, ease: "easeOut" }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="cursor-pointer w-full max-w-[400px] md:max-w-[500px]"
            style={{ willChange: 'transform' }}
          >
            <motion.div
              animate={{ 
                y: [-3, 3, -3],
              }}
              transition={{ 
                duration: 3.5, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
              style={{ willChange: 'transform' }}
            >
              <svg
                viewBox="0 0 400 380"
                className="w-full h-auto"
                preserveAspectRatio="xMidYMid meet"
                style={{ 
                  filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))'
                }}
              >
                <defs>
                  <linearGradient id="bodyShell" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="25%" stopColor="#f1f5f9" />
                    <stop offset="50%" stopColor="#e2e8f0" />
                    <stop offset="75%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#64748b" />
                  </linearGradient>
                  
                  <linearGradient id="bodyTop" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#f1f5f9" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>
                  
                  <linearGradient id="bodyStripe" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  
                  <linearGradient id="carbonArm" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="50%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                  
                  <linearGradient id="motorHousing" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="50%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  
                  <linearGradient id="motorTop" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9ca3af" />
                    <stop offset="100%" stopColor="#4b5563" />
                  </linearGradient>
                  
                  <linearGradient id="motorRing" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                  
                  <linearGradient id="cameraBody" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#374151" />
                    <stop offset="100%" stopColor="#111827" />
                  </linearGradient>
                  
                  <linearGradient id="lensGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>
                  
                  <linearGradient id="gimbal" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9ca3af" />
                    <stop offset="100%" stopColor="#4b5563" />
                  </linearGradient>
                  
                  <linearGradient id="legGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6b7280" />
                    <stop offset="100%" stopColor="#374151" />
                  </linearGradient>
                  
                  <linearGradient id="greenLed" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#86efac" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                  
                  <linearGradient id="redLed" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fca5a5" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  
                  <linearGradient id="amberLed" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fde047" />
                    <stop offset="100%" stopColor="#eab308" />
                  </linearGradient>
                  
                  <linearGradient id="blueLed" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7dd3fc" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                  
                  <linearGradient id="scanBeam" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(14, 165, 233, 0.8)" />
                    <stop offset="50%" stopColor="rgba(14, 165, 233, 0.3)" />
                    <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
                  </linearGradient>
                  
                  <radialGradient id="propBlur" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(100, 116, 139, 0.1)" />
                    <stop offset="60%" stopColor="rgba(71, 85, 105, 0.3)" />
                    <stop offset="100%" stopColor="rgba(51, 65, 85, 0.1)" />
                  </radialGradient>
                  
                  <radialGradient id="motorCenter" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#6b7280" />
                    <stop offset="100%" stopColor="#374151" />
                  </radialGradient>
                  
                  <filter id="propMotion">
                    <feGaussianBlur stdDeviation="1.5" />
                  </filter>
                  
                  <filter id="ledGlow">
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  
                  <filter id="shadow">
                    <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.25"/>
                  </filter>
                  
                  <filter id="scanGlow">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <g transform="translate(200, 175) skewY(-15) skewX(15)">
                  <g filter="url(#shadow)">
                    <ellipse cx="0" cy="6" rx="42" ry="28" fill="#475569" opacity="0.2" />
                    <ellipse cx="0" cy="4" rx="40" ry="26" fill="url(#bodyShell)" />
                    <ellipse cx="0" cy="0" rx="36" ry="22" fill="url(#bodyTop)" />
                    
                    <path d="M-32 2 Q0 -10, 32 2" stroke="url(#bodyStripe)" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M-28 5 Q0 -4, 28 5" stroke="url(#bodyStripe)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
                    
                    <g transform="translate(-18, -10)">
                      <rect x="0" y="0" width="36" height="14" rx="2" fill="#1e293b" />
                      <rect x="2" y="2" width="32" height="10" rx="1" fill="#0f172a" />
                      {[0, 1, 2, 3].map((i) => (
                        <rect key={i} x={4 + i * 8} y="4" width="5" height="6" rx="0.5" fill="#1e293b" />
                      ))}
                    </g>
                    
                    <g transform="translate(-12, 8)">
                      <rect x="0" y="0" width="24" height="5" rx="1.5" fill="#1e293b" />
                      {[0, 1, 2].map((i) => (
                        <circle 
                          key={i}
                          cx={5 + i * 7} 
                          cy="2.5" 
                          r="1.5" 
                          fill="url(#blueLed)"
                          filter="url(#ledGlow)"
                          className="led-blink-fast"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </g>
                    
                    <g transform="translate(20, -6)">
                      <rect x="0" y="0" width="10" height="14" rx="1.5" fill="#0f172a" />
                      <circle
                        cx="5"
                        cy="4"
                        r="2"
                        fill="url(#greenLed)"
                        filter="url(#ledGlow)"
                        className="led-blink-fast"
                      />
                      <rect x="2" y="8" width="6" height="1" rx="0.5" fill="#374151" />
                      <rect x="2" y="10" width="6" height="1" rx="0.5" fill="#374151" />
                    </g>
                  </g>

                  {hexRotorPositions.map((rotor, index) => {
                    const a = 42;
                    const b = 28;
                    const dx = rotor.x;
                    const dy = rotor.y;
                    const t = 1 / Math.sqrt((dx * dx) / (a * a) + (dy * dy) / (b * b));
                    const startX = t * dx;
                    const startY = t * dy;
                    
                    return (
                      <g key={`arm-${index}`} filter="url(#shadow)">
                        <line 
                          x1={startX} 
                          y1={startY} 
                          x2={rotor.x} 
                          y2={rotor.y} 
                          stroke="url(#carbonArm)" 
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                      </g>
                    );
                  })}

                  <g transform="translate(0, 36)">
                    <rect x="-4" y="0" width="8" height="10" rx="1.5" fill="url(#gimbal)" />
                    <ellipse cx="0" cy="3" rx="5" ry="3" fill="#6b7280" />
                    
                    <g transform="translate(0, 14)">
                      <rect x="-2" y="-4" width="4" height="4" rx="1" fill="#9ca3af" />
                      
                      <g transform="translate(0, 4)">
                        <ellipse cx="0" cy="0" rx="14" ry="10" fill="url(#cameraBody)" />
                        <ellipse cx="0" cy="-2" rx="11" ry="7" fill="#1e293b" />
                        
                        <g transform="translate(0, 4)">
                          <circle cx="0" cy="0" r="9" fill="#111827" stroke="#374151" strokeWidth="1" />
                          <circle cx="0" cy="0" r="7" fill="url(#lensGlass)" />
                          <circle cx="0" cy="0" r="5" fill="#0c4a6e" />
                          <circle cx="0" cy="0" r="3" fill="#082f49" />
                          <ellipse cx="-2" cy="-2" rx="2" ry="1.5" fill="rgba(255,255,255,0.6)" />
                          
                          <circle
                            cx="0"
                            cy="0"
                            r="8"
                            fill="none"
                            stroke="rgba(14, 165, 233, 0.4)"
                            strokeWidth="0.5"
                            className="lens-pulse"
                          />
                        </g>
                        
                        <circle
                          cx="-11"
                          cy="-5"
                          r="2"
                          fill="url(#redLed)"
                          filter="url(#ledGlow)"
                          className="led-blink"
                        />
                      </g>
                    </g>
                  </g>

                  {isHovered && (
                    <motion.g
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{ transformOrigin: '0px 72px' }}
                    >
                      <motion.path
                        d="M-8 72 L-25 150 L25 150 L8 72"
                        fill="url(#scanBeam)"
                        filter="url(#scanGlow)"
                        animate={{ opacity: [0.7, 0.4, 0.7] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                      <motion.line
                        x1="-20"
                        y1="100"
                        x2="20"
                        y2="100"
                        stroke="rgba(14, 165, 233, 0.8)"
                        strokeWidth="1.5"
                        animate={{ y1: [85, 140, 85], y2: [85, 140, 85] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.g>
                  )}

                  {hexRotorPositions.map((rotor, index) => (
                    <g key={`motor-${index}`} transform={`translate(${rotor.x}, ${rotor.y})`}>
                      <ellipse cx="0" cy="4" rx="12" ry="6" fill="#1e293b" opacity="0.2" />
                      
                      <ellipse cx="0" cy="2" rx="10" ry="7" fill="url(#motorHousing)" />
                      <ellipse cx="0" cy="0" rx="8" ry="5" fill="#1e293b" />
                      <ellipse cx="0" cy="-2" rx="7" ry="4" fill="url(#motorTop)" />
                      
                      <circle cx="0" cy="-3" r="4" fill="url(#motorCenter)" />
                      <circle cx="0" cy="-3" r="2.5" fill="#6b7280" />
                      <circle cx="0" cy="-3" r="1.2" fill="#374151" />
                      
                      <ellipse cx="0" cy="1" rx="9" ry="1.5" fill="url(#motorRing)" opacity="0.7" />
                      
                      <g className={rotor.rotation > 0 ? 'propeller-cw' : 'propeller-ccw'}>
                        <ellipse cx="0" cy="-3" rx="32" ry="4" fill="url(#propBlur)" filter="url(#propMotion)" />
                        
                        <g opacity="0.5">
                          <path d="M-30,-4 Q-15,-6 0,-3 Q-15,-1 -30,-2 Z" fill="#1e293b" />
                          <path d="M30,-2 Q15,-1 0,-3 Q15,-6 30,-4 Z" fill="#1e293b" />
                          <rect x="-32" y="-4.5" width="4" height="1.5" rx="0.5" fill="#f97316" />
                          <rect x="28" y="-3" width="4" height="1.5" rx="0.5" fill="#f97316" />
                        </g>
                        
                        <circle cx="0" cy="-3" r="3.5" fill="url(#motorCenter)" />
                      </g>
                      
                      <circle
                        cx="0"
                        cy="-10"
                        r="3"
                        fill={`url(#${rotor.led}Led)`}
                        filter="url(#ledGlow)"
                        className="led-blink"
                        style={{ animationDelay: `${rotor.delay}s` }}
                      />
                    </g>
                  ))}

                  <g transform="translate(0, -26)">
                    <ellipse cx="0" cy="0" rx="5" ry="3" fill="#6b7280" />
                    <g className="antenna-sway">
                      <rect x="-1.5" y="-12" width="3" height="12" rx="1.5" fill="#4b5563" />
                      <circle cx="0" cy="-14" r="2.5" fill="url(#blueLed)" filter="url(#ledGlow)" className="led-blink-slow" />
                    </g>
                  </g>

                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <circle
                      key={`sensor-${i}`}
                      cx={Math.sin(angle * Math.PI / 180) * 45}
                      cy={-Math.cos(angle * Math.PI / 180) * 30}
                      r="1.5"
                      fill="url(#amberLed)"
                      filter="url(#ledGlow)"
                      className="led-blink-slow"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </g>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/20 rounded-full blur-lg"
        animate={{ 
          scale: hasTakenOff ? 0.1 : [1, 1.08, 1],
          opacity: hasTakenOff ? 0 : [0.35, 0.2, 0.35]
        }}
        transition={{ 
          duration: hasTakenOff ? 0.5 : 3.5,
          repeat: hasTakenOff ? 0 : Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
