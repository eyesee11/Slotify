import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Checking for default user (ID: 1)...');
  let user = await prisma.user.findUnique({ where: { id: 1 } });
  
  if (!user) {
    console.log('Creating default user...');
    user = await prisma.user.create({
      data: {
        id: 1,
        name: 'Default User',
        email: 'default@example.com',
        username: 'default_user',
        timezone: 'UTC',
      },
    });
  } else {
    console.log('User 1 already exists.');
  }

  console.log('Checking for default availability (User ID: 1)...');
  let availability = await prisma.availability.findFirst({
    where: { user_id: 1, is_default: true }
  });

  if (!availability) {
    console.log('Creating default availability...');
    availability = await prisma.availability.create({
      data: {
        user_id: 1,
        name: 'Working Hours',
        is_default: true,
      },
    });
  } else {
    console.log('Availability already exists for user 1.');
  }

  console.log('Checking/Updating rules for availability ID:', availability.id);
  const days = [1, 2, 3, 4, 5]; // Mon to Fri
  for (const day of days) {
    const existingRule = await prisma.availabilityRule.findFirst({
      where: { availability_id: availability.id, day_of_week: day }
    });

    if (!existingRule) {
      await prisma.availabilityRule.create({
        data: {
          availability_id: availability.id,
          day_of_week: day,
          start_time: '09:00:00',
          end_time: '17:00:00',
          is_available: true,
        },
      });
    }
  }

  console.log('Checking for default Event Type...');
  let eventType = await prisma.eventType.findFirst({
    where: { user_id: 1, slug: 'discovery-call' }
  });

  if (!eventType) {
    console.log('Creating default Event Type...');
    await prisma.eventType.create({
      data: {
        user_id: 1,
        name: 'Discovery Call',
        slug: 'discovery-call',
        duration_minutes: 30,
        buffer_minutes: 15,
        description: 'A 30-minute intro call to discuss your project.',
        color: '#0069FF',
        is_active: true,
      }
    });
  } else {
    console.log('Discovery Call event already exists.');
  }

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
