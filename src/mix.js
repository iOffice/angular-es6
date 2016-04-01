const classCallCheckMod = require('babel-runtime/helpers/classCallCheck.js');
const classCallCheck = classCallCheckMod.default;


function copyProperties(target, source) {
  for (const key of Reflect.ownKeys(source)) {
    if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      const desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}


function mix(...mixins) {
  class Mix {

    constructor(...args) {
      classCallCheckMod.default = () => {};
      args.forEach((arg) => {
        const constructorArgs = arg.slice(1);
        const clazz = arg[0];
        clazz.call(this, ...constructorArgs);
      });
      classCallCheckMod.default = classCallCheck;
    }

  }

  // Add all the methods and accessors of the mixins to class Mix.
  for (const mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }
  Mix.__mixins = mixins;

  return Mix;
}


function _isinstance(object, classinfo) {
  const proto = Object.getPrototypeOf(object);
  const mixins = proto.constructor.__mixins;

  let result = object instanceof classinfo;
  if (!result && mixins) {
    for (const index in mixins) {
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
    let result = false;
    for (const index in classinfo) {
      if (_isinstance(object, classinfo[index])) {
        result = true;
        break;
      }
    }
    return result;
  }
  return _isinstance(object, classinfo);
}


export {
  mix,
  isinstance,
};
