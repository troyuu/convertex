import { stat } from 'fs/promises';
import { ConversionJob, ConversionStats } from '../models/index.js';
import { cleanupJob } from '../utils/tempManager.js';
import { hashIp } from '../utils/ipHasher.js';
import { getConverter } from './converters/index.js';
import { JOB_STATUS } from '../utils/constants.js';

export async function createConversionJob({ jobId, type, inputFormat, outputFormat, inputSize, ip }) {
  const job = await ConversionJob.create({
    id: jobId,
    conversionType: type,
    inputFormat,
    outputFormat,
    inputSize,
    status: JOB_STATUS.PENDING,
    ipHash: hashIp(ip),
  });

  return { job, jobId };
}

export async function processConversion(jobId) {
  const job = await ConversionJob.findByPk(jobId);
  if (!job) throw new Error('Job not found');

  const converter = getConverter(job.conversionType);
  const startTime = Date.now();

  try {
    job.status = JOB_STATUS.PROCESSING;
    await job.save();

    const result = await converter.execute(jobId);

    const processingMs = Date.now() - startTime;
    let outputSize = null;

    try {
      const outputStat = await stat(result.outputPath);
      outputSize = outputStat.size;
    } catch {
      // Output stat may fail for zip files or multi-file outputs
    }

    job.status = JOB_STATUS.COMPLETED;
    job.processingMs = processingMs;
    job.outputSize = outputSize;
    await job.save();

    // Update stats
    await updateStats(job.conversionType, job.inputSize + (outputSize || 0));

    return { job, outputPath: result.outputPath, outputFilename: result.outputFilename };
  } catch (error) {
    const processingMs = Date.now() - startTime;
    job.status = JOB_STATUS.FAILED;
    job.processingMs = processingMs;
    job.errorMessage = 'Conversion failed';
    await job.save();

    console.error(`[CONVERT] Job ${jobId} failed:`, error.message);
    await cleanupJob(jobId);
    throw error;
  }
}

export async function getJobStatus(jobId) {
  const job = await ConversionJob.findByPk(jobId);
  if (!job) return null;

  return {
    id: job.id,
    status: job.status,
    conversionType: job.conversionType,
    processingMs: job.processingMs,
  };
}

async function updateStats(conversionType, sizeProcessed) {
  try {
    const stats = await ConversionStats.findOne();
    if (stats) {
      stats.totalConversions += 1;
      stats.conversionsToday += 1;
      stats.totalSizeProcessed = BigInt(stats.totalSizeProcessed) + BigInt(sizeProcessed);
      stats.popularType = await getMostPopularType();
      await stats.save();
    }
  } catch {
    // Stats update failure should not break conversions
  }
}

async function getMostPopularType() {
  const result = await ConversionJob.findOne({
    attributes: [
      'conversionType',
      [ConversionJob.sequelize.fn('COUNT', '*'), 'count'],
    ],
    where: { status: JOB_STATUS.COMPLETED },
    group: ['conversionType'],
    order: [[ConversionJob.sequelize.literal('count'), 'DESC']],
    raw: true,
  });

  return result?.conversionType || 'pdf-to-word';
}
