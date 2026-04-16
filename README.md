# Slotify

Slotify is an enterprise-grade scheduling automation platform designed to facilitate seamless appointment booking and availability management.

## Table of Contents

- [Live Links](#live-links)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Assumptions & Design Decisions](#assumptions--design-decisions)
- [Key Features Implemented](#key-features-implemented)

---

## Live Links

- **Frontend Application:** [\[Live Frontend\]](https://slot-ify.vercel.app/)
- **Backend API Base URL:** [\[Live Backend\]](https://slotify-sage.vercel.app/)

---

## Screenshots

### Landing Page
> ![Landing Page Screenshot](./screenshots/landing.png)

### User Authentication
> ![Login/Register Screenshot](./screenshots/auth.png)

### Host Dashboard & Event Types
> ![Dashboard Screenshot](./screenshots/dashboard.png)

### Availability Rules Management
> ![Availability Management Screenshot](./screenshots/availability.png)

### Invitee Public Booking Experience
> ![Booking Flow Screenshot](./screenshots/booking.png)

---

## Features

- **Dynamic Availability Management**: Define default working hours and custom date overrides.
- **Custom Event Types**: Create events with configurable durations, buffer times, custom questions, and themes.
- **Public Booking Pages**: Responsive, user-friendly scheduling interfaces for invitees.
- **Timezone Support**: Accurate slot calculation across different timezones using `date-fns-tz`.
- **Advanced Slot Logic**: Backend dynamically parses rules, checks conflicts (including buffer times), and returns available slots.
- **Rescheduling Flow**: Streamlined capability to cancel and replace a booking in one seamless workflow.

## Tech Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Language**: TypeScript, JavaScript
- **Styling**: Tailwind CSS & Vanilla CSS (for custom dashboard UI)
- **Icons**: `lucide-react`
- **Animations**: `framer-motion`
- **Date Handling**: `date-fns` & `date-fns-tz`

### Backend
- **Framework**: Node.js with Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma Client
- **Date Handling**: `date-fns` & `date-fns-tz`

---

## Database Schema

The database is built with PostgreSQL and managed using Prisma. Below is a detailed explanation of every structure, table, column, and relationship within the system.

### 1. `User` (`users` table)
Represents the account holders (hosts) who offer bookable slots.
- **Columns**:
  - `id` (Int, Primary Key): Auto-incrementing unique identifier.
  - `name` (String, max 100): The host's full name.
  - `email` (String, max 255): Unique email address used for login/notifications.
  - `username` (String, max 50): Unique handle used for their public booking URLs (e.g., `/user/my-username`).
  - `timezone` (String, max 60): The host's local timezone (e.g., "America/New_York"), critical for accurate date/time routing.
  - `created_at` (DateTime): Timestamp of account creation.
- **Relationships**:
  - `event_types`: 1-to-many relationship with `EventType` models.
  - `availabilities`: 1-to-many relationship with `Availability` models.

### 2. `EventType` (`event_types` table)
Defines specific meeting templates or events created by the user (e.g., "15 Min Quick Chat", "1 Hour Strategy Call").
- **Columns**:
  - `id` (Int, Primary Key): Auto-incrementing unique identifier.
  - `user_id` (Int): Foreign Key linking to the `User` table.
  - `name` (String, max 100): Display name of the event type.
  - `slug` (String, max 100): Unique URL-friendly string identifying the event under a user's route.
  - `duration_minutes` (Int): The length of the meeting in minutes.
  - `buffer_minutes` (Int, default 0): Extra padding time added before/after meetings to prevent back-to-back overlaps.
  - `description` (String, Text, optional): Markdown or text explaining what the meeting is about.
  - `questions` (Json, optional): JSON structure holding custom questions to ask the invitee during booking.
  - `color` (String, max 7, optional): Hex color code for UI rendering.
  - `is_active` (Boolean, default true): Toggle to enable or disable bookings for this event.
  - `created_at` (DateTime): Timestamp of creation.
- **Relationships**:
  - `user`: Belongs to a single `User` (OnDelete: Cascade).
  - `bookings`: 1-to-many relationship tracking all appointments (`Booking`) booked under this template.

### 3. `Availability` (`availability` table)
Groups a distinct schedule configuration for a user. Users can have multiple setups (e.g., "Standard Working Hours", "Conference Schedule").
- **Columns**:
  - `id` (Int, Primary Key): Auto-incrementing unique identifier.
  - `user_id` (Int): Foreign Key linking to the `User` table.
  - `name` (String, max 100): Display name for the schedule.
  - `is_default` (Boolean, default false): Marks if this is the primary schedule applied to new Event Types automatically.
  - `created_at` (DateTime): Timestamp of creation.
- **Relationships**:
  - `user`: Belongs to a single `User` (OnDelete: Cascade).
  - `rules`: 1-to-many relationship with standard weekly `AvailabilityRule` sets.
  - `overrides`: 1-to-many relationship with specific `DateOverride` records.

### 4. `AvailabilityRule` (`availability_rules` table)
Defines standard weekly recurring working hours for a given `Availability` schedule.
- **Columns**:
  - `id` (Int, Primary Key): Auto-incrementing unique identifier.
  - `availability_id` (Int): Foreign Key linking to the `Availability` table.
  - `day_of_week` (Int, SmallInt): A number (0-6) representing the day of the week (where 0 is typically Sunday).
  - `start_time` (String, max 8): The time the user becomes available (`"HH:mm:ss"` format).
  - `end_time` (String, max 8): The time the user stops being available (`"HH:mm:ss"` format).
  - `is_available` (Boolean, default true): Indicates whether the user is free or entirely blocked off on this weekday.
- **Relationships**:
  - `availability`: Belongs to a single `Availability` parent (OnDelete: Cascade).

### 5. `DateOverride` (`date_overrides` table)
Defines specific exceptions to standard weekly recurring availability (e.g., Vacation days, Holidays).
- **Columns**:
  - `id` (Int, Primary Key): Auto-incrementing unique identifier.
  - `availability_id` (Int): Foreign Key linking to the `Availability` table.
  - `override_date` (DateTime, Date formatting): The specific calendar date of the exception.
  - `is_unavailable` (Boolean, default false): If true, blocks out the entire day regardless of times.
  - `start_time` (String, max 8, optional): Overridden start time for partial availability.
  - `end_time` (String, max 8, optional): Overridden end time for partial availability.
- **Relationships**:
  - `availability`: Belongs to a single `Availability` parent (OnDelete: Cascade).

### 6. `Booking` (`bookings` table)
Represents a finally scheduled appointment block between the host and an invitee.
- **Columns**:
  - `id` (Int, Primary Key): Auto-incrementing unique identifier.
  - `event_type_id` (Int): Foreign Key linking to the `EventType` that was booked.
  - `invitee_name` (String, max 100): The full name of the person who booked the slot.
  - `invitee_email` (String, max 255): The email of the person who booked the slot.
  - `start_time` (DateTime): The exact calculated UTC start time of the meeting. Indexed.
  - `end_time` (DateTime): The exact calculated UTC end time of the meeting.
  - `status` (BookingStatus, Default 'scheduled'): An enum (`scheduled` or `cancelled`) denoting the health of the booking.
  - `cancel_token` (String, max 36): A uniquely generated UUID allowing the invitee to cancel/reschedule from an email link without needing an account.
  - `notes` (String, Text, optional): General notes provided by the invitee.
  - `invitee_answers` (Json, optional): JSON mapping of dynamic extra questions asked during booking to their provided answers.
  - `created_at` (DateTime): Timestamp of the booking action.
- **Relationships**:
  - `event_type`: Belongs to the chosen `EventType` (OnDelete: Cascade).

---

## Project Structure

This project uses a monorepo-style structure separating the frontend and backend to follow modern microservice and API-first principles.

```text
slotify/
├── backend/                  # Express.js REST API
│   ├── prisma/               # Database schemas, migrations, and seed script
│   ├── src/
│   │   ├── controllers/      # Route logic handlers
│   │   ├── db/               # Prisma client initialization
│   │   ├── routes/           # Express router definitions
│   │   └── services/         # Core business logic (Slot Calculator)
│   └── index.js              # Server entry point
│
└── frontend/                 # Next.js Application
    ├── src/
    │   ├── app/              # App router pages (Admin & Public Routing)
    │   ├── components/       # Reusable React components (Admin Header, Nav)
    │   └── lib/              # API fetchers, Utilities, and Types
    └── tailwind.config.ts    # Tailwind styles configuration
```

---

## Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher)
- **PostgreSQL Database Server** (running locally or remotely)

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure the Environment:**
   Create a `.env` file in the `backend/` directory and configure your PostgreSQL connection string.
   ```env
   # Update with your PostgreSQL credentials
   DATABASE_URL="postgresql://username:password@localhost:5432/slotify_db"
   PORT=3001
   ```

4. **Initialize the Database:**
   Push the schema to your database and run the standard data seed (this creates User ID `1` for the demo).
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the Server:**
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:3001`. The health check is available at `/api/v1/health`.

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure the Environment:**
   Create a `.env.local` file in the `frontend/` directory.
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
   ```

4. **Start the Client:**
   ```bash
   npm run dev
   ```
   The frontend application will run on `http://localhost:3000`.

---

## Assumptions & Design Decisions

1. **Single-User Demo Mode**: 
   - While the database schema supports a multi-tenancy model via the `User` table, authentication flows (JWT/OAuth) are mocked or skipped for this assignment.
   - The application functions on behalf of **User ID `1`**, hardcoded as a "Default User" in the seed script (`default@example.com`). All scheduling and configurations act on this user's behalf.
   - **Important**: You *must* run `npx prisma db seed` so that this user identity exists before the API runs.

2. **Email Notifications**:
   - Instead of integrating a live SMTP service (like SendGrid or AWS SES), email notifications (confirmations, cancellations) are mocked via `console.log` statements on the backend for demonstration purposes.

3. **Architecture decoupling**:
   - The original requirement list suggested a Django or Node framework. I decoupled this into a distinct **Node.js REST API** and a separate **Next.js Frontend**. This prevents Next.js Server Components from bypassing a standalone API layer, demonstrating a real-world enterprise architecture pattern.

4. **Slot Generation Logic**:
   - When generating 15-minute intervals, if an event takes 30 minutes, slots will be surfaced at interval increments, providing granular booking options (e.g. 9:00 AM, 9:30 AM rather than fully arbitrary slots). Buffer times are injected programmatically before checking against database overlap logs.

---

## Key Features Implemented

*   **Date Overrides Engine**: Users can selectively designate specific calendar days as completely unavailable or define atypical active hours for that date.
*   **Buffer Time Calculator**: Implemented meeting pads (before and after bookings). A newly created 30-minute booking automatically shields a designated margin interval preventing immediate back-to-back overlap.
*   **Custom Form Integration**: Using `Json` column types in the database, administrators can construct dynamic arrays of custom questions, which are mapped directly to the invitee booking flow.
*   **Refined UI/UX**: The application architecture extensively leverages `framer-motion` page transitions, a collapsible header architecture, and strict layout scoping.
