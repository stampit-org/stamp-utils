import isStamp from '../is-stamp';
import isDescriptor from '../is-descriptor';

export default (obj) => {
  if (isStamp(obj)) return true;
  if (isDescriptor(obj)) return true;
  return false;
};
