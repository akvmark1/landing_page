import { Suspense, useEffect, useState } from 'react';
import { Route, Switch } from 'wouter';
import { LandingPage } from './components/LandingPage';
import { TeamMemberPortfolio } from './pages/TeamMemberPortfolio';
import { ComingSoon } from './pages/ComingSoon';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-16 h-16 border-2 border-cyan-500/30 rounded-full animate-ping absolute inset-0" />
          <div className="w-16 h-16 border-2 border-t-cyan-500 rounded-full animate-spin" />
        </div>
        <p className="text-cyan-400/80 text-sm tracking-widest uppercase animate-pulse">
          Loading Experience
        </p>
      </div>
    </div>
  );
}

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#ffffff';
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/coming-soon" component={ComingSoon} />
        <Route path="/team/:id" component={TeamMemberPortfolio} />
        <Route>
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">404</h1>
              <p className="text-white/60 mb-6">Page not found</p>
              <a href="/" className="text-cyan-400 hover:text-cyan-300">
                Go back home
              </a>
            </div>
          </div>
        </Route>
      </Switch>
      <PWAInstallPrompt />
    </Suspense>
  );
}

export default App;
