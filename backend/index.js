import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventTypesRoutes from './src/routes/eventTypes.js';
import availabilityRoutes from './src/routes/availability.js';
import bookingsRoutes from './src/routes/bookings.js';
import meetingsRoutes from './src/routes/meetings.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*'
}));
app.use(express.json());

// Routes
app.use('/api/v1/event-types', eventTypesRoutes);
app.use('/api/v1/availability', availabilityRoutes);
app.use('/api/v1/bookings', bookingsRoutes);
app.use('/api/v1/meetings', meetingsRoutes);

// Health check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
