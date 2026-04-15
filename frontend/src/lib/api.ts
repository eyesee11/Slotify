const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    let msg = `API Error ${res.status}`;
    try { msg = JSON.parse(text)?.error || msg; } catch { }
    throw new Error(msg);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

// ---- Types ----
export interface EventType {
  id: number;
  user_id: number;
  name: string;
  slug: string;
  duration_minutes: number;
  buffer_minutes: number;
  description?: string;
  questions?: any;
  color?: string;
  is_active: boolean;
  created_at: string;
  bookings?: number;
}

export interface AvailabilityRule {
  id: number;
  availability_id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface AvailabilitySchedule {
  id: number;
  user_id: number;
  name: string;
  is_default: boolean;
  rules: AvailabilityRule[];
}

export interface AvailabilityResponse {
  timezone: string;
  schedule: AvailabilitySchedule;
}

export interface Booking {
  id: number;
  event_type_id: number;
  invitee_name: string;
  invitee_email: string;
  start_time: string;
  end_time: string;
  status: 'scheduled' | 'cancelled';
  cancel_token: string;
  notes?: string;
  created_at: string;
  event_type?: EventType & { user?: { name: string; username: string; timezone: string } };
}

// ---- Event Types ----
export const getEventTypes = () => apiFetch<EventType[]>('/event-types');
export const getEventTypeBySlug = (slug: string) => apiFetch<EventType>(`/event-types/${slug}`);
export const createEventType = (data: Partial<EventType>) =>
  apiFetch<EventType>('/event-types', { method: 'POST', body: JSON.stringify(data) });
export const updateEventType = (id: number, data: Partial<EventType>) =>
  apiFetch<EventType>(`/event-types/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteEventType = (id: number) =>
  apiFetch<void>(`/event-types/${id}`, { method: 'DELETE' });

// ---- Availability ----
export interface DateOverride {
  id: number;
  availability_id: number;
  override_date: string;
  is_unavailable: boolean;
  start_time: string | null;
  end_time: string | null;
}

export const getAvailability = () => apiFetch<AvailabilityResponse>('/availability');
export const updateAvailability = (data: { timezone?: string; schedule?: Partial<AvailabilitySchedule> }) =>
  apiFetch<{ success: boolean }>('/availability', { method: 'PUT', body: JSON.stringify(data) });

export const getOverrides = () => apiFetch<DateOverride[]>('/availability/overrides');
export const addOverride = (data: Partial<DateOverride>) =>
  apiFetch<DateOverride>('/availability/overrides', { method: 'POST', body: JSON.stringify(data) });
export const deleteOverride = (id: number) =>
  apiFetch<void>(`/availability/overrides/${id}`, { method: 'DELETE' });

// ---- Bookings ----
export const getAvailableSlots = (slug: string, date: string) =>
  apiFetch<string[]>(`/bookings/slots?slug=${slug}&date=${date}`);
export const createBooking = (data: {
  event_type_slug: string;
  invitee_name: string;
  invitee_email: string;
  start_time: string;
  notes?: string;
}) => apiFetch<Booking>('/bookings', { method: 'POST', body: JSON.stringify(data) });
export const getBookingConfirmation = (token: string) => apiFetch<Booking>(`/bookings/confirm/${token}`);
export const cancelBooking = (token: string) =>
  apiFetch<{ success: boolean }>(`/bookings/${token}`, { method: 'DELETE' });

// ---- Meetings ----
export const getMeetings = (filter: 'upcoming' | 'past') =>
  apiFetch<Booking[]>(`/meetings?filter=${filter}`);
export const cancelMeeting = (id: number) =>
  apiFetch<{ success: boolean }>(`/meetings/${id}`, { method: 'DELETE' });
