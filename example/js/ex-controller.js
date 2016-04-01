import { Injectable, mix, isinstance } from '../../src/index.js';


class A {

  constructor(a) {
    this.a = a;
  }

  getA() {
    return this.a;
  }

}


class B {

  constructor(b) {
    this.b = b;
  }

  getB() {
    return this.b;
  }

}


class C extends mix(A, B) {

  constructor(a, b, c) {
    super([A, a], [B, b]);
    this.c = c;
  }

  getC() {
    return this.c;
  }

}

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
    this.objC = new C(1, 2, 3);
    console.log('isinstance(objC, A): ', isinstance(this.objC, A));
    console.log('isinstance(objC, B): ', isinstance(this.objC, [ExController, B]));
    console.log('isinstance(objC, C): ', isinstance(this.objC, C));
    console.log('isinstance(objC, ExController): ', isinstance(this.objC, ExController));
    console.log('made object C: ', this.objC.getA(), this.objC.getB(), this.objC.getC());
    console.log('Derived: ', this);
  }

  move(element) {
    this.$log.log('Calling base method ...');
    super.move(element);
    this.$log.log('It has been called. Hey look, its injection: ', this.exService);
  }

}
DerivedController.inject(['$log']);


export default DerivedController;
