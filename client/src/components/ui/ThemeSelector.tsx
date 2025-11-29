import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, Sun, Moon, Sparkles, Waves, Sunset, TreeDeciduous } from 'lucide-react';
import { useTheme, ThemeType, themeNames, themes } from '../../lib/stores/useTheme';

const themeIcons: Record<ThemeType, React.ReactNode> = {
  dark: <Moon size={18} />,
  light: <Sun size={18} />,
  cyberpunk: <Sparkles size={18} />,
  ocean: <Waves size={18} />,
  sunset: <Sunset size={18} />,
  forest: <TreeDeciduous size={18} />,
};

export function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 text-white/60 hover:text-cyan-400 border border-white/10 hover:border-cyan-400/30"
        aria-label="Change theme"
      >
        <Palette size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-64 rounded-xl bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-3 border-b border-white/10">
                <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Select Theme</p>
              </div>
              
              <div className="p-2 space-y-1">
                {(Object.keys(themes) as ThemeType[]).map((themeKey) => (
                  <button
                    key={themeKey}
                    onClick={() => handleThemeChange(themeKey)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      theme === themeKey 
                        ? 'bg-cyan-500/20 text-cyan-400' 
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ 
                        background: `linear-gradient(135deg, ${themes[themeKey].primary}, ${themes[themeKey].secondary})`,
                        opacity: theme === themeKey ? 1 : 0.7
                      }}
                    >
                      {themeIcons[themeKey]}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{themeNames[themeKey]}</p>
                    </div>
                    {theme === themeKey && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-cyan-400"
                      >
                        <Check size={18} />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-3 border-t border-white/10 bg-white/5">
                <p className="text-xs text-white/40 text-center">Theme is saved automatically</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
