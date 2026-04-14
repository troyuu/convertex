import { cleanupJob } from '../utils/tempManager.js';

export function attachCleanup(req, res, next) {
  if (!req.jobId) return next();

  const jobId = req.jobId;

  // Delete files immediately when response finishes (download complete)
  res.on('finish', async () => {
    await cleanupJob(jobId);
  });

  // Delete files if connection is aborted
  res.on('close', async () => {
    if (!res.writableFinished) {
      await cleanupJob(jobId);
    }
  });

  next();
}

export function cleanupOnError(jobId) {
  return async () => {
    await cleanupJob(jobId);
  };
}
