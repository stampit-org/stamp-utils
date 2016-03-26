import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';

export const isDescriptor = isObject;

export const isStamp = obj => isFunction(obj) && isFunction(obj.compose) && isDescriptor(obj.compose);

export const isComposable = obj => isDescriptor(obj) || isStamp(obj);

import compose from 'stamp-specification';

export const init = (...functions) => compose({ initializers: [...functions] });
