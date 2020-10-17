"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokenConsts_1 = require("./tokenConsts");
/*
* keeps track of where the program is (during lexing, parsing, or interpreting)
* also used to keep track of what piece of data is being processed during lexing or parsing
*/
var Position = /** @class */ (function () {
    function Position(file_name) {
        this.index = 0;
        this.line = 1;
        this.col = 1;
        this.file_name = file_name;
    }
    Position.prototype.advance = function (cur_char) {
        this.index++;
        this.col++;
        if (cur_char === tokenConsts_1.TT_NEW_LINE) {
            this.line++;
            this.col = 0;
        }
    };
    Position.prototype.copy = function () {
        return new Position(this.file_name);
    };
    Position.prototype.getIndex = function () {
        return this.index;
    };
    Position.prototype.getLine = function () {
        return this.line;
    };
    Position.prototype.getCol = function () {
        return this.col;
    };
    Position.prototype.getFileName = function () {
        return this.file_name;
    };
    return Position;
}());
exports.Position = Position;
//# sourceMappingURL=position.js.map