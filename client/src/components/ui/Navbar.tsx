import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeSelector } from './ThemeSelector';
import { useTheme } from '../../lib/stores/useTheme';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
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
            ? 'py-4 backdrop-blur-xl border-b' 
            : 'py-6 bg-transparent'
        }`}
        style={{
          backgroundColor: isScrolled ? `${colors.background}cc` : 'transparent',
          borderColor: isScrolled ? colors.border : 'transparent'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="font-outfit text-2xl font-bold gradient-text">
                AkashVahini
              </span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm hover:text-cyan-400 transition-colors duration-200 tracking-wide font-medium"
                  style={{ color: colors.textSecondary }}
                >
                  {link.label}
                </a>
              ))}
              <ThemeSelector />
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <ThemeSelector />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              >
                <motion.span
                  animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                  className="w-6 h-0.5 bg-white/80 rounded-full"
                />
                <motion.span
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  className="w-6 h-0.5 bg-white/80 rounded-full"
                />
                <motion.span
                  animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                  className="w-6 h-0.5 bg-white/80 rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative pt-24 px-6">
              <div className="flex flex-col items-center gap-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl text-white/80 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
