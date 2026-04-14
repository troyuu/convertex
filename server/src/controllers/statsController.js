import { getStats } from '../services/statsService.js';

export async function getPublicStats(req, res, next) {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
}
