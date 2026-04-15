'use client';
import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, Calendar } from 'lucide-react';
import { getAvailability, updateAvailability, getOverrides, addOverride, deleteOverride, AvailabilityRule, AvailabilityResponse, DateOverride } from '@/lib/api';
import { DAYS_FULL, displayTime, TIME_OPTIONS, TIMEZONES, formatDate } from '@/lib/utils';

export default function AvailabilityPage() {
  const [timezone, setTimezone] = useState('UTC');
  const [rules, setRules] = useState<AvailabilityRule[]>([]);
  const [overrides, setOverrides] = useState<DateOverride[]>([]);
  const [scheduleId, setScheduleId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // New override form state
  const [showOverrideForm, setShowOverrideForm] = useState(false);
  const [newOvDate, setNewOvDate] = useState('');
  const [newOvUnavailable, setNewOvUnavailable] = useState(false);
  const [newOvStart, setNewOvStart] = useState('09:00:00');
  const [newOvEnd, setNewOvEnd] = useState('17:00:00');

  useEffect(() => {
    Promise.all([
      getAvailability(),
      getOverrides()
    ]).then(([avData, ovData]) => {
      setTimezone(avData.timezone || 'UTC');
      setScheduleId(avData.schedule.id);
      const sorted = [...avData.schedule.rules].sort((a, b) => a.day_of_week - b.day_of_week);
      setRules(sorted);
      setOverrides(ovData);
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
  }, []);

  const updateRule = (idx: number, patch: Partial<AvailabilityRule>) => {
    setRules(prev => prev.map((r, i) => i === idx ? { ...r, ...patch } : r));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await updateAvailability({
        timezone,
        schedule: { id: scheduleId!, rules },
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleAddOverride = async () => {
    if (!newOvDate) return;
    try {
      const added = await addOverride({
        override_date: newOvDate,
        is_unavailable: newOvUnavailable,
        start_time: newOvUnavailable ? null : newOvStart,
        end_time: newOvUnavailable ? null : newOvEnd
      });
      setOverrides(prev => [...prev.filter(o => o.override_date !== added.override_date), added].sort((a, b) => a.override_date.localeCompare(b.override_date)));
      setShowOverrideForm(false);
      setNewOvDate('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteOverride = async (id: number) => {
    try {
      await deleteOverride(id);
      setOverrides(prev => prev.filter(o => o.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const dayLabel = (dow: number) => DAYS_FULL[dow];

  if (loading) return (
    <div className="page-content">
      <div className="page-header"><h1 className="page-title">Availability</h1></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[...Array(7)].map((_, i) => <div key={i} className="skeleton" style={{ height: 56, borderRadius: 8 }} />)}
      </div>
    </div>
  );

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Availability</h1>
          <p className="page-subtitle">Set when you are available for bookings</p>
        </div>
        <button className="btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={15} /> {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, alignItems: 'start' }}>
        {/* Weekly Schedule */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 0 20px', borderBottom: '1px solid var(--color-border)', marginBottom: 20 }}>
            <span style={{ fontSize: 14, fontWeight: 500, minWidth: 90 }}>Time zone</span>
            <select className="select" value={timezone} onChange={e => setTimezone(e.target.value)}>
              {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
            </select>
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 12 }}>Weekly hours</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {rules.map((rule, idx) => (
              <div key={rule.id ?? rule.day_of_week} className="avail-row">
                <label className="toggle-root">
                  <input
                    type="checkbox"
                    checked={rule.is_available}
                    onChange={e => updateRule(idx, { is_available: e.target.checked })}
                  />
                  <span className="toggle-slider" />
                </label>
                <span className="avail-day">{dayLabel(rule.day_of_week)}</span>
                {rule.is_available ? (
                  <div className="avail-time">
                    <select className="time-select" value={rule.start_time} onChange={e => updateRule(idx, { start_time: e.target.value })}>
                      {TIME_OPTIONS.map(t => <option key={t} value={t}>{displayTime(t)}</option>)}
                    </select>
                    <span style={{ color: 'var(--color-text-secondary)' }}>–</span>
                    <select className="time-select" value={rule.end_time} onChange={e => updateRule(idx, { end_time: e.target.value })}>
                      {TIME_OPTIONS.map(t => <option key={t} value={t}>{displayTime(t)}</option>)}
                    </select>
                  </div>
                ) : (
                  <span className="avail-unavailable">Unavailable</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Date Overrides */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-secondary)' }}>Date overrides</h3>
            {!showOverrideForm && (
              <button className="btn-ghost btn-sm" onClick={() => setShowOverrideForm(true)}>
                <Plus size={14} /> Add an override
              </button>
            )}
          </div>

          {showOverrideForm && (
            <div style={{ padding: 16, background: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-border)', marginBottom: 16 }}>
              <div style={{ marginBottom: 12 }}>
                <label className="label">Select Date</label>
                <input type="date" className="input" value={newOvDate} onChange={e => setNewOvDate(e.target.value)} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <input type="checkbox" checked={newOvUnavailable} onChange={e => setNewOvUnavailable(e.target.checked)} id="unavail" />
                <label htmlFor="unavail" style={{ fontSize: 13, cursor: 'pointer' }}>Mark as unavailable</label>
              </div>
              {!newOvUnavailable && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <select className="time-select" value={newOvStart} onChange={e => setNewOvStart(e.target.value)}>
                    {TIME_OPTIONS.map(t => <option key={t} value={t}>{displayTime(t)}</option>)}
                  </select>
                  <span>–</span>
                  <select className="time-select" value={newOvEnd} onChange={e => setNewOvEnd(e.target.value)}>
                    {TIME_OPTIONS.map(t => <option key={t} value={t}>{displayTime(t)}</option>)}
                  </select>
                </div>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-primary btn-sm" onClick={handleAddOverride}>Apply</button>
                <button className="btn-ghost btn-sm" onClick={() => setShowOverrideForm(false)}>Cancel</button>
              </div>
            </div>
          )}

          {overrides.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--color-text-secondary)' }}>
              <Calendar size={32} style={{ opacity: 0.2, marginBottom: 8 }} />
              <p style={{ fontSize: 13 }}>No date overrides yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {overrides.map(ov => (
                <div key={ov.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 8 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{formatDate(ov.override_date)}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                      {ov.is_unavailable ? 'Unavailable' : `${displayTime(ov.start_time!)} – ${displayTime(ov.end_time!)}`}
                    </div>
                  </div>
                  <button className="icon-btn danger" onClick={() => handleDeleteOverride(ov.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && <p style={{ color: 'var(--color-error)', fontSize: 13, marginTop: 12 }}>{error}</p>}
    </div>
  );
}

