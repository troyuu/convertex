import { mkdir, rm, stat, readdir } from 'fs/promises';
import { join, resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import env from '../config/environment.js';

const TEMP_BASE = resolve(env.tempDir);

export async function createTempDir() {
  const jobId = uuidv4();
  const jobDir = join(TEMP_BASE, jobId);
  await mkdir(jobDir, { recursive: true });
  return { jobId, jobDir };
}

export async function getJobDir(jobId) {
  return join(TEMP_BASE, jobId);
}

export async function cleanupJob(jobId) {
  const jobDir = join(TEMP_BASE, jobId);
  try {
    await rm(jobDir, { recursive: true, force: true });
  } catch {
    // Directory may already be deleted
  }
}

export async function cleanupExpiredFiles(maxAgeMs) {
  try {
    const entries = await readdir(TEMP_BASE);
    const now = Date.now();
    let cleaned = 0;

    for (const entry of entries) {
      if (entry === '.gitkeep') continue;
      const entryPath = join(TEMP_BASE, entry);
      try {
        const stats = await stat(entryPath);
        if (now - stats.mtimeMs > maxAgeMs) {
          await rm(entryPath, { recursive: true, force: true });
          cleaned++;
        }
      } catch {
        // Entry may have been deleted by another process
      }
    }

    return cleaned;
  } catch {
    return 0;
  }
}
