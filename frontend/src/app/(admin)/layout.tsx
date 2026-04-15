'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  CalendarDays, LayoutGrid, Clock, Users, Zap, 
  Settings, Layers, Plus, TrendingUp, BarChart3, 
  ShieldCheck, HelpCircle, ArrowUpCircle
} from 'lucide-react';
import ProfileDropdown from '@/components/ProfileDropdown';

const MainNavLinks = [
  { href: '/event-types', label: 'Scheduling', icon: LayoutGrid },
  { href: '/meetings', label: 'Meetings', icon: CalendarDays },
  { href: '/availability', label: 'Availability', icon: Clock },
  { href: '/contacts', label: 'Contacts', icon: Users },
  { href: '/workflows', label: 'Workflows', icon: Zap },
  { href: '/integrations', label: 'Integrations & apps', icon: Layers },
  { href: '/routing', label: 'Routing', icon: Layers },
];

const BottomNavLinks = [
  { href: '/upgrade', label: 'Upgrade plan', icon: ArrowUpCircle },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin-center', label: 'Admin center', icon: ShieldCheck },
  { href: '/help', label: 'Help', icon: HelpCircle },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <CalendarDays size={18} color="#fff" />
          </div>
          <span className="logo-text">Slotify</span>
          <button className="sidebar-collapse-btn">
            {/* Double Chevron icon or similar would go here */}
            «
          </button>
        </div>

        <div className="sidebar-create">
          <button className="create-btn">
            <Plus size={18} />
            Create
          </button>
        </div>

        <nav className="sidebar-nav">
          {MainNavLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link key={href} href={href} className={`nav-item ${active ? 'active' : ''}`}>
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <nav className="sidebar-nav">
            {BottomNavLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="nav-item secondary">
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="main-wrapper">
        <header className="admin-top-header">
          <ProfileDropdown />
        </header>
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}
