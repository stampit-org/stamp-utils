import test from 'tape';
import {init, isStamp} from '../';

test('init()', nest => {
  const f1 = () => {};
  const f2 = () => {};
  const f3 = () => {};
  const f4 = () => {};
  const f5 = () => {};

  nest.test('...with no arguments', assert => {
    const actual = isStamp(init());
    const expected = true;

    assert.equal(actual, expected,
      'should return a stamp');

    assert.end();
  });

  nest.test('...with a single function input', assert => {
    const actual = init(f1).compose.initializers.length;
    const expected = 1;

    assert.equal(actual, expected,
      'should add a single initializer');

    assert.end();
  });

  nest.test('...with multiple arguments', assert => {
    const actual = init(f1, f2, f3).compose.initializers.length;
    const expected = 3;

    assert.equal(actual, expected,
      'should add all arguments');

    assert.end();
  });

  nest.test('...with single array argument', assert => {
    const actual = init([f1, f2, f3]).compose.initializers.length;
    const expected = 3;

    assert.equal(actual, expected,
      'should add entire array');

    assert.end();
  });

  nest.test('...with multiple arguments and arrays', assert => {
    const actual = init([f1, f2], f3, [f4, f5]).compose.initializers.length;
    const expected = 5;

    assert.equal(actual, expected,
      'should add entire array');

    assert.end();
  });

  nest.test('...with multiple mutator functions', assert => {
    const mutators = ['a', 'b', 'c'].map(
      (i) => (o, { instance }) => { instance[i] = i; });

    const actual = init(mutators[0], mutators.slice(1, 3))();
    const expected = {
      a: 'a',
      b: 'b',
      c: 'c'
    };

    assert.deepEqual(actual, expected,
      'should apply all initializers to instance');

    assert.end();
  });
});
