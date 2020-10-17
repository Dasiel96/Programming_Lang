"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokenConsts_1 = require("./tokenConsts");
/*
* represents a valid piece of data in the language
*/
var CorrectToken = /** @class */ (function () {
    function CorrectToken(type, data) {
        if (data === void 0) { data = null; }
        this.tok_data_type = type;
        this.tok_data = data;
    }
    CorrectToken.prototype.getTokenType = function () {
        return tokenConsts_1.TT_CORRECT;
    };
    CorrectToken.prototype.getDataType = function () {
        return this.tok_data_type;
    };
    CorrectToken.prototype.getData = function () {
        return this.tok_data;
    };
    CorrectToken.prototype.toString = function () {
        var result = " " + this.tok_data_type;
        if (this.tok_data) {
            result = " " + this.tok_data_type + ":" + this.tok_data;
        }
        return result;
    };
    return CorrectToken;
}());
exports.CorrectToken = CorrectToken;
var ErrorToken = /** @class */ (function () {
    function ErrorToken(err) {
        this.tok_type = tokenConsts_1.TT_ERROR;
        this.tok_data_type = err;
    }
    ErrorToken.prototype.getTokenType = function () {
        return this.tok_type;
    };
    ErrorToken.prototype.getDataType = function () {
        return this.tok_data_type.toString();
    };
    ErrorToken.prototype.getData = function () {
        return null;
    };
    ErrorToken.prototype.toString = function () {
        return "" + this.tok_data_type;
    };
    return ErrorToken;
}());
exports.ErrorToken = ErrorToken;
//# sourceMappingURL=token.js.map