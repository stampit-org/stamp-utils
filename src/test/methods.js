import test from 'tape';
import _ from 'lodash';
import { methods, isStamp } from '../';

test('methods()', nest => {
  const a = { a: () => {} };
  const b = { b: () => {} };
  const c = { c: () => {} };

  nest.test('...with no arguments', assert => {
    const actual = isStamp(methods());
    const expected = true;

    assert.equal(actual, expected,
      'should return a stamp');

    assert.end();
  });

  nest.test('...with a single object', assert => {
    const actual = methods(a).compose.methods.a;
    const expected = a.a;

    assert.equal(actual, expected,
      'should add a single method');

    assert.end();
  });

  nest.test('...with multiple arguments', assert => {
    const actual = methods(a, b, c).compose.methods;
    const expected = {a: a.a, b: b.b, c: c.c};

    assert.deepEqual(actual, expected,
      'should add all arguments');

    assert.end();
  });

  nest.test('...creating instance', assert => {
    const abc = _.assign(a, b, c);

    const actual = Object.getPrototypeOf(methods(abc)());
    const expected = abc;

    assert.deepEqual(actual, expected,
      'should have all methods');

    assert.end();
  });
});
