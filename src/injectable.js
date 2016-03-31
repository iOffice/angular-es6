class Injectable {

  constructor(...args) {
    this.constructor.$inject.forEach((name, index) => {
      this[name] = args[index];
    });
  }

}

export default Injectable;
