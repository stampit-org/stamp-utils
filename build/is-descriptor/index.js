"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (obj) {
  if (!obj) return false;
  return Boolean((obj.methods || obj.properties || obj.deepProperties || obj.propertyDescriptors || obj.staticProperties || obj.deepStaticProperties || obj.staticPropertyDescriptors || obj.initializers || obj.configuration) && true);
};

module.exports = exports["default"];
//# sourceMappingURL=index.js.map