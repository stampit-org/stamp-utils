import test from 'tape';
import _ from 'lodash';
import compose from 'compose';
import {isStamp} from '../';

test('isStamp()', nest => {
  nest.test('...with stamp input', assert => {
    const actual = isStamp(compose());
    const expected = true;

    assert.equal(actual, expected,
      'should return true');

    assert.end();
  });

  nest.test('...with simple function', assert => {
    const actual = isStamp(() => {});
    const expected = false;

    assert.equal(actual, expected,
      'should return false');

    assert.end();
  });

  nest.test('...with non-stamp inputs', assert => {
    const actual = [0, '', {}, [], () => {}].map(isStamp);
    const expected = [false, false, false, false, false];

    assert.deepEqual(actual, expected,
      'should return false');

    assert.end();
  });

  nest.test('recognize composables with omitted props', assert => {
    const composable = _.assign(() => {}, {
      compose: _.assign(() => {}, {
        properties: {
          foo: 'bar'
        }
      })
    });

    const actual = isStamp(composable);
    const expected = true;

    assert.deepEqual(actual, expected,
      'Recognize composables with omitted props');
    assert.end();
  });
});
