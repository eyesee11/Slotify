'use client';
import { useEffect, useState } from 'react';
import { CalendarX, X } from 'lucide-react';
import { getMeetings, cancelMeeting, Booking } from '@/lib/api';
import { formatDateLong, formatTimeRange } from '@/lib/utils';

function MeetingCard({ booking, onCancel, isPast }: { booking: Booking; onCancel?: () => void; isPast?: boolean }) {
  const accentColor = booking.event_type?.color ?? '#006BFF';
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    if (!confirm(`Cancel meeting with ${booking.invitee_name}?`)) return;
    setCancelling(true);
    try {
      await cancelMeeting(booking.id);
      onCancel?.();
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className={`meeting-card ${isPast ? 'past' : ''}`}>
      <div className="meeting-card-accent" style={{ background: accentColor }} />
      <div className="meeting-card-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <span className="meeting-card-name">{booking.invitee_name}</span>
          {booking.event_type && (
            <span className="badge badge-blue">{booking.event_type.name}</span>
          )}
          {booking.status === 'cancelled' && (
            <span className="badge" style={{ background: '#fdf0f0', color: 'var(--color-error)' }}>Cancelled</span>
          )}
        </div>
        <div className="meeting-card-email">{booking.invitee_email}</div>
        {booking.notes && (
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>&ldquo;{booking.notes}&rdquo;</div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
        <div className="meeting-card-time">
          <div style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>
            {formatDateLong(booking.start_time)}
          </div>
          <div>{formatTimeRange(booking.start_time, booking.end_time)}</div>
        </div>
        {!isPast && booking.status === 'scheduled' && (
          <button className="btn-danger btn-sm" onClick={handleCancel} disabled={cancelling}>
            <X size={13} /> {cancelling ? 'Cancelling…' : 'Cancel'}
          </button>
        )}
      </div>
    </div>
  );
}

export default function MeetingsPage() {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [meetings, setMeetings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { setMeetings(await getMeetings(tab)); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [tab]);

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Scheduled Events</h1>
          <p className="page-subtitle">View and manage your upcoming and past meetings</p>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === 'upcoming' ? 'active' : ''}`} onClick={() => setTab('upcoming')}>Upcoming</button>
        <button className={`tab ${tab === 'past' ? 'active' : ''}`} onClick={() => setTab('past')}>Past</button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 90, borderRadius: 8 }} />)}
        </div>
      ) : meetings.length === 0 ? (
        <div className="empty-state">
          <CalendarX size={48} />
          <div style={{ fontSize: 16, fontWeight: 600 }}>No meetings yet</div>
          <div style={{ fontSize: 14 }}>{tab === 'upcoming' ? 'No upcoming meetings scheduled.' : 'No past meetings to show.'}</div>
        </div>
      ) : (
        <div>
          {meetings.map(m => (
            <MeetingCard key={m.id} booking={m} isPast={tab === 'past'} onCancel={load} />
          ))}
        </div>
      )}
    </div>
  );
}
