import { motion } from 'framer-motion';
import { useLocation, useRoute } from 'wouter';
import { ArrowLeft, Mail, Linkedin, Twitter, Globe, Award, Briefcase, Target, Quote } from 'lucide-react';
import { teamMembersData, memberDetails, TeamMemberData } from '../data/teamMembers';
import {
  CompassIcon,
  NeuralNetworkIcon,
  GearIcon,
  SignalPulseIcon,
  TimelineIcon,
  CameraIcon,
  DocumentIcon,
  CFOIcon,
  CircuitIcon
} from '../components/icons/RoleIcons';

function getIcon(iconType: TeamMemberData['iconType'], className: string) {
  switch (iconType) {
    case 'compass': return <CompassIcon className={className} />;
    case 'neural': return <NeuralNetworkIcon className={className} />;
    case 'cfo': return <CFOIcon className={className} />;
    case 'circuit': return <CircuitIcon className={className} />;
    case 'gear': return <GearIcon className={className} />;
    case 'signal': return <SignalPulseIcon className={className} />;
    case 'timeline': return <TimelineIcon className={className} />;
    case 'camera': return <CameraIcon className={className} />;
    case 'document': return <DocumentIcon className={className} />;
    default: return <CompassIcon className={className} />;
  }
}

export function TeamMemberPortfolio() {
  const [, params] = useRoute('/team/:id');
  const [, setLocation] = useLocation();
  
  const memberId = params?.id ? parseInt(params.id) : null;
  const member = teamMembersData.find(m => m.id === memberId);
  const details = memberId ? memberDetails[memberId] : null;

  if (!member || !details) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Member not found</h1>
          <button 
            onClick={() => setLocation('/')}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} />
            Go back home
          </button>
        </div>
      </div>
    );
  }

  const icon = getIcon(member.iconType, "w-20 h-20");

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br ${member.color} opacity-10 rounded-full blur-3xl`} />
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br ${member.color} opacity-5 rounded-full blur-3xl`} />
      </div>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 py-4 bg-black/80 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setLocation('/')}
              className="flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Back to Home</span>
            </button>
            <span className="font-outfit text-xl font-bold gradient-text">
              AkashVahini
            </span>
          </div>
        </div>
      </motion.nav>

      <main className="relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-12"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className={`w-40 h-40 rounded-3xl bg-gradient-to-br ${member.color} p-[2px]`}>
                  <div className="w-full h-full rounded-3xl bg-black/90 flex items-center justify-center text-cyan-400">
                    {icon}
                  </div>
                </div>
                <div className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{member.name.charAt(0)}</span>
                </div>
              </motion.div>

              <div className="text-center md:text-left flex-1">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                >
                  {member.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className={`text-xl bg-gradient-to-r ${member.color} bg-clip-text text-transparent font-medium mb-2`}
                >
                  {member.title}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-white/50 mb-4"
                >
                  {member.responsibility}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-center justify-center md:justify-start gap-4"
                >
                  {details.social.linkedin && (
                    <a href={details.social.linkedin} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-cyan-400">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {details.social.twitter && (
                    <a href={details.social.twitter} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-cyan-400">
                      <Twitter size={20} />
                    </a>
                  )}
                  {details.social.email && (
                    <a href={`mailto:${details.social.email}`} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-cyan-400">
                      <Mail size={20} />
                    </a>
                  )}
                  {details.social.website && (
                    <a href={details.social.website} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-cyan-400">
                      <Globe size={20} />
                    </a>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 p-6 rounded-2xl glass-effect border border-white/5"
          >
            <div className="flex items-start gap-4">
              <Quote className="text-cyan-400 flex-shrink-0 mt-1" size={28} />
              <p className="text-xl text-white/80 italic leading-relaxed">"{member.philosophy}"</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${member.color}`} />
              About
            </h2>
            <p className="text-white/60 leading-relaxed text-lg">{details.bio}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-6 rounded-2xl glass-effect border border-white/5"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <Target className="text-cyan-400" size={24} />
                Core Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {details.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className={`px-4 py-2 rounded-full bg-gradient-to-r ${member.color} bg-opacity-10 text-white/80 text-sm border border-white/10`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-6 rounded-2xl glass-effect border border-white/5"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <Award className="text-cyan-400" size={24} />
                Key Achievements
              </h3>
              <ul className="space-y-3">
                {details.achievements.map((achievement, index) => (
                  <motion.li
                    key={achievement}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-3 text-white/60"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${member.color} mt-2 flex-shrink-0`} />
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-6 rounded-2xl glass-effect border border-white/5"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <Briefcase className="text-cyan-400" size={24} />
                Experience
              </h3>
              <p className="text-white/60">{details.experience}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="p-6 rounded-2xl glass-effect border border-white/5"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <Award className="text-cyan-400" size={24} />
                Education
              </h3>
              <p className="text-white/60">{details.education}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setLocation('/#team')}
              className={`px-8 py-4 rounded-full bg-gradient-to-r ${member.color} text-white font-medium hover:opacity-90 transition-opacity`}
            >
              View All Team Members
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
