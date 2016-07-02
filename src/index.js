import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import assign from 'lodash/assign';
import pick from 'lodash/pick';
import flatten from 'lodash/flatten';

import compose from './compose';

export const isDescriptor = isObject;

export const isStamp = obj => isFunction(obj) && isFunction(obj.compose) && isDescriptor(obj.compose);

export const isComposable = obj => isDescriptor(obj) || isStamp(obj);

export const init = (...functions) => compose({ initializers: [...functions] });

export const overrides = (...keys) => {
  const flattenKeys = flatten(keys);
  return compose({
    initializers: [function (opt) {
      assign(this, flattenKeys.length === 0 ? opt : pick(opt, flattenKeys));
    }]
  });
};
