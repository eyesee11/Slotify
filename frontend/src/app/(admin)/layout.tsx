'use client';
import React, { useState, useEffect } from 'react';
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
  const [collapsed, setCollapsed] = useState(false);

  // Load state from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') setCollapsed(true);
  }, []);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('sidebar-collapsed', String(next));
  };

  return (
    <div className={`admin-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-logo">
          <img 
            src="/logo.png" 
            alt="Slotify Logo" 
            style={{ width: 24, height: 24, objectFit: 'contain' }} 
          />
          {!collapsed && <span className="logo-text">Slotify</span>}
          <button className="sidebar-collapse-btn" onClick={toggleCollapse}>
            {collapsed ? '»' : '«'}
          </button>
        </div>

        <div className="sidebar-create">
          <button className="create-btn">
            <Plus size={18} />
            {!collapsed && 'Create'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {MainNavLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link 
                key={href} 
                href={href} 
                className={`nav-item ${active ? 'active' : ''}`}
                title={collapsed ? label : ''}
              >
                <Icon size={18} />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <nav className="sidebar-nav">
            {BottomNavLinks.map(({ href, label, icon: Icon }) => (
              <Link 
                key={href} 
                href={href} 
                className="nav-item secondary"
                title={collapsed ? label : ''}
              >
                <Icon size={18} />
                {!collapsed && <span>{label}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="main-wrapper" style={{ marginLeft: collapsed ? '72px' : 'var(--sidebar-width)' }}>
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
