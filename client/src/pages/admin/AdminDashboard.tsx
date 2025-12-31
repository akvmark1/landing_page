import { useEffect, useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { 
  Home, 
  Info, 
  Users, 
  UserCheck, 
  Phone, 
  FileText,
  Mail,
  RefreshCw
} from 'lucide-react';
import { 
  getHeroSection,
  getAboutSection,
  getMentors,
  getTeamMembers,
  getContactSection,
  getFooterSection,
  getNotifyEmails
} from '../../lib/supabase';

interface SectionStatus {
  name: string;
  icon: React.ElementType;
  status: 'loading' | 'active' | 'inactive' | 'error';
  count?: number;
  path: string;
}

export function AdminDashboard() {
  const [sections, setSections] = useState<SectionStatus[]>([
    { name: 'Hero Section', icon: Home, status: 'loading', path: '/admin/hero' },
    { name: 'About Section', icon: Info, status: 'loading', path: '/admin/about' },
    { name: 'Mentors', icon: UserCheck, status: 'loading', path: '/admin/mentors' },
    { name: 'Team Members', icon: Users, status: 'loading', path: '/admin/team' },
    { name: 'Contact Section', icon: Phone, status: 'loading', path: '/admin/contact' },
    { name: 'Footer Section', icon: FileText, status: 'loading', path: '/admin/footer' },
    { name: 'Notify Emails', icon: Mail, status: 'loading', path: '/admin/emails' },
  ]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    setIsRefreshing(true);
    
    try {
      const [hero, about, mentors, team, contact, footer, emails] = await Promise.all([
        getHeroSection(),
        getAboutSection(),
        getMentors(),
        getTeamMembers(),
        getContactSection(),
        getFooterSection(),
        getNotifyEmails()
      ]);

      setSections([
        { name: 'Hero Section', icon: Home, status: hero ? 'active' : 'inactive', path: '/admin/hero' },
        { name: 'About Section', icon: Info, status: about ? 'active' : 'inactive', path: '/admin/about' },
        { name: 'Mentors', icon: UserCheck, status: mentors.length > 0 ? 'active' : 'inactive', count: mentors.length, path: '/admin/mentors' },
        { name: 'Team Members', icon: Users, status: team.length > 0 ? 'active' : 'inactive', count: team.length, path: '/admin/team' },
        { name: 'Contact Section', icon: Phone, status: contact ? 'active' : 'inactive', path: '/admin/contact' },
        { name: 'Footer Section', icon: FileText, status: footer ? 'active' : 'inactive', path: '/admin/footer' },
        { name: 'Notify Emails', icon: Mail, status: 'active', count: emails.length, path: '/admin/emails' },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSections(prev => prev.map(s => ({ ...s, status: 'error' as const })));
    }
    
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchData();
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchData();
      }
    };
    
    const handleFocus = () => {
      fetchData();
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 mt-1">Manage your landing page content</p>
          </div>
          <button
            onClick={fetchData}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            
            return (
              <a
                key={section.name}
                href={section.path}
                className="block p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className={`
                    p-3 rounded-lg 
                    ${section.status === 'active' ? 'bg-cyan-500/20 text-cyan-400' : 
                      section.status === 'loading' ? 'bg-slate-700 text-slate-400' :
                      section.status === 'error' ? 'bg-red-500/20 text-red-400' :
                      'bg-slate-700 text-slate-400'}
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`
                    px-2 py-1 rounded text-xs font-medium
                    ${section.status === 'active' ? 'bg-green-500/20 text-green-400' : 
                      section.status === 'loading' ? 'bg-slate-700 text-slate-400' :
                      section.status === 'error' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'}
                  `}>
                    {section.status === 'loading' ? 'Loading...' :
                     section.status === 'active' ? 'Active' :
                     section.status === 'error' ? 'Error' : 'Setup Required'}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mt-4 group-hover:text-cyan-400 transition-colors">
                  {section.name}
                </h3>
                
                {section.count !== undefined && (
                  <p className="text-slate-400 mt-1">
                    {section.count} {section.count === 1 ? 'item' : 'items'}
                  </p>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
