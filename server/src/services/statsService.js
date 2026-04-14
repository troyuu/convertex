import { ConversionStats } from '../models/index.js';

export async function getStats() {
  const stats = await ConversionStats.findOne();
  if (!stats) {
    return {
      totalConversions: 0,
      conversionsToday: 0,
      popularType: 'pdf-to-word',
      totalSizeProcessed: '0',
    };
  }

  return {
    totalConversions: stats.totalConversions,
    conversionsToday: stats.conversionsToday,
    popularType: stats.popularType,
    totalSizeProcessed: stats.totalSizeProcessed.toString(),
  };
}

export async function resetDailyStats() {
  const stats = await ConversionStats.findOne();
  if (stats) {
    stats.conversionsToday = 0;
    await stats.save();
  }
}
