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

gsap.registerPlugin(ScrollTrigger);

export function LandingPage() {
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0.3 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Scene3D />
      
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

      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </div>
  );
}
