import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function FounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 rounded-full border border-cyan-400/15 animate-pulse-glow" />
          <div className="absolute inset-8 rounded-full border border-purple-400/15 animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
          <div className="absolute inset-16 rounded-full border border-cyan-400/15 animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-300 text-sm tracking-[0.3em] uppercase mb-6 block">
            From the Founders
          </span>

          <div className="relative mb-12">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-8xl text-cyan-400/15 font-serif">"</div>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-white/95 leading-relaxed mb-6">
              AkashVahini is not just a project.
            </p>
            
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
              It is a vision created with curiosity, discipline and an obsession 
              for solving real-world challenges through engineering.
            </p>
            
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              Every line of code, every research paper and every design sketch 
              reflects our commitment to shaping a 
              <span className="text-cyan-400"> smarter aerial future</span>.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-400/50" />
              <span className="text-white/50 text-sm tracking-wider">The Founding Team</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-400/50" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
