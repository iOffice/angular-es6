function _addBase(clazz, mixin) {
  if (clazz.$$mixins.indexOf(mixin) === -1) {
    clazz.$$mixins.unshift(mixin);
    if (mixin.$$mixins) {
      mixin.$$mixins.forEach((base) => {
        _addBase(clazz, base);
      });
    }
    const parent = Object.getPrototypeOf(mixin.prototype);
    if (parent) {
      _addBase(clazz, parent.constructor);
    }
  }
}


function mix(...mixins: any[]): typeof Mix {
  class Mix {

    static $$mixins: any[] = [];

    constructor(...args: any[][]) {
      args.forEach((arg: any[]) => {
        const clazz: any = arg[0];
        const constructorArgs: any[] = arg.slice(1);
        clazz.call(this, ...constructorArgs);
      });
    }

    /**
     * Allows to call any of the base methods.
     */
    callBase(base: any, method: string, ...args: any[]): any {
      return base.prototype[method].call(this, ...args);
    }
  }

  mixins.forEach((mixin: any) => {
    _addBase(Mix, mixin);
    for (const p in mixin) {
      if (p !== '$$mixins') {
        Mix[p] = mixin[p];
      }
    }
    for (const prop in mixin.prototype) {
      Mix.prototype[prop] = mixin.prototype[prop];
    }
  });

  return Mix;
}


function _isinstance(object, classinfo) {
  const proto = Object.getPrototypeOf(object);
  const mixins = proto.constructor.$$mixins;

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
