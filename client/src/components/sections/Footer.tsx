import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Linkedin, Send, ChevronRight, Instagram, Facebook, Youtube, Github } from 'lucide-react';
import { Link } from 'wouter';
import { useFooterSection } from '../../hooks/useLandingData';

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialIconMap: { [key: string]: React.ReactNode } = {
  'linkedin': <Linkedin className="w-4 h-4" />,
  'Linkedin': <Linkedin className="w-4 h-4" />,
  'x': <XIcon className="w-4 h-4" />,
  'X': <XIcon className="w-4 h-4" />,
  'twitter': <XIcon className="w-4 h-4" />,
  'Twitter': <XIcon className="w-4 h-4" />,
  'instagram': <Instagram className="w-4 h-4" />,
  'Instagram': <Instagram className="w-4 h-4" />,
  'facebook': <Facebook className="w-4 h-4" />,
  'Facebook': <Facebook className="w-4 h-4" />,
  'youtube': <Youtube className="w-4 h-4" />,
  'Youtube': <Youtube className="w-4 h-4" />,
  'github': <Github className="w-4 h-4" />,
  'Github': <Github className="w-4 h-4" />,
  'mail': <Mail className="w-4 h-4" />,
  'Mail': <Mail className="w-4 h-4" />,
  'default': <Mail className="w-4 h-4" />,
};

const defaultQuickLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About Us', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Technology', href: '#technology' },
  { name: 'Contact', href: '#contact' },
];

export function Footer() {
  const { section: footerSection, links: footerLinks, socialLinks: footerSocialLinks, isLoading } = useFooterSection();
  
  const companyName = footerSection?.company_name || 'AkashVahini';
  const companySuffix = footerSection?.company_suffix || 'Private Limited';
  const companyDescription = footerSection?.company_description || 'Pioneering the future of aerial technology with innovative drone solutions. Engineering excellence for defense, agriculture, and industrial applications.';
  const incorporationText = footerSection?.incorporation_text || 'Incorporated in India';
  const mapsUrl = footerSection?.maps_url || "https://www.google.com/maps/place/22%C2%B014'43.6%22N+84%C2%B048'55.7%22E/@22.245454,84.815479,17z/data=!3m1!4b1!4m4!3m3!8m2!3d22.245454!4d84.815479?entry=ttu&g_ep=EgoyMDI1MTIwMS4wIKXMDSoASAFQAw%3D%3D";
  const embedMapUrl = footerSection?.embed_map_url || "https://maps.google.com/maps?q=22.245454,84.815479&z=15&output=embed";
  
  const quickLinks = footerLinks.length > 0 
    ? footerLinks.map(link => ({ name: link.name, href: link.href }))
    : defaultQuickLinks;


  return (
    <footer className="relative py-16 px-4 border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[200px] bg-gradient-radial from-cyan-500/10 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8"
        >
          {/* Company Info */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="font-outfit text-2xl font-bold text-cyan-400 mb-1">
              {companyName}
            </h3>
            <p className="text-sm text-white/60 font-medium">
              {companySuffix}
            </p>
            <p className="text-xs text-white/40 mt-4 max-w-xs text-center lg:text-left leading-relaxed">
              {companyDescription}
            </p>
            <p className="text-xs text-white/30 mt-4">
              {incorporationText}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {footerSocialLinks.length > 0 ? (
                footerSocialLinks.map((social) => (
                  <a 
                    key={social.id}
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all"
                    aria-label={social.platform}
                  >
                    {socialIconMap[social.icon_name] || socialIconMap['default']}
                  </a>
                ))
              ) : (
                <>
                  <a 
                    href="#" 
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href="#" 
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all"
                    aria-label="X"
                  >
                    <XIcon className="w-4 h-4" />
                  </a>
                  <a 
                    href="mailto:contact@akashvahini.com" 
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="flex items-center gap-1 text-sm text-white/50 hover:text-cyan-400 transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-white/70">Our Location</span>
            </div>
            
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-xl">
              <iframe
                src={embedMapUrl}
                width="280"
                height="160"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
                title="AkashVahini Location"
              />
            </div>
            
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-white/40 hover:text-cyan-400 transition-colors"
            >
              <span>22°14'43.6"N 84°48'55.7"E</span>
              <svg 
                className="w-3 h-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Contact Info */}
            <div className="flex flex-col gap-2 mt-2">
              <a 
                href="mailto:contact@akashvahini.com" 
                className="flex items-center gap-2 text-xs text-white/40 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-3 h-3" />
                <span>contact@akashvahini.com</span>
              </a>
              <a 
                href="tel:+911234567890" 
                className="flex items-center gap-2 text-xs text-white/40 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>+91 123 456 7890</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 pt-6 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} {companyName} {companySuffix}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="text-xs text-white/30 hover:text-cyan-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/coming-soon" className="text-xs text-white/30 hover:text-cyan-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/coming-soon" className="text-xs text-white/30 hover:text-cyan-400 transition-colors">
                Careers
              </Link>
            </div>
            <p className="text-xs text-white/20 italic">
              Engineering the Next Aerial Evolution
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
