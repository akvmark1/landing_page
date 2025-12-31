import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { useTeamMembers } from '../../hooks/useLandingData';
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
  CircuitIcon,
  ActiveHubIcon
} from '../icons/RoleIcons';

export interface TeamMemberType {
  id: string;
  name: string;
  role: string;
  title: string;
  responsibility: string;
  philosophy: string;
  icon: React.ReactNode;
  color: string;
  photo: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
  'compass': <CompassIcon className="w-12 h-12" />,
  'Compass': <CompassIcon className="w-12 h-12" />,
  'neural-network': <NeuralNetworkIcon className="w-12 h-12" />,
  'Brain': <NeuralNetworkIcon className="w-12 h-12" />,
  'gear': <GearIcon className="w-12 h-12" />,
  'Cog': <GearIcon className="w-12 h-12" />,
  'brain-wave': <BrainWaveIcon className="w-12 h-12" />,
  'signal-pulse': <SignalPulseIcon className="w-12 h-12" />,
  'Wifi': <SignalPulseIcon className="w-12 h-12" />,
  'timeline': <TimelineIcon className="w-12 h-12" />,
  'Settings': <TimelineIcon className="w-12 h-12" />,
  'camera': <CameraIcon className="w-12 h-12" />,
  'Camera': <CameraIcon className="w-12 h-12" />,
  'document': <DocumentIcon className="w-12 h-12" />,
  'FileText': <DocumentIcon className="w-12 h-12" />,
  'cfo': <CFOIcon className="w-12 h-12" />,
  'TrendingUp': <CFOIcon className="w-12 h-12" />,
  'circuit': <CircuitIcon className="w-12 h-12" />,
  'Cpu': <CircuitIcon className="w-12 h-12" />,
  'active-hub': <ActiveHubIcon className="w-12 h-12" />,
  'Activity': <ActiveHubIcon className="w-12 h-12" />,
  'default': <CompassIcon className="w-12 h-12" />,
};

const defaultTeamMembers: TeamMemberType[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Akshaya',
    role: 'Founder & CEO',
    title: 'Chief Executive Officer',
    responsibility: 'Vision, Engineering Direction, System Architecture',
    philosophy: 'Building what others only imagine.',
    icon: <CompassIcon className="w-12 h-12" />,
    color: 'from-cyan-400 to-blue-500',
    photo: '/images/team/akshaya_ceo_portrait.png',
  },
  {
    id: '2',
    name: 'Shashank',
    role: 'Co-Founder & CTO',
    title: 'Chief Technology Officer',
    responsibility: 'Autonomy, AI Models, Mission Logic',
    philosophy: 'Teaching the sky to think.',
    icon: <NeuralNetworkIcon className="w-12 h-12" />,
    color: 'from-blue-400 to-purple-500',
    photo: '/images/team/shashank_cto_portrait.png',
  },
  {
    id: '3',
    name: 'CFO Advisor',
    role: 'CFO',
    title: 'Chief Financial Officer',
    responsibility: 'Financial Strategy & Compliance',
    philosophy: 'Numbers tell the story of possibilities.',
    icon: <CFOIcon className="w-12 h-12" />,
    color: 'from-green-400 to-cyan-500',
    photo: '/images/team/cfo_advisor_portrait.png',
  },
  {
    id: '4',
    name: 'Abhaya Samuddar',
    role: 'Active Operations Lead',
    title: 'Head of Active Operations',
    responsibility: 'End-to-End Project Execution, Team Coordination',
    philosophy: 'Action speaks louder than words.',
    icon: <ActiveHubIcon className="w-12 h-12" />,
    color: 'from-emerald-400 to-cyan-500',
    photo: '/images/team/abhaya_samuddar_portrait.png',
  },
  {
    id: '5',
    name: 'Purna',
    role: 'Hardware Lead',
    title: 'Head of Hardware Engineering',
    responsibility: 'Assembly, Integration, Flight Systems',
    philosophy: 'Precision in every circuit, excellence in every connection.',
    icon: <CircuitIcon className="w-12 h-12" />,
    color: 'from-orange-400 to-red-500',
    photo: '/images/team/purna_hardware_lead_portrait.png',
  },
  {
    id: '6',
    name: 'Subham',
    role: 'Fabrication Lead',
    title: 'Head of Fabrication',
    responsibility: 'Precision Build, Material Engineering',
    philosophy: 'Perfection is in the details.',
    icon: <GearIcon className="w-12 h-12" />,
    color: 'from-yellow-400 to-orange-500',
    photo: '/images/team/subham_fabrication_lead_portrait.png',
  },
  {
    id: '7',
    name: 'Biswa',
    role: 'IOT/Embedded Lead',
    title: 'Head of IoT & Embedded Systems',
    responsibility: 'Onboard Computing, Sensor Sync',
    philosophy: 'Machines speak — I listen.',
    icon: <SignalPulseIcon className="w-12 h-12" />,
    color: 'from-purple-400 to-pink-500',
    photo: '/images/team/biswa_iot_lead_portrait.png',
  },
  {
    id: '8',
    name: 'OP',
    role: 'Operations Manager',
    title: 'Head of Operations',
    responsibility: 'Logistics, Field Testing, Resource Flow',
    philosophy: 'Execution is everything.',
    icon: <TimelineIcon className="w-12 h-12" />,
    color: 'from-cyan-400 to-teal-500',
    photo: '/images/team/op_operations_manager_portrait.png',
  },
  {
    id: '9',
    name: 'Amit',
    role: 'Media & Comms',
    title: 'Head of Media & Communications',
    responsibility: 'Visual Storytelling, Content, Public Image',
    philosophy: 'Every frame tells a story.',
    icon: <CameraIcon className="w-12 h-12" />,
    color: 'from-pink-400 to-rose-500',
    photo: '/images/team/amit_media_lead_portrait.png',
  },
  {
    id: '10',
    name: 'Jeet',
    role: 'Documentation & Research',
    title: 'Head of Documentation',
    responsibility: 'Standards, Reporting, Compliance Papers',
    philosophy: 'Knowledge preserved is wisdom multiplied.',
    icon: <DocumentIcon className="w-12 h-12" />,
    color: 'from-indigo-400 to-blue-500',
    photo: '/images/team/jeet_documentation_lead_portrait.png',
  },
];

interface TeamCardProps {
  member: TeamMemberType;
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
        className={`relative isolate h-[280px] rounded-2xl overflow-hidden cursor-pointer smooth-hover glass-effect ${
          isHovered ? 'scale-105 -translate-y-3' : 'scale-100 translate-y-0'
        }`}
        style={{
          boxShadow: isHovered 
            ? `0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 30px rgba(6, 182, 212, 0.25)` 
            : '0 4px 20px rgba(0, 0, 0, 0.3)',
          transform: `translateZ(0) ${isHovered ? 'scale(1.05) translateY(-12px)' : 'scale(1) translateY(0)'}`,
          borderColor: isHovered ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255, 255, 255, 0.1)'
        }}
      >
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${member.color} transition-opacity duration-300`}
          style={{ opacity: isHovered ? 0.15 : 0 }}
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
            className={`relative z-10 text-cyan-300 mb-3 transition-all duration-300`}
            style={{ 
              opacity: isHovered ? 0.3 : 1, 
              transform: `scale(${isHovered ? 0.7 : 1}) translateY(${isHovered ? -8 : 0}px)`
            }}
          >
            {member.icon}
          </div>

          <div
            className="relative z-40 text-center transition-transform duration-300"
            style={{ transform: `translateY(${isHovered ? -12 : 0}px)` }}
          >
            <div
              className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden transition-all duration-300"
              style={{ 
                transform: `scale(${isHovered ? 1.1 : 1})`,
                borderColor: isHovered ? 'rgba(6, 182, 212, 0.6)' : 'rgba(255, 255, 255, 0.2)',
                borderWidth: '2px',
                borderStyle: 'solid',
                boxShadow: isHovered ? '0 0 20px rgba(6, 182, 212, 0.4)' : 'none'
              }}
            >
              <img 
                src={member.photo} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-300"
                style={{ transform: isHovered ? 'scale(1.15)' : 'scale(1)' }}
              />
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
              className="text-xs text-white/50 leading-relaxed transition-all duration-200"
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
              className="absolute bottom-2 left-3 right-3 z-30"
            >
              <div className={`p-2 rounded-lg bg-black/90 backdrop-blur-xl border border-cyan-500/40 shadow-xl`}>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${member.color} animate-pulse`} />
                  <p className="text-[10px] text-cyan-400 tracking-wider uppercase font-semibold">Click to view profile</p>
                </div>
                <p className="text-xs text-white/80 italic leading-snug">"{member.philosophy}"</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [, setLocation] = useLocation();
  
  const { data: dbTeamMembers, isLoading } = useTeamMembers();
  
  const teamMembers: TeamMemberType[] = dbTeamMembers.length > 0 
    ? dbTeamMembers.map((member) => ({
        id: member.id,
        name: member.name,
        role: member.role,
        title: member.title,
        responsibility: member.responsibility,
        philosophy: member.philosophy,
        icon: iconMap[member.icon_name] || iconMap['default'],
        color: member.gradient_colors || 'from-cyan-400 to-blue-500',
        photo: member.image_url || '/images/team/default.png',
      }))
    : defaultTeamMembers;

  const getTeamCategory = (memberId: string, categoryName: string): TeamMemberType[] => {
    if (dbTeamMembers.length === 0) {
      const categoryMap: { [key: string]: string[] } = {
        'Leadership & Active Operations': ['550e8400-e29b-41d4-a716-446655440001', '2', '3', '4'],
        'Core Engineering': ['5', '6', '7'],
        'Operations & Creative': ['8', '9', '10'],
      };
      const ids = categoryMap[categoryName] || [];
      return teamMembers.filter(m => ids.includes(m.id));
    }
    
    const categoryMembers = dbTeamMembers.filter(m => m.team_categories?.includes(categoryName));
    return categoryMembers.map((member) => ({
      id: member.id,
      name: member.name,
      role: member.role,
      title: member.title,
      responsibility: member.responsibility,
      philosophy: member.philosophy,
      icon: iconMap[member.icon_name] || iconMap['default'],
      color: member.gradient_colors || 'from-cyan-400 to-blue-500',
      photo: member.image_url || '/images/team/default.png',
    }));
  };

  const handleMemberClick = (memberId: string) => {
    setLocation(`/team/${memberId}`);
  };

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-32 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="text-cyan-300 text-sm tracking-[0.3em] uppercase mb-4 block">
            The Team
          </span>
          <h2 className="section-title font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            The Minds Behind <span className="text-cyan-400">AkashVahini</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A Collective of Engineers, Dreamers and Builders
          </p>
        </motion.div>

        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-xs text-cyan-300/60 tracking-[0.2em] uppercase mb-8"
          >
            Leadership & Active Operations
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {getTeamCategory('', 'Leadership & Active Operations').map((member, index) => (
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
            className="text-center text-xs text-purple-300/60 tracking-[0.2em] uppercase mb-8"
          >
            Core Engineering
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {getTeamCategory('', 'Core Engineering').map((member, index) => (
              <TeamCard 
                key={member.id} 
                member={member} 
                index={index + 4} 
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
            className="text-center text-xs text-pink-300/60 tracking-[0.2em] uppercase mb-8"
          >
            Operations & Creative
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {getTeamCategory('', 'Operations & Creative').map((member, index) => (
              <TeamCard 
                key={member.id} 
                member={member} 
                index={index + 7} 
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
          <div className="inline-block px-8 py-4 rounded-full glass-effect">
            <p className="text-sm text-white/50 tracking-wider">
              <span className="text-cyan-400">AkashVahini Private Limited</span>
              <span className="mx-3">•</span>
              Incorporated in India
              <span className="mx-3">•</span>
              <span className="text-white/70">Engineering the Next Aerial Evolution</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
