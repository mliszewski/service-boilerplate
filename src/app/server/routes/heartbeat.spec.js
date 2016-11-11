import test from 'ava';
import request from 'supertest-as-promised';
import app from '../../server';

const HTTP_RESP_OK = 200;

test('GET /heartbeat should return a 200', t =>
  request(app)
    .get('/heartbeat')
    .then(res => t.true(res.status === HTTP_RESP_OK))
);

test('GET /heartbeat should return an object {"message": "OK"}', t =>
  request(app)
    .get('/heartbeat')
    .expect('Content-Type', /json/)
    .then(res => t.true(res.body.message === 'OK'))
);
