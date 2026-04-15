# Slotify

Slotify is an enterprise-grade scheduling automation platform designed to facilitate seamless appointment booking and availability management.

## Table of Contents

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
- **Database**: MySQL
- **ORM**: Prisma Client
- **Date Handling**: `date-fns` & `date-fns-tz`

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
- **MySQL Database Server** (running locally or remotely)

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
   Create a `.env` file in the `backend/` directory and configure your MySQL connection string.
   ```env
   # Update with your MySQL credentials
   DATABASE_URL="mysql://username:password@localhost:3306/slotify_db"
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
