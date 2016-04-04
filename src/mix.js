const classCallCheckMod = require('babel-runtime/helpers/classCallCheck.js');
const classCallCheck = classCallCheckMod.default;
let classCallCheckOn = 0;


function _addBase(clazz, mixin) {
  if (clazz.__mixins.indexOf(mixin) === -1) {
    clazz.__mixins.unshift(mixin);
    if (mixin.__mixins) {
      mixin.__mixins.forEach((base) => {
        _addBase(clazz, base);
      });
    }
    const parent = Object.getPrototypeOf(mixin.prototype);
    if (parent) {
      _addBase(clazz, parent.constructor);
    }
  }
}


function mix(...mixins) {
  class Mix {

    constructor(...args) {
      classCallCheckMod.default = () => {};
      classCallCheckOn += 1;
      args.forEach((arg) => {
        const constructorArgs = arg.slice(1);
        const clazz = arg[0];
        clazz.call(this, ...constructorArgs);
      });
      classCallCheckOn -= 1;
      if (classCallCheckOn === 0) {
        classCallCheckMod.default = classCallCheck;
      }
    }

  }
  Mix.__mixins = [];

  for (const mixin of mixins) {
    _addBase(Mix, mixin);
    for (const prop in mixin.prototype) {
      Mix.prototype[prop] = mixin.prototype[prop];
    }
  }
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
