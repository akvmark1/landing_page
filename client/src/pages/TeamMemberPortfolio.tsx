import { motion } from 'framer-motion';
import { useLocation, useRoute } from 'wouter';
import { ArrowLeft, Mail, Linkedin, Award, Briefcase, Target, Quote, GraduationCap, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { teamMembersData, memberDetails, TeamMemberData } from '../data/teamMembers';
import { getTeamMemberById, getTeamMemberEducation, TeamMember, TeamMemberEducation } from '../lib/supabase';
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

function getIconByName(iconName: string, className: string) {
  const iconMap: { [key: string]: React.ReactNode } = {
    'compass': <CompassIcon className={className} />,
    'Compass': <CompassIcon className={className} />,
    'neural': <NeuralNetworkIcon className={className} />,
    'Brain': <NeuralNetworkIcon className={className} />,
    'cfo': <CFOIcon className={className} />,
    'TrendingUp': <CFOIcon className={className} />,
    'circuit': <CircuitIcon className={className} />,
    'Cpu': <CircuitIcon className={className} />,
    'gear': <GearIcon className={className} />,
    'Cog': <GearIcon className={className} />,
    'signal': <SignalPulseIcon className={className} />,
    'Wifi': <SignalPulseIcon className={className} />,
    'timeline': <TimelineIcon className={className} />,
    'Settings': <TimelineIcon className={className} />,
    'camera': <CameraIcon className={className} />,
    'Camera': <CameraIcon className={className} />,
    'document': <DocumentIcon className={className} />,
    'FileText': <DocumentIcon className={className} />,
    'Activity': <CompassIcon className={className} />,
  };
  return iconMap[iconName] || <CompassIcon className={className} />;
}

export function TeamMemberPortfolio() {
  const [, params] = useRoute('/team/:id');
  const [, setLocation] = useLocation();
  const [dbMember, setDbMember] = useState<TeamMember | null>(null);
  const [education, setEducation] = useState<TeamMemberEducation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const rawId = params?.id;

  const fetchData = async (id: string) => {
    const isUUID = id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    
    if (isUUID && id) {
      try {
        const [member, edu] = await Promise.all([
          getTeamMemberById(id),
          getTeamMemberEducation(id)
        ]);
        setDbMember(member);
        setEducation(edu);
      } catch (error) {
        console.error('Error fetching team member:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (rawId) {
      setIsLoading(true);
      fetchData(rawId);
      // Auto-refetch after 1 second to ensure fresh data
      const timer = setTimeout(() => {
        fetchData(rawId);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [rawId, refreshKey]);

  const numericId = rawId ? parseInt(rawId, 10) : null;
  let hardcodedMember = teamMembersData.find(m => m.id === numericId);
  const hardcodedDetails = numericId ? memberDetails[numericId] : null;

  const member = dbMember ? {
    name: dbMember.name,
    title: dbMember.title,
    responsibility: dbMember.responsibility,
    philosophy: dbMember.philosophy,
    photo: dbMember.image_url || '/images/team/default.png',
    color: dbMember.gradient_colors || 'from-cyan-400 to-blue-500',
    iconType: dbMember.icon_name
  } : hardcodedMember;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-20 flex items-center justify-center">
              <span className="text-4xl">?</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Profile Not Found</h1>
          <p className="text-white/60 mb-2">We couldn't locate this team member.</p>
          <p className="text-white/40 text-sm mb-8">ID: {rawId}</p>
          <button 
            onClick={() => setLocation('/')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 transition-colors"
          >
            <ArrowLeft size={20} />
            Return to Home
          </button>
          <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-white/50">Try selecting a team member from the Team section on the home page.</p>
          </div>
        </div>
      </div>
    );
  }

  const icon = dbMember 
    ? getIconByName(dbMember.icon_name, "w-20 h-20") 
    : hardcodedMember 
      ? getIcon(hardcodedMember.iconType, "w-20 h-20") 
      : <CompassIcon className="w-20 h-20" />;

  const details = {
    bio: dbMember?.bio || '',
    skills: dbMember?.skills || [],
    achievements: dbMember?.achievements || [],
    experience: dbMember?.experience || '',
    social: {
      linkedin: dbMember?.linkedin_url || null,
      email: dbMember?.email || null
    }
  };

  const color = dbMember?.gradient_colors || 'from-cyan-400 to-blue-500';

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br ${color} opacity-10 rounded-full blur-3xl`} />
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br ${color} opacity-5 rounded-full blur-3xl`} />
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
            <button 
              onClick={() => setRefreshKey(prev => prev + 1)}
              className="flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors"
              title="Refresh profile data"
            >
              <RefreshCw size={20} />
            </button>
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
                <div className={`w-40 h-40 rounded-3xl bg-gradient-to-br ${color} p-[2px]`}>
                  <div className="w-full h-full rounded-3xl bg-black/90 flex items-center justify-center text-cyan-400">
                    {icon}
                  </div>
                </div>
                <div className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
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
                  className={`text-xl bg-gradient-to-r ${color} bg-clip-text text-transparent font-medium mb-2`}
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
                    <a href={details.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-cyan-400">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {details.social.email && (
                    <a href={`mailto:${details.social.email}`} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-cyan-400">
                      <Mail size={20} />
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
              <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${color}`} />
              About
            </h2>
            <p className="text-white/60 leading-relaxed text-lg">{details.bio}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {details.skills && details.skills.length > 0 && (
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
                      className={`px-4 py-2 rounded-full bg-gradient-to-r ${color} bg-opacity-10 text-white/80 text-sm border border-white/10`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {details.achievements && details.achievements.length > 0 && (
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
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color} mt-2 flex-shrink-0`} />
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {details.experience && (
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
            )}

            {education.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="p-6 rounded-2xl glass-effect border border-white/5"
              >
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                  <GraduationCap className="text-cyan-400" size={24} />
                  Education
                </h3>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-white/60">
                      <p className="text-white/80 font-medium">{edu.degree}</p>
                      {edu.institution && <p className="text-sm">{edu.institution}</p>}
                      {(edu.year_start || edu.year_end) && (
                        <p className="text-sm text-white/40">
                          {edu.year_start || '?'} - {edu.year_end || 'Present'}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setLocation('/#team')}
              className={`px-8 py-4 rounded-full bg-gradient-to-r ${color} text-white font-medium hover:opacity-90 transition-opacity`}
            >
              View All Team Members
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
