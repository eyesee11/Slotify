import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // 1. Create Default User
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Default User',
      email: 'admin@example.com',
      username: 'default_user',
      timezone: 'UTC',
    },
  });

  // 2. Create Event Types
  const eventType1 = await prisma.eventType.upsert({
    where: { slug: '15-min-meeting' },
    update: {},
    create: {
      user_id: user.id,
      name: '15 Min Meeting',
      slug: '15-min-meeting',
      duration_minutes: 15,
      description: 'A quick 15-minute conversation',
      color: '#3b82f6', // tailwind blue-500 equivalent
    },
  });

  const eventType2 = await prisma.eventType.upsert({
    where: { slug: '30-min-consultation' },
    update: {},
    create: {
      user_id: user.id,
      name: '30 Min Consultation',
      slug: '30-min-consultation',
      duration_minutes: 30,
      description: 'In-depth consultation session',
      color: '#a855f7', // tailwind purple-500
    },
  });

  // 3. Create Default Availability
  const availability = await prisma.availability.create({
    data: {
      user_id: user.id,
      name: 'Working Hours',
      is_default: true,
      rules: {
        create: [
          { day_of_week: 1, start_time: '09:00:00', end_time: '17:00:00', is_available: true },
          { day_of_week: 2, start_time: '09:00:00', end_time: '17:00:00', is_available: true },
          { day_of_week: 3, start_time: '09:00:00', end_time: '17:00:00', is_available: true },
          { day_of_week: 4, start_time: '09:00:00', end_time: '17:00:00', is_available: true },
          { day_of_week: 5, start_time: '09:00:00', end_time: '17:00:00', is_available: true },
          { day_of_week: 0, start_time: '09:00:00', end_time: '17:00:00', is_available: false },
          { day_of_week: 6, start_time: '09:00:00', end_time: '17:00:00', is_available: false },
        ]
      }
    }
  });

  // 4. Create Sample Bookings (Meetings)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setUTCHours(10, 0, 0, 0); // 10:00 AM UTC

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setUTCHours(14, 0, 0, 0); // 2:00 PM UTC

  await prisma.booking.createMany({
    data: [
      {
        event_type_id: eventType2.id,
        invitee_name: 'John Doe',
        invitee_email: 'john@example.com',
        start_time: tomorrow,
        end_time: new Date(tomorrow.getTime() + 30 * 60000), // 30 min
        status: 'scheduled',
        cancel_token: '11111111-2222-3333-4444-555555555555',
        notes: 'Looking forward to our chat!',
      },
      {
        event_type_id: eventType1.id,
        invitee_name: 'Jane Smith',
        invitee_email: 'jane@example.com',
        start_time: yesterday,
        end_time: new Date(yesterday.getTime() + 15 * 60000), // 15 min
        status: 'scheduled',
        cancel_token: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
        notes: 'Past discussion',
      }
    ],
    skipDuplicates: true
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
