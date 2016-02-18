import compose from './compose';
const isFunction = obj => typeof obj === 'function';
const isObject = obj => !!obj && (typeof obj === 'function' || typeof obj === 'object');

const isDescriptor = isObject;

const isStamp = obj => isFunction(obj) && isFunction(obj.compose) && isDescriptor(obj.compose);

const isComposable = obj => isDescriptor(obj) || isStamp(obj);

const init = (...functions) => compose({ initializers: [...functions] });

export default compose;
export { compose as compose };
export { isStamp as isStamp };
export { isDescriptor as isDescriptor };
export { isComposable as isComposable };
export { init as init };
