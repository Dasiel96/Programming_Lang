"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exceptions_1 = require("../exceptions");
var binOp_1 = require("../Nodes/binOp");
var number_1 = require("../Nodes/number");
var unaryOp_1 = require("../Nodes/unaryOp");
var position_1 = require("../position");
var tokenConsts_1 = require("../tokenConsts");
var parseResult_1 = require("./Results/parseResult");
/*
* takes a array of tokens and turns them into an abstract syntax tree
*/
var Parser = /** @class */ (function () {
    function Parser(token_list, file_name, text) {
        this.token_list = token_list;
        this.token_index = new position_1.Position(file_name);
        if (token_list.length > 0) {
            this.cur_token = this.token_list[this.token_index.getIndex()];
        }
        else {
            this.cur_token = null;
        }
    }
    /**
     * get the next token in the list passed in and stores it in cur_token
     *
     * @author Daniel Schechtman
     */
    Parser.prototype.advance = function () {
        var _a;
        Parser.self.token_index.advance("" + ((_a = Parser.self.cur_token) === null || _a === void 0 ? void 0 : _a.getDataType()));
        var index = Parser.self.token_index.getIndex();
        if (index < Parser.self.token_list.length) {
            Parser.self.cur_token = Parser.self.token_list[index];
        }
        else {
            Parser.self.cur_token = null;
        }
    };
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
    Parser.prototype.buildAst = function (method, ops) {
        var _a;
        var pos_copy = Parser.self.token_index.copy();
        // stores the resulting ast
        var left_node = new parseResult_1.ParseResult();
        left_node.register(method(pos_copy));
        // makes sure that the while loop only runs if the cur_token has
        // the correct operator
        var isOperToken = function () {
            var _a;
            var cur_tok = Parser.self.cur_token;
            return ops.includes("" + ((_a = cur_tok) === null || _a === void 0 ? void 0 : _a.getDataType()));
        };
        // loop to generate the ast
        while (isOperToken() && !left_node.getError()) {
            var operation = "" + ((_a = Parser.self.cur_token) === null || _a === void 0 ? void 0 : _a.getDataType());
            Parser.self.advance();
            var right_node = method(pos_copy);
            if (!right_node.getError()) {
                var left = left_node.getNode();
                var right = right_node.getNode();
                if (left && right) {
                    left_node.success(new binOp_1.TreeNode(operation, left, right));
                }
            }
            else {
                left_node.register(right_node);
            }
        }
        return left_node;
    };
    /**
     * tries to turn a token into a NumberNode and store the NumberNode in a ParseResult
     * will store an error in a ParseResult if a NumberNode can't be created
     *
     * @param   {Position}     pos
     *
     * @return  {ParseResult}
     * @author Daniel Schechtman
     */
    Parser.prototype.factor = function (pos) {
        var _a, _b, _c, _d;
        var result = new parseResult_1.ParseResult();
        var token = Parser.self.cur_token;
        var num_type_array = new Array(tokenConsts_1.TT_INT, tokenConsts_1.TT_FLOAT, tokenConsts_1.TT_DOUBLE, tokenConsts_1.TT_NUMBER);
        var is_correct_type = token && num_type_array.includes(token.getDataType());
        var is_minus = ((_a = token) === null || _a === void 0 ? void 0 : _a.getDataType()) === tokenConsts_1.TT_MINUS;
        var is_left_paren = ((_b = token) === null || _b === void 0 ? void 0 : _b.getDataType()) === tokenConsts_1.TT_LPAREN;
        // checks for a factor starting with a negative sign
        if (is_minus) {
            var op = "" + ((_c = token) === null || _c === void 0 ? void 0 : _c.getDataType());
            Parser.self.advance();
            var num = Parser.self.factor(pos);
            if (num.getError()) {
                result.register(num);
            }
            else {
                result.success(new unaryOp_1.UnaryNode(op, num.getNode()));
            }
        }
        // checks for a factor starting with an opening parenthisis
        else if (is_left_paren) {
            Parser.self.advance();
            var expr = Parser.self.expr();
            result.register(expr);
            if (((_d = Parser.self.cur_token) === null || _d === void 0 ? void 0 : _d.getDataType()) !== tokenConsts_1.TT_RPAREN) {
                var err = new exceptions_1.IllegalSyntaxError("Expected ')'", Parser.self.token_index);
                result.failure(err);
            }
            else {
                Parser.self.advance();
            }
        }
        // checks if a factor is a number
        else if (is_correct_type) {
            var numberNode = new number_1.NumberNode(Parser.self.cur_token);
            result.success(numberNode);
            Parser.self.advance();
        }
        else {
            var err = new exceptions_1.IllegalSyntaxError("expected int, float, or double", Parser.self.token_index);
            result.failure(err);
        }
        return result;
    };
    Parser.prototype.term = function (pos) {
        return Parser.self.buildAst(Parser.self.factor, new Array(tokenConsts_1.TT_MUL, tokenConsts_1.TT_DIV));
    };
    Parser.prototype.expr = function () {
        return Parser.self.buildAst(Parser.self.term, new Array(tokenConsts_1.TT_PLUS, tokenConsts_1.TT_MINUS));
    };
    Parser.prototype.parse = function () {
        var _a;
        Parser.self = this;
        var ast = Parser.self.expr();
        // catches any errors that up to this point have not been caught
        if (!ast.getError() && ((_a = Parser.self.cur_token) === null || _a === void 0 ? void 0 : _a.getDataType()) !== tokenConsts_1.TT_EOF) {
            var pos = Parser.self.token_index;
            var err = new exceptions_1.IllegalSyntaxError("expected '-', '+', '/', or '*'", pos);
            ast.failure(err);
        }
        return ast;
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map