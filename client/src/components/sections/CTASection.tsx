import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const buttons = [
    {
      label: 'About Us',
      href: '#about',
      primary: false,
    },
    {
      label: 'Contact Team',
      href: 'mailto:info@akashvahini.com',
      primary: true,
    },
    {
      label: 'Join Our Journey',
      href: '#team',
      primary: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to explore the future?
          </h2>
          
          <p className="text-lg text-white/50 mb-12 max-w-2xl mx-auto">
            Join us on our mission to redefine what's possible in the skies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {buttons.map((button, index) => (
              <motion.a
                key={button.label}
                href={button.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-500 ${
                  button.primary
                    ? ''
                    : 'border border-white/20 hover:border-cyan-400/50 hover:bg-white/5'
                }`}
              >
                {button.primary && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                  </>
                )}
                <span className={`relative z-10 font-medium tracking-wide ${
                  button.primary 
                    ? 'text-white' 
                    : 'text-white/80 group-hover:text-cyan-400 transition-colors'
                }`}>
                  {button.label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
