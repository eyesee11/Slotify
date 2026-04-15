-- AlterTable
ALTER TABLE `bookings` ADD COLUMN `invitee_answers` JSON NULL;

-- AlterTable
ALTER TABLE `event_types` ADD COLUMN `buffer_minutes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `questions` JSON NULL;
