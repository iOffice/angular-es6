'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Injectable = function () {
  function Injectable() {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (0, _classCallCheck3.default)(this, Injectable);

    this.constructor.$inject.forEach(function (name, index) {
      _this[name] = args[index];
    });
  }

  Injectable.inject = function inject() {
    var _this2 = this;

    if (!this.$inject) {
      this.$inject = [];
    }

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args.forEach(function (arg) {
      if (typeof arg === 'string') {
        _this2.$inject.push(arg);
      } else {
        var _$inject;

        (_$inject = _this2.$inject).push.apply(_$inject, (0, _toConsumableArray3.default)(arg));
      }
    });
  };

  return Injectable;
}();

exports.default = Injectable;