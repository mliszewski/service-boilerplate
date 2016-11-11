import test from 'ava';
import controller from '../heartbeat';

test('get() should return an object {"message": "OK"}', t => {
  t.deepEqual(controller.get(), {message: 'OK'});
});
