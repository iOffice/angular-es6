"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mix_1 = require('../src/mix');
var A = (function () {
    function A(a) {
        this.a = a;
    }
    A.prototype.getA = function () {
        return this.a;
    };
    return A;
}());
var AB = (function (_super) {
    __extends(AB, _super);
    function AB(a, ab) {
        _super.call(this, a);
        this.ab = ab;
    }
    AB.prototype.getA = function () {
        return this.a + 1000;
    };
    AB.prototype.getAB = function () {
        return this.ab;
    };
    return AB;
}(A));
var AC = (function (_super) {
    __extends(AC, _super);
    function AC(a, ac) {
        _super.call(this, a);
        this.ac = ac;
    }
    AC.prototype.getA = function () {
        return _super.prototype.getA.call(this) + 2000;
    };
    AC.prototype.getAC = function () {
        return this.ac;
    };
    return AC;
}(A));
var D1 = (function (_super) {
    __extends(D1, _super);
    function D1(a, ab, ac, d) {
        _super.call(this, [AB, a, ab], [AC, a, ac]);
        this.d = d;
    }
    D1.prototype.getD = function () {
        return this.d;
    };
    return D1;
}(mix_1.mix(AB, AC)));
var D2 = (function (_super) {
    __extends(D2, _super);
    function D2(a, ab, ac, d) {
        _super.call(this, [AB, a, ab], [AC, a, ac]);
        this.d = d;
    }
    D2.prototype.getA = function () {
        // gives 1
        // same as A.prototype.getA.call(this);
        var fromA = this.callBase(A, 'getA');
        // gives 1001
        var fromAB = this.callBase(AB, 'getA');
        // gives 2001
        var fromAC = this.callBase(AC, 'getA');
        return fromA + fromAB + fromAC;
    };
    D2.prototype.getAB = function () {
        return -this.callBase(AB, 'getAB');
    };
    D2.prototype.getD = function () {
        return this.d;
    };
    return D2;
}(mix_1.mix(AB, AC)));
describe('mix-method:override', function () {
    describe('extending classes should allow us to override', function () {
        var obj1 = new D1(1, 2, 3, 4);
        var obj2 = new D2(1, 2, 3, 4);
        it('should use the method of last mixin when using super', function () {
            expect(obj1.getA()).toBe(2001);
            expect(obj1.getAB()).toBe(2);
            expect(obj1.getAC()).toBe(3);
            expect(obj1.getD()).toBe(4);
        });
        it('should use allow us to use any of the methods from the parents', function () {
            expect(obj2.getA()).toBe(3003);
            expect(obj2.getAB()).toBe(-2);
        });
    });
});
