import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useContactSection } from '../../hooks/useLandingData';

function MailIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6L12 13L2 6" />
    </svg>
  );
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const defaultButtons = [
  {
    label: 'About Us',
    href: '#about',
    primary: false,
  },
  {
    label: 'Meet the Team',
    href: 'mailto:assist.akashvahini@gmail.com',
    primary: true,
    icon: <MailIcon className="w-5 h-5" />,
  },
  {
    label: 'Join WhatsApp',
    href: 'https://chat.whatsapp.com/Gz8Gjofj6W96hKpPsg9qsC?mode=wwt',
    primary: false,
    icon: <WhatsAppIcon className="w-5 h-5" />,
    isWhatsApp: true,
  },
];

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const { data: contactData, isLoading } = useContactSection();
  
  const sectionTitle = contactData?.section_title || 'Ready to explore the future?';
  const sectionDescription = contactData?.section_description || 'Join us on our mission to redefine what\'s possible in the skies.';
  
  const buttons = contactData ? [
    {
      label: contactData.button_1_text || 'About Us',
      href: contactData.button_1_link || '#about',
      primary: false,
    },
    {
      label: contactData.button_2_text || 'Meet the Team',
      href: contactData.button_2_link || 'mailto:assist.akashvahini@gmail.com',
      primary: true,
      icon: <MailIcon className="w-5 h-5" />,
    },
    {
      label: contactData.button_3_text || 'Join WhatsApp',
      href: contactData.button_3_link || 'https://chat.whatsapp.com/Gz8Gjofj6W96hKpPsg9qsC?mode=wwt',
      primary: false,
      icon: <WhatsAppIcon className="w-5 h-5" />,
      isWhatsApp: true,
    },
  ] : defaultButtons;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-4"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-900/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {sectionTitle}
          </h2>
          
          <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
            {sectionDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {buttons.map((button, index) => (
              <motion.a
                key={button.label}
                href={button.href}
                target={button.href.startsWith('http') ? '_blank' : undefined}
                rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-500 flex items-center gap-3 ${
                  button.primary
                    ? ''
                    : (button as any).isWhatsApp 
                      ? 'glass-effect border-green-500/30 hover:border-green-400/50'
                      : 'glass-effect hover:border-cyan-400/50'
                }`}
              >
                {button.primary && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                  </>
                )}
                {(button as any).isWhatsApp && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                  </>
                )}
                {(button as any).icon && (
                  <span className={`relative z-10 ${
                    button.primary || (button as any).isWhatsApp
                      ? 'text-white' 
                      : 'text-white/80 group-hover:text-cyan-400 transition-colors'
                  }`}>
                    {(button as any).icon}
                  </span>
                )}
                <span className={`relative z-10 font-medium tracking-wide ${
                  button.primary || (button as any).isWhatsApp
                    ? 'text-white' 
                    : 'text-white/80 group-hover:text-cyan-400 transition-colors'
                }`}>
                  {button.label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
