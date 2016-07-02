import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import assign from 'lodash/assign';
import pick from 'lodash/pick';
import flatten from 'lodash/flatten';
import pickBy from 'lodash/pickBy';
import assignWith from 'lodash/assignWith';

import compose from './compose';

export const isDescriptor = isObject;

export const isStamp = obj => isFunction(obj) && isFunction(obj.compose) && isDescriptor(obj.compose);

export const isComposable = obj => isDescriptor(obj) || isStamp(obj);

export const init = (...functions) => compose({ initializers: flatten(functions) });

export const overrides = (...keys) => {
  const flattenKeys = flatten(keys);
  return compose({
    initializers: [function (opt) {
      assign(this, flattenKeys.length === 0 ? opt : pick(opt, flattenKeys));
    }]
  });
};

export const namespaced = (keyStampMap) => {
  const keyStampMapClone = pickBy(keyStampMap, isStamp);

  return compose({
    initializers: [function (opt) {
      const optClone = pickBy(opt, (value, key) => keyStampMapClone[key]);
      assignWith(optClone, keyStampMapClone, (innerOpt, stamp) => stamp(innerOpt));
      assign(this, optClone);
    }]
  });
};
