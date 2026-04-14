import app from './app.js';
import { sequelize } from './models/index.js';
import { startCleanupJob } from './jobs/cleanupJob.js';
import env from './config/environment.js';

const PORT = env.port;

async function start() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('[DB] PostgreSQL connected');

    // Sync models (in dev only — use migrations in prod)
    if (env.nodeEnv === 'development') {
      await sequelize.sync({ alter: true });
      console.log('[DB] Models synced');
    }

    // Start temp file cleanup cron job
    startCleanupJob();

    // Start HTTP server
    app.listen(PORT, () => {
      console.log(`[SERVER] Convertex running on port ${PORT}`);
      console.log(`[SERVER] Environment: ${env.nodeEnv}`);
    });
  } catch (error) {
    console.error('[SERVER] Failed to start:', error.message);
    process.exit(1);
  }
}

start();
