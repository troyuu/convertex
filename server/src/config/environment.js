import dotenv from 'dotenv';
dotenv.config();

export default {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  databaseUrl: process.env.DATABASE_URL || 'postgresql://convertex:convertex_dev@localhost:5432/convertex',
  ipHashSalt: process.env.IP_HASH_SALT || 'dev_salt_change_in_production',
  tempDir: process.env.TEMP_DIR || './temp',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 104857600,
  cleanupIntervalMs: parseInt(process.env.CLEANUP_INTERVAL_MS, 10) || 600000,
  cleanupMaxAgeMs: parseInt(process.env.CLEANUP_MAX_AGE_MS, 10) || 1800000,
};
