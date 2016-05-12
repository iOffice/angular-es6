"use strict";
var Injectable = (function () {
    function Injectable() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        this.constructor.$inject.forEach(function (name, index) {
            _this[name] = args[index];
        });
    }
    Injectable.inject = function (clazz, injectables) {
        if (!clazz.$inject) {
            clazz.$inject = [];
        }
        else {
            clazz.$inject = clazz.$inject.slice(0);
        }
        injectables.forEach(function (injectable) {
            if (clazz.$inject.indexOf(injectable) === -1) {
                clazz.$inject.push(injectable);
            }
        });
    };
    return Injectable;
}());
exports.Injectable = Injectable;
function Inject(args) {
    return function (target) {
        Injectable.inject(target, args);
    };
}
exports.Inject = Inject;
