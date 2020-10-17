"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("./exceptions");
const binOp_1 = require("./Nodes/binOp");
const number_1 = require("./Nodes/number");
const unaryOp_1 = require("./Nodes/unaryOp");
const position_1 = require("./position");
const tokenConsts_1 = require("./tokenConsts");
class ParseResult {
    constructor(node = null, error = null) {
        this.node = node;
        this.error = error;
    }
    register(res) {
        if (res.getError()) {
            this.failure(res.getError());
        }
        else if (res.getNode()) {
            this.success(res.getNode());
        }
    }
    success(node) {
        this.node = node;
        this.error = null;
    }
    failure(error) {
        this.error = error;
        this.node = null;
    }
    getError() {
        return this.error;
    }
    getNode() {
        return this.node;
    }
}
class Parser {
    constructor(token_list, file_name, text) {
        this.token_list = token_list;
        this.token_index = new position_1.Position(0, 0, 0, file_name, text);
        if (token_list.length > 0) {
            this.cur_token = this.token_list[this.token_index.index];
        }
        else {
            this.cur_token = null;
        }
    }
    advance() {
        var _a;
        Parser.self.token_index.advance(`${(_a = Parser.self.cur_token) === null || _a === void 0 ? void 0 : _a.getData()}`);
        if (Parser.self.token_index.index < Parser.self.token_list.length) {
            Parser.self.cur_token = Parser.self.token_list[Parser.self.token_index.index];
        }
        else {
            Parser.self.cur_token = null;
        }
    }
    buildAst(method, ops) {
        var _a;
        let pos_copy = Parser.self.token_index.copy();
        let op_node = new ParseResult();
        const left_node = method(pos_copy);
        let is_op_token = Parser.self.cur_token && ops.includes(Parser.self.cur_token.getDataType());
        op_node.register(left_node);
        while (is_op_token && !op_node.getError()) {
            const operation = (_a = Parser.self.cur_token) === null || _a === void 0 ? void 0 : _a.getDataType();
            Parser.self.advance();
            const right_node = method(pos_copy);
            if (!right_node.getError()) {
                const left = op_node.getNode();
                const right = right_node.getNode();
                if (left && right) {
                    op_node.success(new binOp_1.BinOpNode(operation, left, right));
                }
            }
            else {
                op_node.register(right_node);
            }
            is_op_token = Parser.self.cur_token && ops.includes(Parser.self.cur_token.getDataType());
        }
        return op_node;
    }
    factor(pos) {
        var _a, _b;
        let result = new ParseResult();
        const num_type_array = new Array(tokenConsts_1.TT_INT, tokenConsts_1.TT_FLOAT, tokenConsts_1.TT_DOUBLE, tokenConsts_1.TT_NUMBER);
        const is_correct_type = Parser.self.cur_token && num_type_array.includes(Parser.self.cur_token.getDataType());
        if (((_a = Parser.self.cur_token) === null || _a === void 0 ? void 0 : _a.getDataType()) === tokenConsts_1.TT_MINUS) {
            const op = Parser.self.cur_token.getDataType();
            Parser.self.advance();
            const num = Parser.self.factor(pos);
            if (num.getError()) {
                result.register(num);
            }
            else {
                result.success(new unaryOp_1.UnaryNode(op, num.getNode()));
            }
        }
        else if (((_b = Parser.self.cur_token) === null || _b === void 0 ? void 0 : _b.getDataType()) === tokenConsts_1.TT_LPAREN) {
            Parser.self.advance();
            const expr = Parser.self.expr();
            result.register(expr);
            if (Parser.self.cur_token.getDataType() !== tokenConsts_1.TT_RPAREN) {
                const err = new exceptions_1.IllegalSyntaxError("Expected ')'", pos, Parser.self.token_index);
                result.failure(err);
            }
            else {
                Parser.self.advance();
            }
        }
        else if (is_correct_type) {
            const numberNode = new number_1.NumberNode(Parser.self.cur_token);
            result.success(numberNode);
            Parser.self.advance();
        }
        else {
            const err = new exceptions_1.IllegalSyntaxError("expected int, float, or double", pos, Parser.self.token_index);
            result.failure(err);
        }
        return result;
    }
    term(pos) {
        return Parser.self.buildAst(Parser.self.factor, new Array(tokenConsts_1.TT_MUL, tokenConsts_1.TT_DIV));
    }
    expr() {
        const ast = Parser.self.buildAst(Parser.self.term, new Array(tokenConsts_1.TT_PLUS, tokenConsts_1.TT_MINUS));
        return ast;
    }
    parse() {
        var _a;
        Parser.self = this;
        const ast = Parser.self.expr();
        if (!ast.getError() && ((_a = Parser.self.cur_token) === null || _a === void 0 ? void 0 : _a.getDataType()) !== tokenConsts_1.TT_EOF) {
            const pos = Parser.self.token_index;
            const err = new exceptions_1.IllegalSyntaxError("expected '-', '+', '/', or '*'", pos, pos);
            ast.failure(err);
        }
        return ast;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map