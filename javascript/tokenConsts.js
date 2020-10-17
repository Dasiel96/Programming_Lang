"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TT_PLUS = "PLUS";
exports.TT_MINUS = "MINUS";
exports.TT_MUL = "MUL";
exports.TT_DIV = "DIV";
exports.TT_LPAREN = "LPAREN";
exports.TT_RPAREN = "RPAREN";
exports.TT_NUMBER = "NUMBER";
exports.TT_INT = "INT";
exports.TT_FLOAT = "FLOAT";
exports.TT_DOUBLE = "DOUBLE";
exports.TT_ERROR = "ERROR";
exports.TT_EOF = "EOF";
exports.TT_CORRECT = "CORRECT";
exports.DIGITS = "1234567890";
exports.TT_TREE_NODE_TYPE = "TREE NODE";
exports.TT_UNARY_OP_NODE_TYPE = "UNARY NODE";
exports.TT_WHITE_SPACE = " \t";
exports.TT_NEW_LINE = "\n";
exports.TT_FLOAT_SIZE = 8;
exports.TT_OP_PAREN_TYPES = new Map();
exports.TT_OP_PAREN_TYPES.set("+", exports.TT_PLUS);
exports.TT_OP_PAREN_TYPES.set("-", exports.TT_MINUS);
exports.TT_OP_PAREN_TYPES.set("*", exports.TT_MUL);
exports.TT_OP_PAREN_TYPES.set("/", exports.TT_DIV);
exports.TT_OP_PAREN_TYPES.set("(", exports.TT_LPAREN);
exports.TT_OP_PAREN_TYPES.set(")", exports.TT_RPAREN);
//# sourceMappingURL=tokenConsts.js.map