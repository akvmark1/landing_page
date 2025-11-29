import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const journeyMilestones = [
  {
    year: '2023',
    title: 'The Spark',
    description: 'A vision was born to revolutionize aerial technology',
    icon: '💡',
  },
  {
    year: '2024',
    title: 'Team Assembly',
    description: 'Brilliant minds united under one mission',
    icon: '🤝',
  },
  {
    year: '2024',
    title: 'First Prototype',
    description: 'From concept to reality - our first flight',
    icon: '🚀',
  },
  {
    year: '2025',
    title: 'The Future',
    description: 'Scaling new heights, redefining possibilities',
    icon: '🌟',
  },
];

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
      className="relative py-32 px-4 overflow-hidden"
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
        className="relative z-10 max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400/60 text-sm tracking-[0.3em] uppercase mb-4 block">
            Our Startup Journey
          </span>

          <h2 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            From Vision to <span className="gradient-text">Reality</span>
          </h2>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
            Every great journey begins with a single step. Here's ours.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-purple-500/50 hidden md:block" />
          
          <div className="space-y-12 md:space-y-0">
            {journeyMilestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                className={`relative md:flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } md:mb-16`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-2xl glass-effect border border-white/5 hover:border-cyan-400/30 transition-all duration-500"
                  >
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      <span className="text-3xl">{milestone.icon}</span>
                      <span className="text-cyan-400 font-semibold text-lg">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-white/50">{milestone.description}</p>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 border-4 border-black z-10"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />
                
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 blur-xl opacity-50" />
            <div className="relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full">
              <span className="text-white font-semibold tracking-wide">
                Nine people. One vision. A sky transformed.
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
