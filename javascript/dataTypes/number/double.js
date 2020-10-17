"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokenConsts_1 = require("../../tokenConsts");
var int_1 = require("./int");
/*
* used to represent a double type in my mock up basic language
* allows for the easy operation of add, subtract, divide, and multiply
* with float data and int data
*/
var DoubleType = /** @class */ (function () {
    function DoubleType(value) {
        this.val = value;
    }
    /**
     * performs the operation and converts the result into the appropreate number type
     *
     * @param   {(number, number) => number}      calc  the operation to perform
     * @param   {NumberType}                      other the number to do the calculation on
     *
     * @return  {NumberType}                            returns a number of the same or different type
     * @author Daniel Schechtman
     */
    DoubleType.prototype.compute = function (calc, other) {
        var num;
        var result = calc(this.val, other.getVal());
        if (Number.isInteger(result)) {
            num = new int_1.IntType(result);
        }
        else {
            num = new DoubleType(result);
        }
        return num;
    };
    DoubleType.prototype.getVal = function () {
        return this.val;
    };
    DoubleType.prototype.getType = function () {
        return tokenConsts_1.TT_DOUBLE;
    };
    DoubleType.prototype.plus = function (number) {
        return this.compute(function (a, b) { return a + b; }, number);
    };
    DoubleType.prototype.minus = function (number) {
        return this.compute(function (a, b) { return a - b; }, number);
    };
    DoubleType.prototype.multiply = function (number) {
        return this.compute(function (a, b) { return a * b; }, number);
    };
    DoubleType.prototype.divide = function (number) {
        return this.compute(function (a, b) { return a / b; }, number);
    };
    DoubleType.prototype.toString = function () {
        return this.val.toString();
    };
    return DoubleType;
}());
exports.DoubleType = DoubleType;
//# sourceMappingURL=double.js.map