# Angular ES6

This library provides the `ngRegister` function which is a modified copy of Michael Bromley's
[`register.js`][1].

## Example

This library allows declare classes and register them as angular components. Here is a summary

```
import { ngRegister } from 'angular-es6';


class MyAngularComponent {

    constructor(dependency1, dependency2) {
        this.dependency1 = dependency1;
        // stuff happens here
    }
    someMethods() {
        this.dependency1.doThatThing();
        // more stuff here
    }
}
MyAngularComponent.inject('dependency1', 'dependency2');
// MyAngularComponent.inject(['dependency1', 'dependency2']);


ngRegister('app')
    .controller('MyController', MyAngularComponent)
    .service('myService', MyAngularComponent)
    .provider('myOtherService', MyAngularComponent)
    .factory('myFactory', MyAngularComponent)
    .directive('myDirective', MyAngularComponent);
```

or if you prefer to use the dependencies without declaring them in the constructor simply do

```
import { ngRegister, Injectable } from 'angular-es6';


class MyAngularComponent extends Injectable {

    constructor(...args) {
        super(...args);
        // stuff happens here
    }
    someMethods() {
        this.dependency1.doThatThing();
        // more stuff here
    }
}
MyAngularComponent.inject('dependency1', 'dependency2');
// MyAngularComponent.inject(['dependency1', 'dependency2']);


ngRegister('app')
    .controller('MyController', MyAngularComponent)
    .service('myService', MyAngularComponent)
    .provider('myOtherService', MyAngularComponent)
    .factory('myFactory', MyAngularComponent)
    .directive('myDirective', MyAngularComponent);
```

### Creating directives

See `example/js/ex-directive.js`. One thing to mention here is that `compile`, `link`, `preLink` and
`postLink` are optional methods. Please note however that if `postLink` and `link` are both declared
then only the `postLink` method will be called. These two methods should be one and the same so only
declare one.

### IE WARNING

When using inheritance we need the following polyfill in IE:

```
const key = 'setPrototypeOf';
if (typeof Object[key] === 'undefined') {
  Object[key] = require('babel-runtime/helpers/defaults.js').default;
}
```

[1]: https://github.com/michaelbromley/angular-es6
