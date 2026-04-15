import { format, parseISO } from 'date-fns';

export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const DAYS_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function formatDate(isoString: string) {
  return format(parseISO(isoString), 'EEE, MMM d');
}

export function formatDateTime(isoString: string) {
  return format(parseISO(isoString), 'EEE, MMM d · h:mm a');
}

export function formatDateLong(isoString: string) {
  return format(parseISO(isoString), 'EEEE, MMMM d, yyyy');
}

export function formatTime(isoString: string) {
  return format(parseISO(isoString), 'h:mm a');
}

export function formatTimeRange(start: string, end: string) {
  return `${format(parseISO(start), 'h:mm a')} - ${format(parseISO(end), 'h:mm a')}`;
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function toDateString(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export const EVENT_COLORS = [
  '#006BFF', '#7C3FF0', '#1D9E75', '#E85D04', '#BA7517',
  '#A32D2D', '#0E8A8A', '#6B48FF',
];

export const TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Kolkata',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Australia/Sydney',
];

export const TIME_OPTIONS: string[] = [];
for (let h = 0; h < 24; h++) {
  for (const m of [0, 30]) {
    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    TIME_OPTIONS.push(`${hh}:${mm}:00`);
  }
}

export function displayTime(time24: string) {
  const [h, m] = time24.split(':').map(Number);
  const ampm = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')}${ampm}`;
}
