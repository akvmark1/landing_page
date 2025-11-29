import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative py-40 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        <motion.div
          style={{ scale }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]"
        >
          <div className="absolute inset-0 rounded-full border border-cyan-500/10" />
          <div className="absolute inset-10 rounded-full border border-blue-500/10" />
          <div className="absolute inset-20 rounded-full border border-cyan-500/5" />
          <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <span className="text-cyan-400/60 text-sm tracking-[0.3em] uppercase mb-8 block">
            The Journey Begins
          </span>

          <h2 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            This is just the beginning.
          </h2>

          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white/60 mb-12">
            The sky will never be the same again.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 blur-xl opacity-50" />
              <div className="relative px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full">
                <span className="text-white font-semibold tracking-wide text-lg">
                  Nine people. One vision. A sky transformed.
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
