import prisma from '../db/prismaClient.js';

// Hardcoded user ID for the assignment (no auth)
const DEFAULT_USER_ID = 1;

export const getEventTypes = async (req, res) => {
  try {
    const eventTypes = await prisma.eventType.findMany({
      where: { user_id: DEFAULT_USER_ID },
      orderBy: { created_at: 'desc' },
      include: {
        _count: {
          select: { bookings: true }
        }
      }
    });

    // Format for frontend
    const formattedTypes = eventTypes.map(et => ({
      ...et,
      bookings: et._count.bookings
    }));

    res.json(formattedTypes);
  } catch (error) {
    console.error('Error fetching event types:', error);
    res.status(500).json({ error: 'Failed to fetch event types' });
  }
};

export const getEventTypeBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const eventType = await prisma.eventType.findUnique({
      where: { slug }
    });

    if (!eventType) {
      return res.status(404).json({ error: 'Event type not found' });
    }

    res.json(eventType);
  } catch (error) {
    console.error('Error fetching event type by slug:', error);
    res.status(500).json({ error: 'Failed to fetch event type' });
  }
};

export const createEventType = async (req, res) => {
  try {
    const { name, duration_minutes, buffer_minutes, slug, description, color, is_active, questions } = req.body;
    
    const eventType = await prisma.eventType.create({
      data: {
        user_id: DEFAULT_USER_ID,
        name,
        duration_minutes,
        buffer_minutes: buffer_minutes || 0,
        slug,
        description,
        color,
        is_active: is_active ?? true,
        questions: questions || []
      }
    });
    
    res.status(201).json(eventType);
  } catch (error) {
    console.error('Error creating event type:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Slug must be unique.' });
    }
    res.status(500).json({ error: 'Failed to create event type' });
  }
};

export const updateEventType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, duration_minutes, buffer_minutes, slug, description, color, is_active, questions } = req.body;
    
    const eventType = await prisma.eventType.update({
      where: { id: parseInt(id) },
      data: {
        name,
        duration_minutes,
        buffer_minutes,
        slug,
        description,
        color,
        is_active,
        questions
      }
    });
    
    res.json(eventType);
  } catch (error) {
    console.error('Error updating event type:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Slug must be unique.' });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Event type not found.' });
    }
    res.status(500).json({ error: 'Failed to update event type' });
  }
};

export const deleteEventType = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.eventType.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting event type:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Event type not found.' });
    }
    res.status(500).json({ error: 'Failed to delete event type' });
  }
};
