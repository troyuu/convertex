import { createConversionJob, processConversion, getJobStatus } from '../services/conversionService.js';
import { CONVERSION_TYPES } from 'shared/conversionTypes.js';
import { getJobDir } from '../utils/tempManager.js';
import { cleanupJob } from '../utils/tempManager.js';
import { getExtension } from '../utils/fileUtils.js';
import AppError from '../utils/AppError.js';
import { join } from 'path';
import { readdir, stat } from 'fs/promises';

export async function startConversion(req, res, next) {
  try {
    const { type } = req.params;
    const conversionType = CONVERSION_TYPES[type];
    if (!conversionType) {
      throw new AppError('Unknown conversion type', 400, 'INVALID_CONVERSION_TYPE');
    }

    if (!req.file && !req.files) {
      throw new AppError('No file uploaded', 400, 'NO_FILE_UPLOADED');
    }

    const file = req.file || req.files[0];
    const inputFormat = getExtension(file.originalname).replace('.', '');
    const outputFormat = conversionType.outputFormat.replace('.', '');

    // Create job record — PRIVACY: we only store type, size, format — never file names
    const { job, jobId } = await createConversionJob({
      jobId: req.jobId,
      type,
      inputFormat,
      outputFormat,
      inputSize: file.size,
      ip: req.ip,
    });

    // Process conversion asynchronously
    processConversion(jobId).catch(() => {
      // Error already handled in processConversion
    });

    res.status(202).json({
      jobId: job.id,
      status: job.status,
      message: 'Conversion started',
    });
  } catch (error) {
    next(error);
  }
}

export async function startMerge(req, res, next) {
  try {
    if (!req.files || req.files.length < 2) {
      throw new AppError('At least 2 PDF files required for merging', 400, 'INVALID_FILE_TYPE');
    }

    const totalSize = req.files.reduce((sum, f) => sum + f.size, 0);

    const { job, jobId } = await createConversionJob({
      jobId: req.jobId,
      type: 'merge-pdf',
      inputFormat: 'pdf',
      outputFormat: 'pdf',
      inputSize: totalSize,
      ip: req.ip,
    });

    processConversion(jobId).catch(() => {});

    res.status(202).json({
      jobId: job.id,
      status: job.status,
      message: 'Merge started',
    });
  } catch (error) {
    next(error);
  }
}

export async function startSplit(req, res, next) {
  try {
    if (!req.file) {
      throw new AppError('No file uploaded', 400, 'NO_FILE_UPLOADED');
    }

    const { job, jobId } = await createConversionJob({
      jobId: req.jobId,
      type: 'split-pdf',
      inputFormat: 'pdf',
      outputFormat: 'zip',
      inputSize: req.file.size,
      ip: req.ip,
    });

    processConversion(jobId).catch(() => {});

    res.status(202).json({
      jobId: job.id,
      status: job.status,
      message: 'Split started',
    });
  } catch (error) {
    next(error);
  }
}

export async function checkStatus(req, res, next) {
  try {
    const { jobId } = req.params;
    const status = await getJobStatus(jobId);

    if (!status) {
      throw new AppError('Job not found', 404, 'JOB_NOT_FOUND');
    }

    res.json(status);
  } catch (error) {
    next(error);
  }
}

export async function downloadResult(req, res, next) {
  try {
    const { jobId } = req.params;
    const status = await getJobStatus(jobId);

    if (!status) {
      throw new AppError('Job not found', 404, 'JOB_NOT_FOUND');
    }

    if (status.status === 'pending' || status.status === 'processing') {
      throw new AppError('Conversion still in progress', 202, 'JOB_NOT_READY');
    }

    if (status.status === 'failed') {
      throw new AppError('Conversion failed', 500, 'JOB_FAILED');
    }

    const jobDir = await getJobDir(jobId);
    const files = await readdir(jobDir);
    const outputFile = files.find(f => f.startsWith('output'));

    if (!outputFile) {
      throw new AppError('File has been deleted', 410, 'FILE_EXPIRED');
    }

    const outputPath = join(jobDir, outputFile);

    // PRIVACY: Delete files immediately after download completes
    res.on('finish', async () => {
      await cleanupJob(jobId);
    });

    res.download(outputPath, `converted${getExtension(outputFile)}`);
  } catch (error) {
    next(error);
  }
}
