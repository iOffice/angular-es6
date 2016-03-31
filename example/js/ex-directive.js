import ExController from './ex-controller.js';


class ExDirective {

  constructor($interval) {
    this.$interval = $interval;
    this.template = '<div>I\'m a directive!</div>';
    this.restrict = 'EA';
    this.scope = {};
    this.controller = ExController;
    // etc. for the usual config options
  }

  // optional compile function
  compile(tElement) {
    tElement.css('position', 'absolute');
  }

  // optional link function
  link(scope, element, attr, ctrl) {
    this.$interval(() => ctrl.move(element), 1000);
  }

}
ExDirective.$inject = ['$interval'];

export default ExDirective;
