'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Clock, Globe, ArrowLeft, ChevronLeft, ChevronRight, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getEventTypeBySlug, getAvailableSlots, createBooking, cancelBooking, Booking, EventType } from '@/lib/api';
import {
  MONTHS, DAYS, getDaysInMonth, getFirstDayOfMonth,
  toDateString, formatDateLong, formatTime
} from '@/lib/utils';

// ---- Month Calendar ----
function MonthCalendar({
  selected, onSelect, slotsMap
}: {
  selected: string | null;
  onSelect: (date: string) => void;
  slotsMap: Record<string, boolean>;
}) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const getClass = (day: number | null) => {
    if (day === null) return 'cal-day other-month';
    const d = new Date(year, month, day);
    const isToday = d.toDateString() === today.toDateString();
    const isPast = d < today && !isToday;
    const dateStr = toDateString(d);
    const isSel = selected === dateStr;

    if (isSel) return 'cal-day selected';
    if (isPast) return 'cal-day unavailable';
    if (isToday) return 'cal-day today';
    // We'll load availability per click — default all future as available
    return 'cal-day available';
  };

  return (
    <div>
      <div className="calendar-header">
        <button className="cal-nav-btn" onClick={prevMonth}><ChevronLeft size={16} /></button>
        <span className="calendar-month-label">{MONTHS[month]} {year}</span>
        <button className="cal-nav-btn" onClick={nextMonth}><ChevronRight size={16} /></button>
      </div>
      <div className="calendar-grid">
        {DAYS.map(d => <div key={d} className="cal-day-name">{d}</div>)}
        {cells.map((day, idx) => (
          <div
            key={idx}
            className={getClass(day)}
            onClick={() => {
              if (day === null) return;
              const d = new Date(year, month, day);
              const isPast = d < today && d.toDateString() !== today.toDateString();
              if (!isPast) onSelect(toDateString(d));
            }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Time Slot Picker ----
function TimeSlotPicker({
  slots, selectedSlot, onSelect, loading
}: {
  slots: string[];
  selectedSlot: string | null;
  onSelect: (slot: string) => void;
  loading: boolean;
}) {
  if (loading) return (
    <div className="slots-loading">
      {[1,2,3,4,5].map(i => <div key={i} className="skeleton" style={{ height: 40 }} />)}
    </div>
  );

  if (slots.length === 0) return (
    <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--color-text-secondary)', fontSize: 14 }}>
      No available slots for this day.
    </div>
  );

  return (
    <div className="slots-panel">
      <div style={{
        background: 'var(--color-primary-light)',
        color: 'var(--color-primary)',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '12.5px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        marginBottom: '16px',
        lineHeight: 1.4,
        border: '1px solid var(--color-primary)'
      }}>
        <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
        <span>If you don't see your desired time slot here, it's already booked somewhere else or outside the operating hours.</span>
      </div>

      {slots.map(slot => (
        <button
          key={slot}
          className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
          onClick={() => onSelect(slot)}
        >
          {formatTime(slot)}
        </button>
      ))}
    </div>
  );
}

// ---- Booking Form ----
function BookingForm({
  eventType, selectedDate, selectedSlot, onBack, onSuccess
}: {
  eventType: EventType;
  selectedDate: string;
  selectedSlot: string;
  onBack: () => void;
  onSuccess: (token: string) => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { setError('Name and email are required'); return; }
    setLoading(true);
    setError('');
    try {
      const booking = await createBooking({
        event_type_slug: eventType.slug,
        invitee_name: name,
        invitee_email: email,
        start_time: selectedSlot,
        notes,
        invitee_answers: answers
      });
      onSuccess(booking.cancel_token);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={onBack}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-primary)', fontSize: 13, marginBottom: 20, padding: 0 }}
      >
        <ArrowLeft size={14} /> Pick a different time
      </button>

      <div style={{ marginBottom: 20, padding: '12px 14px', background: 'var(--color-primary-light)', borderRadius: 8 }}>
        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 2 }}>Selected time</div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{formatDateLong(selectedSlot)}</div>
        <div style={{ fontSize: 13, color: 'var(--color-primary)' }}>{formatTime(selectedSlot)}</div>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Enter details</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label className="label">Name *</label>
          <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" />
        </div>
        <div>
          <label className="label">Email *</label>
          <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>

        {eventType.questions && Array.isArray(eventType.questions) && eventType.questions.map((q: string) => (
          <div key={q}>
            <label className="label">{q}</label>
            <input 
              className="input" 
              value={answers[q] || ''} 
              onChange={e => setAnswers({ ...answers, [q]: e.target.value })}
              placeholder="Your answer..."
            />
          </div>
        ))}

        <div>
          <label className="label">
            Please share anything that will help prepare for our meeting{' '}
            <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}>(Optional)</span>
          </label>
          <textarea className="textarea" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any notes for the host..." />
        </div>
        {error && <p style={{ color: 'var(--color-error)', fontSize: 13 }}>{error}</p>}
        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
          {loading ? 'Scheduling…' : 'Schedule Event'}
        </button>
      </form>
    </div>
  );
}

// ---- Main Booking Page ----
export default function BookingPage({ params }: { params: Promise<{ username: string; slug: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isReschedule = searchParams.get('reschedule') === 'true';
  const oldToken = searchParams.get('token');

  const [resolvedParams, setResolvedParams] = useState<{ username: string; slug: string } | null>(null);
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<'calendar' | 'form'>('calendar');

  useEffect(() => {
    params.then(p => {
      setResolvedParams(p);
      getEventTypeBySlug(p.slug)
        .then(setEventType)
        .catch(() => {})
        .finally(() => setLoading(false));
    });
  }, [params]);

  const loadSlots = useCallback(async (date: string) => {
    if (!resolvedParams) return;
    setSlotsLoading(true);
    setSlots([]);
    try {
      const s = await getAvailableSlots(resolvedParams.slug, date);
      setSlots(s);
    } finally {
      setSlotsLoading(false);
    }
  }, [resolvedParams]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    loadSlots(date);
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    setStep('form');
  };

  const handleBookingSuccess = async (token: string) => {
    if (resolvedParams) {
      // If rescheduling, cancel the old booking
      if (isReschedule && oldToken) {
        try {
          // Assuming cancelBooking is imported or available via api
          const { cancelBooking } = await import('@/lib/api');
          await cancelBooking(oldToken);
        } catch (e) {
          console.error('Failed to cancel old booking during reschedule', e);
        }
      }
      router.push(`/${resolvedParams.username}/${resolvedParams.slug}/confirm?token=${token}`);
    }
  };

  if (loading) return (
    <div className="booking-page">
      <div className="booking-card">
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="skeleton" style={{ width: 200, height: 20 }} />
        </div>
      </div>
    </div>
  );

  if (!eventType) return (
    <div className="booking-page">
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Event not found</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>This booking link is invalid or has been removed.</p>
      </div>
    </div>
  );

  return (
    <div className="booking-page">
      {isReschedule && (
        <div style={{
          background: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          padding: '12px 20px',
          borderRadius: 'var(--radius-md)',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontSize: 14,
          fontWeight: 500,
          border: '1px solid var(--color-primary)',
          maxWidth: 1000,
          width: 'calc(100% - 40px)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <AlertCircle size={20} />
          <span>You are rescheduling your meeting. Please select a new date and time.</span>
        </div>
      )}
      <div className="booking-card">
        {/* Left panel */}
        <div className="booking-left">
          {resolvedParams && (
            <Link href={`/${resolvedParams.username}`} style={{ color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, textDecoration: 'none', marginBottom: 4 }}>
              <ArrowLeft size={14} /> Back
            </Link>
          )}
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: eventType.color || 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Clock size={18} color="#fff" />
          </div>
          <div style={{ color: 'var(--color-text-secondary)', fontSize: 13 }}>Default User</div>
          <div className="booking-event-title">{eventType.name}</div>
          <div className="booking-meta">
            <Clock size={14} />
            <span>{eventType.duration_minutes} min</span>
          </div>
          <div className="booking-meta">
            <Globe size={14} />
            <span style={{ fontSize: 12 }}>Asia/Kolkata</span>
          </div>
          {eventType.description && (
            <>
              <hr className="divider" />
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{eventType.description}</p>
            </>
          )}
        </div>

        {/* Right panel */}
        <div className="booking-right">
          <AnimatePresence mode="wait">
            {step === 'calendar' ? (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="split-panel"
              >
                {/* Calendar column */}
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Select a date</h3>
                  <MonthCalendar
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    slotsMap={{}}
                  />
                </div>

                {/* Slots column */}
                {selectedDate && (slots.length > 0 || slotsLoading) && (
                  <div style={{ minWidth: 180 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                      {formatDateLong(selectedDate + 'T00:00:00')}
                    </h3>
                    <TimeSlotPicker
                      slots={slots}
                      selectedSlot={selectedSlot}
                      onSelect={handleSlotSelect}
                      loading={slotsLoading}
                    />
                  </div>
                )}
                {selectedDate && slots.length === 0 && !slotsLoading && (
                  <div style={{ minWidth: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', fontSize: 14 }}>
                    No available time slots on this date.
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <BookingForm
                  eventType={eventType}
                  selectedDate={selectedDate!}
                  selectedSlot={selectedSlot!}
                  onBack={() => { setStep('calendar'); setSelectedSlot(null); }}
                  onSuccess={handleBookingSuccess}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
