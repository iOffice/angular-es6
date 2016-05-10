function _addBase(clazz: any, mixin: any): void {
  if (clazz.$$mixins.indexOf(mixin) === -1) {
    clazz.$$mixins.unshift(mixin);
    if (mixin.$$mixins) {
      mixin.$$mixins.forEach((base: any) => {
        _addBase(clazz, base);
      });
    }
    const parent: any = Object.getPrototypeOf(mixin.prototype);
    if (parent) {
      _addBase(clazz, parent.constructor);
    }
  }
}


function mix(...mixins: any[]): typeof Mix {
  class Mix {

    static $$mixins: any[] = [];

    /**
     * When extending from a Mix object we must call `super` in the following fashion
     *
     *      super([mixin1, arg1, arg2, ...], [mixin2, arg1, arg2, ...], ...);
     */
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
    // tslint:disable:forin
    for (const prop in mixin.prototype) {
      Mix.prototype[prop] = mixin.prototype[prop];
    }
  });

  return Mix;
}


function _isinstance(object: any, classinfo: any): boolean {
  const proto: any = Object.getPrototypeOf(object);
  const mixins: any[] = proto.constructor.$$mixins;

  let result: boolean = object instanceof classinfo;
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


function isinstance(object: any, classinfo: any): boolean {
  if (Array.isArray(classinfo)) {
    let result: boolean = false;
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
