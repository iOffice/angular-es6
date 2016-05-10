class Injectable {

  constructor(...args: any[]) {
    this.constructor.$inject.forEach((name: string, index: number) => {
      this[name] = args[index];
    });
  }

  static inject(...args: any[]): void {
    if (!this.$inject) {
      this.$inject = [];
    }
    args.forEach((arg: any) => {
      if (typeof arg === 'string') {
        this.$inject.push(arg);
      } else {
        this.$inject.push(...arg);
      }
    });
  }

}


export default Injectable;
