import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="relative py-16 px-4 border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[200px] bg-gradient-radial from-cyan-500/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="font-outfit text-2xl font-bold gradient-text mb-2">
              AkashVahini
            </h3>
            <p className="text-xs text-white/30 tracking-widest uppercase">
              Private Limited
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-8"
          >
            <a 
              href="#about" 
              className="text-sm text-white/40 hover:text-cyan-400 transition-colors"
            >
              About
            </a>
            <span className="text-white/20">•</span>
            <a 
              href="#team" 
              className="text-sm text-white/40 hover:text-cyan-400 transition-colors"
            >
              Team
            </a>
            <span className="text-white/20">•</span>
            <a 
              href="mailto:info@akashvahini.com" 
              className="text-sm text-white/40 hover:text-cyan-400 transition-colors"
            >
              Contact
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <p className="text-sm text-white/30 mb-2">
              Incorporated in India
            </p>
            <p className="text-xs text-white/20">
              Engineering the Next Aerial Evolution
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-white/5 w-full"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/20">
                © {new Date().getFullYear()} AkashVahini. All rights reserved.
              </p>
              <a 
                href="mailto:info@akashvahini.com"
                className="text-xs text-white/30 hover:text-cyan-400 transition-colors"
              >
                info@akashvahini.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
