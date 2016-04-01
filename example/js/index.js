import './polyfill.js';
import { ngRegister } from '../../src/index.js';
import ExDirective from './ex-directive.js';
import ExService from './ex-service.js';


class DemoController {}

ngRegister('DemoApp', [])
  .run(() => {
    console.log('Calling angular.module run function...');
  })
  .controller('DemoController', DemoController)
  .directive('exDirective', ExDirective)
  .service('exService', ExService)
;
