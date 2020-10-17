"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokenConsts_1 = require("../../tokenConsts");
var double_1 = require("./double");
var int_1 = require("./int");
/*
* represents a float type in my basic language
* allows for easy operations of add, minus, multiply, divide between double and
* int data in the language
*/
var FloatType = /** @class */ (function () {
    function FloatType(value) {
        this.val = value;
    }
    /**
     * performs an operation (mul, div, add, minus) and casts the result to the appropreate number type
     *
     * @param   {(number, number) => number}      calc   the operation to be performed
     * @param   {NumberType}                      other  the other value to do an operation on
     *
     * @return  {NumberType}                             returns the same or different number type
     * @author Daniel Schechtman
     */
    FloatType.prototype.compute = function (calc, other) {
        var num;
        var result = calc(this.val, other.getVal());
        if (Number.isInteger(result)) {
            num = new int_1.IntType(result);
        }
        else if (other.getType() == tokenConsts_1.TT_DOUBLE) {
            num = new double_1.DoubleType(result);
        }
        else {
            num = new FloatType(result);
        }
        return num;
    };
    FloatType.prototype.getVal = function () {
        return this.val;
    };
    FloatType.prototype.getType = function () {
        return tokenConsts_1.TT_FLOAT;
    };
    FloatType.prototype.plus = function (number) {
        return this.compute(function (a, b) { return a + b; }, number);
    };
    FloatType.prototype.minus = function (number) {
        return this.compute(function (a, b) { return a - b; }, number);
    };
    FloatType.prototype.multiply = function (number) {
        return this.compute(function (a, b) { return a * b; }, number);
    };
    FloatType.prototype.divide = function (number) {
        return this.compute(function (a, b) { return a / b; }, number);
    };
    FloatType.prototype.toString = function () {
        return this.val.toString();
    };
    return FloatType;
}());
exports.FloatType = FloatType;
//# sourceMappingURL=float.js.map