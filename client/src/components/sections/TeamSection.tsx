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
  CFOIcon
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
    philosophy: 'Hardware is poetry, if you look closely.',
    icon: <GearIcon className="w-12 h-12" />,
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
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[380px] rounded-2xl overflow-hidden glass-effect card-hover cursor-pointer">
        <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500">
          <motion.div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-20 scale-150' : 'opacity-100 scale-100'}`}
          >
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${member.color} opacity-20 blur-2xl`} />
          </motion.div>

          <motion.div
            animate={{ opacity: isHovered ? 0.3 : 1, scale: isHovered ? 0.8 : 1, y: isHovered ? -20 : 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 text-cyan-400 mb-6"
          >
            {member.icon}
          </motion.div>

          <motion.div
            animate={{ y: isHovered ? -30 : 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 text-center"
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center border border-white/10"
              animate={{ scale: isHovered ? 0.9 : 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-2xl font-bold gradient-text">
                {member.name.charAt(0)}
              </span>
            </motion.div>

            <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
              {member.name}
            </h3>
            
            <p className={`text-sm bg-gradient-to-r ${member.color} bg-clip-text text-transparent font-medium mb-2`}>
              {member.role}
            </p>
            
            <p className="text-xs text-white/40 leading-relaxed">
              {member.responsibility}
            </p>
          </motion.div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-6 left-6 right-6 z-20"
              >
                <div className="p-4 rounded-xl bg-black/60 backdrop-blur-lg border border-white/10">
                  <p className="text-xs text-cyan-400 mb-1 tracking-wider uppercase">Philosophy</p>
                  <p className="text-sm text-white/80 italic">"{member.philosophy}"</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${member.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
      </div>
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

        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-xs text-cyan-400/60 tracking-[0.2em] uppercase mb-6"
          >
            Leadership
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {teamMembers.slice(0, 3).map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} isInView={isInView} />
            ))}
          </div>
        </div>

        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-xs text-blue-400/60 tracking-[0.2em] uppercase mb-6"
          >
            Core Engineering
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
            className="text-center text-xs text-purple-400/60 tracking-[0.2em] uppercase mb-6"
          >
            Operations & Creative
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
