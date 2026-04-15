import prisma from '../db/prismaClient.js';

const DEFAULT_USER_ID = 1;

export const getAvailability = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: DEFAULT_USER_ID },
      select: { timezone: true }
    });

    let availability = await prisma.availability.findFirst({
      where: { user_id: DEFAULT_USER_ID, is_default: true },
      include: {
        rules: true
      }
    });

    // If none exists, create a default one (usually handled by seed)
    if (!availability) {
      return res.status(404).json({ error: 'Availability not found' });
    }

    res.json({
      timezone: user?.timezone,
      schedule: availability
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
};

export const updateAvailability = async (req, res) => {
  try {
    const { timezone, schedule } = req.body;

    // Update user timezone
    if (timezone) {
      await prisma.user.update({
        where: { id: DEFAULT_USER_ID },
        data: { timezone }
      });
    }

    // Update schedule rules
    if (schedule && schedule.rules && Array.isArray(schedule.rules)) {
      // Loop over rules and update or create them
      for (const rule of schedule.rules) {
        if (rule.id) {
          await prisma.availabilityRule.update({
            where: { id: rule.id },
            data: {
              start_time: rule.start_time,
              end_time: rule.end_time,
              is_available: rule.is_available
            }
          });
        } else if (schedule.id) {
          // If no rule ID but we have schedule ID, it's a new rule (though usually rules are 7 fixed days)
          await prisma.availabilityRule.create({
            data: {
              availability_id: schedule.id,
              day_of_week: rule.day_of_week,
              start_time: rule.start_time,
              end_time: rule.end_time,
              is_available: rule.is_available
            }
          });
        }
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ error: 'Failed to update availability' });
  }
};

export const getOverrides = async (req, res) => {
  try {
    const availability = await prisma.availability.findFirst({
      where: { user_id: DEFAULT_USER_ID, is_default: true }
    });
    if (!availability) return res.json([]);

    const overrides = await prisma.dateOverride.findMany({
      where: { availability_id: availability.id },
      orderBy: { override_date: 'asc' }
    });
    res.json(overrides);
  } catch (error) {
    console.error('Error fetching overrides:', error);
    res.status(500).json({ error: 'Failed to fetch overrides' });
  }
};

export const addOverride = async (req, res) => {
  try {
    const { override_date, is_unavailable, start_time, end_time } = req.body;
    
    // Find default availability
    const availability = await prisma.availability.findFirst({
      where: { user_id: DEFAULT_USER_ID, is_default: true }
    });
    if (!availability) {
      return res.status(404).json({ error: 'Default availability not found' });
    }

    // Upsert override for this date
    const dateObj = new Date(override_date);
    
    // Simple way: delete existing and create new
    await prisma.dateOverride.deleteMany({
      where: {
        availability_id: availability.id,
        override_date: dateObj
      }
    });

    const override = await prisma.dateOverride.create({
      data: {
        availability_id: availability.id,
        override_date: dateObj,
        is_unavailable: !!is_unavailable,
        start_time: is_unavailable ? null : (start_time || '09:00:00'),
        end_time: is_unavailable ? null : (end_time || '17:00:00')
      }
    });

    res.status(201).json(override);
  } catch (error) {
    console.error('Error adding override:', error);
    res.status(500).json({ error: 'Failed to add override' });
  }
};

export const deleteOverride = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.dateOverride.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting override:', error);
    res.status(500).json({ error: 'Failed to delete override' });
  }
};

