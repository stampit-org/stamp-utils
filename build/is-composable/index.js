'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isStamp = require('../is-stamp');

var _isStamp2 = _interopRequireDefault(_isStamp);

var _isDescriptor = require('../is-descriptor');

var _isDescriptor2 = _interopRequireDefault(_isDescriptor);

exports['default'] = function (obj) {
  if ((0, _isStamp2['default'])(obj)) return true;
  if ((0, _isDescriptor2['default'])(obj)) return true;
  return false;
};

module.exports = exports['default'];
//# sourceMappingURL=index.js.map