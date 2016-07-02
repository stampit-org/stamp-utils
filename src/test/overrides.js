import test from 'tape';
import {overrides, isStamp} from '../';

test('overrides()', nest => {
  nest.test('...with nothing', assert => {
    const actual = isStamp(overrides());
    const expected = true;

    assert.equal(actual, expected,
      'should return a stamp');

    assert.end();
  });

  nest.test('...with multiple arguments', assert => {
    const actual = overrides('a', 'b')({a: 1, b: 2, c: 3});
    const expected = {a: 1, b: 2};

    assert.deepEqual(actual, expected,
      'should assign selected properties');

    assert.end();
  });

  nest.test('...with single array argument', assert => {
    const actual = overrides(['a', 'b'])({a: 1, b: 2, c: 3});
    const expected = {a: 1, b: 2};

    assert.deepEqual(actual, expected,
      'should assign selected properties');

    assert.end();
  });

  nest.test('...overrides all by default', assert => {
    const actual = overrides()({a: 1, b: 2, c: 3});
    const expected = {a: 1, b: 2, c: 3};

    assert.deepEqual(actual, expected,
      'should assign all properties');

    assert.end();
  });

  nest.test('...overrides all with properties', assert => {
    const stamp = overrides().compose({properties: {
      x: 0, a: 0
    }});
    const actual = stamp({a: 1, b: 2, c: 3});
    const expected = {x: 0, a: 1, b: 2, c: 3};

    assert.deepEqual(actual, expected,
      'should assign all properties and leave existing');

    assert.end();
  });

  nest.test('...overrides some with properties', assert => {
    const stamp = overrides('a', 'b').compose({properties: {
      x: 0, a: 0
    }});
    const actual = stamp({a: 1, b: 2, c: 3});
    const expected = {x: 0, a: 1, b: 2};

    assert.deepEqual(actual, expected,
      'should assign selected properties and leave existing');

    assert.end();
  });
});
