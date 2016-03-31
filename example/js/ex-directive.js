import DerivedController from './ex-controller.js';
import { Injectable } from '../../src/index.js';


class ExDirective extends Injectable {

  constructor(...args) {
    super(...args);
    console.log('ExDirective: ', this);
    this.template = '<div>I\'m a directive!</div>';
    this.restrict = 'EA';
    this.scope = {};
    this.controller = DerivedController;
    // etc. for the usual config options
  }

  // optional compile function
  compile(tElement) {
    tElement.css('position', 'absolute');
  }

  // optional link function
  link(scope, element, attr, ctrl) {
    this.$interval(() => ctrl.move(element), 2500);
  }

}
ExDirective.inject('$interval');


export default ExDirective;
