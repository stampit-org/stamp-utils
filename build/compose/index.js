'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _lodashObjectMerge = require('lodash/object/merge');

var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);

var _lodashCollectionMap = require('lodash/collection/map');

var _lodashCollectionMap2 = _interopRequireDefault(_lodashCollectionMap);

var _lodashLangIsUndefined = require('lodash/lang/isUndefined');

var _lodashLangIsUndefined2 = _interopRequireDefault(_lodashLangIsUndefined);

var getDescriptorProps = function getDescriptorProps(descriptorName, composables) {
  return (0, _lodashCollectionMap2['default'])(composables, function (composable) {
    var descriptor = composable.compose || composable;
    return descriptor[descriptorName];
  });
};

var createStamp = function createStamp(_ref) {
  var methods = _ref.methods;
  var properties = _ref.properties;
  var deepProperties = _ref.deepProperties;
  var propertyDescriptors = _ref.propertyDescriptors;
  var initializers = _ref.initializers;
  var staticProperties = _ref.staticProperties;
  var deepStaticProperties = _ref.deepStaticProperties;
  var staticPropertyDescriptors = _ref.staticPropertyDescriptors;

  var assign = Object.assign;

  var Stamp = function Stamp(options) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var obj = Object.create(methods);

    (0, _lodashObjectMerge2['default'])(obj, deepProperties);
    assign(obj, properties);

    Object.defineProperties(obj, propertyDescriptors);

    initializers.forEach(function (initializer) {
      var returnValue = initializer.call(obj, options, { instance: obj, stamp: Stamp, args: [options].concat(args) });
      if (!(0, _lodashLangIsUndefined2['default'])(returnValue)) {
        obj = returnValue;
      }
    });

    return obj;
  };

  (0, _lodashObjectMerge2['default'])(Stamp, deepStaticProperties);
  assign(Stamp, staticProperties);

  Object.defineProperties(Stamp, staticPropertyDescriptors);

  return Stamp;
};

function compose() {
  var _ref2;

  var assign = Object.assign;

  var composeMethod = function composeMethod() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return compose.apply(undefined, [{ compose: composeMethod }].concat(args));
  };

  for (var _len2 = arguments.length, composables = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    composables[_key2] = arguments[_key2];
  }

  var configuration = _lodashObjectMerge2['default'].apply(undefined, [{}].concat(_toConsumableArray(getDescriptorProps('configuration', composables))));

  assign(composeMethod, {
    methods: assign.apply(undefined, [{}].concat(_toConsumableArray(getDescriptorProps('methods', composables)))),
    deepProperties: _lodashObjectMerge2['default'].apply(undefined, [{}].concat(_toConsumableArray(getDescriptorProps('deepProperties', composables)))),
    properties: assign.apply(undefined, [{}].concat(_toConsumableArray(getDescriptorProps('properties', composables)))),
    deepStaticProperties: _lodashObjectMerge2['default'].apply(undefined, [{}].concat(_toConsumableArray(getDescriptorProps('deepStaticProperties', composables)))),
    staticProperties: assign.apply(undefined, [{}].concat(_toConsumableArray(getDescriptorProps('staticProperties', composables)))),
    propertyDescriptors: assign.apply(undefined, [{}].concat(_toConsumableArray(getDescriptorProps('propertyDescriptors', composables)))),
    staticPropertyDescriptors: assign.apply(undefined, [{}].concat(_toConsumableArray(getDescriptorProps('staticPropertyDescriptors', composables)))),
    initializers: (_ref2 = []).concat.apply(_ref2, _toConsumableArray(getDescriptorProps('initializers', composables))).filter(function (initializer) {
      return initializer !== undefined;
    }),
    configuration: configuration
  });

  var stamp = createStamp(composeMethod);

  stamp.compose = composeMethod;

  return stamp;
}

exports['default'] = compose;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map