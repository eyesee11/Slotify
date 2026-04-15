import { getEventTypes } from '@/lib/api';
import { getInitials } from '@/lib/utils';
import Link from 'next/link';
import { Clock, ChevronRight } from 'lucide-react';

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  let eventTypes = [];
  try { eventTypes = await getEventTypes(); } catch {}

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">{getInitials('Default User')}</div>
          <h1 className="profile-name">Default User</h1>
          <p className="profile-subtitle">Available for bookings</p>
        </div>

        <hr className="divider" style={{ margin: '0 0 24px' }} />

        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Select an event type</h2>
          <div className="profile-events">
            {eventTypes.filter((et: { is_active: boolean }) => et.is_active).map((et: {
              id: number;
              slug: string;
              color?: string;
              name: string;
              duration_minutes: number;
              description?: string;
            }) => (
              <Link key={et.id} href={`/${username}/${et.slug}`} className="profile-event-card">
                <div className="profile-event-dot" style={{ background: et.color || 'var(--color-primary)' }} />
                <div className="profile-event-body">
                  <div className="profile-event-name">{et.name}</div>
                  <div className="profile-event-desc">
                    <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                    {et.duration_minutes} min
                    {et.description && <span> · {et.description}</span>}
                  </div>
                </div>
                <ChevronRight size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </div>

        <div className="profile-footer">
          Powered by <strong>Slotify</strong>
        </div>
      </div>
    </div>
  );
}
