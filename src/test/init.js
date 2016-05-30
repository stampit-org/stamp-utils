import test from 'tape';
import {init, isStamp} from '../';

test('init()', nest => {
  nest.test('...with function input', assert => {
    const actual = isStamp(init(() => {}));
    const expected = true;

    assert.equal(actual, expected,
      'should return a stamp');

    assert.end();
  });

  nest.test('...with multiple functions', assert => {
    const actual = isStamp(init(() => {}, () => {}, () => {}));
    const expected = true;

    assert.equal(actual, expected,
      'should return a stamp');

    assert.end();
  });

  nest.test('...with multiple mutator functions', assert => {
    const mutators = ['a', 'b', 'c'].map(
      (i) => (o, { instance }) => { instance[i] = i; });

    const actual = init(...mutators)();
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
