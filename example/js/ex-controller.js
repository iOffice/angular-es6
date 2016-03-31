import { Injectable } from '../../src/index.js';


class ExController extends Injectable {

  move(element) {
    console.log('Am I aware of derived injections? ', this.$log);
    element.css('left', `${Math.random() * this.exService.getRange()}px`);
    element.css('top', `${Math.random() * this.exService.getRange()}px`);
  }

}
ExController.inject('exService');


class DerivedController extends ExController {

  constructor(...args) {
    super(...args);
    console.log("Derived: ", this);
  }

  move(element) {
    this.$log.log('Calling base method ...');
    super.move(element);
    this.$log.log('It has been called. Hey look, its injection: ', this.exService);
  }

}
DerivedController.inject(['$log']);


export default DerivedController;
