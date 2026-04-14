import env from './environment.js';

const config = {
  development: {
    url: env.databaseUrl,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    url: env.databaseUrl,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
  },
};

export default config;
