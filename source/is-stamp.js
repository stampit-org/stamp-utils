const isStamp = (obj) => {
  return typeof obj === 'function' &&
    typeof obj.compose === 'function' &&
    obj.compose.methods &&
    obj.compose.properties &&
    obj.compose.deepProperties &&
    obj.compose.staticProperties &&
    obj.compose.deepStaticProperties &&
    obj.compose.propertyDescriptors &&
    obj.compose.staticPropertyDescriptors &&
    obj.compose.configuration &&
    true;
};

export default isStamp;
