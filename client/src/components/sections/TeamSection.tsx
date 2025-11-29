import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import {
  CompassIcon,
  NeuralNetworkIcon,
  GearIcon,
  BrainWaveIcon,
  SignalPulseIcon,
  TimelineIcon,
  CameraIcon,
  DocumentIcon,
  CFOIcon,
  CircuitIcon
} from '../icons/RoleIcons';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  title: string;
  responsibility: string;
  philosophy: string;
  icon: React.ReactNode;
  color: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Akshaya',
    role: 'Founder & CEO',
    title: 'Chief Executive Officer',
    responsibility: 'Vision, Engineering Direction, System Architecture',
    philosophy: 'Building what others only imagine.',
    icon: <CompassIcon className="w-12 h-12" />,
    color: 'from-cyan-400 to-blue-500',
  },
  {
    id: 2,
    name: 'Shashank',
    role: 'Co-Founder & CTO',
    title: 'Chief Technology Officer',
    responsibility: 'Autonomy, AI Models, Mission Logic',
    philosophy: 'Teaching the sky to think.',
    icon: <NeuralNetworkIcon className="w-12 h-12" />,
    color: 'from-blue-400 to-purple-500',
  },
  {
    id: 3,
    name: 'CFO Advisor',
    role: 'CFO',
    title: 'Chief Financial Officer',
    responsibility: 'Financial Strategy & Compliance',
    philosophy: 'Numbers tell the story of possibilities.',
    icon: <CFOIcon className="w-12 h-12" />,
    color: 'from-green-400 to-cyan-500',
  },
  {
    id: 4,
    name: 'Purna',
    role: 'Hardware Lead',
    title: 'Head of Hardware Engineering',
    responsibility: 'Assembly, Integration, Flight Systems',
    philosophy: 'Precision in every circuit, excellence in every connection.',
    icon: <CircuitIcon className="w-12 h-12" />,
    color: 'from-orange-400 to-red-500',
  },
  {
    id: 5,
    name: 'Subham',
    role: 'Fabrication Lead',
    title: 'Head of Fabrication',
    responsibility: 'Precision Build, Material Engineering',
    philosophy: 'Perfection is in the details.',
    icon: <GearIcon className="w-12 h-12" />,
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 6,
    name: 'Biswa',
    role: 'IOT/Embedded Lead',
    title: 'Head of IoT & Embedded Systems',
    responsibility: 'Onboard Computing, Sensor Sync',
    philosophy: 'Machines speak — I listen.',
    icon: <SignalPulseIcon className="w-12 h-12" />,
    color: 'from-purple-400 to-pink-500',
  },
  {
    id: 7,
    name: 'OP',
    role: 'Operations Manager',
    title: 'Head of Operations',
    responsibility: 'Logistics, Field Testing, Resource Flow',
    philosophy: 'Execution is everything.',
    icon: <TimelineIcon className="w-12 h-12" />,
    color: 'from-cyan-400 to-teal-500',
  },
  {
    id: 8,
    name: 'Amit',
    role: 'Media & Comms',
    title: 'Head of Media & Communications',
    responsibility: 'Visual Storytelling, Content, Public Image',
    philosophy: 'Every frame tells a story.',
    icon: <CameraIcon className="w-12 h-12" />,
    color: 'from-pink-400 to-rose-500',
  },
  {
    id: 9,
    name: 'Jeet',
    role: 'Documentation & Research',
    title: 'Head of Documentation',
    responsibility: 'Standards, Reporting, Compliance Papers',
    philosophy: 'Knowledge preserved is wisdom multiplied.',
    icon: <DocumentIcon className="w-12 h-12" />,
    color: 'from-indigo-400 to-blue-500',
  },
];

interface TeamCardProps {
  member: TeamMember;
  index: number;
  isInView: boolean;
}

function TeamCard({ member, index, isInView, onClick }: TeamCardProps & { onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="relative gpu-accelerate"
      style={{ zIndex: isHovered ? 100 : 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div 
        className={`relative h-[280px] rounded-2xl overflow-hidden glass-effect cursor-pointer smooth-hover ${
          isHovered ? 'scale-105 -translate-y-3' : 'scale-100 translate-y-0'
        }`}
        style={{
          boxShadow: isHovered 
            ? `0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 30px rgba(6, 182, 212, 0.25)` 
            : '0 4px 20px rgba(0, 0, 0, 0.3)',
          transform: `translateZ(0) ${isHovered ? 'scale(1.05) translateY(-12px)' : 'scale(1) translateY(0)'}`
        }}
      >
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${member.color} transition-opacity duration-300`}
          style={{ opacity: isHovered ? 0.15 : 0 }}
        />
        
        <div 
          className={`absolute inset-0 border-2 rounded-2xl pointer-events-none transition-colors duration-300`}
          style={{ 
            borderColor: isHovered ? 'rgba(6, 182, 212, 0.5)' : 'rgba(255, 255, 255, 0.05)'
          }}
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-5">
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-400`}
            style={{ 
              transform: `scale(${isHovered ? 1.4 : 1})`,
              opacity: isHovered ? 0.3 : 0.2
            }}
          >
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${member.color} blur-2xl`} />
          </div>

          <div
            className={`relative z-10 text-cyan-400 mb-3 transition-all duration-300`}
            style={{ 
              opacity: isHovered ? 0.3 : 1, 
              transform: `scale(${isHovered ? 0.7 : 1}) translateY(${isHovered ? -8 : 0}px)`
            }}
          >
            {member.icon}
          </div>

          <div
            className="relative z-10 text-center transition-transform duration-300"
            style={{ transform: `translateY(${isHovered ? -12 : 0}px)` }}
          >
            <div
              className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center transition-all duration-300"
              style={{ 
                transform: `scale(${isHovered ? 0.9 : 1})`,
                borderColor: isHovered ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            >
              <span className="text-xl font-bold gradient-text">
                {member.name.charAt(0)}
              </span>
            </div>

            <h3 
              className="text-lg font-semibold mb-1 transition-colors duration-300"
              style={{ color: isHovered ? '#22d3ee' : '#ffffff' }}
            >
              {member.name}
            </h3>
            
            <p className={`text-xs bg-gradient-to-r ${member.color} bg-clip-text text-transparent font-medium mb-1`}>
              {member.role}
            </p>
            
            <p 
              className="text-xs text-white/40 leading-relaxed transition-all duration-200"
              style={{ 
                opacity: isHovered ? 0 : 1, 
                transform: `translateY(${isHovered ? -8 : 0}px)`
              }}
            >
              {member.responsibility}
            </p>
          </div>
        </div>

        <div 
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${member.color} transition-transform duration-400`}
          style={{ 
            transform: `scaleX(${isHovered ? 1 : 0})`,
            transformOrigin: 'left'
          }}
        />
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ 
                duration: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="absolute bottom-3 left-3 right-3 z-30"
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br from-black/95 to-black/90 backdrop-blur-xl border border-cyan-500/50 shadow-2xl`}>
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${member.color} animate-pulse`} />
                  <p className="text-xs text-cyan-400 tracking-wider uppercase font-semibold">Click to view profile</p>
                </div>
                <p className="text-sm text-white/90 italic leading-relaxed">"{member.philosophy}"</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export { teamMembers };

export function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [, setLocation] = useLocation();

  const handleMemberClick = (memberId: number) => {
    setLocation(`/team/${memberId}`);
  };

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-32 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm tracking-[0.3em] uppercase mb-4 block">
            The Team
          </span>
          <h2 className="section-title font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            The Minds Behind <span className="gradient-text">AkashVahini</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            A Collective of Engineers, Dreamers and Builders
          </p>
        </motion.div>

        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-xs text-cyan-400/60 tracking-[0.2em] uppercase mb-8"
          >
            Leadership
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.slice(0, 3).map((member, index) => (
              <TeamCard 
                key={member.id} 
                member={member} 
                index={index} 
                isInView={isInView} 
                onClick={() => handleMemberClick(member.id)}
              />
            ))}
          </div>
        </div>

        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-xs text-blue-400/60 tracking-[0.2em] uppercase mb-8"
          >
            Core Engineering
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.slice(3, 6).map((member, index) => (
              <TeamCard 
                key={member.id} 
                member={member} 
                index={index + 3} 
                isInView={isInView}
                onClick={() => handleMemberClick(member.id)}
              />
            ))}
          </div>
        </div>

        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-xs text-purple-400/60 tracking-[0.2em] uppercase mb-8"
          >
            Operations & Creative
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.slice(6, 9).map((member, index) => (
              <TeamCard 
                key={member.id} 
                member={member} 
                index={index + 6} 
                isInView={isInView}
                onClick={() => handleMemberClick(member.id)}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-block px-8 py-4 rounded-full glass-effect border border-white/5">
            <p className="text-sm text-white/40 tracking-wider">
              <span className="text-cyan-400">AkashVahini Private Limited</span>
              <span className="mx-3">•</span>
              Incorporated in India
              <span className="mx-3">•</span>
              <span className="text-white/60">Engineering the Next Aerial Evolution</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
