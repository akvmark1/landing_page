import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export function VisionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: parallaxY }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
        >
          <div className="w-full h-full bg-gradient-radial from-purple-500/15 via-cyan-500/10 to-transparent blur-3xl" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-24"
        >
          <span className="text-cyan-300 text-sm tracking-[0.3em] uppercase mb-4 block">
            Our Vision
          </span>
          <h2 className="section-title font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            To create intelligent aerial solutions that 
            <span className="text-cyan-400"> redefine </span>
            how the world observes, responds and evolves.
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-24"
        >
          <span className="text-purple-300 text-sm tracking-[0.3em] uppercase mb-4 block">
            Our Mission
          </span>
          <h2 className="section-title font-outfit text-3xl md:text-4xl lg:text-5xl font-semibold text-white/90 mb-8 leading-tight">
            To engineer advanced airborne systems that deliver 
            <span className="text-cyan-400"> clarity</span>, 
            <span className="text-purple-400"> speed</span> and 
            <span className="text-cyan-300"> insight</span> to the world below.
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative p-8 md:p-12 rounded-3xl glass-effect-strong"
        >
          <div className="absolute -top-4 -left-4 text-6xl text-cyan-400/30 font-serif">"</div>
          <div className="absolute -bottom-4 -right-4 text-6xl text-cyan-400/30 font-serif rotate-180">"</div>
          
          <span className="text-cyan-300/80 text-sm tracking-[0.3em] uppercase mb-6 block">
            The AkashVahini Philosophy
          </span>
          
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
            We believe the sky is more than empty space.
          </p>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
            It is a <span className="text-cyan-400">network</span>. 
            A <span className="text-purple-400">guardian</span>. 
            A <span className="text-cyan-300">perspective</span>. 
            A <span className="text-white">future waiting to be built</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
