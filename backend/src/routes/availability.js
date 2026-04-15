import express from 'express';
import { getAvailability, updateAvailability, getOverrides, addOverride, deleteOverride } from '../controllers/availabilityController.js';

const router = express.Router();

router.get('/', getAvailability);
router.put('/', updateAvailability);
router.get('/overrides', getOverrides);
router.post('/overrides', addOverride);
router.delete('/overrides/:id', deleteOverride);

export default router;
