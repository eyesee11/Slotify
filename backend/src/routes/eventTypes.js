import express from 'express';
import {
  getEventTypes,
  getEventTypeBySlug,
  createEventType,
  updateEventType,
  deleteEventType
} from '../controllers/eventTypesController.js';

const router = express.Router();

router.get('/', getEventTypes);
router.post('/', createEventType);
router.get('/:slug', getEventTypeBySlug);
router.put('/:id', updateEventType);
router.delete('/:id', deleteEventType);

export default router;
