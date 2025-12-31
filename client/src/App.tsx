import React, { Suspense, lazy, memo } from 'react';
import { Route, Switch } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { LandingPage } from './components/LandingPage';
import { TeamMemberPortfolio } from './pages/TeamMemberPortfolio';
import { ComingSoon } from './pages/ComingSoon';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { Toaster } from 'sonner';

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const HeroAdmin = lazy(() => import('./pages/admin/HeroAdmin').then(m => ({ default: m.HeroAdmin })));
const AboutAdmin = lazy(() => import('./pages/admin/AboutAdmin').then(m => ({ default: m.AboutAdmin })));
const MentorsAdmin = lazy(() => import('./pages/admin/MentorsAdmin').then(m => ({ default: m.MentorsAdmin })));
const TeamAdmin = lazy(() => import('./pages/admin/TeamAdmin').then(m => ({ default: m.TeamAdmin })));
const ContactAdmin = lazy(() => import('./pages/admin/ContactAdmin').then(m => ({ default: m.ContactAdmin })));
const FooterAdmin = lazy(() => import('./pages/admin/FooterAdmin').then(m => ({ default: m.FooterAdmin })));
const EmailsAdmin = lazy(() => import('./pages/admin/EmailsAdmin').then(m => ({ default: m.EmailsAdmin })));

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8 will-change-transform">
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

const MemoizedLoadingScreen = memo(LoadingScreen);

function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <>
      <Suspense fallback={<MemoizedLoadingScreen />}>
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/">
              {() => (
                <PageTransitionWrapper>
                  <LandingPage />
                </PageTransitionWrapper>
              )}
            </Route>
            <Route path="/coming-soon">
              {() => (
                <PageTransitionWrapper>
                  <ComingSoon />
                </PageTransitionWrapper>
              )}
            </Route>
            <Route path="/privacy-policy">
              {() => (
                <PageTransitionWrapper>
                  <PrivacyPolicy />
                </PageTransitionWrapper>
              )}
            </Route>
            <Route path="/team/:id">
              {({ id }) => (
                <PageTransitionWrapper>
                  <TeamMemberPortfolio id={id} />
                </PageTransitionWrapper>
              )}
            </Route>
            
            <Route path="/admin/login">
              {() => (
                <PageTransitionWrapper>
                  <Suspense fallback={<MemoizedLoadingScreen />}>
                    <AdminLogin />
                  </Suspense>
                </PageTransitionWrapper>
              )}
            </Route>
            <Route path="/admin">
              {() => (
                <PageTransitionWrapper>
                  <Suspense fallback={<MemoizedLoadingScreen />}>
                    <AdminDashboard />
                  </Suspense>
                </PageTransitionWrapper>
              )}
            </Route>
            <Route path="/admin/hero">
              {() => (
                <PageTransitionWrapper>
                  <Suspense fallback={<MemoizedLoadingScreen />}>
                    <HeroAdmin />
                  </Suspense>
                </PageTransitionWrapper>
              )}
            </Route>
            <Route path="/admin/about">
              {() => (
                <PageTransitionWrapper>
                  <Suspense fallback={<MemoizedLoadingScreen />}>
                    <AboutAdmin />
                  </Suspense>
                </PageTransitionWrapper>
              )}
            </Route>
            <Route path="/admin/mentors">
              {() => (
                <PageTransitionWrapper>
                  <Suspense fallback={<MemoizedLoadingScreen />}>
                    <MentorsAdmin />
                  </Suspense>
                </PageTransitionWrapper>
              )}
            </Route>
            <Route path="/admin/team">
              {() => (
                <PageTransitionWrapper>
                  <Suspense fallback={<MemoizedLoadingScreen />}>
                    <TeamAdmin />
                  </Suspense>
                </PageTransitionWrapper>
              )}
            </Route>
            <Route path="/admin/contact">
              {() => (
                <PageTransitionWrapper>
                  <Suspense fallback={<MemoizedLoadingScreen />}>
                    <ContactAdmin />
                  </Suspense>
                </PageTransitionWrapper>
              )}
            </Route>
            <Route path="/admin/footer">
              {() => (
                <PageTransitionWrapper>
                  <Suspense fallback={<MemoizedLoadingScreen />}>
                    <FooterAdmin />
                  </Suspense>
                </PageTransitionWrapper>
              )}
            </Route>
            <Route path="/admin/emails">
              {() => (
                <PageTransitionWrapper>
                  <Suspense fallback={<MemoizedLoadingScreen />}>
                    <EmailsAdmin />
                  </Suspense>
                </PageTransitionWrapper>
              )}
            </Route>
            
            <Route>
              <PageTransitionWrapper>
                <div className="min-h-screen bg-black flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">404</h1>
                    <p className="text-white/60 mb-6">Page not found</p>
                    <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      Go back home
                    </a>
                  </div>
                </div>
              </PageTransitionWrapper>
            </Route>
          </Switch>
        </AnimatePresence>
        <PWAInstallPrompt />
      </Suspense>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
          },
        }}
      />
    </>
  );
}

export default App;
