import test from 'tape';
import { namespaced, isStamp } from '../';
import compose from '../compose';

test('namespaced()', nest => {
  nest.test('...with nothing', assert => {
    const actual = isStamp(namespaced());
    const expected = true;

    assert.equal(actual, expected,
      'should return a stamp');

    assert.end();
  });

  nest.test('...with first level stamp', assert => {
    assert.plan(2);
    const stamp1 = compose({
      properties: { a: 1 },
      initializers: [
        function (opt) {
          assert.deepEqual(opt, { option: 'foo' },
            'should invoke provided stamp');
        }
      ]
    });
    const stamp = namespaced({ level1: stamp1 });
    const actual = stamp({ level1: { option: 'foo' } });
    const expected = { level1: { a: 1 } };

    assert.deepEqual(actual, expected,
      'should assign stamped object instance');
  });

  nest.test('...with existing properties', assert => {
    const stamp1 = compose({properties: { mustSurvive: 1 }});
    const stamp = namespaced({ level1: stamp1, mustSurvive: null });
    const actual = stamp({ level1: { option: 'foo' } });
    const expected = { level1: { mustSurvive: 1 } };

    assert.deepEqual(actual, expected,
      'should not override property if it was not a stamp');
    assert.end();
  });

  nest.test('...with no option but present stamp', assert => {
    const stamp1 = compose({properties: { a: 1 }});
    const stamp = namespaced({ level1: stamp1 });
    const actual = stamp();
    const expected = { level1: { a: 1 } };

    assert.deepEqual(actual, expected,
      'should create instance');
    assert.end();
  });
});
