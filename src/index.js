import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';

import compose from './compose';

export const isDescriptor = isObject;

export const isStamp = obj => isFunction(obj) && isFunction(obj.compose) && isDescriptor(obj.compose);

export const isComposable = obj => isDescriptor(obj) || isStamp(obj);

export const init = (...functions) => compose({ initializers: [...functions] });
