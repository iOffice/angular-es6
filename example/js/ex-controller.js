import { Injectable, mix, isinstance } from '../../src/index.js';


class OldBase {
  constructor(y) {
    this.y = y;
  }

  getY() {
    return this.y;
  }

  static sayHi() {
    console.log("Hi from OldBase");
  }
}


class Base extends OldBase {
  constructor(x) {
    super(500);
    this.x = x;
  }

  getX() {
    return this.x;
  }
}


class A extends Base {

  constructor(a) {
    super(5);
    this.a = a;
  }

  getA() {
    return this.a;
  }

}


class B extends A {

  constructor(a, b) {
    super(a);
    this.b = b;
  }

  getB() {
    return this.b;
  }

  getA() {
    console.log("calling A from B");
  }

}


class C extends A {

  constructor(a, c) {
    super(a);
    this.c = c;
  }

  getC() {
    return this.c;
  }

  getA() {
    console.log("calling A from C");
    return this.a;
  }

}


class D extends mix(B, C) {

  constructor(a, b, c, d) {
    super([B, a, b], [C, a, c]);
    this.d = d;
  }

  getD() {
    return this.d;
  }

  //getA() {
  //  B.prototype.getA.call(this);
  //  super.getA();
  //  console.log("calling A from D");
  //  return this.a;
  //}

}

class E {

  constructor(blah) {
    this.blah = blah;
  }

}


class F extends mix(D, E) {
  constructor() {
    super([E, 2], [D, 1, 2, 3, 4]);
    //console.log('FROM F:', this.blah, this.a);
    console.log("Calling super...");
    super([D, 1, 2, 3, 4], [E, 1000]);
    console.log('FROM F: ', this.a, this.b, this.c, this.d, this.blah);
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


class DerivedController extends mix(ExController, C) {

  constructor(...args) {
    super([ExController, ...args], [C, 5000, 6000]);
    const f = new F();
    D.sayHi();
    console.log(`f is D: ${isinstance(f, D)}`);
    console.log(`f is E: ${isinstance(f, E)}`);
    console.log(`f is A: ${isinstance(f, A)}`);
    console.log(`f is C: ${isinstance(f, C)}`);
    console.log(`f is ExController: ${isinstance(f, ExController)}`);
    this.obj = new D(1, 2, 3, 4);
    window.obj = this.obj;
    console.log('isinstance(objC, A): ', isinstance(this.obj, A), this.obj.getA());
    console.log('isinstance(objC, B): ', isinstance(this.obj, [ExController, B]));
    console.log('isinstance(objC, C): ', isinstance(this.obj, C));
    console.log('isinstance(objC, ExController): ', isinstance(this.obj, ExController));
    console.log('made object C: ', this.obj.getA(), this.obj.getB(), this.obj.getC(), this.obj.getD(), this.obj.getX(), this.obj.getY());
    console.log('Derived: ', this);
  }

  move(element) {
    this.$log.log('Calling base method ...', this.getA(), this.getC());
    super.move(element);
    this.$log.log('It has been called. Hey look, its injection: ', this.exService);
  }

}
DerivedController.inject(['$log']);

console.log("CHECK EM: ", DerivedController.$inject, ExController.$inject);

export default DerivedController;
