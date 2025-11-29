import { Suspense } from 'react';
import { LandingPage } from './components/LandingPage';

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
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LandingPage />
    </Suspense>
  );
}

export default App;
