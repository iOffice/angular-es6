/* eslint-disable no-console */
import { Injectable, mix, isinstance } from '../../src/index';


class OldBase {

  y: number;

  constructor(y: number) {
    this.y = y;
  }

  getY(): number {
    return this.y;
  }

  static sayHi(): void {
    console.log('Hi from OldBase');
  }
}


class Base extends OldBase {

  x: number;

  constructor(x: number) {
    super(500);
    this.x = x;
  }

  getX(): number {
    return this.x;
  }
}


class A extends Base {

  a: number;

  constructor(a: number) {
    super(5);
    this.a = a;
  }

  getA(): number {
    return this.a;
  }

}


class B extends A {

  b: number;

  constructor(a: number, b: number) {
    super(a);
    this.b = b;
  }

  getB(): number {
    return this.b;
  }

  getA(): number {
    console.log('calling A from B');
    return this.a;
  }

}


class C extends A {

  c: number;

  constructor(a: number, c: number) {
    super(a);
    this.c = c;
  }

  getC(): number {
    return this.c;
  }

  getA(): number {
    console.log('calling A from C');
    return this.a;
  }

}


class D extends mix(B, C) {

  d: number;

  constructor(a: number, b: number, c: number, d: number) {
    super([B, a, b], [C, a, c]);
    this.d = d;
  }

  getD(): number {
    return this.d;
  }

  // getA() {
  //  B.prototype.getA.call(this);
  //  super.getA();
  //  console.log("calling A from D");
  //  return this.a;
  // }

}

class E {

  blah: number;

  constructor(blah: number) {
    this.blah = blah;
  }

}


class F extends mix(D, E) {
  constructor() {
    super([E, 2], [D, 1, 2, 3, 4]);
    // console.log('FROM F:', this.blah, this.a);
    console.log('Calling super...');
    super([D, 1, 2, 3, 4], [E, 1000]);
    console.log('FROM F: ', this.a, this.b, this.c, this.d, this.blah);
  }
}


class ExController extends Injectable {

  move(element: HTMLElement): ExController {
    console.log('Am I aware of derived injections? ', this.$log);
    element.css('left', `${Math.random() * this.exService.getRange()}px`);
    element.css('top', `${Math.random() * this.exService.getRange()}px`);
    return this;
  }

}
ExController.inject('exService');


class DerivedController extends mix(ExController, C) {

  constructor(...args) {
    super([ExController, ...args], [C, 5000, 6000]);
    const f: F = new F();
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
    console.log('made object C: ', [
      this.obj.getA(),
      this.obj.getB(),
      this.obj.getC(),
      this.obj.getD(),
      this.obj.getX(),
      this.obj.getY(),
    ]);
    console.log('Derived: ', this);
  }

  move(element) {
    this.$log.log('Calling base method ...', [this.getA(), this.getC()]);
    super.move(element);
    this.$log.log('It has been called. Hey look, its injection: ', this.exService);
    return this;
  }

}
DerivedController.inject(['$log']);

console.log('CHECK EM: ', DerivedController.$inject, ExController.$inject);

export default DerivedController;
