"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var double_1 = require("../dataTypes/number/double");
var tokenConsts_1 = require("../tokenConsts");
var float_1 = require("../dataTypes/number/float");
var int_1 = require("../dataTypes/number/int");
var runTimeResult_1 = require("./Results/runTimeResult");
var exceptions_1 = require("../exceptions");
var position_1 = require("../position");
/*
* used to execute code that is lexed and parsed
*/
var Interpreter = /** @class */ (function () {
    function Interpreter(file_name) {
        this.pos = new position_1.Position(file_name);
    }
    Interpreter.prototype.run = function (node) {
        return this.interpret(this, node);
    };
    /**
     * checks what type of node was passed in and calls the appropreate method to convert
     * that node to to a RTResult containing an error or NumberType
     *
     * @param   {Interpreter}  interpreter  instance of the Interpreter class calling run
     * @param   {ParseNode}    node
     *
     * @return  {RTResult}
     * @author Daniel Schechtman
     */
    Interpreter.prototype.interpret = function (interpreter, node) {
        var val = new runTimeResult_1.RTResult();
        if (node.getType() === tokenConsts_1.TT_TREE_NODE_TYPE) {
            val.register(interpreter.interpretBinNode(interpreter, node));
        }
        else if (Array(tokenConsts_1.TT_INT, tokenConsts_1.TT_FLOAT, tokenConsts_1.TT_DOUBLE).includes(node.getType())) {
            val.register(interpreter.interpretNumNode(interpreter, node));
        }
        else if (node.getType() === tokenConsts_1.TT_UNARY_OP_NODE_TYPE) {
            val.register(interpreter.interpretUnaryOp(interpreter, node));
        }
        return val;
    };
    /**
     * Takes a BinOp node and tries to convert it into a NumberType and tries to store it
     * into a RTResult, otherwise an error is stored in an RTResult
     *
     * @param   {Interpreter}  interpreter  instance of the interpreter that calls run
     * @param   {TreeNode}    node
     *
     * @return  {RTResult}
     * @author Daniel Schechtman
     */
    Interpreter.prototype.interpretBinNode = function (interpreter, node) {
        var val = new runTimeResult_1.RTResult();
        var left = interpreter.interpret(interpreter, node.getLeftNode());
        var right = interpreter.interpret(interpreter, node.getRightNode());
        if (left.getValue() && right.getValue()) {
            var left_val = left.getValue();
            var right_val = right.getValue();
            var ops = node.getOperation();
            if (ops === tokenConsts_1.TT_PLUS) {
                val.success(left_val.plus(right_val));
            }
            else if (ops === tokenConsts_1.TT_MINUS) {
                val.success(left_val.minus(right_val));
            }
            else if (ops === tokenConsts_1.TT_MUL) {
                val.success(left_val.multiply(right_val));
            }
            else if (ops === tokenConsts_1.TT_DIV) {
                if (right_val.getVal() !== 0) {
                    val.success(left_val.divide(right_val));
                }
                else {
                    var pos = interpreter.pos;
                    var err = new exceptions_1.RunTimeError("Division by zero", pos);
                    val.failure(err);
                }
            }
        }
        else if (left.getError()) {
            val.failure(left.getError());
        }
        else if (right.getError()) {
            val.failure(right.getError());
        }
        interpreter.pos.advance(node.getType());
        return val;
    };
    /**
     * converts a node into a NumberType that has a oposite sign of the number value stored in the node
     *
     * @param   {Interpreter}  interpreter  instance of the interpreter that calls run
     * @param   {UnaryNode}    node
     *
     * @return  {RTResult}
     * @author Daniel Schechtman
     */
    Interpreter.prototype.interpretUnaryOp = function (interpreter, node) {
        var val = new runTimeResult_1.RTResult();
        val.register(interpreter.interpret(interpreter, node.getNode()));
        if (val.getValue()) {
            var left = val.getValue();
            var right = new int_1.IntType(-1);
            val.success(left.multiply(right));
        }
        interpreter.pos.advance(node.getType());
        return val;
    };
    /**
     * converts a node to a number type and stores it into an RTResult
     * if a NumberType can't be made an error is stored
     *
     * @param   {Interpreter}  interpreter  instance of interpreter that calls run
     * @param   {NumberNode}   node
     *
     * @return  {RTResult}
     * @author Daniel Schechtman
     */
    Interpreter.prototype.interpretNumNode = function (interpreter, node) {
        var val = new runTimeResult_1.RTResult();
        if (node.getType() === tokenConsts_1.TT_INT) {
            val.success(new int_1.IntType(node.getData()));
        }
        else if (node.getType() === tokenConsts_1.TT_FLOAT) {
            val.success(new float_1.FloatType(node.getData()));
        }
        else if (node.getType() === tokenConsts_1.TT_DOUBLE) {
            val.success(new double_1.DoubleType(node.getData()));
        }
        else {
            var pos = interpreter.pos;
            var err = new exceptions_1.RunTimeError("Number not found", pos);
            val.failure(err);
        }
        interpreter.pos.advance(node.getType());
        return val;
    };
    return Interpreter;
}());
exports.Interpreter = Interpreter;
//# sourceMappingURL=interpreter.js.map