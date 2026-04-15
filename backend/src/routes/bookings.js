import express from 'express';
import { getSlots, createBooking, getBookingConfirmation, cancelBooking } from '../controllers/bookingsController.js';

const router = express.Router();

router.get('/slots', getSlots);
router.post('/', createBooking);
router.get('/confirm/:token', getBookingConfirmation);
router.delete('/:token', cancelBooking);

export default router;
