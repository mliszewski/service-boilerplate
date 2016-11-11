import test from 'ava';
import controller from '../root';

test('get() should return OK', t => {
  t.true(controller.get() === 'OK');
});
