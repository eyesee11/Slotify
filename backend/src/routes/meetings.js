import express from 'express';
import { getMeetings, cancelMeetingAsAdmin } from '../controllers/meetingsController.js';

const router = express.Router();

router.get('/', getMeetings);
router.delete('/:id', cancelMeetingAsAdmin);

export default router;
