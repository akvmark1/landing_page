import React, { useEffect, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SpaceBackgroundFull } from './3d/SpaceBackgroundFull';
import { Navbar } from './ui/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AeroAssistChatbot } from './AeroAssistChatbot';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = lazy(() => import('./sections/AboutSection').then(m => ({ default: m.AboutSection })));
const VisionSection = lazy(() => import('./sections/VisionSection').then(m => ({ default: m.VisionSection })));
const FounderSection = lazy(() => import('./sections/FounderSection').then(m => ({ default: m.FounderSection })));
const MentorSection = lazy(() => import('./sections/MentorSection').then(m => ({ default: m.MentorSection })));
const TeamSection = lazy(() => import('./sections/TeamSection').then(m => ({ default: m.TeamSection })));
const JourneySection = lazy(() => import('./sections/JourneySection').then(m => ({ default: m.JourneySection })));
const CTASection = lazy(() => import('./sections/CTASection').then(m => ({ default: m.CTASection })));
const SponsorsSection = lazy(() => import('./sections/SponsorsSection').then(m => ({ default: m.SponsorsSection })));
const Footer = lazy(() => import('./sections/Footer').then(m => ({ default: m.Footer })));

function SectionLoader() {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  );
}

export function LandingPage() {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const sections = document.querySelectorAll('section:not(:first-of-type)');
    
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0.8, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: prefersReducedMotion ? 0 : 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 95%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SpaceBackgroundFull />
      
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <HeroSection />
          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <VisionSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <FounderSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <MentorSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <TeamSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <JourneySection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <CTASection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <SponsorsSection />
          </Suspense>
        </main>
        
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </div>
      
      <AeroAssistChatbot />
    </div>
  );
}
