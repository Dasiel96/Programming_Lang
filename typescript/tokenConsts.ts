export const TT_PLUS = "PLUS"
export const TT_MINUS = "MINUS"
export const TT_MUL = "MUL"
export const TT_DIV = "DIV"
export const TT_LPAREN = "LPAREN"
export const TT_RPAREN = "RPAREN"
export const TT_NUMBER = "NUMBER"
export const TT_INT = "INT"
export const TT_FLOAT = "FLOAT"
export const TT_DOUBLE = "DOUBLE"
export const TT_ERROR = "ERROR"
export const TT_EOF = "EOF"
export const TT_CORRECT = "CORRECT"
export const DIGITS = "1234567890"
export const TT_TREE_NODE_TYPE = "TREE NODE"
export const TT_UNARY_OP_NODE_TYPE = "UNARY NODE"
export const TT_WHITE_SPACE = " \t"
export const TT_NEW_LINE = "\n"
export const TT_FLOAT_SIZE = 8

export const TT_OP_PAREN_TYPES = new Map<string, string>()

TT_OP_PAREN_TYPES.set("+", TT_PLUS)
TT_OP_PAREN_TYPES.set("-", TT_MINUS)
TT_OP_PAREN_TYPES.set("*", TT_MUL)
TT_OP_PAREN_TYPES.set("/", TT_DIV)
TT_OP_PAREN_TYPES.set("(", TT_LPAREN)
TT_OP_PAREN_TYPES.set(")", TT_RPAREN)