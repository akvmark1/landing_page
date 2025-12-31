import { useEffect, useRef, useState, useMemo, lazy, Suspense, useCallback } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { useDayNight } from '../../lib/stores/useDayNight';
import { useHeroSection } from '../../hooks/useLandingData';

const RocketIllustration = lazy(() => import('../3d/RocketIllustration').then(m => ({ default: m.RocketIllustration })));

function TypewriterTitle({ mode, texts }: { mode: string; texts: string[] }) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseDuration = 2500;
  
  useEffect(() => {
    const currentText = texts[textIndex];
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }
    
    if (isDeleting) {
      if (displayText.length > 0) {
        const deleteTimer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deleteSpeed);
        return () => clearTimeout(deleteTimer);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      if (displayText.length < currentText.length) {
        const typeTimer = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typeSpeed);
        return () => clearTimeout(typeTimer);
      } else {
        setIsPaused(true);
      }
    }
  }, [displayText, isDeleting, textIndex, isPaused, texts]);
  
  const isWelcomeText = textIndex === 1 || (textIndex === 0 && isDeleting && texts[1].startsWith(displayText));
  const currentFullText = texts[textIndex];
  const showingWelcome = currentFullText === 'WELCOME TO' && !isDeleting;
  
  return (
    <motion.span
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className={textIndex === 1 ? 'text-[0.65em]' : ''}
    >
      {displayText}
    </motion.span>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const { mode } = useDayNight();
  const prefersReducedMotion = useReducedMotion();
  
  const { data: heroData, isLoading } = useHeroSection();
  
  const companyName = heroData?.company_name || 'AkashVahini';
  const tagline = heroData?.tagline || 'A New Era Begins';
  const mainHeading = heroData?.main_heading || 'A New Era of Aerial Innovation';
  const subHeading = heroData?.sub_heading || 'Where Intelligence Meets the Sky';
  const typewriterTexts = heroData?.typewriter_texts || ['AkashVahini', 'WELCOME TO'];
  const ctaButtonText = heroData?.cta_button_text || 'Discover Our Vision';
  const ctaButtonLink = heroData?.cta_button_link || '#about';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setScrollValue(v);
    });
    return () => unsubscribe();
  }, [scrollYProgress, prefersReducedMotion]);

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);

    if (prefersReducedMotion) {
      if (titleRef.current) titleRef.current.style.opacity = '1';
      if (subtitleRef.current) subtitleRef.current.style.opacity = '1';
      if (taglineRef.current) taglineRef.current.style.opacity = '1';
      return () => clearTimeout(timer);
    }

    if (titleRef.current && subtitleRef.current && taglineRef.current) {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(titleRef.current,
        { opacity: 1, duration: 0.1 }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '+=0.6'
      )
      .fromTo(taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );
    }

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTypewriter(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const springTransition = {
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 0.5
  };

  return (
    <motion.section
      id="hero"
      ref={sectionRef}
      style={prefersReducedMotion ? {} : { opacity, y, willChange: 'transform, opacity' }}
      className="relative min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[30%] sm:h-[35%]">
          <motion.svg
            className="absolute w-full h-full"
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: mode === 'day' ? 1 : 0.7 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <defs>
              <linearGradient id="heroWave1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={mode === 'day' ? "rgba(80, 180, 180, 0.6)" : "rgba(60, 120, 140, 0.5)"} />
                <stop offset="100%" stopColor={mode === 'day' ? "rgba(60, 160, 160, 0.4)" : "rgba(40, 100, 120, 0.3)"} />
              </linearGradient>
              <linearGradient id="heroWave2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={mode === 'day' ? "rgba(100, 200, 200, 0.7)" : "rgba(70, 130, 150, 0.6)"} />
                <stop offset="100%" stopColor={mode === 'day' ? "rgba(80, 180, 180, 0.5)" : "rgba(50, 110, 130, 0.4)"} />
              </linearGradient>
              <linearGradient id="heroWave3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={mode === 'day' ? "rgba(120, 210, 210, 0.8)" : "rgba(80, 140, 160, 0.7)"} />
                <stop offset="100%" stopColor={mode === 'day' ? "rgba(100, 190, 190, 0.6)" : "rgba(60, 120, 140, 0.5)"} />
              </linearGradient>
            </defs>
            
            <path
              d="M0,180 Q180,140 360,170 Q540,200 720,160 Q900,120 1080,150 Q1260,180 1440,140 L1440,400 L0,400 Z"
              fill="url(#heroWave1)"
            />
            
            <path
              d="M0,220 Q200,180 400,210 Q600,240 800,200 Q1000,160 1200,190 Q1400,220 1440,200 L1440,400 L0,400 Z"
              fill="url(#heroWave2)"
            />
            
            <path
              d="M0,280 Q150,250 300,270 Q450,290 600,260 Q750,230 900,260 Q1050,290 1200,260 Q1350,230 1440,260 L1440,400 L0,400 Z"
              fill="url(#heroWave3)"
            />
          </motion.svg>
        </div>
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-24 sm:pt-20 pb-28 sm:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-left space-y-4 sm:space-y-6 md:space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
                transition={prefersReducedMotion ? { duration: 0.1 } : { ...springTransition, delay: 0.1 }}
              >
                <span className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase rounded-full backdrop-blur-sm ${
                  mode === 'day' 
                    ? 'text-teal-700 border border-teal-500/40 bg-white/30' 
                    : 'text-cyan-300 border border-cyan-400/30 bg-white/5'
                }`}>
                  {tagline}
                </span>
              </motion.div>

              <motion.h1
                ref={titleRef}
                className="font-outfit text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] overflow-hidden min-h-[1.2em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: showTypewriter ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className={`block ${mode === 'day' ? 'text-gray-800' : 'text-white'}`}>
                  {prefersReducedMotion ? (
                    <span>{companyName}</span>
                  ) : showTypewriter ? (
                    <TypewriterTitle mode={mode} texts={typewriterTexts} />
                  ) : null}
                </span>
              </motion.h1>

              <p
                ref={subtitleRef}
                className={`text-base sm:text-xl md:text-2xl lg:text-3xl max-w-xl font-light tracking-wide leading-relaxed ${
                  mode === 'day' ? 'text-gray-700' : 'text-white/90'
                }`}
                style={{ opacity: 0 }}
              >
                {mainHeading}
              </p>

              <p
                ref={taglineRef}
                className={`text-sm sm:text-lg md:text-xl max-w-lg font-light tracking-wider ${
                  mode === 'day' ? 'text-teal-700/90' : 'text-cyan-300/80'
                }`}
                style={{ opacity: 0 }}
              >
                {subHeading}
              </p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={prefersReducedMotion ? { duration: 0.1 } : { duration: 0.6, delay: 1.5, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 pt-2 sm:pt-4"
              >
                <a
                  href={ctaButtonLink}
                  className={`group relative px-6 sm:px-8 py-3 sm:py-4 overflow-hidden rounded-full transition-all duration-300 shadow-lg text-center ${
                    mode === 'day' 
                      ? 'bg-teal-500 hover:bg-teal-400 hover:shadow-teal-500/30 active:bg-teal-600' 
                      : 'bg-cyan-400 hover:bg-cyan-300 hover:shadow-cyan-400/30 active:bg-cyan-500'
                  }`}
                >
                  <span className="relative z-10 text-gray-900 font-semibold tracking-wide text-sm sm:text-base">
                    {ctaButtonText}
                  </span>
                </a>

                <a
                  href="#team"
                  className={`group px-6 sm:px-8 py-3 sm:py-4 border-2 rounded-full transition-all duration-300 backdrop-blur-sm text-center ${
                    mode === 'day' 
                      ? 'border-gray-700/40 hover:border-gray-700/70 hover:bg-gray-900/10 text-gray-800 active:bg-gray-900/20' 
                      : 'border-white/40 hover:border-white/70 hover:bg-white/10 text-white active:bg-white/20'
                  }`}
                >
                  <span className="font-semibold tracking-wide text-sm sm:text-base">
                    Meet the Team
                  </span>
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9, x: isLoaded ? 0 : 30 }}
              transition={prefersReducedMotion ? { duration: 0.1 } : { duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="hidden md:flex items-center justify-center w-full h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]"
            >
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-full border-4 border-t-transparent animate-spin ${
                    mode === 'day' ? 'border-teal-500' : 'border-cyan-400'
                  }`} />
                </div>
              }>
                <RocketIllustration scrollProgress={scrollValue} />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <svg 
            width="20" 
            height="12" 
            viewBox="0 0 24 14" 
            fill="none" 
            className={`sm:w-6 sm:h-3.5 ${mode === 'day' ? 'text-gray-700/60' : 'text-white/60'}`}
          >
            <path 
              d="M2 2L12 12L22 2" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
