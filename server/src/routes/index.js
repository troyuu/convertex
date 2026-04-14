import { Router } from 'express';
import conversionRoutes from './conversionRoutes.js';
import statsRoutes from './statsRoutes.js';
import guestbookRoutes from './guestbookRoutes.js';

const router = Router();

router.use('/convert', conversionRoutes);
router.use('/stats', statsRoutes);
router.use('/guestbook', guestbookRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
