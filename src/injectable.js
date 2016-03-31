class Injectable {

  constructor(...args) {
    this.constructor.$inject.forEach((name, index) => {
      this[name] = args[index];
    });
  }

  static inject(...args) {
    if (!this.$inject) {
      this.$inject = [];
    }
    args.forEach((arg) => {
      if (typeof arg === 'string') {
        this.$inject.push(arg);
      } else {
        this.$inject.push(...arg);
      }
    });
  }

}


export default Injectable;
