import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);

    if (titleRef.current && subtitleRef.current && taglineRef.current) {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power4.out' }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(taglineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity, scale, y }}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-radial from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl animate-pulse-glow" />
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isLoaded ? 0.6 : 0, scale: isLoaded ? 1 : 0.5 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-2 text-xs font-medium tracking-[0.3em] uppercase text-cyan-400/80 border border-cyan-500/20 rounded-full backdrop-blur-sm">
            A New Era Begins
          </span>
        </motion.div>

        <h1
          ref={titleRef}
          className="hero-title font-outfit text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight"
          style={{ opacity: 0 }}
        >
          <span className="block gradient-text text-glow">AkashVahini</span>
        </h1>

        <p
          ref={subtitleRef}
          className="font-space text-xl md:text-2xl lg:text-3xl text-white/80 mb-8 tracking-wide"
          style={{ opacity: 0 }}
        >
          A New Era of Aerial Innovation
        </p>

        <p
          ref={taglineRef}
          className="text-lg md:text-xl text-cyan-400/70 font-light tracking-wider max-w-2xl mx-auto"
          style={{ opacity: 0 }}
        >
          Where Intelligence Meets the Sky
        </p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#about"
            className="group relative px-8 py-4 overflow-hidden rounded-full transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
            <span className="relative z-10 text-white font-medium tracking-wide">
              Discover Our Vision
            </span>
          </a>

          <a
            href="#team"
            className="group px-8 py-4 border border-white/20 rounded-full hover:border-cyan-400/50 transition-all duration-500 hover:bg-white/5"
          >
            <span className="text-white/80 group-hover:text-cyan-400 font-medium tracking-wide transition-colors">
              Meet the Team
            </span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/40 tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-3 bg-cyan-400 rounded-full"
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
