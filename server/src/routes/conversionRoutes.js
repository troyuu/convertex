import { Router } from 'express';
import { startConversion, startMerge, startSplit, checkStatus, downloadResult } from '../controllers/conversionController.js';
import { uploadSingle, uploadMultiple } from '../middleware/upload.js';
import { conversionLimiter } from '../middleware/rateLimiter.js';
import { createTempDir } from '../utils/tempManager.js';

const router = Router();

// Middleware to create temp dir and set jobDir on request before multer runs
async function prepareJobDir(req, res, next) {
  try {
    const { jobId, jobDir } = await createTempDir();
    req.jobId = jobId;
    req.jobDir = jobDir;
    next();
  } catch (error) {
    next(error);
  }
}

// POST /api/convert/merge-pdf — multi-file upload
router.post('/merge-pdf', conversionLimiter, prepareJobDir, uploadMultiple, startMerge);

// POST /api/convert/split-pdf — single file upload
router.post('/split-pdf', conversionLimiter, prepareJobDir, uploadSingle, startSplit);

// POST /api/convert/:type — single file upload
router.post('/:type', conversionLimiter, prepareJobDir, uploadSingle, startConversion);

// GET /api/convert/status/:jobId
router.get('/status/:jobId', checkStatus);

// GET /api/convert/download/:jobId
router.get('/download/:jobId', downloadResult);

export default router;
