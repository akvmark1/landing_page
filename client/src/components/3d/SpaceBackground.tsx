import { useMemo } from 'react';

const starStyles = `
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.1); }
  }
  .star {
    animation: twinkle 3s ease-in-out infinite;
    will-change: opacity, transform;
  }
`;

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

export function SpaceBackground() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 70,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.6 + 0.3,
      delay: Math.random() * 3,
      duration: 2.5 + Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{starStyles}</style>
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1a1a4e 0%, #2d2a6e 20%, #4a3a8c 40%, #5c4a9e 60%, #3d8b9c 80%, #5bbcbb 100%)',
        }}
      />
      
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      <div 
        className="absolute rounded-full"
        style={{
          right: '15%',
          top: '8%',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #2a2a5a 0%, #1a1a3a 100%)',
          boxShadow: '0 0 30px rgba(42, 42, 90, 0.5)',
        }}
      />
      
      <div 
        className="absolute"
        style={{
          right: '12%',
          top: '6%',
          width: '100px',
          height: '20px',
          background: 'linear-gradient(90deg, transparent, rgba(90, 80, 140, 0.6), transparent)',
          transform: 'rotate(-20deg)',
          borderRadius: '50%',
        }}
      />

      <svg
        className="absolute w-full"
        style={{ bottom: 0, height: '35%' }}
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="cloud1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(120, 210, 210, 0.7)" />
            <stop offset="100%" stopColor="rgba(80, 180, 180, 0.3)" />
          </linearGradient>
          <linearGradient id="cloud2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(100, 200, 200, 0.5)" />
            <stop offset="100%" stopColor="rgba(60, 160, 160, 0.2)" />
          </linearGradient>
          <linearGradient id="cloud3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(140, 220, 220, 0.8)" />
            <stop offset="100%" stopColor="rgba(100, 190, 190, 0.4)" />
          </linearGradient>
        </defs>
        
        <path
          d="M0,200 Q100,150 200,180 Q300,210 400,170 Q500,130 600,160 Q700,190 800,150 Q900,110 1000,140 Q1100,170 1200,130 Q1300,90 1440,120 L1440,400 L0,400 Z"
          fill="url(#cloud2)"
        />
        
        <path
          d="M0,250 Q150,200 300,230 Q450,260 600,220 Q750,180 900,210 Q1050,240 1200,200 Q1350,160 1440,190 L1440,400 L0,400 Z"
          fill="url(#cloud1)"
        />
        
        <path
          d="M0,300 Q120,260 240,280 Q360,300 480,270 Q600,240 720,260 Q840,280 960,250 Q1080,220 1200,250 Q1320,280 1440,260 L1440,400 L0,400 Z"
          fill="url(#cloud3)"
        />
        
        <ellipse cx="100" cy="320" rx="120" ry="60" fill="rgba(150, 225, 225, 0.6)" />
        <ellipse cx="350" cy="340" rx="100" ry="50" fill="rgba(130, 215, 215, 0.5)" />
        <ellipse cx="600" cy="310" rx="140" ry="70" fill="rgba(160, 230, 230, 0.7)" />
        <ellipse cx="900" cy="350" rx="110" ry="55" fill="rgba(140, 220, 220, 0.6)" />
        <ellipse cx="1150" cy="320" rx="130" ry="65" fill="rgba(150, 225, 225, 0.5)" />
        <ellipse cx="1350" cy="340" rx="100" ry="50" fill="rgba(160, 230, 230, 0.6)" />
      </svg>
    </div>
  );
}
