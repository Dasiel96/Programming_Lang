"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParseResult = /** @class */ (function () {
    function ParseResult(node, error) {
        if (node === void 0) { node = null; }
        if (error === void 0) { error = null; }
        this.node = node;
        this.error = error;
    }
    ParseResult.prototype.register = function (res) {
        if (res.getError()) {
            this.failure(res.getError());
        }
        else if (res.getNode()) {
            this.success(res.getNode());
        }
    };
    ParseResult.prototype.success = function (node) {
        this.node = node;
        this.error = null;
    };
    ParseResult.prototype.failure = function (error) {
        this.error = error;
        this.node = null;
    };
    ParseResult.prototype.getError = function () {
        return this.error;
    };
    ParseResult.prototype.getNode = function () {
        return this.node;
    };
    ParseResult.prototype.toString = function () {
        var msg;
        if (this.node) {
            msg = "" + this.node;
        }
        else {
            msg = "" + this.error;
        }
        return msg;
    };
    return ParseResult;
}());
exports.ParseResult = ParseResult;
//# sourceMappingURL=parseResult.js.map