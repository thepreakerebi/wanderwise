import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import {
  createTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
} from '../controllers/tripController';
import { validateTrip } from '../middlewares/validators';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router
  .route('/')
  .get(getTrips)
  .post(validateTrip, createTrip);

router
  .route('/:id')
  .get(getTrip)
  .patch(validateTrip, updateTrip)
  .delete(deleteTrip);

export default router; 