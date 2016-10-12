import test from 'ava';
import request from 'supertest-as-promised';
import app from '../../server';

test('GET /does_not_exist should return a 404', t => {
  return request(app)
    .get('/does_not_exist')
    .then(res => t.true(res.status === 404));
});

test('GET /adaccount should return an array of 2 objects', t => {
  return request(app)
    .get('/adaccounts')
    .expect('Content-Type', /json/)
    .then(res => {
      t.true(res.status === 200);
      t.true(res.body.length === 2);
    });
});

test('GET /adaccount/:id should return a single object with id=1', t => {
  return request(app)
    .get('/adaccounts/1')
    .expect('Content-Type', /json/)
    .then(res => {
      t.true(res.status === 200);
      t.true(res.body.id === 1);
    });
});
