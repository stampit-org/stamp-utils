const isStamp = (obj) => {
  return typeof obj === 'function' &&
    typeof obj.compose === 'function';
};

export default isStamp;
