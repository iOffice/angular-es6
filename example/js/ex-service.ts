class ExService {

  constructor() {
    this.range = 500;
  }

  setRange(range) {
    this.range = range;
    return this;
  }

  getRange() {
    return this.range;
  }

}

export default ExService;
