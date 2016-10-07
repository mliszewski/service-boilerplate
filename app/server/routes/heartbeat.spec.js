import test from 'ava';
import request from 'supertest-as-promised';
import app from '../../server';

test('GET /heartbeat should return a 200', t => {
  return request(app)
    .get('/heartbeat')
    .then(res => t.true(res.status === 200));
});

test('GET /heartbeat should return an object {"message": "OK"}', t => {
  return request(app)
    .get('/heartbeat')
    .expect('Content-Type', /json/)
    .then(res => t.true(res.body.message === 'OK'));
});
