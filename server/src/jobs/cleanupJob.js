import cron from 'node-cron';
import { cleanupExpiredFiles } from '../utils/tempManager.js';
import env from '../config/environment.js';

export function startCleanupJob() {
  // Run every 10 minutes
  cron.schedule('*/10 * * * *', async () => {
    const cleaned = await cleanupExpiredFiles(env.cleanupMaxAgeMs);
    if (cleaned > 0) {
      console.log(`[CLEANUP] Removed ${cleaned} expired temp directories`);
    }
  });

  console.log('[CLEANUP] Temp file cleanup job scheduled (every 10 minutes)');
}
