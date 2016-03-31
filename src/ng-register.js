/**
 * Obtained and modified from: https://github.com/michaelbromley/angular-es6
 */
import angular from 'angular';


/**
 * A helper class to simplify registering Angular components and provide a consistent syntax for
 * doing so.
 */
class NgRegister {

  constructor(appName) {
    this.app = angular.module(appName);
  }

  directive(name, constructorFn_) {
    const constructorFn = this._normalizeConstructor(constructorFn_);
    const proto = constructorFn.prototype;

    proto.compile = proto.compile || angular.noop;
    const originalCompileFn = this._cloneFunction(proto.compile);

    // Decorate the compile method to automatically return the preLink and postLink methods (if
    // they exists) and bind them to the context of the constructor (so `this` works correctly).
    // This gets around the problem of a non-lexical "this" which occurs when the directive class
    // itself returns `this.link` from within the compile function.
    this._override(proto, 'compile', () => function compileReturns(...args) {
      originalCompileFn.apply(this, args);
      const preLink = proto.preLink ? proto.preLink.bind(this) : angular.noop;
      let postLink = angular.noop;
      if (proto.postLink) {
        postLink = proto.postLink.bind(this);
      } else if (proto.link) {
        postLink = proto.link.bind(this);
      }
      return {
        pre: preLink,
        post: postLink,
      };
    });

    const factoryArray = this._createFactoryArray(constructorFn);
    this.app.directive(name, factoryArray);
    return this;
  }

  controller(name, contructorFn) {
    this.app.controller(name, contructorFn);
    return this;
  }

  service(name, contructorFn) {
    this.app.service(name, contructorFn);
    return this;
  }

  provider(name, constructorFn) {
    this.app.provider(name, constructorFn);
    return this;
  }

  factory(name, constructorFn_) {
    const constructorFn = this._normalizeConstructor(constructorFn_);
    const factoryArray = this._createFactoryArray(constructorFn);
    this.app.factory(name, factoryArray);
    return this;
  }

  /**
   * If the constructorFn is an array of type ['dep1', 'dep2', ..., constructor() {}]
   * we need to pull out the array of dependencies and add it as an $inject property of the
   * actual constructor function.
   */
  _normalizeConstructor(input) {
    let constructorFn;
    if (input.constructor === Array) {
      const injected = input.slice(0, input.length - 1);
      constructorFn = input[input.length - 1];
      constructorFn.$inject = injected;
    } else {
      constructorFn = input;
    }
    return constructorFn;
  }

  /**
   * Convert a constructor function into a factory function which returns a new instance of that
   * constructor, with the correct dependencies automatically injected as arguments.
   *
   * In order to inject the dependencies, they must be attached to the constructor function with the
   * `$inject` property annotation.
   */
  _createFactoryArray(CostructorFn) {
    // get the array of dependencies that are needed by this component (as contained in the
    // `$inject` array)
    const args = CostructorFn.$inject || [];
    // create a copy of the array
    const factoryArray = args.slice();
    // The factoryArray uses Angular's array notation whereby each element of the array is the name
    // of a dependency, and the final item is the factory function itself.
    factoryArray.push((...factoryArgs) => {
      // return new constructorFn(...args);
      const instance = new CostructorFn(...factoryArgs);
      // see this: https://github.com/michaelbromley/angular-es6/issues/1
      // for (const key in instance) {
      //   instance[key] = instance[key];
      // }
      return instance;
    });

    return factoryArray;
  }

  /**
   * Clone a function
   * @param original
   * @returns {Function}
   */
  _cloneFunction(original) {
    return function clonedFunction(...args) {
      return original.apply(this, args);
    };
  }

  /**
   * Override an object's method with a new one specified by `callback`.
   * @param object
   * @param methodName
   * @param callback
   */
  _override(object, methodName, callback) {
    const obj = object;
    obj[methodName] = callback(object[methodName]);
  }

}


function ngRegister(appName) {
  return new NgRegister(appName);
}


export default ngRegister;
