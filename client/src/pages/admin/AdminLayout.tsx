import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, Redirect } from 'wouter';
import { 
  LayoutDashboard, 
  Home, 
  Info, 
  Users, 
  UserCheck, 
  Phone, 
  FileText,
  Mail,
  ChevronRight,
  ExternalLink,
  LogOut
} from 'lucide-react';
import { useAdminAuth } from '../../lib/stores/useAdminAuth';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/hero', label: 'Hero Section', icon: Home },
  { path: '/admin/about', label: 'About Section', icon: Info },
  { path: '/admin/mentors', label: 'Mentors', icon: UserCheck },
  { path: '/admin/team', label: 'Team Members', icon: Users },
  { path: '/admin/contact', label: 'Contact Section', icon: Phone },
  { path: '/admin/footer', label: 'Footer Section', icon: FileText },
  { path: '/admin/emails', label: 'Notify Emails', icon: Mail },
];

function AnimatedHamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-6 h-6 flex flex-col justify-center items-center">
      <span 
        className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-in-out ${
          isOpen ? 'rotate-45 translate-y-1.5' : ''
        }`}
      />
      <span 
        className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-in-out mt-1.5 ${
          isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
      />
      <span 
        className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-in-out mt-1.5 ${
          isOpen ? '-rotate-45 -translate-y-2' : ''
        }`}
      />
    </div>
  );
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, logout } = useAdminAuth();

  if (!isAuthenticated) {
    return <Redirect to="/admin/login" />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors shadow-lg"
          aria-label="Open menu"
        >
          <AnimatedHamburgerIcon isOpen={false} />
        </button>
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 z-40
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <p className="text-sm text-slate-400 mt-1">AkashVahini CMS</p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
            aria-label="Close menu"
          >
            <AnimatedHamburgerIcon isOpen={true} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsSidebarOpen(false)}
              >
                <div className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }
                `}>
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            <span>View Website</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/20 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="min-h-screen">
        <div className="pt-16 px-6 pb-6">
          {children}
        </div>
      </main>
    </div>
  );
}
