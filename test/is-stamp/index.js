import test from 'tape';
import isStamp from '../../source/is-stamp';
import compose from '../../source/compose';

test('isStamp()', nest => {
  nest.test('...with stamp input', assert => {
    const actual = isStamp(compose());
    const expected = true;

    assert.equal(actual, expected,
      'should return true');

    assert.end();
  });

  nest.test('...with non-stamp inputs', assert => {
    const actual = [0, '', {}, [], () => {}].map(isStamp);
    const expected = [false, false, false, false, false];

    assert.deepEqual(actual, expected,
      'should return false');

    assert.end();
  });
});
