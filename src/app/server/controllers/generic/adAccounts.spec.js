import test from 'ava';
import server from '../../../../app/server';
import config from '../../../../app/config';
import Connection from 'sequelize-connect';
import path from 'path';
import controller from '../generic';

const RESULTS_LENGTH = 2;

test.before(t =>
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
    [path.join(__dirname, '../../../../app/server/models')],
    file => path.extname(file) === '.js'
  )
);

test('list() should return 2 ad accounts', t => {
  t.plan(1);

  return controller.list('adaccounts').then(results => {
    t.truthy(results.length >= RESULTS_LENGTH);
  });
});

test('get() should return ad account by id', t => {
  t.plan(1);

  return controller.get('adaccounts', 1).then(result => {
    t.is(result.id, 1);
  });
});

