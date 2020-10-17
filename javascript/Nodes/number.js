"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* node that represents a number in my basic language
*/
var NumberNode = /** @class */ (function () {
    function NumberNode(token) {
        this.tok = token;
    }
    NumberNode.prototype.getData = function () {
        return this.tok.getData();
    };
    NumberNode.prototype.getType = function () {
        return this.tok.getDataType();
    };
    // override methods below
    NumberNode.prototype.toString = function () {
        return this.tok.getDataType() + ":" + this.tok.getData();
    };
    return NumberNode;
}());
exports.NumberNode = NumberNode;
//# sourceMappingURL=number.js.map