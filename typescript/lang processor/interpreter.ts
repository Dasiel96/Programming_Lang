import { DoubleType } from "../dataTypes/number/double"
import { TreeNode } from "../Nodes/binOp"
import { ParseNode } from "../Nodes/nodeInterfaces"
import { NumberNode } from "../Nodes/number"
import { UnaryNode } from "../Nodes/unaryOp"
import { TT_TREE_NODE_TYPE, TT_DIV, TT_DOUBLE, TT_FLOAT, TT_INT, TT_MINUS, TT_MUL, TT_PLUS, TT_UNARY_OP_NODE_TYPE } from "../tokenConsts"
import { FloatType } from "../dataTypes/number/float"
import { IntType } from "../dataTypes/number/int"
import { RTResult } from "./Results/runTimeResult"
import { RunTimeError } from "../exceptions"
import { Position } from "../position"

/*
* used to execute code that is lexed and parsed
*/
export class Interpreter {

    private pos: Position

    constructor(file_name: string) {
        this.pos = new Position(file_name)
    }

    run(node: ParseNode): RTResult {
        return this.interpret(this, node)
    }

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
    private interpret(interpreter: Interpreter, node: ParseNode): RTResult {
        const val = new RTResult()

        if (node.getType() === TT_TREE_NODE_TYPE) {
            val.register(interpreter.interpretBinNode(interpreter, node as TreeNode))
        }
        else if (Array(TT_INT, TT_FLOAT, TT_DOUBLE).includes(node.getType())) {
            val.register(interpreter.interpretNumNode(interpreter, node as NumberNode))
        }
        else if (node.getType() === TT_UNARY_OP_NODE_TYPE) {
            val.register(interpreter.interpretUnaryOp(interpreter, node as UnaryNode))
        }

        return val
    }

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
    private interpretBinNode(interpreter: Interpreter, node: TreeNode): RTResult {
        const val = new RTResult()

        const left = interpreter.interpret(interpreter, node.getLeftNode())
        const right = interpreter.interpret(interpreter, node.getRightNode())

        if (left.getValue() && right.getValue()) {
            const left_val = left.getValue()!!
            const right_val = right.getValue()!!
            const ops = node.getOperation()

            if (ops === TT_PLUS) {
                val.success(left_val.plus(right_val))
            }
            else if (ops === TT_MINUS) {
                val.success(left_val.minus(right_val))
            }
            else if (ops === TT_MUL) {
                val.success(left_val.multiply(right_val))
            }
            else if (ops === TT_DIV) {
                if (right_val.getVal() !== 0) {
                    val.success(left_val.divide(right_val))
                }
                else {
                    const pos = interpreter.pos
                    const err = new RunTimeError("Division by zero", pos)
                    val.failure(err)
                }
            }
        }
        else if (left.getError()) {
            val.failure(left.getError()!!)
        }
        else if (right.getError()) {
            val.failure(right.getError()!!)
        }

        interpreter.pos.advance(node.getType())

        return val
    }

    /**
     * converts a node into a NumberType that has a oposite sign of the number value stored in the node
     *
     * @param   {Interpreter}  interpreter  instance of the interpreter that calls run
     * @param   {UnaryNode}    node         
     *
     * @return  {RTResult}                  
     * @author Daniel Schechtman
     */
    private interpretUnaryOp(interpreter: Interpreter, node: UnaryNode): RTResult {
        const val = new RTResult()

        val.register(interpreter.interpret(interpreter, node.getNode()))

        if (val.getValue()) {
            const left = val.getValue()!!
            const right = new IntType(-1)
            val.success(left.multiply(right))
        }

        interpreter.pos.advance(node.getType())

        return val
    }

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
    private interpretNumNode(interpreter: Interpreter, node: NumberNode): RTResult {
        const val = new RTResult()

        if (node.getType() === TT_INT) {
            val.success(new IntType(node.getData()!!))
        }
        else if (node.getType() === TT_FLOAT) {
            val.success(new FloatType(node.getData()!!))
        }
        else if (node.getType() === TT_DOUBLE) {
            val.success(new DoubleType(node.getData()!!))
        }
        else {
            const pos = interpreter.pos
            const err = new RunTimeError("Number not found", pos)
            val.failure(err)
        }

        interpreter.pos.advance(node.getType())

        return val
    }
}