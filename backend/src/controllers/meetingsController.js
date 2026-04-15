import prisma from '../db/prismaClient.js';

const DEFAULT_USER_ID = 1;

export const getMeetings = async (req, res) => {
  try {
    const { filter } = req.query; // 'upcoming' or 'past'
    const now = new Date();

    let dateFilter = {};
    let statusFilter = {};
    if (filter === 'upcoming') {
      dateFilter = { gte: now };
      statusFilter = { status: 'scheduled' };
    } else if (filter === 'past') {
      dateFilter = { lt: now };
    }

    const meetings = await prisma.booking.findMany({
      where: {
        event_type: {
          user_id: DEFAULT_USER_ID
        },
        start_time: dateFilter,
        ...statusFilter
      },
      include: {
        event_type: true
      },
      orderBy: {
        start_time: filter === 'past' ? 'desc' : 'asc'
      }
    });

    res.json(meetings);
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.status(500).json({ error: 'Failed to fetch meetings' });
  }
};

export const cancelMeetingAsAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    
    const booking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status: 'cancelled' }
    });

    res.json({ success: true, booking });
  } catch (error) {
    console.error('Error cancelling meeting:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Meeting not found.' });
    }
    res.status(500).json({ error: 'Failed to cancel meeting' });
  }
};
