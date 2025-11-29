import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scene3D } from './3d/Scene3D';
import { Navbar } from './ui/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { VisionSection } from './sections/VisionSection';
import { FounderSection } from './sections/FounderSection';
import { TeamSection } from './sections/TeamSection';
import { JourneySection } from './sections/JourneySection';
import { CTASection } from './sections/CTASection';
import { Footer } from './sections/Footer';
import { useTheme } from '../lib/stores/useTheme';

gsap.registerPlugin(ScrollTrigger);

export function LandingPage() {
  const { colors, theme } = useTheme();

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0.5 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      className="relative min-h-screen overflow-x-hidden transition-colors duration-300"
      style={{ 
        backgroundColor: colors.background,
        color: colors.text
      }}
    >
      {theme !== 'light' && <Scene3D />}
      
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <HeroSection />
          <AboutSection />
          <VisionSection />
          <FounderSection />
          <TeamSection />
          <JourneySection />
          <CTASection />
        </main>
        
        <Footer />
      </div>

      <div 
        className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-20"
        style={{
          background: `linear-gradient(to top, ${colors.background}, transparent)`
        }}
      />
    </div>
  );
}
