import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const teamPhotos = [
  { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Akshaya', role: 'Founder & CEO', photo: '/images/team/akshaya_ceo_portrait.png', color: 'from-cyan-400 to-blue-500' },
  { id: 2, name: 'Shashank', role: 'Co-Founder & CTO', photo: '/images/team/shashank_cto_portrait.png', color: 'from-blue-400 to-purple-500' },
  { id: 3, name: 'CFO Advisor', role: 'CFO', photo: '/images/team/cfo_advisor_portrait.png', color: 'from-green-400 to-cyan-500' },
  { id: 4, name: 'Purna', role: 'Hardware Lead', photo: '/images/team/purna_hardware_lead_portrait.png', color: 'from-orange-400 to-red-500' },
  { id: 5, name: 'Subham', role: 'Fabrication Lead', photo: '/images/team/subham_fabrication_lead_portrait.png', color: 'from-yellow-400 to-orange-500' },
  { id: 6, name: 'Biswa', role: 'IoT/Embedded Lead', photo: '/images/team/biswa_iot_lead_portrait.png', color: 'from-purple-400 to-pink-500' },
  { id: 7, name: 'OP', role: 'Operations Manager', photo: '/images/team/op_operations_manager_portrait.png', color: 'from-cyan-400 to-teal-500' },
  { id: 8, name: 'Amit', role: 'Media & Comms', photo: '/images/team/amit_media_lead_portrait.png', color: 'from-pink-400 to-rose-500' },
  { id: 9, name: 'Jeet', role: 'Documentation & Research', photo: '/images/team/jeet_documentation_lead_portrait.png', color: 'from-indigo-400 to-blue-500' },
];

const tiupAchievements = [
  {
    id: 1,
    title: 'TIUP Innovation Award 2024',
    description: 'Recognized for breakthrough autonomous drone navigation system',
    icon: '🏆',
    year: '2024'
  },
  {
    id: 2,
    title: 'Best Startup - Aerospace Category',
    description: 'Awarded by Technology Innovation & Utilization Programme',
    icon: '🚀',
    year: '2024'
  },
  {
    id: 3,
    title: 'R&D Excellence Grant',
    description: 'Selected for government funded research in aerial technology',
    icon: '🔬',
    year: '2023'
  },
  {
    id: 4,
    title: 'Patent Recognition',
    description: 'Filed 3 patents for novel drone control mechanisms',
    icon: '📜',
    year: '2023'
  },
  {
    id: 5,
    title: 'Technology Showcase Winner',
    description: 'Demonstrated advanced AI-powered flight systems',
    icon: '⭐',
    year: '2024'
  }
];

const tiupCollaborations = [
  {
    id: 1,
    partner: 'Indian Institute of Technology',
    type: 'Research Partnership',
    description: 'Joint research on autonomous navigation algorithms',
    icon: '🎓'
  },
  {
    id: 2,
    partner: 'Defence Research Labs',
    type: 'Strategic Collaboration',
    description: 'Development of surveillance drone platforms',
    icon: '🛡️'
  },
  {
    id: 3,
    partner: 'AgriTech Consortium',
    type: 'Industry Partnership',
    description: 'Agricultural drone solutions for precision farming',
    icon: '🌾'
  },
  {
    id: 4,
    partner: 'Smart City Initiative',
    type: 'Government Project',
    description: 'Urban monitoring and traffic management systems',
    icon: '🏙️'
  },
  {
    id: 5,
    partner: 'Emergency Services Network',
    type: 'Public Safety',
    description: 'Search and rescue drone deployment systems',
    icon: '🚁'
  },
  {
    id: 6,
    partner: 'Renewable Energy Partners',
    type: 'Green Technology',
    description: 'Solar farm inspection and maintenance drones',
    icon: '☀️'
  }
];

function TeamPhotoCard({ member, index, isInView }: { member: typeof teamPhotos[0]; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          transform: isHovered ? 'scale(1.1) translateY(-10px)' : 'scale(1)',
          boxShadow: isHovered 
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(6, 182, 212, 0.3)` 
            : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <img 
          src={member.photo} 
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
        />
        
        <div 
          className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-0 transition-opacity duration-300`}
          style={{ opacity: isHovered ? 0.4 : 0 }}
        />
        
        <div 
          className="absolute inset-0 border-2 rounded-2xl transition-colors duration-300"
          style={{ 
            borderColor: isHovered ? 'rgba(6, 182, 212, 0.8)' : 'rgba(255, 255, 255, 0.1)'
          }}
        />
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent"
            >
              <p className="text-white font-semibold text-sm truncate">{member.name}</p>
              <p className={`text-xs bg-gradient-to-r ${member.color} bg-clip-text text-transparent font-medium truncate`}>
                {member.role}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div 
        className={`absolute -inset-2 rounded-3xl bg-gradient-to-r ${member.color} opacity-0 blur-xl transition-opacity duration-300 -z-10`}
        style={{ opacity: isHovered ? 0.3 : 0 }}
      />
    </motion.div>
  );
}

function AchievementCard({ achievement, index, isInView }: { achievement: typeof tiupAchievements[0]; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative p-6 rounded-2xl glass-effect border border-white/5 transition-all duration-400"
        style={{
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered 
            ? '0 20px 40px -15px rgba(6, 182, 212, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.3)',
          borderColor: isHovered ? 'rgba(6, 182, 212, 0.5)' : 'rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="flex items-start gap-4">
          <div className="text-4xl flex-shrink-0">{achievement.icon}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold text-white">{achievement.title}</h4>
              <span className="text-xs text-cyan-400 font-medium px-2 py-1 rounded-full bg-cyan-400/10">
                {achievement.year}
              </span>
            </div>
            <p className="text-sm text-white/60">{achievement.description}</p>
          </div>
        </div>
        
        <div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-b-2xl transition-transform duration-400"
          style={{ 
            transform: `scaleX(${isHovered ? 1 : 0})`,
            transformOrigin: 'left'
          }}
        />
      </div>
    </motion.div>
  );
}

function CollaborationCard({ collab, index, isInView }: { collab: typeof tiupCollaborations[0]; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative h-full p-6 rounded-2xl glass-effect border border-white/5 transition-all duration-400 flex flex-col"
        style={{
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: isHovered 
            ? '0 20px 40px -15px rgba(139, 92, 246, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.3)',
          borderColor: isHovered ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="text-4xl mb-4">{collab.icon}</div>
        <h4 className="text-lg font-semibold text-white mb-1">{collab.partner}</h4>
        <span className="inline-block text-xs text-purple-400 font-medium px-2 py-1 rounded-full bg-purple-400/10 mb-3 w-fit">
          {collab.type}
        </span>
        <p className="text-sm text-white/60 flex-grow">{collab.description}</p>
        
        <div 
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>
    </motion.div>
  );
}

export function TeamHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const collabRef = useRef<HTMLDivElement>(null);
  
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const isTeamInView = useInView(teamRef, { once: true, margin: '-100px' });
  const isAchievementsInView = useInView(achievementsRef, { once: true, margin: '-100px' });
  const isCollabInView = useInView(collabRef, { once: true, margin: '-100px' });

  return (
    <div className="relative">
      <section
        ref={heroRef}
        id="team-hero"
        className="relative py-20 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-2 text-xs font-medium tracking-[0.3em] uppercase text-cyan-400/80 border border-cyan-500/20 rounded-full backdrop-blur-sm mb-6">
              Meet Our Team
            </span>
            <h2 className="section-title font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              The <span className="gradient-text">Visionaries</span> Behind AkashVahini
            </h2>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              A passionate team of engineers, innovators, and dreamers working together to revolutionize aerial technology and shape the future of autonomous flight.
            </p>
          </motion.div>

          <div 
            ref={teamRef}
            className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8"
          >
            {teamPhotos.map((member, index) => (
              <TeamPhotoCard 
                key={member.id} 
                member={member} 
                index={index} 
                isInView={isTeamInView} 
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isTeamInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-white/10">
              <div className="flex -space-x-3">
                {teamPhotos.slice(0, 4).map((member, i) => (
                  <img 
                    key={member.id}
                    src={member.photo}
                    alt={member.name}
                    className="w-8 h-8 rounded-full border-2 border-black/50 object-cover"
                  />
                ))}
              </div>
              <span className="text-sm text-white/70">
                <span className="text-cyan-400 font-semibold">9 Experts</span> driving innovation
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        ref={achievementsRef}
        id="tiup-achievements"
        className="relative py-24 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isAchievementsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 text-sm tracking-[0.3em] uppercase mb-4 block">
              Recognition & Awards
            </span>
            <h2 className="section-title font-outfit text-4xl md:text-5xl font-bold text-white mb-6">
              TIUP <span className="gradient-text">Achievements</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Milestones that mark our journey of innovation under the Technology Innovation & Utilization Programme
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiupAchievements.map((achievement, index) => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement} 
                index={index} 
                isInView={isAchievementsInView} 
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isAchievementsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl glass-effect border border-cyan-500/20">
              <div className="text-3xl">🎯</div>
              <div className="text-left">
                <p className="text-white font-semibold">Continuous Excellence</p>
                <p className="text-sm text-white/50">Striving for innovation in every project</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        ref={collabRef}
        id="tiup-collaboration"
        className="relative py-24 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isCollabInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-purple-400 text-sm tracking-[0.3em] uppercase mb-4 block">
              Strategic Partners
            </span>
            <h2 className="section-title font-outfit text-4xl md:text-5xl font-bold text-white mb-6">
              TIUP <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Collaborations</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Building the future together with industry leaders, academic institutions, and government initiatives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiupCollaborations.map((collab, index) => (
              <CollaborationCard 
                key={collab.id} 
                collab={collab} 
                index={index} 
                isInView={isCollabInView} 
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isCollabInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="inline-block px-8 py-4 rounded-2xl glass-effect border border-purple-500/20">
              <div className="flex items-center gap-6 flex-wrap justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🤝</span>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-white">6+</p>
                    <p className="text-xs text-white/50">Active Partners</p>
                  </div>
                </div>
                <div className="w-px h-12 bg-white/10 hidden md:block" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔬</span>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-white">10+</p>
                    <p className="text-xs text-white/50">Joint Projects</p>
                  </div>
                </div>
                <div className="w-px h-12 bg-white/10 hidden md:block" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌍</span>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-white">Pan India</p>
                    <p className="text-xs text-white/50">Reach</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
