'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

var init = function init() {
  for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return (0, _compose2['default'])({ initializers: [].concat(functions) });
};

exports['default'] = init;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map