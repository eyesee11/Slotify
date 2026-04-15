'use client';
import { useEffect, useState, useRef } from 'react';
import { Plus, MoreHorizontal, Copy, Pencil, Trash2, Link, ExternalLink } from 'lucide-react';
import { getEventTypes, createEventType, updateEventType, deleteEventType, EventType } from '@/lib/api';
import { slugify, EVENT_COLORS } from '@/lib/utils';

// ---- Create/Edit Modal ----
function EventTypeModal({
  initial,
  onClose,
  onSave,
}: {
  initial?: EventType | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [duration, setDuration] = useState(initial?.duration_minutes ?? 30);
  const [buffer, setBuffer] = useState(initial?.buffer_minutes ?? 0);
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [color, setColor] = useState(initial?.color ?? EVENT_COLORS[0]);
  const [questions, setQuestions] = useState<string[]>(initial?.questions || []);
  const [newQuestion, setNewQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNameChange = (v: string) => {
    setName(v);
    if (!initial) setSlug(slugify(v));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) { setError('Name and slug are required'); return; }
    setLoading(true);
    setError('');
    try {
      if (initial) {
        await updateEventType(initial.id, { name, duration_minutes: duration, buffer_minutes: buffer, slug, description, color, questions });
      } else {
        await createEventType({ name, duration_minutes: duration, buffer_minutes: buffer, slug, description, color, questions });
      }
      onSave();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
          {initial ? 'Edit Event Type' : 'New Event Type'}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label className="label">Event name *</label>
            <input className="input" value={name} onChange={e => handleNameChange(e.target.value)} placeholder="e.g. 30 Minute Meeting" />
          </div>

          <div>
            <label className="label">Duration</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[15, 30, 45, 60].map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  style={{
                    flex: 1, height: 40, border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)', cursor: 'pointer',
                    background: duration === d ? 'var(--color-primary)' : '#fff',
                    color: duration === d ? '#fff' : 'var(--color-text-primary)',
                    fontWeight: 600, fontSize: 14, transition: 'all 0.12s',
                  }}
                >
                  {d} min
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Buffer time (before/after)</label>
            <select className="select" value={buffer} onChange={e => setBuffer(parseInt(e.target.value))}>
              <option value={0}>No buffer</option>
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
            </select>
            <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 4 }}>
              Add a gap between meetings to prevent back-to-back scheduling.
            </p>
          </div>

          <div>
            <label className="label">URL slug *</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <span style={{
                height: 40, padding: '0 10px', background: 'var(--color-surface)',
                border: '1px solid var(--color-border)', borderRight: 'none',
                borderRadius: 'var(--radius-md) 0 0 var(--radius-md)',
                display: 'flex', alignItems: 'center', fontSize: 13,
                color: 'var(--color-text-secondary)', whiteSpace: 'nowrap',
              }}>
                cal/default_user/
              </span>
              <input
                className="input"
                value={slug}
                onChange={e => setSlug(slugify(e.target.value))}
                style={{ borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}
                placeholder="30-min-meeting"
              />
            </div>
          </div>

          <div>
            <label className="label">Description <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}>(Optional)</span></label>
            <textarea className="textarea" value={description} onChange={e => setDescription(e.target.value)} placeholder="What's this event about?" />
          </div>

          <div>
            <label className="label">Event color</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {EVENT_COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  style={{
                    width: 28, height: 28, borderRadius: '50%', background: c, border: 'none',
                    cursor: 'pointer', outline: color === c ? `3px solid ${c}` : 'none',
                    outlineOffset: 2, position: 'relative',
                  }}
                >
                  {color === c && (
                    <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Custom questions</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
              {questions.map((q, i) => (
                <div key={i} style={{ display: 'flex', gap: 8 }}>
                  <input className="input" value={q} readOnly />
                  <button type="button" className="btn-ghost" onClick={() => setQuestions(questions.filter((_, idx) => idx !== i))} style={{ padding: '0 10px' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="input" value={newQuestion} onChange={e => setNewQuestion(e.target.value)} placeholder="Add a question..." />
              <button type="button" className="btn-ghost" onClick={() => { if (newQuestion.trim()) { setQuestions([...questions, newQuestion.trim()]); setNewQuestion(''); } }}>Add</button>
            </div>
          </div>

          {error && <p style={{ color: 'var(--color-error)', fontSize: 13 }}>{error}</p>}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving…' : initial ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- Dropdown Menu ----
function EventCardMenu({ eventType, onEdit, onDelete }: { eventType: EventType; onEdit: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const copyLink = () => {
    const url = `${window.location.origin}/default_user/${eventType.slug}`;
    navigator.clipboard.writeText(url);
    setOpen(false);
  };

  return (
    <div className="dropdown" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 6, color: 'var(--color-text-secondary)' }}
      >
        <MoreHorizontal size={18} />
      </button>
      {open && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={() => { onEdit(); setOpen(false); }}>
            <Pencil size={14} /> Edit
          </button>
          <button className="dropdown-item" onClick={copyLink}>
            <Copy size={14} /> Copy link
          </button>
          <button className="dropdown-item danger" onClick={() => { onDelete(); setOpen(false); }}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ---- Main Page ----
export default function EventTypesPage() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<EventType | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<EventType | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setEventTypes(await getEventTypes());
    } catch (err: any) {
      setError(err.message || 'Failed to load event types');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setDeleteLoading(true);
    try {
      await deleteEventType(deleteConfirm.id);
      setDeleteConfirm(null);
      load();
    } finally { setDeleteLoading(false); }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Event Types</h1>
          <p className="page-subtitle">Create events to share for people to book on your calendar</p>
        </div>
        <button className="btn-primary" onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus size={16} /> New Event Type
        </button>
      </div>

      {error && (
        <div style={{ background: '#fdf0f0', border: '1px solid var(--color-error)', color: 'var(--color-error)', padding: '12px 16px', borderRadius: 8, marginBottom: 24, fontSize: 14 }}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="et-grid">
          {[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: 120, borderRadius: 8 }} />)}
        </div>
      ) : (
        <div className="et-grid">
          {eventTypes.map(et => (
            <div key={et.id} className="et-card">
              <div className="et-card-accent" style={{ background: et.color || 'var(--color-primary)' }} />
              <div className="et-card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div className="et-card-name">{et.name}</div>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
                      <span className="badge badge-gray" style={{ padding: '4px 10px', fontSize: '12px' }}>{et.duration_minutes} min</span>
                      {et.buffer_minutes > 0 && <span className="badge badge-blue">+{et.buffer_minutes}m buffer</span>}
                    </div>
                    <div className="et-card-slug" style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-primary)', fontWeight: 500 }}>
                      <ExternalLink size={14} />
                      <span style={{ fontSize: '13px' }}>default_user/{et.slug}</span>
                    </div>
                    {et.description && (
                      <p style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginTop: 8 }}>
                        {et.description}
                      </p>
                    )}
                  </div>
                  <EventCardMenu
                    eventType={et}
                    onEdit={() => { setEditing(et); setModalOpen(true); }}
                    onDelete={() => setDeleteConfirm(et)}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* New Event Type card */}
          <div className="et-card-new" onClick={() => { setEditing(null); setModalOpen(true); }}>
            <Plus size={24} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>New Event Type</span>
          </div>
        </div>
      )}

      {modalOpen && (
        <EventTypeModal
          initial={editing}
          onClose={() => { setModalOpen(false); setEditing(null); }}
          onSave={load}
        />
      )}

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setDeleteConfirm(null)}>
          <div className="modal-card" style={{ maxWidth: 380 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Delete Event Type</h2>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 24 }}>
              Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This action cannot be undone and all associated bookings will be removed.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button className="btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button
                style={{ background: 'var(--color-error)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', height: 40, padding: '0 16px', cursor: 'pointer', fontWeight: 500 }}
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
