/* eslint-disable no-process-env */
const DEFAULT_MINIMUM_HTTP_STATUS_CODE = 400;
const config = {
  app: {
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
    host: process.env.HOST,
    port: process.env.PORT
  },
  env: {
    NODE_ENV: process.env.NODE_ENV,
    GULP_DEBUG: process.env.GULP_DEBUG
  },
  express: {
    log: {
      enable: ['false', '0'].indexOf(process.env.EXPRESS_LOG_ENABLE || 'false') === -1,
      format: process.env.EXPRESS_LOG_FORMAT || 'tiny',
      minimumHttpStatusCode: parseInt(process.env.EXPRESS_MINIMUM_HTTP_STATUS_CODE, 10) || DEFAULT_MINIMUM_HTTP_STATUS_CODE,
    }
  },
  node: {version: process.version},
  postgres: {
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PWD,
    host: process.env.POSTGRES_HOST
  }
};

export default config;
