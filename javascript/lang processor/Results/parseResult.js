"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* used to determine if there was an error that occured during the parsing process
* will only store an error or a value, but never both at the same time
*/
var ParseResult = /** @class */ (function () {
    function ParseResult(node, error) {
        if (node === void 0) { node = null; }
        if (error === void 0) { error = null; }
        this.node = node;
        this.error = error;
    }
    /**
     * will store the error of the passed in parse result if there is an error
     * otherwise it will store the value of the passed in parse result
     *
     * @param   {ParseResult}  res
     *
     * @author Daniel Schechtman
     */
    ParseResult.prototype.register = function (res) {
        if (res.getError()) {
            this.failure(res.getError());
        }
        else if (res.getNode()) {
            this.success(res.getNode());
        }
    };
    /**
     * will store a node, and will set the error to null
     *
     * @param   {ParseNode}  node
     *
     * @author Daniel Schechtman
     */
    ParseResult.prototype.success = function (node) {
        this.node = node;
        this.error = null;
    };
    /**
     * will store an error, and set the node to null
     *
     * @param   {IllegalSyntaxError}  error
     *
     * @author Daniel Schechtman
     */
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