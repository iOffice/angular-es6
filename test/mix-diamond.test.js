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
    AC.prototype.getAC = function () {
        return this.ac;
    };
    return AC;
}(A));
var D = (function (_super) {
    __extends(D, _super);
    function D(a, ab, ac, d) {
        _super.call(this, [AB, a, ab], [AC, a, ac]);
        this.d = d;
    }
    D.prototype.getD = function () {
        return this.d;
    };
    return D;
}(mix_1.mix(AB, AC)));
describe('mix-diamond:simple', function () {
    describe('extending a simple class', function () {
        var DerivedA = (function (_super) {
            __extends(DerivedA, _super);
            function DerivedA() {
                _super.apply(this, arguments);
            }
            return DerivedA;
        }(A));
        var instance = new DerivedA(100);
        it('should allow us to use its methods', function () {
            expect(instance.getA()).toBe(100);
        });
        it('should be an instance of the base class', function () {
            expect(instance instanceof A).toBeTruthy();
        });
    });
    describe('mixing classes', function () {
        var obj = new D(1, 2, 3, 4);
        it('should allow us to use its methods', function () {
            expect(obj.getA()).toBe(1);
            expect(obj.getAB()).toBe(2);
            expect(obj.getAC()).toBe(3);
            expect(obj.getD()).toBe(4);
        });
        it('should fail when using instanceof on parent classes', function () {
            expect(obj instanceof A).toBeFalsy();
            expect(obj instanceof AB).toBeFalsy();
            expect(obj instanceof AC).toBeFalsy();
            expect(obj instanceof D).toBeTruthy();
        });
        it('should be able to use isinstance', function () {
            expect(mix_1.isinstance(obj, A)).toBeTruthy();
            expect(mix_1.isinstance(obj, AB)).toBeTruthy();
            expect(mix_1.isinstance(obj, AC)).toBeTruthy();
            expect(mix_1.isinstance(obj, D)).toBeTruthy();
            expect(mix_1.isinstance(obj, [A, AB])).toBeTruthy();
        });
    });
});
