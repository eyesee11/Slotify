# Slotify Frontend

This is the Next.js application for Slotify, built with React and Tailwind CSS. It provides the administration dashboard and public booking interfaces for the Slotify platform.

## Key Technologies

- **Next.js 16 (App Router)**
- **Tailwind CSS**
- **Framer Motion** for animations
- **Lucide React** for icons

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Create a `.env.local` file with the following variable:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Development

The project uses a modular component structure located in `src/components/`. Key pages are defined in `src/app/`.
