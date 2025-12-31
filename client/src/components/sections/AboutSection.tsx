import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLocation } from 'wouter';
import { useAboutSection } from '../../hooks/useLandingData';

const iconMap: { [key: string]: React.ReactNode } = {
  'precision': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
    </svg>
  ),
  'safety': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  'future-thinking': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  'engineering-excellence': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  'default': (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
};

const defaultValues = [
  {
    title: 'Precision',
    description: 'Every detail matters in our pursuit of engineering excellence',
    icon_name: 'precision',
  },
  {
    title: 'Safety',
    description: 'Unwavering commitment to safety in everything we create',
    icon_name: 'safety',
  },
  {
    title: 'Future-thinking',
    description: 'Building tomorrow\'s solutions with today\'s innovations',
    icon_name: 'future-thinking',
  },
  {
    title: 'Engineering Excellence',
    description: 'Pushing boundaries with world-class engineering',
    icon_name: 'engineering-excellence',
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [, setLocation] = useLocation();
  
  const { data: aboutData, values: aboutValues, isLoading } = useAboutSection();
  
  const sectionLabel = aboutData?.section_label || 'Who We Are';
  const title = aboutData?.title || 'About';
  const titleHighlight = aboutData?.title_highlight || 'AkashVahini';
  const description = aboutData?.description || 'AkashVahini is a next-generation aerospace innovation initiative focused on building intelligent, future-ready aerial systems. We combine engineering, research and purposeful design to push what\'s possible in the skies.';
  
  const values = aboutValues.length > 0 ? aboutValues : defaultValues;

  const handleValueClick = () => {
    setLocation('/coming-soon');
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-4"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <span className="text-cyan-300 text-sm tracking-[0.3em] uppercase mb-4 block">
            {sectionLabel}
          </span>
          <h2 className="section-title font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            {title} <span className="text-cyan-400">{titleHighlight}</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * index, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative p-8 rounded-2xl cursor-pointer glass-effect hover:border-cyan-400/40 transition-all duration-400"
              style={{ willChange: 'transform, opacity' }}
              onClick={handleValueClick}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/30 to-purple-600/30 flex items-center justify-center mb-6 text-cyan-300 group-hover:scale-110 transition-transform duration-400 ease-out">
                  {iconMap[value.icon_name] || iconMap['default']}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {value.title}
                </h3>
                
                <p className="text-white/60 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
