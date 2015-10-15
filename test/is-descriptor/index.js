import test from 'tape';

import compose from '../../source/compose';
import isDescriptor from '../../source/is-descriptor';

test('isDescriptor', nest => {
  nest.test('...with descriptor.properties', assert => {
    const msg = 'should return true for descriptors';
    const descriptor = {
      properties: {
        foo: 'bar'
      }
    };
    const actual = isDescriptor(descriptor);
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('...with descriptor.initializers', assert => {
    const msg = 'should return true for descriptors';
    const descriptor = {
      initializers: [
        ({ instance }) => {
          instance.foo = 'bar';
        }
      ]
    };
    const actual = isDescriptor(descriptor);
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('...with stamp', assert => {
    const msg = 'should return false for stamps';
    const stamp = compose();
    const actual = isDescriptor(stamp);
    const expected = false;

    assert.equal(actual, expected, msg);
    assert.end();
  });

  nest.test('...with empty object', assert => {
    const msg = 'should return false for empty objects';
    const actual = isDescriptor({});
    const expected = false;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
