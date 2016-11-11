import test from 'ava';
import request from 'supertest-as-promised';
import app from '../../server';

const HTTP_RESP_OK = 200;

test('GET / should return a 200', t =>
  request(app)
    .get('/')
    .then(res => t.true(res.status === HTTP_RESP_OK))
);

test('GET / should return a string "OK"', t =>
  request(app)
    .get('/')
    .expect('Content-Type', /text/)
    .then(res => t.true(res.text === 'OK'))
);
