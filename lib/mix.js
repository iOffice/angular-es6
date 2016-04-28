'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isinstance = exports.mix = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classCallCheckMod = require('babel-runtime/helpers/classCallCheck.js');
var classCallCheck = classCallCheckMod.default;
var classCallCheckOn = 0;

function _addBase(clazz, mixin) {
  if (clazz.__mixins.indexOf(mixin) === -1) {
    clazz.__mixins.unshift(mixin);
    if (mixin.__mixins) {
      mixin.__mixins.forEach(function (base) {
        _addBase(clazz, base);
      });
    }
    var parent = (0, _getPrototypeOf2.default)(mixin.prototype);
    if (parent) {
      _addBase(clazz, parent.constructor);
    }
  }
}

function mix() {
  var Mix = function Mix() {
    var _this = this;

    (0, _classCallCheck3.default)(this, Mix);

    classCallCheckMod.default = function () {};
    classCallCheckOn += 1;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args.forEach(function (arg) {
      var constructorArgs = arg.slice(1);
      var clazz = arg[0];
      clazz.call.apply(clazz, [_this].concat((0, _toConsumableArray3.default)(constructorArgs)));
    });
    classCallCheckOn -= 1;
    if (classCallCheckOn === 0) {
      classCallCheckMod.default = classCallCheck;
    }
  };

  Mix.__mixins = [];

  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
    mixins[_key] = arguments[_key];
  }

  mixins.forEach(function (mixin) {
    _addBase(Mix, mixin);
    for (var p in mixin) {
      if (p !== '__mixins') {
        Mix[p] = mixin[p];
      }
    }
    for (var prop in mixin.prototype) {
      Mix.prototype[prop] = mixin.prototype[prop];
    }
  });
  return Mix;
}

function _isinstance(object, classinfo) {
  var proto = (0, _getPrototypeOf2.default)(object);
  var mixins = proto.constructor.__mixins;

  var result = object instanceof classinfo;
  if (!result && mixins) {
    for (var index in mixins) {
      if (mixins[index].prototype === classinfo.prototype) {
        result = true;
        break;
      }
    }
  }
  return result;
}

function isinstance(object, classinfo) {
  if (Array.isArray(classinfo)) {
    var result = false;
    for (var index in classinfo) {
      if (_isinstance(object, classinfo[index])) {
        result = true;
        break;
      }
    }
    return result;
  }
  return _isinstance(object, classinfo);
}

exports.mix = mix;
exports.isinstance = isinstance;