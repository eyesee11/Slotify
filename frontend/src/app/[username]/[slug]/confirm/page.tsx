'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Check, Calendar, Clock, Video, User, Mail, X } from 'lucide-react';
import { getBookingConfirmation, cancelBooking, Booking } from '@/lib/api';
import { formatDateLong, formatTimeRange } from '@/lib/utils';

export default function ConfirmPage({ params }: { params: Promise<{ username: string; slug: string }> }) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelled, setCancelled] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    getBookingConfirmation(token)
      .then(setBooking)
      .catch(() => setError('Booking not found.'))
      .finally(() => setLoading(false));
  }, [token]);

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this meeting?')) return;
    setCancelling(true);
    try {
      await cancelBooking(token);
      setCancelled(true);
    } catch {
      setError('Failed to cancel booking. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  // Add to Google Calendar link
  const gcalLink = () => {
    if (!booking) return '#';
    const start = new Date(booking.start_time).toISOString().replace(/-|:|\.\d{3}/g, '');
    const end = new Date(booking.end_time).toISOString().replace(/-|:|\.\d{3}/g, '');
    const title = encodeURIComponent(booking.event_type?.name ?? 'Meeting');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}`;
  };

  if (loading) return (
    <div className="confirm-page">
      <div className="confirm-card">
        <div className="skeleton" style={{ width: 56, height: 56, borderRadius: '50%', margin: '0 auto 20px' }} />
        <div className="skeleton" style={{ height: 28, marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 16, marginBottom: 24 }} />
      </div>
    </div>
  );

  if (error) return (
    <div className="confirm-page">
      <div className="confirm-card">
        <p style={{ color: 'var(--color-error)', fontSize: 16 }}>{error}</p>
      </div>
    </div>
  );

  if (cancelled) return (
    <div className="confirm-page">
      <div className="confirm-card">
        <div className="confirm-check" style={{ background: 'var(--color-error)' }}>
          <X size={26} color="#fff" />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Meeting Cancelled</h1>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 20 }}>
          Your meeting has been cancelled successfully.
        </p>
        <Link href="/" className="btn-primary" style={{ justifyContent: 'center' }}>Go to Home</Link>
      </div>
    </div>
  );

  if (!booking) return null;

  return (
    <div className="confirm-page">
      <div className="confirm-card">
        {/* Check icon */}
        <div className="confirm-check">
          <Check size={26} color="#fff" />
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Confirmed!</h1>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
          A calendar invitation has been sent to your email address.
        </p>

        <hr className="divider" style={{ margin: '20px 0' }} />

        {/* Details */}
        <div className="confirm-details">
          <div className="confirm-row">
            <Calendar size={16} style={{ flexShrink: 0, color: 'var(--color-primary)' }} />
            <span>{formatDateLong(booking.start_time)}</span>
          </div>
          <div className="confirm-row">
            <Clock size={16} style={{ flexShrink: 0, color: 'var(--color-primary)' }} />
            <span>{formatTimeRange(booking.start_time, booking.end_time)}</span>
          </div>
          {booking.event_type && (
            <div className="confirm-row">
              <Video size={16} style={{ flexShrink: 0, color: 'var(--color-primary)' }} />
              <span>{booking.event_type.name}</span>
            </div>
          )}
          <div className="confirm-row">
            <User size={16} style={{ flexShrink: 0, color: 'var(--color-primary)' }} />
            <span>{booking.invitee_name}</span>
          </div>
          <div className="confirm-row">
            <Mail size={16} style={{ flexShrink: 0, color: 'var(--color-primary)' }} />
            <span>{booking.invitee_email}</span>
          </div>
        </div>

        <hr className="divider" style={{ margin: '20px 0' }} />

        {/* Actions */}
        <a
          href={gcalLink()}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
          style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}
        >
          Add to Google Calendar
        </a>

        <Link
          href={`/${booking.event_type?.user?.username || 'user'}/${booking.event_type?.slug}?reschedule=true&token=${token}`}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', marginBottom: 12, background: 'var(--color-surface)', color: 'var(--color-primary)', border: '1px solid var(--color-primary)' }}
        >
          Reschedule
        </Link>

        <button
          onClick={handleCancel}
          disabled={cancelling}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)', fontSize: 13, fontWeight: 500, textDecoration: 'underline' }}
        >
          {cancelling ? 'Cancelling…' : 'Cancel this event'}
        </button>
      </div>
    </div>
  );
}
