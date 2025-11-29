import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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

interface TeamMember {
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

function TeamCard({ member, index, isInView }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
      style={{ zIndex: isHovered ? 100 : 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative h-[280px] rounded-2xl overflow-hidden glass-effect cursor-pointer"
        animate={{ 
          scale: isHovered ? 1.08 : 1,
          y: isHovered ? -20 : 0,
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        style={{
          boxShadow: isHovered 
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(6, 182, 212, 0.3)` 
            : '0 0 0 rgba(0, 0, 0, 0)'
        }}
      >
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${member.color}`}
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div 
          className={`absolute inset-0 border-2 rounded-2xl pointer-events-none`}
          animate={{ 
            borderColor: isHovered ? 'rgba(6, 182, 212, 0.5)' : 'rgba(255, 255, 255, 0.05)',
          }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-5">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ 
              scale: isHovered ? 1.5 : 1,
              opacity: isHovered ? 0.3 : 0.2
            }}
            transition={{ duration: 0.4 }}
          >
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${member.color} blur-2xl`} />
          </motion.div>

          <motion.div
            animate={{ 
              opacity: isHovered ? 0.2 : 1, 
              scale: isHovered ? 0.6 : 1, 
              y: isHovered ? -10 : 0 
            }}
            transition={{ duration: 0.3 }}
            className="relative z-10 text-cyan-400 mb-3"
          >
            {member.icon}
          </motion.div>

          <motion.div
            animate={{ y: isHovered ? -15 : 0, scale: isHovered ? 0.95 : 1 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 text-center"
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center border border-white/10"
              animate={{ 
                scale: isHovered ? 0.85 : 1,
                borderColor: isHovered ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255, 255, 255, 0.1)'
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xl font-bold gradient-text">
                {member.name.charAt(0)}
              </span>
            </motion.div>

            <motion.h3 
              className="text-lg font-semibold text-white mb-1"
              animate={{ color: isHovered ? '#22d3ee' : '#ffffff' }}
              transition={{ duration: 0.3 }}
            >
              {member.name}
            </motion.h3>
            
            <p className={`text-xs bg-gradient-to-r ${member.color} bg-clip-text text-transparent font-medium mb-1`}>
              {member.role}
            </p>
            
            <motion.p 
              className="text-xs text-white/40 leading-relaxed"
              animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -10 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {member.responsibility}
            </motion.p>
          </motion.div>
        </div>

        <motion.div 
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${member.color}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: 'left' }}
        />
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 25,
                delay: 0.1
              }}
              className="absolute bottom-3 left-3 right-3 z-30"
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br from-black/95 to-black/90 backdrop-blur-xl border border-cyan-500/50 shadow-2xl`}>
                <div className="flex items-center gap-2 mb-1">
                  <motion.div 
                    className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${member.color}`}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <p className="text-xs text-cyan-400 tracking-wider uppercase font-semibold">Motto</p>
                </div>
                <p className="text-sm text-white/90 italic leading-relaxed">"{member.philosophy}"</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

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
          transition={{ duration: 0.8 }}
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
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-xs text-cyan-400/60 tracking-[0.2em] uppercase mb-8"
          >
            Leadership
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.slice(0, 3).map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} isInView={isInView} />
            ))}
          </div>
        </div>

        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-xs text-blue-400/60 tracking-[0.2em] uppercase mb-8"
          >
            Core Engineering
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.slice(3, 6).map((member, index) => (
              <TeamCard key={member.id} member={member} index={index + 3} isInView={isInView} />
            ))}
          </div>
        </div>

        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center text-xs text-purple-400/60 tracking-[0.2em] uppercase mb-8"
          >
            Operations & Creative
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.slice(6, 9).map((member, index) => (
              <TeamCard key={member.id} member={member} index={index + 6} isInView={isInView} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
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
