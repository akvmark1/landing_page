export interface TeamMemberData {
  id: number;
  name: string;
  role: string;
  title: string;
  responsibility: string;
  philosophy: string;
  iconType: 'compass' | 'neural' | 'cfo' | 'activehub' | 'circuit' | 'gear' | 'signal' | 'timeline' | 'camera' | 'document';
  color: string;
  photo: string;
}

export const teamMembersData: TeamMemberData[] = [
  {
    id: 1,
    name: 'Akshaya',
    role: 'Founder & CEO',
    title: 'Chief Executive Officer',
    responsibility: 'Vision, Engineering Direction, System Architecture',
    philosophy: 'Building what others only imagine.',
    iconType: 'compass',
    color: 'from-cyan-400 to-blue-500',
    photo: '/images/team/akshaya_ceo_portrait.png',
  },
  {
    id: 2,
    name: 'Shashank',
    role: 'Co-Founder & CTO',
    title: 'Chief Technology Officer',
    responsibility: 'Autonomy, AI Models, Mission Logic',
    philosophy: 'Teaching the sky to think.',
    iconType: 'neural',
    color: 'from-blue-400 to-purple-500',
    photo: '/images/team/shashank_cto_portrait.png',
  },
  {
    id: 3,
    name: 'CFO Advisor',
    role: 'CFO',
    title: 'Chief Financial Officer',
    responsibility: 'Financial Strategy & Compliance',
    philosophy: 'Numbers tell the story of possibilities.',
    iconType: 'cfo',
    color: 'from-green-400 to-cyan-500',
    photo: '/images/team/cfo_advisor_portrait.png',
  },
  {
    id: 4,
    name: 'Abhaya Samuddar',
    role: 'Active Operations Lead',
    title: 'Head of Active Operations',
    responsibility: 'End-to-End Project Execution, Team Coordination',
    philosophy: 'Action speaks louder than words.',
    iconType: 'activehub',
    color: 'from-emerald-400 to-cyan-500',
    photo: '/images/team/abhaya_samuddar_portrait.png',
  },
  {
    id: 5,
    name: 'Purna',
    role: 'Hardware Lead',
    title: 'Head of Hardware Engineering',
    responsibility: 'Assembly, Integration, Flight Systems',
    philosophy: 'Precision in every circuit, excellence in every connection.',
    iconType: 'circuit',
    color: 'from-orange-400 to-red-500',
    photo: '/images/team/purna_hardware_lead_portrait.png',
  },
  {
    id: 6,
    name: 'Subham',
    role: 'Fabrication Lead',
    title: 'Head of Fabrication',
    responsibility: 'Precision Build, Material Engineering',
    philosophy: 'Perfection is in the details.',
    iconType: 'gear',
    color: 'from-yellow-400 to-orange-500',
    photo: '/images/team/subham_fabrication_lead_portrait.png',
  },
  {
    id: 7,
    name: 'Biswa',
    role: 'IOT/Embedded Lead',
    title: 'Head of IoT & Embedded Systems',
    responsibility: 'Onboard Computing, Sensor Sync',
    philosophy: 'Machines speak — I listen.',
    iconType: 'signal',
    color: 'from-purple-400 to-pink-500',
    photo: '/images/team/biswa_iot_lead_portrait.png',
  },
  {
    id: 8,
    name: 'OP',
    role: 'Operations Manager',
    title: 'Head of Operations',
    responsibility: 'Logistics, Field Testing, Resource Flow',
    philosophy: 'Execution is everything.',
    iconType: 'timeline',
    color: 'from-cyan-400 to-teal-500',
    photo: '/images/team/op_operations_manager_portrait.png',
  },
  {
    id: 9,
    name: 'Amit',
    role: 'Media & Comms',
    title: 'Head of Media & Communications',
    responsibility: 'Visual Storytelling, Content, Public Image',
    philosophy: 'Every frame tells a story.',
    iconType: 'camera',
    color: 'from-pink-400 to-rose-500',
    photo: '/images/team/amit_media_lead_portrait.png',
  },
  {
    id: 10,
    name: 'Jeet',
    role: 'Documentation & Research',
    title: 'Head of Documentation',
    responsibility: 'Standards, Reporting, Compliance Papers',
    philosophy: 'Knowledge preserved is wisdom multiplied.',
    iconType: 'document',
    color: 'from-indigo-400 to-blue-500',
    photo: '/images/team/jeet_documentation_lead_portrait.png',
  },
];

export const memberDetails: Record<number, {
  bio: string;
  skills: string[];
  achievements: string[];
  experience: string;
  education: string;
  social: { linkedin?: string; twitter?: string; email?: string; website?: string };
}> = {
  1: {
    bio: "Visionary leader and founder of AkashVahini, with a passion for pushing the boundaries of aerial technology. Akshaya brings a unique blend of engineering excellence and entrepreneurial spirit to drive innovation in drone systems.",
    skills: ["System Architecture", "Strategic Planning", "Engineering Leadership", "Product Vision", "Team Building"],
    achievements: ["Founded AkashVahini Pvt Ltd", "Led development of autonomous flight systems", "Pioneered next-gen drone technology"],
    experience: "10+ years in aerospace engineering and technology leadership",
    education: "Advanced Engineering Degree, Specialized in Aerospace Systems",
    social: { linkedin: "#", twitter: "#", email: "akshaya@akashvahini.com" }
  },
  2: {
    bio: "Technical mastermind behind AkashVahini's AI and autonomy systems. Shashank's expertise in machine learning and computer vision enables drones to navigate and make decisions independently.",
    skills: ["Artificial Intelligence", "Machine Learning", "Computer Vision", "Mission Logic", "Autonomous Systems"],
    achievements: ["Developed proprietary AI navigation system", "Built real-time decision-making algorithms", "Advanced autonomy research"],
    experience: "8+ years in AI/ML and autonomous systems development",
    education: "Masters in Computer Science, AI Specialization",
    social: { linkedin: "#", email: "shashank@akashvahini.com" }
  },
  3: {
    bio: "Strategic financial advisor ensuring AkashVahini's sustainable growth and compliance. Brings deep expertise in startup financing and regulatory frameworks.",
    skills: ["Financial Strategy", "Investment Planning", "Regulatory Compliance", "Risk Management", "Corporate Finance"],
    achievements: ["Secured seed funding", "Established financial frameworks", "Compliance systems implementation"],
    experience: "15+ years in corporate finance and startup advisory",
    education: "MBA Finance, Chartered Accountant",
    social: { linkedin: "#", email: "cfo@akashvahini.com" }
  },
  4: {
    bio: "Dynamic leader actively managing all operations at AkashVahini. Abhaya Samuddar ensures seamless coordination across teams and drives project execution from concept to delivery.",
    skills: ["Project Management", "Team Coordination", "Cross-functional Leadership", "Agile Execution", "Stakeholder Management"],
    achievements: ["Streamlined end-to-end project delivery", "Built cross-functional team synergy", "Achieved 100% on-time milestone delivery"],
    experience: "7+ years in project management and active operations",
    education: "B.Tech with MBA in Operations",
    social: { linkedin: "#", email: "abhaya@akashvahini.com" }
  },
  5: {
    bio: "Hardware engineering expert responsible for bringing drone designs to life. Purna excels in precision assembly and integration of complex flight systems.",
    skills: ["Hardware Assembly", "PCB Design", "Flight Systems Integration", "Quality Control", "Component Testing"],
    achievements: ["Designed modular drone architecture", "Optimized hardware reliability", "Reduced assembly time by 40%"],
    experience: "6+ years in hardware engineering and drone assembly",
    education: "B.Tech in Electronics Engineering",
    social: { linkedin: "#", email: "purna@akashvahini.com" }
  },
  6: {
    bio: "Master craftsman dedicated to precision manufacturing and material engineering. Subham ensures every component meets the highest quality standards.",
    skills: ["Precision Fabrication", "Material Engineering", "CNC Machining", "3D Printing", "Quality Assurance"],
    achievements: ["Pioneered lightweight frame designs", "Material innovation for durability", "Zero-defect production processes"],
    experience: "7+ years in advanced manufacturing and fabrication",
    education: "B.Tech in Mechanical Engineering",
    social: { linkedin: "#", email: "subham@akashvahini.com" }
  },
  7: {
    bio: "IoT and embedded systems specialist who makes machines communicate seamlessly. Biswa's expertise ensures perfect sensor synchronization and onboard computing.",
    skills: ["Embedded Systems", "IoT Architecture", "Sensor Integration", "Real-time Computing", "Communication Protocols"],
    achievements: ["Built custom flight controller firmware", "Developed sensor fusion algorithms", "IoT telemetry systems"],
    experience: "5+ years in embedded systems and IoT development",
    education: "B.Tech in Electronics & Communication",
    social: { linkedin: "#", email: "biswa@akashvahini.com" }
  },
  8: {
    bio: "Operations maestro ensuring smooth execution of all field activities. OP manages logistics, testing schedules, and resource allocation with precision.",
    skills: ["Operations Management", "Logistics Planning", "Field Testing", "Resource Optimization", "Project Coordination"],
    achievements: ["Streamlined field operations", "Established testing protocols", "Optimized supply chain"],
    experience: "8+ years in operations and project management",
    education: "MBA Operations Management",
    social: { linkedin: "#", email: "op@akashvahini.com" }
  },
  9: {
    bio: "Creative storyteller capturing AkashVahini's journey through compelling visuals and content. Amit builds the brand's public image and media presence.",
    skills: ["Visual Storytelling", "Content Creation", "Brand Management", "Video Production", "Social Media"],
    achievements: ["Built brand identity from scratch", "Viral drone footage campaigns", "Media partnership development"],
    experience: "6+ years in media production and brand communications",
    education: "BA in Mass Communication, Film Studies",
    social: { linkedin: "#", twitter: "#", email: "amit@akashvahini.com" }
  },
  10: {
    bio: "Documentation expert ensuring all knowledge is preserved and accessible. Jeet maintains technical standards, compliance papers, and research documentation.",
    skills: ["Technical Documentation", "Research Analysis", "Compliance Reporting", "Knowledge Management", "Standards Development"],
    achievements: ["Created comprehensive documentation system", "Regulatory compliance frameworks", "Patent documentation"],
    experience: "5+ years in technical writing and research",
    education: "B.Tech with specialization in Technical Communication",
    social: { linkedin: "#", email: "jeet@akashvahini.com" }
  }
};
