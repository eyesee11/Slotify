import prisma from '../db/prismaClient.js';
import { getAvailableSlots } from '../services/slotCalculator.js';
import { randomUUID } from 'crypto';

export const getSlots = async (req, res) => {
  try {
    const { slug, date } = req.query;
    if (!slug || !date) {
      return res.status(400).json({ error: 'Missing slug or date' });
    }

    // Default to a timezone if needed
    const slots = await getAvailableSlots(slug, date, 'UTC');
    res.json(slots);
  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ error: 'Failed to compute slots' });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { event_type_slug, invitee_name, invitee_email, start_time, notes, invitee_answers } = req.body;

    const eventType = await prisma.eventType.findUnique({
      where: { slug: event_type_slug },
      include: { user: true }
    });

    if (!eventType) return res.status(404).json({ error: 'Event type not found' });

    const startTimeObj = new Date(start_time);
    const endTimeObj = new Date(startTimeObj.getTime() + eventType.duration_minutes * 60000);
    const buffer = (eventType.buffer_minutes || 0) * 60000;

    // Double-booking guard with buffer
    // Conflict exists if:
    // Existing booking [bS, bE] overlaps with New booking + Buffer [sS - buffer, sE + buffer]
    // OR: New booking [sS, sE] overlaps with Existing booking + Existing Buffer (assuming they both have same buffer for simplicity, or we fetch buffers)
    // To be most accurate, we check if sS < bE + buffer AND sE > bS - buffer
    
    const conflict = await prisma.booking.findFirst({
      where: {
        event_type: {
          user_id: eventType.user_id
        },
        status: 'scheduled',
        start_time: {
          lt: new Date(endTimeObj.getTime() + buffer)
        },
        end_time: {
          gt: new Date(startTimeObj.getTime() - buffer)
        }
      }
    });

    if (conflict) {
      return res.status(409).json({ error: 'Time slot already booked (buffering accounted)' });
    }

    const cancel_token = randomUUID();

    const booking = await prisma.booking.create({
      data: {
        event_type_id: eventType.id,
        invitee_name,
        invitee_email,
        start_time: startTimeObj,
        end_time: endTimeObj,
        cancel_token,
        notes,
        invitee_answers
      }
    });

    // Mock Email Notification
    console.log(`[MOCK EMAIL] To: ${invitee_email}`);
    console.log(`Subject: Confirmed: ${eventType.name} with ${eventType.user.name || 'Host'}`);
    console.log(`Body: Hi ${invitee_name}, your meeting is scheduled for ${startTimeObj.toLocaleString()}.`);
    console.log(`Cancel/Reschedule: http://localhost:3000/${eventType.user.username}/${eventType.slug}/confirm?token=${cancel_token}`);

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to schedule event' });
  }
};


export const getBookingConfirmation = async (req, res) => {
  try {
    const { token } = req.params;
    const booking = await prisma.booking.findUnique({
      where: { cancel_token: token },
      include: {
        event_type: {
          include: {
            user: true
          }
        }
      }
    });

    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    res.json(booking);
  } catch (error) {
    console.error('Error fetching confirmation:', error);
    res.status(500).json({ error: 'Failed to fetch booking details' });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { token } = req.params;
    
    const booking = await prisma.booking.update({
      where: { cancel_token: token },
      data: { status: 'cancelled' }
    });

    res.json({ success: true, booking });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Booking not found.' });
    }
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
};
