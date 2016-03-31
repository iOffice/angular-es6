import angular from 'angular';
import { ngRegister } from '../../src/index.js';
import ExDirective from './ex-directive.js';
import ExService from './ex-service.js';


class DemoController {}


angular.module('DemoApp', []);

ngRegister('DemoApp')
  .controller('DemoController', DemoController)
  .directive('exDirective', ExDirective)
  .service('exService', ExService)
;
