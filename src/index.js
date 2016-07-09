import {
  isFunction, isObject,
  assign, assignWith,
  pick, pickBy,
  flatten
} from 'lodash';

import compose from './compose';

export const isDescriptor = isObject;

export const isStamp = obj => isFunction(obj) && isFunction(obj.compose) && isDescriptor(obj.compose);

export const isComposable = obj => isDescriptor(obj) || isStamp(obj);

export const init = (...functions) => compose({ initializers: flatten(functions) });

export const methods = (...objects) => compose({ methods: assign(...objects) });

export const assignToInstance = (...keys) => {
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
