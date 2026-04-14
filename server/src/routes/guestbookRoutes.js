import { Router } from 'express';
import { getEntries, addEntry } from '../controllers/guestbookController.js';
import { guestbookLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.get('/', getEntries);
router.post('/', guestbookLimiter, addEntry);

export default router;
