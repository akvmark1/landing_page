import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Smartphone, Monitor, Apple } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

type Platform = 'android' | 'ios' | 'windows' | 'macos' | 'unknown';

function detectPlatform(): Platform {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  }
  if (/android/.test(userAgent)) {
    return 'android';
  }
  if (/win/.test(userAgent)) {
    return 'windows';
  }
  if (/mac/.test(userAgent)) {
    return 'macos';
  }
  return 'unknown';
}

function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://');
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [platform, setPlatform] = useState<Platform>('unknown');
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const detectedPlatform = detectPlatform();
    setPlatform(detectedPlatform);

    if (isStandalone()) {
      setIsInstalled(true);
      return;
    }

    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        return;
      }
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowPrompt(true), 3000);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (detectedPlatform === 'ios' && !isStandalone()) {
      setTimeout(() => setShowPrompt(true), 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (platform === 'ios') {
      setShowIOSInstructions(true);
      return;
    }

    if (!deferredPrompt) {
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Install error:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSInstructions(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case 'android':
        return <Smartphone className="w-6 h-6" />;
      case 'ios':
        return <Apple className="w-6 h-6" />;
      case 'windows':
      case 'macos':
        return <Monitor className="w-6 h-6" />;
      default:
        return <Download className="w-6 h-6" />;
    }
  };

  const getPlatformText = () => {
    switch (platform) {
      case 'android':
        return 'Install Android App';
      case 'ios':
        return 'Add to Home Screen';
      case 'windows':
        return 'Install Windows App';
      case 'macos':
        return 'Install Mac App';
      default:
        return 'Install App';
    }
  };

  if (isInstalled || (!showPrompt && !showIOSInstructions)) {
    return null;
  }

  return (
    <AnimatePresence>
      {(showPrompt || showIOSInstructions) && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
        >
          <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5" />
            
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>

            <div className="relative p-5">
              {showIOSInstructions ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Apple className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Install on iOS</h3>
                      <p className="text-white/60 text-sm">Follow these steps</p>
                    </div>
                  </div>

                  <ol className="space-y-3 text-white/80 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                      <span>Tap the <strong className="text-cyan-400">Share</strong> button at the bottom of Safari</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                      <span>Scroll down and tap <strong className="text-cyan-400">Add to Home Screen</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                      <span>Tap <strong className="text-cyan-400">Add</strong> to install the app</span>
                    </li>
                  </ol>

                  <button
                    onClick={handleDismiss}
                    className="w-full py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                  >
                    Got it
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      {getPlatformIcon()}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">AkashVahini</h3>
                      <p className="text-white/60 text-sm">Install for the best experience</p>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm">
                    Get quick access, offline support, and a native app experience on your {platform === 'android' ? 'phone' : platform === 'ios' ? 'iPhone' : 'device'}.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={handleDismiss}
                      className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                    >
                      Not Now
                    </button>
                    <button
                      onClick={handleInstall}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      {getPlatformText()}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
