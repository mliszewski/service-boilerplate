import test from 'ava';
import request from 'supertest-as-promised';
import app from '../../server';
import config from '../../config';
import Connection from 'sequelize-connect';
import path from 'path';


const HTTP_RESP_OK = 200;
const HTTP_RESP_NOT_FOUND = 404;
let numberOFAccounts = 2;

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
    [path.join(__dirname, '../../server/models')]
  )
);

test('GET /does_not_exist should return a 404', t =>
  request(app)
    .get('/does_not_exist')
    .then(res => t.true(res.status === HTTP_RESP_NOT_FOUND))
);

test('GET /adaccount should return an array of 2 objects', t =>
  request(app)
    .get('/adaccounts')
    .expect('Content-Type', /json/)
    .then(res => {
      t.true(res.status === HTTP_RESP_OK);
      t.true(res.body.length === numberOFAccounts);
    })
);

test('GET /adaccount/:id should return a single object with id=1', t =>
  request(app)
    .get('/adaccounts/1')
    .expect('Content-Type', /json/)
    .then(res => {
      t.true(res.status === HTTP_RESP_OK);
      t.true(res.body.id === 1);
    })
);

test('POST /adaccount should create a new object', t => {
  const objId = 4;

  const accountObj = {
    id: objId,
    accountName: 'Account #4'
  };

  return request(app)
    .post('/adaccounts')
    .send(accountObj)
    .expect('Content-Type', /json/)
    .then(res => {
      t.true(res.status === HTTP_RESP_OK);
      t.true(res.body.id === objId);
      numberOFAccounts++;
    });
});
