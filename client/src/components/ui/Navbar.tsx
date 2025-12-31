import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayNightToggle } from './DayNightToggle';
import { X } from 'lucide-react';
import { useMentors } from '../../hooks/useLandingData';

function AnimatedHamburger({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors relative md:hidden"
      aria-label="Toggle menu"
    >
      <div className="w-6 h-5 flex flex-col justify-between items-center relative">
        <motion.span
          className="w-full h-0.5 bg-current rounded-full origin-left"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : 0,
            width: isOpen ? '100%' : '100%',
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          className="w-full h-0.5 bg-current rounded-full"
          animate={{
            opacity: isOpen ? 0 : 1,
            scaleX: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          className="w-full h-0.5 bg-current rounded-full origin-left"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 0,
            width: isOpen ? '100%' : '100%',
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </button>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: mentors } = useMentors();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Main', href: '/coming-soon' },
    { label: 'About', href: '#about' },
    ...(mentors.length > 0 ? [{ label: 'Mentors', href: '#mentors' }] : []),
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: 'mailto:info@akashvahini.com' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-3 backdrop-blur-xl' 
            : 'py-5'
        }`}
        style={{
          backgroundColor: isScrolled ? 'rgba(26, 26, 78, 0.9)' : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AnimatedHamburger 
                isOpen={isMobileMenuOpen} 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              />
              
              <a href="/" className="flex items-center gap-2">
                <span className="font-outfit text-lg sm:text-xl font-semibold text-white tracking-wide uppercase">
                  AkashVahini
                </span>
              </a>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200 tracking-wide font-medium uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center">
              <DayNightToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 backdrop-blur-xl"
              style={{ backgroundColor: 'rgba(26, 26, 78, 0.95)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white z-50"
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <div className="relative pt-24 px-8 h-full overflow-y-auto">
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-outfit font-semibold text-white/90 hover:text-cyan-400 transition-colors tracking-wide"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <p className="text-white/50 text-sm mb-4">Contact Us</p>
                <a 
                  href="mailto:info@akashvahini.com" 
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  info@akashvahini.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
