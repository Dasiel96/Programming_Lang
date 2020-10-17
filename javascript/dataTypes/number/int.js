"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokenConsts_1 = require("../../tokenConsts");
var double_1 = require("./double");
var float_1 = require("./float");
/*
* represents a int type in my basic language
* allows for easy operations of add, minus, multiply, divide between double and
* float data in the language
*/
var IntType = /** @class */ (function () {
    function IntType(value) {
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
    IntType.prototype.compute = function (calc, other) {
        var num;
        var result = calc(this.val, other.getVal());
        if (other.getType() === tokenConsts_1.TT_FLOAT) {
            num = new float_1.FloatType(result);
        }
        else if (!Number.isInteger(result) && result.toString().length <= tokenConsts_1.TT_FLOAT_SIZE) {
            num = new float_1.FloatType(result);
        }
        else if (other.getType() === tokenConsts_1.TT_DOUBLE || !Number.isInteger(result)) {
            num = new double_1.DoubleType(result);
        }
        else {
            num = new IntType(result);
        }
        return num;
    };
    IntType.prototype.getVal = function () {
        return this.val;
    };
    IntType.prototype.getType = function () {
        return tokenConsts_1.TT_INT;
    };
    IntType.prototype.plus = function (number) {
        return this.compute(function (a, b) { return a + b; }, number);
    };
    IntType.prototype.minus = function (number) {
        return this.compute(function (a, b) { return a - b; }, number);
    };
    IntType.prototype.multiply = function (number) {
        return this.compute(function (a, b) { return a * b; }, number);
    };
    IntType.prototype.divide = function (number) {
        return this.compute(function (a, b) { return a / b; }, number);
    };
    IntType.prototype.toString = function () {
        return this.val.toString();
    };
    return IntType;
}());
exports.IntType = IntType;
//# sourceMappingURL=int.js.map