'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isinstance = exports.mix = exports.ngRegister = exports.Injectable = undefined;

var _injectable = require('./injectable.js');

var _injectable2 = _interopRequireDefault(_injectable);

var _ngRegister = require('./ng-register.js');

var _ngRegister2 = _interopRequireDefault(_ngRegister);

var _mix = require('./mix.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Injectable = _injectable2.default;
exports.ngRegister = _ngRegister2.default;
exports.mix = _mix.mix;
exports.isinstance = _mix.isinstance;