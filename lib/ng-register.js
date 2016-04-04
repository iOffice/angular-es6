'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A helper class to simplify registering Angular components and provide a consistent syntax for
 * doing so.
 */

var NgRegister = function () {
  function NgRegister(appName) {
    var _this = this;

    var dependencies = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    (0, _classCallCheck3.default)(this, NgRegister);

    if (dependencies === null) {
      this.app = _angular2.default.module(appName);
    } else {
      this.app = _angular2.default.module(appName, dependencies);
    }
    var methods = ['requires', 'name', 'provider',
    // 'factory',
    'service', 'value', 'constant', 'decorator', 'animation', 'filter', 'controller',
    // 'directive',
    'component', 'config', 'run'];
    methods.forEach(function (name) {
      _this[name] = _this._wrapMethod(name);
    });
  }

  NgRegister.prototype._wrapMethod = function _wrapMethod(method) {
    var _this2 = this;

    return function () {
      var _app;

      (_app = _this2.app)[method].apply(_app, arguments);
      return _this2;
    };
  };

  NgRegister.prototype.directive = function directive(name, constructorFn_) {
    var constructorFn = this._normalizeConstructor(constructorFn_);
    var proto = constructorFn.prototype;

    proto.compile = proto.compile || _angular2.default.noop;
    var originalCompileFn = this._cloneFunction(proto.compile);

    // Decorate the compile method to automatically return the preLink and postLink methods (if
    // they exists) and bind them to the context of the constructor (so `this` works correctly).
    // This gets around the problem of a non-lexical "this" which occurs when the directive class
    // itself returns `this.link` from within the compile function.
    this._override(proto, 'compile', function () {
      return function compileReturns() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        originalCompileFn.apply(this, args);
        var preLink = proto.preLink ? proto.preLink.bind(this) : _angular2.default.noop;
        var postLink = _angular2.default.noop;
        if (proto.postLink) {
          postLink = proto.postLink.bind(this);
        } else if (proto.link) {
          postLink = proto.link.bind(this);
        }
        return {
          pre: preLink,
          post: postLink
        };
      };
    });

    var factoryArray = this._createFactoryArray(constructorFn);
    this.app.directive(name, factoryArray);
    return this;
  };

  NgRegister.prototype.factory = function factory(name, constructorFn_) {
    var constructorFn = this._normalizeConstructor(constructorFn_);
    var factoryArray = this._createFactoryArray(constructorFn);
    this.app.factory(name, factoryArray);
    return this;
  };

  /**
   * If the constructorFn is an array of type ['dep1', 'dep2', ..., constructor() {}]
   * we need to pull out the array of dependencies and add it as an $inject property of the
   * actual constructor function.
   */


  NgRegister.prototype._normalizeConstructor = function _normalizeConstructor(input) {
    var constructorFn = void 0;
    if (input.constructor === Array) {
      var injected = input.slice(0, input.length - 1);
      constructorFn = input[input.length - 1];
      constructorFn.$inject = injected;
    } else {
      constructorFn = input;
    }
    return constructorFn;
  };

  /**
   * Convert a constructor function into a factory function which returns a new instance of that
   * constructor, with the correct dependencies automatically injected as arguments.
   *
   * In order to inject the dependencies, they must be attached to the constructor function with the
   * `$inject` property annotation.
   */


  NgRegister.prototype._createFactoryArray = function _createFactoryArray(CostructorFn) {
    // get the array of dependencies that are needed by this component (as contained in the
    // `$inject` array)
    var args = CostructorFn.$inject || [];
    // create a copy of the array
    var factoryArray = args.slice();
    // The factoryArray uses Angular's array notation whereby each element of the array is the name
    // of a dependency, and the final item is the factory function itself.
    factoryArray.push(function () {
      for (var _len2 = arguments.length, factoryArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        factoryArgs[_key2] = arguments[_key2];
      }

      // return new constructorFn(...args);
      var instance = new (Function.prototype.bind.apply(CostructorFn, [null].concat(factoryArgs)))();
      // see this: https://github.com/michaelbromley/angular-es6/issues/1
      // for (const key in instance) {
      //   instance[key] = instance[key];
      // }
      return instance;
    });

    return factoryArray;
  };

  /**
   * Clone a function
   * @param original
   * @returns {Function}
   */


  NgRegister.prototype._cloneFunction = function _cloneFunction(original) {
    return function clonedFunction() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return original.apply(this, args);
    };
  };

  /**
   * Override an object's method with a new one specified by `callback`.
   * @param object
   * @param methodName
   * @param callback
   */


  NgRegister.prototype._override = function _override(object, methodName, callback) {
    var obj = object;
    obj[methodName] = callback(object[methodName]);
  };

  return NgRegister;
}(); /**
      * Obtained and modified from: https://github.com/michaelbromley/angular-es6
      */


function ngRegister(appName) {
  var dependencies = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  return new NgRegister(appName, dependencies);
}

exports.default = ngRegister;