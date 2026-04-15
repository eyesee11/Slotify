import prisma from '../db/prismaClient.js';
import { addMinutes, isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

export const getAvailableSlots = async (slug, requestedDate, userTimezone = 'UTC') => {
  // 1. Fetch Event Type
  const eventType = await prisma.eventType.findUnique({
    where: { slug },
    include: { user: true }
  });

  if (!eventType) throw new Error('Event type not found');

  const userId = eventType.user_id;
  const hostTimezone = eventType.user.timezone || 'UTC';
  const buffer = eventType.buffer_minutes || 0;
  const duration = eventType.duration_minutes;

  // 2. Fetch User's Availability and Overrides
  const availability = await prisma.availability.findFirst({
    where: { user_id: userId, is_default: true },
    include: { 
      rules: true,
      overrides: {
        where: {
          override_date: new Date(requestedDate)
        }
      }
    }
  });

  if (!availability) throw new Error('Availability rules not set for user');

  // 3. Determine Hours for the Day
  let startTimeStr, endTimeStr;
  const override = availability.overrides[0];

  if (override) {
    if (override.is_unavailable) return []; // Explicitly unavailable
    startTimeStr = override.start_time;
    endTimeStr = override.end_time;
  } else {
    // Fallback to weekly rules
    const d = new Date(requestedDate);
    const dayOfWeek = d.getUTCDay();
    const rule = availability.rules.find(r => r.day_of_week === dayOfWeek);
    
    if (!rule || !rule.is_available) return [];
    startTimeStr = rule.start_time;
    endTimeStr = rule.end_time;
  }

  // 4. Generate initial slots in Host Timezone
  // We need to construct the full Date objects in the host's timezone
  const startHost = fromZonedTime(`${requestedDate}T${startTimeStr}`, hostTimezone);
  const endHost = fromZonedTime(`${requestedDate}T${endTimeStr}`, hostTimezone);

  const generatedSlots = [];
  let currentSlotStart = startHost;

  while (isBefore(currentSlotStart, endHost)) {
    const currentSlotEnd = addMinutes(currentSlotStart, duration);
    
    if (!isBefore(currentSlotEnd, endHost) && currentSlotEnd.getTime() !== endHost.getTime()) {
      break;
    }

    generatedSlots.push({
      start: currentSlotStart,
      end: currentSlotEnd
    });

    // Strategy: Increment by 30 mins or duration? 
    // Slotify usually increments by a fixed "step" (often 15, 30, or duration).
    // Let's use 30 minutes static or duration, whichever is smaller, to provide more options.
    currentSlotStart = addMinutes(currentSlotStart, Math.min(30, duration));
  }

  // 5. Fetch existing bookings
  // We check for any bookings that overlap with the entire day to be safe
  const searchStart = startOfDay(startHost);
  const searchEnd = endOfDay(startHost);

  const bookings = await prisma.booking.findMany({
    where: {
      event_type: { user_id: userId },
      status: 'scheduled',
      start_time: { lt: searchEnd },
      end_time: { gt: searchStart }
    }
  });

  // 6. Filter slots against bookings + buffer
  return generatedSlots.filter(slot => {
    // A slot [sS, sE] is valid if no booking [bS, bE] overlaps with [sS - buffer, sE + buffer]
    // Wait, the buffer applies to the NEW booking too.
    // Effectively, we need sS to be >= bE + buffer AND sE to be <= bS - buffer
    
    const sS = slot.start.getTime();
    const sE = slot.end.getTime();

    const hasConflict = bookings.some(booking => {
      const bS = booking.start_time.getTime();
      const bE = booking.end_time.getTime();

      // Check overlap: (sS < bE + bufferMinutes) && (sE > bS - bufferMinutes)
      // Actually, buffer applies to both. If I have a 10:00 booking and 15m buffer, 
      // I can't start another one until 10:30 + 15 = 10:45? No, that's double buffering.
      // Usually: bE + buffer is the earliest start.
      
      const conflictStart = bS - (eventType.buffer_minutes * 60000);
      const conflictEnd = bE + (eventType.buffer_minutes * 60000);

      return (sS < conflictEnd && sE > conflictStart);
    });

    return !hasConflict;
  }).map(slot => slot.start.toISOString());
};
;
