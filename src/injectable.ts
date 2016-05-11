class Injectable {

  constructor(...args: any[]) {
    this.constructor.$inject.forEach((name: string, index: number) => {
      this[name] = args[index];
    });
  }

}


export default Injectable;
