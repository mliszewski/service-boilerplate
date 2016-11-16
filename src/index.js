/* eslint-disable no-process-env */
import {install} from 'source-map-support';
install(); // Enable source maps

import cwd from 'cwd';
import app from './app/server';
import config from './app/config';
import Connection from 'sequelize-connect';
import path from 'path';

const {
  name: appName,
  version: appVersion,
  host,
  port
} = config.app;

new Connection(
  config.postgres.database,
  config.postgres.user,
  config.postgres.password,
  {
    host: config.postgres.host,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  },
  [cwd(__dirname, './app/server/models')],
  file => path.extname(file) === '.js'
).then(instance => {
  const server = app.listen(port, host, () => {
    const actualHost = server.address().address;
    const actualPort = server.address().port;

    console.log('%s@%s listening at http://%s:%s on Node', // eslint-disable-line no-console
      appName,
      appVersion,
      actualHost,
      actualPort,
      config.node.version
    );
  });
});
