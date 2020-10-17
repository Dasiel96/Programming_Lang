"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokenConsts_1 = require("../tokenConsts");
/*
* node representing a unary operation (ie -1)
*/
var UnaryNode = /** @class */ (function () {
    function UnaryNode(operation, node) {
        this.op = operation;
        this.node = node;
    }
    UnaryNode.prototype.getOperation = function () {
        return this.op;
    };
    UnaryNode.prototype.getNode = function () {
        return this.node;
    };
    UnaryNode.prototype.getType = function () {
        return tokenConsts_1.TT_UNARY_OP_NODE_TYPE;
    };
    // override methods below
    UnaryNode.prototype.toString = function () {
        return "(" + this.op + " " + this.node + ")";
    };
    return UnaryNode;
}());
exports.UnaryNode = UnaryNode;
//# sourceMappingURL=unaryOp.js.map