class Injectable {

  constructor(...args: any[]) {
    this.constructor.$inject.forEach((name: string, index: number) => {
      this[name] = args[index];
    });
  }

  static inject(clazz: any, injectables: any[]): void {
    if (!clazz.$inject) {
      clazz.$inject = [];
    } else {
      clazz.$inject = clazz.$inject.slice(0);
    }
    injectables.forEach((injectable: string) => {
      if (clazz.$inject.indexOf(injectable) === -1) {
        clazz.$inject.push(injectable);
      }
    });
  }

}


export default Injectable;
