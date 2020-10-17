"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokenConsts_1 = require("../tokenConsts");
/*
* represents a node on the abstract syntax tree
*/
var TreeNode = /** @class */ (function () {
    function TreeNode(operation, l_node, r_node) {
        this.op = operation;
        this.left_node = l_node;
        this.right_node = r_node;
    }
    TreeNode.prototype.getType = function () {
        return tokenConsts_1.TT_TREE_NODE_TYPE;
    };
    TreeNode.prototype.getOperation = function () {
        return this.op;
    };
    TreeNode.prototype.getLeftNode = function () {
        return this.left_node;
    };
    TreeNode.prototype.getRightNode = function () {
        return this.right_node;
    };
    // override methods below
    TreeNode.prototype.toString = function () {
        return "(" + this.left_node + " " + this.op + " " + this.right_node + ")";
    };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
//# sourceMappingURL=binOp.js.map