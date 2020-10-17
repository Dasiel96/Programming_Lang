"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numberTyps_1 = require("./numberTyps");
const tokenConsts_1 = require("./tokenConsts");
class Interpreter {
    run(node) {
        return this.interpret(this, node).getVal();
    }
    interpret(interpreter, node) {
        let val = new numberTyps_1.IntType(0);
        if (node.getType() === tokenConsts_1.TT_BIN_OP_NODE_TYPE) {
            val = interpreter.interpretBinNode(interpreter, node);
        }
        else if (Array(tokenConsts_1.TT_INT, tokenConsts_1.TT_FLOAT, tokenConsts_1.TT_DOUBLE).includes(node.getType())) {
            val = interpreter.interpretNumNode(interpreter, node);
        }
        else if (node.getType() === tokenConsts_1.TT_UNARY_OP_NODE_TYPE) {
            val = interpreter.interpretUnaryOp(interpreter, node);
        }
        return val;
    }
    interpretBinNode(interpreter, node) {
        const left = interpreter.interpret(interpreter, node.getLeftNode());
        const right = interpreter.interpret(interpreter, node.getRightNode());
        const ops = node.getOperation();
        let val = new numberTyps_1.IntType(0);
        if (ops === tokenConsts_1.TT_PLUS) {
            val = left.add(right);
        }
        else if (ops === tokenConsts_1.TT_MINUS) {
            val = left.subtract(right);
        }
        else if (ops === tokenConsts_1.TT_MUL) {
            val = left.multiply(right);
        }
        else if (ops === tokenConsts_1.TT_DIV) {
            val = left.divide(right);
        }
        console.log(val.getType());
        return val;
    }
    interpretUnaryOp(interpreter, node) {
        // made it a double initally because the number types will
        // automatically convert themselves to the proper type
        // and double has the simpliest checks to determine what to
        // convert to
        let val = new numberTyps_1.DoubleType(node.getData());
        if (node.getOperation() === tokenConsts_1.TT_MINUS) {
            val = new numberTyps_1.DoubleType(val.getVal() * -1);
        }
        return val;
    }
    interpretNumNode(interpreter, node) {
        let val = new numberTyps_1.IntType(0);
        if (node.getType() === tokenConsts_1.TT_INT) {
            val = new numberTyps_1.IntType(node.getData());
        }
        else if (node.getType() === tokenConsts_1.TT_FLOAT) {
            val = new numberTyps_1.FloatType(node.getData());
        }
        else if (node.getType() === tokenConsts_1.TT_DOUBLE) {
            val = new numberTyps_1.DoubleType(node.getData());
        }
        return val;
    }
}
exports.Interpreter = Interpreter;
//# sourceMappingURL=interpreter.js.map