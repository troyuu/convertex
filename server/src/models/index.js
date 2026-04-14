import { Sequelize } from 'sequelize';
import env from '../config/environment.js';
import defineConversionJob from './ConversionJob.js';
import defineConversionStats from './ConversionStats.js';
import defineGuestBookEntry from './GuestBookEntry.js';

const sequelize = new Sequelize(env.databaseUrl, {
  dialect: 'postgres',
  logging: false,
});

const ConversionJob = defineConversionJob(sequelize);
const ConversionStats = defineConversionStats(sequelize);
const GuestBookEntry = defineGuestBookEntry(sequelize);

export { sequelize, ConversionJob, ConversionStats, GuestBookEntry };
