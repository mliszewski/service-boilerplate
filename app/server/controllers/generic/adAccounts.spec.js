import test from 'ava';
import controller from '../generic';
import db from '../../models';
global.db = db;

test('list() should return 2 ad accounts', t => {
  t.plan(1);
  return controller.list('adaccounts').then(results => {
    t.is(results.length, 2);
  });
});

test('get() should return ad account by id', t => {
  t.plan(1);
  return controller.get('adaccounts', 1).then(result => {
    t.is(result.id, 1);
  });
});
