import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Mail, Lock, UserCheck, Database, AlertCircle } from 'lucide-react';
import { Link } from 'wouter';
import { SpaceBackgroundFull } from '../components/3d/SpaceBackgroundFull';

export function PrivacyPolicy() {
  const sections = [
    {
      icon: <Database className="w-5 h-5" />,
      title: "What We Collect",
      items: [
        "Your name and email address (only if submitted by you)."
      ]
    },
    {
      icon: <UserCheck className="w-5 h-5" />,
      title: "How We Use It",
      items: [
        "To send updates, announcements, and early access information.",
        "To improve communication and user experience."
      ]
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "What We Do Not Do",
      items: [
        "We do not share, sell, or rent your information.",
        "We do not track browsing behavior or store cookies for marketing.",
        "No third-party analytics tools are active on this website."
      ]
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Data Protection",
      items: [
        "Your information is stored securely.",
        "Access is strictly limited to authorized team members."
      ]
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Your Rights",
      items: [
        "You may request deletion of your data anytime at: support@akashvahini.com"
      ]
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SpaceBackgroundFull />
      
      <div className="relative z-10 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <a className="inline-flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Home</span>
              </a>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
                <p className="text-white/50 text-sm mt-1">Your privacy matters to us</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-white/10"
            >
              <p className="text-white/80 leading-relaxed">
                <span className="text-cyan-400 font-semibold">AkashVahini Private Limited</span> respects your privacy. 
                This introductory website does not collect personal data unless you voluntarily provide it through the "Notify Me" form.
              </p>
            </motion.div>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all">
                      {section.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                  </div>
                  <ul className="space-y-3 ml-12">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2 flex-shrink-0" />
                        <span className="text-white/70 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
                <div>
                  <p className="text-white/50 text-sm">
                    This is an introductory informational website.
                  </p>
                  <p className="text-white/40 text-sm mt-1">
                    Full privacy policy for AkashVahini products and services will be published upon product launch.
                  </p>
                </div>
                <a 
                  href="mailto:support@akashvahini.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Support</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-white/30 text-xs mt-8"
          >
            Last updated: December 2025
          </motion.p>
        </div>
      </div>
    </div>
  );
}
