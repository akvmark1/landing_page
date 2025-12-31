import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export function SponsorsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const sponsors = [
    {
      id: 1,
      name: 'FTBI',
      logo: '/sponsors/sponsor1.png',
      alt: 'FTBI Logo',
      url: 'https://www.ftbi-nitrkl.org/fab-lab'
    },
    {
      id: 2,
      name: 'NIT Rourkela',
      logo: '/sponsors/sponsor2.png',
      alt: 'NIT Rourkela Logo',
      url: 'https://www.nitrkl.ac.in/'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section ref={ref} className="relative py-20 px-4 md:px-8">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Section Title */}
          <div className="text-center mb-20">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Our Sponsors
              </span>
            </motion.h2>
            <motion.p
              className="text-lg text-white/60 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Proud partners in innovation and excellence
            </motion.p>
          </div>

          {/* Sponsors Grid - Clean with hover effect only */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center justify-center">
            {sponsors.map((sponsor) => (
              <motion.a
                key={sponsor.id}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="flex items-center justify-center group cursor-pointer"
              >
                <motion.img
                  src={sponsor.logo}
                  alt={sponsor.alt}
                  className="h-48 w-48 md:h-56 md:w-56 object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]"
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
