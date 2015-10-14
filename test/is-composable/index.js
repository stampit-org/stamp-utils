import test from 'tape';

import compose from '../../source/compose';
import isComposable from '../../source/is-composable';

test('isComposable', nest => {
  nest.test('...with stamp', assert => {
    const msg = 'should return true for stamps';
    const stamp = compose();
    const actual = isComposable(stamp);
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('...with descriptor', assert => {
    const msg = 'should return true for descriptors';
    const descriptor = {
      properties: {
        foo: 'bar'
      }
    };
    const actual = isComposable(descriptor);
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('...with empty object', assert => {
    const msg = 'should return false for empty objects';
    const actual = isComposable({});
    const expected = false;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
