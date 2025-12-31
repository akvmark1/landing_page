import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Users, Lightbulb, Star, Quote } from 'lucide-react';
import { useMentors } from '../../hooks/useLandingData';

interface MentorType {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  description: string;
  quote: string;
  color: string;
  secondaryColor: string;
  icon: React.ReactNode;
}

const iconMap: { [key: string]: React.ReactNode } = {
  'lightbulb': <Lightbulb className="w-6 h-6" />,
  'award': <Award className="w-6 h-6" />,
  'users': <Users className="w-6 h-6" />,
  'graduation-cap': <GraduationCap className="w-6 h-6" />,
  'star': <Star className="w-6 h-6" />,
  'default': <Lightbulb className="w-6 h-6" />,
};

const defaultMentors: MentorType[] = [
  {
    id: 'manoranjan',
    name: 'Manoranjan Mahapatra',
    role: 'Technical Mentor',
    expertise: ['Aerospace Engineering', 'Systems Design', 'Innovation'],
    description: 'A visionary leader guiding our technical direction with decades of experience in aerospace innovation and engineering excellence.',
    quote: 'Excellence is not a destination but a continuous journey of learning and improvement.',
    color: '#00d4ff',
    secondaryColor: '#0066ff',
    icon: <Lightbulb className="w-6 h-6" />,
  },
  {
    id: 'peramjeet',
    name: 'Peramjeet',
    role: 'Strategic Mentor',
    expertise: ['Business Strategy', 'Project Management', 'Leadership'],
    description: 'An experienced strategist providing invaluable guidance on business development and organizational growth strategies.',
    quote: 'Success comes to those who dare to dream and have the courage to pursue their vision.',
    color: '#8b5cf6',
    secondaryColor: '#6366f1',
    icon: <Award className="w-6 h-6" />,
  },
  {
    id: 'bikram',
    name: 'Bikram Adatiya',
    role: 'Industry Mentor',
    expertise: ['Industry Relations', 'Technology Transfer', 'Research'],
    description: 'A distinguished mentor bridging the gap between academia and industry, fostering collaborations and technological advancement.',
    quote: 'Innovation thrives where passion meets purpose and determination meets opportunity.',
    color: '#f97316',
    secondaryColor: '#ef4444',
    icon: <Users className="w-6 h-6" />,
  },
];

function MentorCard({ mentor, index }: { mentor: MentorType; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const initials = useMemo(() => {
    return mentor.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  }, [mentor.name]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: `linear-gradient(135deg, ${mentor.color}40, ${mentor.secondaryColor}40)`,
        }}
      />
      
      <motion.div
        className="relative rounded-3xl p-8 h-full overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
        }}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
          style={{ background: mentor.color }}
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.3 : 0.2,
          }}
        />
        
        <div className="relative z-10">
          <div className="flex items-start gap-6 mb-6">
            <motion.div
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold"
              style={{
                background: `linear-gradient(135deg, ${mentor.color}30, ${mentor.secondaryColor}30)`,
                border: `2px solid ${mentor.color}50`,
                color: mentor.color,
              }}
              animate={{
                boxShadow: isHovered 
                  ? `0 0 30px ${mentor.color}40, inset 0 0 20px ${mentor.color}20`
                  : `0 0 15px ${mentor.color}20`,
              }}
            >
              {initials}
              
              <motion.div
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${mentor.color}, ${mentor.secondaryColor})`,
                }}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 10 : 0,
                }}
              >
                {mentor.icon}
              </motion.div>
            </motion.div>
            
            <div className="flex-1">
              <motion.h3
                className="text-xl font-bold mb-1"
                style={{ color: mentor.color }}
                animate={{ x: isHovered ? 5 : 0 }}
              >
                {mentor.name}
              </motion.h3>
              <p className="text-sm text-white/60 mb-3">{mentor.role}</p>
              
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="px-2 py-0.5 rounded-full text-xs"
                    style={{
                      background: `${mentor.color}20`,
                      color: mentor.color,
                      border: `1px solid ${mentor.color}30`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            {mentor.description}
          </p>
          
          <motion.div
            className="relative p-4 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${mentor.color}10, ${mentor.secondaryColor}10)`,
              borderLeft: `3px solid ${mentor.color}`,
            }}
          >
            <Quote 
              className="absolute top-2 right-2 w-6 h-6 opacity-20"
              style={{ color: mentor.color }}
            />
            <p className="text-sm italic text-white/60 leading-relaxed">
              "{mentor.quote}"
            </p>
          </motion.div>
          
          <div className="flex items-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <Star
                  className="w-4 h-4"
                  style={{ color: mentor.color, fill: mentor.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MentorSection() {
  const { data: dbMentors, isLoading } = useMentors();
  
  const mentors: MentorType[] = dbMentors.length > 0
    ? dbMentors.map(mentor => ({
        id: mentor.id,
        name: mentor.name,
        role: mentor.role,
        expertise: mentor.expertise || [],
        description: mentor.description,
        quote: mentor.quote,
        color: mentor.color || '#00d4ff',
        secondaryColor: mentor.secondary_color || '#0066ff',
        icon: iconMap[mentor.icon_name] || iconMap['default'],
      }))
    : defaultMentors;
  
  // Hide the entire section if there are no mentors in the database
  if (dbMentors.length === 0) {
    return null;
  }
    
  return (
    <section id="mentors" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'linear-gradient(135deg, #00d4ff, #0066ff)' }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.2))',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}
            whileHover={{ scale: 1.05 }}
          >
            <GraduationCap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">Our Guiding Stars</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Mentors
            </span>
          </h2>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Visionary leaders who guide and inspire us on our journey towards aerospace excellence
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <MentorCard key={mentor.id} mentor={mentor} index={index} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex -space-x-2">
              {mentors.map((mentor, i) => (
                <div
                  key={mentor.id}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${mentor.color}, ${mentor.secondaryColor})`,
                    border: '2px solid rgba(0, 0, 0, 0.5)',
                    zIndex: 3 - i,
                  }}
                >
                  {mentor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              ))}
            </div>
            <span className="text-sm text-white/60">
              Guided by <span className="text-white font-medium">3 Distinguished Mentors</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
