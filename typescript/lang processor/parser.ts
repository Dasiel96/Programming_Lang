import { IllegalSyntaxError } from "../exceptions"
import { TreeNode } from "../Nodes/binOp"
import { NumberNode } from "../Nodes/number"
import { UnaryNode } from "../Nodes/unaryOp"
import { Position } from "../position"
import { Token } from "../token"
import { TT_INT, TT_FLOAT, TT_DOUBLE, TT_NUMBER, TT_MINUS, TT_LPAREN, TT_RPAREN, TT_MUL, TT_DIV, TT_PLUS, TT_EOF } from "../tokenConsts"
import { ParseResult } from "./Results/parseResult"

/*
* takes a array of tokens and turns them into an abstract syntax tree
*/
export class Parser {

    private static self: Parser

    private token_list: Array<Token>
    private token_index: Position
    private cur_token: Token | null

    constructor(token_list: Array<Token>, file_name: string, text: string) {
        this.token_list = token_list
        this.token_index = new Position(file_name)

        if (token_list.length > 0) {
            this.cur_token = this.token_list[this.token_index.getIndex()]
        }
        else {
            this.cur_token = null
        }
    }

    /**
     * get the next token in the list passed in and stores it in cur_token
     *
     * @author Daniel Schechtman
     */
    private advance(): void {
        Parser.self.token_index.advance(`${Parser.self.cur_token?.getDataType()}`)
        const index = Parser.self.token_index.getIndex()

        if (index < Parser.self.token_list.length) {
            Parser.self.cur_token = Parser.self.token_list[index]
        }
        else {
            Parser.self.cur_token = null
        }
    }

    /**
     * attempts to build an ast from a list of tokens. Will eiter return a ParseResult holding a BinOpNode
     * or an error
     * 
     *
     * @param   {(pos: Position) => ParseResult} method method to represent the term or factor method
     * @param   {Array<string>}                  ops list of opers (ie TT_PLUS or TT_MUL) to group operation types together
     * this is so the language can accurately produce numbers based on the order of operations
     *
     * @return  {ParseResult}             
     * @author Daniel Schechtman
     */
    private buildAst(method: (pos: Position) => ParseResult, ops: Array<string>): ParseResult {

        const pos_copy = Parser.self.token_index.copy()

        // stores the resulting ast
        const left_node = new ParseResult()
        left_node.register(method(pos_copy))

        // makes sure that the while loop only runs if the cur_token has
        // the correct operator
        const isOperToken = (): boolean => {
            const cur_tok = Parser.self.cur_token
            return ops.includes(`${cur_tok?.getDataType()}`)
        }


        // loop to generate the ast
        while (isOperToken() && !left_node.getError()) {
            const operation = `${Parser.self.cur_token?.getDataType()}`
            Parser.self.advance()
            const right_node = method(pos_copy)

            if (!right_node.getError()) {
                const left = left_node.getNode()
                const right = right_node.getNode()
                if (left && right) {
                    left_node.success(new TreeNode(operation, left, right))
                }
            }
            else {
                left_node.register(right_node)
            }
        }


        return left_node
    }

    /**
     * tries to turn a token into a NumberNode and store the NumberNode in a ParseResult
     * will store an error in a ParseResult if a NumberNode can't be created
     *
     * @param   {Position}     pos
     *
     * @return  {ParseResult}       
     * @author Daniel Schechtman
     */
    private factor(pos: Position): ParseResult {
        let result = new ParseResult()

        const token = Parser.self.cur_token
        const num_type_array = new Array(TT_INT, TT_FLOAT, TT_DOUBLE, TT_NUMBER)
        const is_correct_type = token && num_type_array.includes(token.getDataType())
        const is_minus = token?.getDataType() === TT_MINUS
        const is_left_paren = token?.getDataType() === TT_LPAREN

        // checks for a factor starting with a negative sign
        if (is_minus) {
            const op = `${token?.getDataType()}`

            Parser.self.advance()
            const num = Parser.self.factor(pos)

            if (num.getError()) {
                result.register(num)
            }
            else {
                result.success(new UnaryNode(op, num.getNode()!!))
            }
        }
        // checks for a factor starting with an opening parenthisis
        else if (is_left_paren) {
            Parser.self.advance()
            const expr = Parser.self.expr()

            result.register(expr)

            if (Parser.self.cur_token?.getDataType() !== TT_RPAREN) {
                const err = new IllegalSyntaxError("Expected ')'", Parser.self.token_index)
                result.failure(err)
            }
            else {
                Parser.self.advance()
            }
        }
        // checks if a factor is a number
        else if (is_correct_type) {
            const numberNode = new NumberNode(Parser.self.cur_token!!)
            result.success(numberNode)
            Parser.self.advance()
        }
        else {
            const err = new IllegalSyntaxError("expected int, float, or double", Parser.self.token_index)
            result.failure(err)
        }

        return result
    }

    private term(pos: Position): ParseResult {
        return Parser.self.buildAst(Parser.self.factor, new Array(TT_MUL, TT_DIV))
    }

    private expr(): ParseResult {
        return Parser.self.buildAst(Parser.self.term, new Array(TT_PLUS, TT_MINUS))
    }

    parse(): ParseResult {
        Parser.self = this
        const ast = Parser.self.expr()

        // catches any errors that up to this point have not been caught
        if (!ast.getError() && Parser.self.cur_token?.getDataType() !== TT_EOF) {
            const pos = Parser.self.token_index
            const err = new IllegalSyntaxError("expected '-', '+', '/', or '*'", pos)
            ast.failure(err)
        }

        return ast
    }
}