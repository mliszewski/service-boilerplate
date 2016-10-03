import test from 'ava';
import request from 'supertest-as-promised';
import app from '../../server';

test('GET / should return a 200', t => {
  return request(app)
    .get('/')
    .then(res => t.true(res.status === 200));
});

test('GET / should return a string "OK"', t => {
  return request(app)
    .get('/')
    .expect('Content-Type', /text/)
    .then(res => t.true(res.text === 'OK'));
});
