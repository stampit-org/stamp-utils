import test from 'tape';

import {isDescriptor} from '../';

test('isDescriptor', nest => {
  nest.test('...with rubbish', assert => {
    const expected = false;
    [0, 'a', null, undefined, NaN].forEach(value => {
      const actual = isDescriptor(value);
      assert.equal(actual, expected, `should return false for ${value}`);
    });

    assert.end();
  });

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
});
