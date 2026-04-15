'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, Star, Link as LinkIcon, Settings, 
  BookOpen, MessageCircle, ExternalLink, LogOut,
  ChevronDown, UserPlus
} from 'lucide-react';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Mock logout - clear any local storage or cookies if needed
    router.push('/');
  };

  return (
    <div className="profile-dropdown-container" ref={dropdownRef}>
      <div className="header-actions">
        <button className="icon-btn" title="Account Switcher">
          <UserPlus size={18} />
        </button>
        
        <button 
          className={`profile-trigger ${isOpen ? 'active' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="avatar-circle">A</div>
          <ChevronDown size={14} className={`chevron ${isOpen ? 'rotate' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-panel">
          {/* User Status Header */}
          <div className="dropdown-header">
            <div className="user-name">Ayush Chauhan</div>
            <div className="trial-info">
              Teams free trial <Link href="#" className="upgrade-link">Upgrade</Link>
            </div>
            <div className="days-badge">13 days left</div>
          </div>

          <div className="dropdown-divider" />

          {/* Account Settings */}
          <div className="dropdown-section">
            <div className="section-label">Account settings</div>
            <Link href="/profile" className="dropdown-link">
              <User size={16} /> Profile
            </Link>
            <Link href="/branding" className="dropdown-link">
              <Star size={16} /> Branding
            </Link>
            <Link href="/my-link" className="dropdown-link">
              <LinkIcon size={16} /> My Link
            </Link>
            <Link href="/settings" className="dropdown-link">
              <Settings size={16} /> All settings
            </Link>
          </div>

          <div className="dropdown-divider" />

          {/* Resources */}
          <div className="dropdown-section">
            <div className="section-label">Resources</div>
            <Link href="#" className="dropdown-link">
              <BookOpen size={16} /> Getting started guide
            </Link>
            <Link href="#" className="dropdown-link">
              <MessageCircle size={16} /> Community
            </Link>
            <a href="https://slotify.com" target="_blank" rel="noopener noreferrer" className="dropdown-link">
              <ExternalLink size={16} /> Visit slotify.com
            </a>
          </div>

          <div className="dropdown-divider" />

          {/* Session */}
          <button onClick={handleLogout} className="dropdown-link logout-btn">
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
