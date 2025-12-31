import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const journeyMilestones = [
  {
    date: 'Feb 2025',
    title: 'The Beginning',
    description: 'AkashVahini was founded with a vision to revolutionize aerial technology',
    status: 'completed',
    commits: 1,
  },
  {
    date: 'Mar 2025',
    title: 'Team Formation',
    description: 'Core team of 9 brilliant minds assembled across engineering, operations & media',
    status: 'completed',
    commits: 9,
  },
  {
    date: 'Apr - Jul 2025',
    title: 'Research Phase',
    description: 'Deep dive into autonomous systems, flight dynamics & material science',
    status: 'completed',
    commits: 47,
  },
  {
    date: 'Aug - Oct 2025',
    title: 'Development',
    description: 'Building prototypes, testing components & iterating on designs',
    status: 'completed',
    commits: 128,
  },
  {
    date: 'Nov 2025',
    title: 'Current Phase',
    description: 'Ongoing research, system integration & preparing for next milestones',
    status: 'in_progress',
    commits: 56,
  },
];

export function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-32 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="text-cyan-300/80 text-sm tracking-[0.3em] uppercase mb-4 block">
            Our Startup Journey
          </span>

          <h2 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Building the <span className="text-cyan-400">Future</span>
          </h2>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            From inception to innovation - our timeline of progress
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[31px] md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400/80 via-purple-400/50 to-transparent" />
          
          <div className="space-y-0">
            {journeyMilestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative flex items-start gap-6 md:gap-0"
              >
                <div className="hidden md:block md:w-1/2 md:pr-12">
                  {index % 2 === 0 && (
                    <motion.div
                      whileHover={{ scale: 1.02, x: -5 }}
                      className="ml-auto max-w-md text-right"
                    >
                      <div className={`p-5 rounded-xl transition-all duration-300 ${
                        milestone.status === 'in_progress' 
                          ? 'glass-effect border-cyan-400/40 shadow-lg shadow-cyan-500/10' 
                          : 'glass-effect hover:border-cyan-400/30'
                      }`}>
                        <div className="flex items-center justify-end gap-3 mb-2">
                          <span className={`text-sm font-mono ${
                            milestone.status === 'in_progress' ? 'text-cyan-400' : 'text-white/70'
                          }`}>
                            {milestone.date}
                          </span>
                          {milestone.status === 'in_progress' && (
                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                              <span className="text-xs text-cyan-400 font-medium">Active</span>
                            </span>
                          )}
                        </div>
                        <h3 className={`text-lg font-semibold mb-1 ${
                          milestone.status === 'in_progress' ? 'text-cyan-400' : 'text-white'
                        }`}>
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-white/60 mb-3">{milestone.description}</p>
                        <div className="flex items-center justify-end gap-2 text-xs text-white/40">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M10.68 4.32a.75.75 0 0 0-1.36 0L8 6.84l-1.32-2.52a.75.75 0 0 0-1.36 0L3.92 7.2H2.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .68-.42L6 6.12l1.32 2.52a.75.75 0 0 0 1.36 0l1.32-2.52 1.07 2.16a.75.75 0 0 0 .68.42h1.5a.75.75 0 0 0 0-1.5h-1.17l-1.4-2.88Z"/>
                          </svg>
                          <span>{milestone.commits} contributions</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="absolute left-[24px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                  <motion.div 
                    className={`w-4 h-4 rounded-full border-2 ${
                      milestone.status === 'in_progress'
                        ? 'bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50'
                        : 'bg-purple-900/50 border-cyan-400/60'
                    }`}
                    animate={milestone.status === 'in_progress' ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                <div className="hidden md:block md:w-1/2 md:pl-12">
                  {index % 2 !== 0 && (
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="max-w-md"
                    >
                      <div className={`p-5 rounded-xl transition-all duration-300 ${
                        milestone.status === 'in_progress' 
                          ? 'glass-effect border-cyan-400/40 shadow-lg shadow-cyan-500/10' 
                          : 'glass-effect hover:border-cyan-400/30'
                      }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-sm font-mono ${
                            milestone.status === 'in_progress' ? 'text-cyan-400' : 'text-white/70'
                          }`}>
                            {milestone.date}
                          </span>
                          {milestone.status === 'in_progress' && (
                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                              <span className="text-xs text-cyan-400 font-medium">Active</span>
                            </span>
                          )}
                        </div>
                        <h3 className={`text-lg font-semibold mb-1 ${
                          milestone.status === 'in_progress' ? 'text-cyan-400' : 'text-white'
                        }`}>
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-white/60 mb-3">{milestone.description}</p>
                        <div className="flex items-center gap-2 text-xs text-white/40">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M10.68 4.32a.75.75 0 0 0-1.36 0L8 6.84l-1.32-2.52a.75.75 0 0 0-1.36 0L3.92 7.2H2.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .68-.42L6 6.12l1.32 2.52a.75.75 0 0 0 1.36 0l1.32-2.52 1.07 2.16a.75.75 0 0 0 .68.42h1.5a.75.75 0 0 0 0-1.5h-1.17l-1.4-2.88Z"/>
                          </svg>
                          <span>{milestone.commits} contributions</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="md:hidden pl-8 pb-8 flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`p-5 rounded-xl transition-all duration-300 ${
                      milestone.status === 'in_progress' 
                        ? 'glass-effect border-cyan-400/40 shadow-lg shadow-cyan-500/10' 
                        : 'glass-effect'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-sm font-mono ${
                        milestone.status === 'in_progress' ? 'text-cyan-400' : 'text-white/70'
                      }`}>
                        {milestone.date}
                      </span>
                      {milestone.status === 'in_progress' && (
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          <span className="text-xs text-cyan-400 font-medium">Active</span>
                        </span>
                      )}
                    </div>
                    <h3 className={`text-lg font-semibold mb-1 ${
                      milestone.status === 'in_progress' ? 'text-cyan-400' : 'text-white'
                    }`}>
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-3">{milestone.description}</p>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M10.68 4.32a.75.75 0 0 0-1.36 0L8 6.84l-1.32-2.52a.75.75 0 0 0-1.36 0L3.92 7.2H2.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .68-.42L6 6.12l1.32 2.52a.75.75 0 0 0 1.36 0l1.32-2.52 1.07 2.16a.75.75 0 0 0 .68.42h1.5a.75.75 0 0 0 0-1.5h-1.17l-1.4-2.88Z"/>
                      </svg>
                      <span>{milestone.commits} contributions</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mt-20"
        >
          <a 
            href="#team"
            className="inline-flex items-center gap-4 px-6 py-3 rounded-full glass-effect hover:border-cyan-400/30 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex -space-x-2">
              {['A', 'S', 'P', 'B'].map((letter, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center border-2 border-purple-900/50 text-xs font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  {letter}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border-2 border-purple-900/50 text-xs font-medium text-white/70 group-hover:bg-white/20 transition-colors duration-300">
                +5
              </div>
            </div>
            <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">
              <span className="text-cyan-400 font-semibold">9 members</span> building the future
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
