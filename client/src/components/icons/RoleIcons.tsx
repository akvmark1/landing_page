import { motion } from 'framer-motion';

interface IconProps {
  className?: string;
}

export function CompassIcon({ className = '' }: IconProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    >
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <motion.path
        d="M24 4 L26 24 L24 44 L22 24 Z"
        fill="currentColor"
        opacity="0.6"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: 'center' }}
      />
      <motion.path
        d="M4 24 L24 22 L44 24 L24 26 Z"
        fill="currentColor"
        opacity="0.4"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: 'center' }}
      />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </motion.svg>
  );
}

export function NeuralNetworkIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <g stroke="currentColor" strokeWidth="1">
        <motion.circle cx="24" cy="8" r="3" fill="currentColor" opacity="0.8"
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
        <motion.circle cx="12" cy="18" r="3" fill="currentColor" opacity="0.8"
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} />
        <motion.circle cx="36" cy="18" r="3" fill="currentColor" opacity="0.8"
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} />
        <motion.circle cx="8" cy="30" r="3" fill="currentColor" opacity="0.8"
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
        <motion.circle cx="24" cy="30" r="3" fill="currentColor" opacity="0.8"
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.8 }} />
        <motion.circle cx="40" cy="30" r="3" fill="currentColor" opacity="0.8"
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.0 }} />
        <motion.circle cx="16" cy="40" r="3" fill="currentColor" opacity="0.8"
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }} />
        <motion.circle cx="32" cy="40" r="3" fill="currentColor" opacity="0.8"
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.4 }} />
      </g>
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.4">
        <line x1="24" y1="8" x2="12" y2="18" />
        <line x1="24" y1="8" x2="36" y2="18" />
        <line x1="12" y1="18" x2="8" y2="30" />
        <line x1="12" y1="18" x2="24" y2="30" />
        <line x1="36" y1="18" x2="24" y2="30" />
        <line x1="36" y1="18" x2="40" y2="30" />
        <line x1="8" y1="30" x2="16" y2="40" />
        <line x1="24" y1="30" x2="16" y2="40" />
        <line x1="24" y1="30" x2="32" y2="40" />
        <line x1="40" y1="30" x2="32" y2="40" />
      </g>
    </svg>
  );
}

export function GearIcon({ className = '' }: IconProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    >
      <path
        d="M24 4L26.5 10.5L34 8L31.5 15.5L38 18L31.5 20.5L34 28L26.5 25.5L24 32L21.5 25.5L14 28L16.5 20.5L10 18L16.5 15.5L14 8L21.5 10.5L24 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <circle cx="24" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" />
    </motion.svg>
  );
}

export function BrainWaveIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="24" rx="18" ry="14" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <motion.path
        d="M8 24 Q12 16, 16 24 T24 24 T32 24 T40 24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        animate={{ d: [
          "M8 24 Q12 16, 16 24 T24 24 T32 24 T40 24",
          "M8 24 Q12 32, 16 24 T24 24 T32 24 T40 24",
          "M8 24 Q12 16, 16 24 T24 24 T32 24 T40 24"
        ]}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M10 20 Q14 12, 18 20 T26 20 T34 20 T38 20"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
        animate={{ d: [
          "M10 20 Q14 12, 18 20 T26 20 T34 20 T38 20",
          "M10 20 Q14 28, 18 20 T26 20 T34 20 T38 20",
          "M10 20 Q14 12, 18 20 T26 20 T34 20 T38 20"
        ]}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      <motion.path
        d="M10 28 Q14 20, 18 28 T26 28 T34 28 T38 28"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
        animate={{ d: [
          "M10 28 Q14 20, 18 28 T26 28 T34 28 T38 28",
          "M10 28 Q14 36, 18 28 T26 28 T34 28 T38 28",
          "M10 28 Q14 20, 18 28 T26 28 T34 28 T38 28"
        ]}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
    </svg>
  );
}

export function SignalPulseIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <motion.circle cx="24" cy="24" r="4" fill="currentColor"
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
      <motion.circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.6"
        animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1" opacity="0.4"
        animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
      <motion.circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="0.5" opacity="0.2"
        animate={{ scale: [1, 1.5], opacity: [0.2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} />
    </svg>
  );
}

export function TimelineIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <line x1="8" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <motion.circle cx="12" cy="24" r="3" fill="currentColor"
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} />
      <motion.circle cx="24" cy="24" r="3" fill="currentColor"
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
      <motion.circle cx="36" cy="24" r="3" fill="currentColor"
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} />
      <motion.line x1="12" y1="24" x2="24" y2="24" stroke="currentColor" strokeWidth="2"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1, repeat: Infinity }} />
      <motion.line x1="24" y1="24" x2="36" y2="24" stroke="currentColor" strokeWidth="2"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }} />
    </svg>
  );
}

export function CameraIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="14" width="36" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <motion.circle cx="24" cy="26" r="8" stroke="currentColor" strokeWidth="1.5"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }} />
      <motion.circle cx="24" cy="26" r="4" fill="currentColor" opacity="0.6"
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }} />
      <circle cx="36" cy="20" r="2" fill="currentColor" opacity="0.6" />
      <motion.rect x="16" y="8" width="16" height="6" rx="2" fill="currentColor" opacity="0.4"
        animate={{ y: [8, 10, 8] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }} />
    </svg>
  );
}

export function DocumentIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <motion.g
        animate={{ rotateY: [0, 180, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'center', transformStyle: 'preserve-3d' }}
      >
        <rect x="10" y="6" width="28" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <line x1="16" y1="14" x2="32" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="16" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="16" y1="26" x2="28" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="16" y1="32" x2="24" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </motion.g>
    </svg>
  );
}

export function CFOIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <motion.path
        d="M8 36 L16 28 L24 32 L32 20 L40 24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle cx="16" cy="28" r="2" fill="currentColor"
        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
      <motion.circle cx="24" cy="32" r="2" fill="currentColor"
        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
      <motion.circle cx="32" cy="20" r="2" fill="currentColor"
        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }} />
      <motion.circle cx="40" cy="24" r="2" fill="currentColor"
        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.8 }} />
      <line x1="8" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="8" y1="12" x2="8" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

export function ActiveHubIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <motion.circle cx="24" cy="24" r="6" fill="currentColor"
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.6"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1" opacity="0.3"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      <motion.circle cx="24" cy="6" r="3" fill="currentColor" opacity="0.8"
        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
      <motion.circle cx="42" cy="24" r="3" fill="currentColor" opacity="0.8"
        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.25 }} />
      <motion.circle cx="24" cy="42" r="3" fill="currentColor" opacity="0.8"
        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.5 }} />
      <motion.circle cx="6" cy="24" r="3" fill="currentColor" opacity="0.8"
        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.75 }} />
      <motion.line x1="24" y1="12" x2="24" y2="6" stroke="currentColor" strokeWidth="1.5"
        animate={{ pathLength: [0, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0 }} />
      <motion.line x1="36" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="1.5"
        animate={{ pathLength: [0, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
      <motion.line x1="24" y1="36" x2="24" y2="42" stroke="currentColor" strokeWidth="1.5"
        animate={{ pathLength: [0, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />
      <motion.line x1="12" y1="24" x2="6" y2="24" stroke="currentColor" strokeWidth="1.5"
        animate={{ pathLength: [0, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.6 }} />
    </svg>
  );
}

export function CircuitIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <motion.rect x="20" y="20" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.3"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.line x1="24" y1="4" x2="24" y2="20" stroke="currentColor" strokeWidth="1.5"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
      />
      <motion.line x1="24" y1="28" x2="24" y2="44" stroke="currentColor" strokeWidth="1.5"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      <motion.line x1="4" y1="24" x2="20" y2="24" stroke="currentColor" strokeWidth="1.5"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
      />
      <motion.line x1="28" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="1.5"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />
      <motion.circle cx="24" cy="4" r="2" fill="currentColor"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
      />
      <motion.circle cx="24" cy="44" r="2" fill="currentColor"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
      />
      <motion.circle cx="4" cy="24" r="2" fill="currentColor"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
      />
      <motion.circle cx="44" cy="24" r="2" fill="currentColor"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.9 }}
      />
      <motion.line x1="8" y1="8" x2="18" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.5"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.8 }}
      />
      <motion.line x1="40" y1="8" x2="30" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.5"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 1 }}
      />
      <motion.line x1="8" y1="40" x2="18" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.5"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 1.2 }}
      />
      <motion.line x1="40" y1="40" x2="30" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.5"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 1.4 }}
      />
      <motion.circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.5"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.8 }}
      />
      <motion.circle cx="40" cy="8" r="1.5" fill="currentColor" opacity="0.5"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, delay: 1 }}
      />
      <motion.circle cx="8" cy="40" r="1.5" fill="currentColor" opacity="0.5"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, delay: 1.2 }}
      />
      <motion.circle cx="40" cy="40" r="1.5" fill="currentColor" opacity="0.5"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, delay: 1.4 }}
      />
    </svg>
  );
}
