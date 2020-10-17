"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/*
* base class that represents an error of anykind in my basic language
* this is used instead of letting typescript throw an error because I don't
* want the interpreter to crash every time a program causes something to crash
*/
var Error = /** @class */ (function () {
    function Error(name, details, pos) {
        this.name = name;
        this.details = details;
        this.pos = pos;
    }
    Object.defineProperty(Error.prototype, "message", {
        get: function () {
            return this.details;
        },
        enumerable: true,
        configurable: true
    });
    Error.prototype.toString = function () {
        var fileName = this.pos.getFileName();
        var line = this.pos.getLine();
        var col = this.pos.getCol();
        return this.name + ": " + this.details + ". File " + fileName + ", line " + line + " col " + col;
    };
    return Error;
}());
exports.Error = Error;
var IllegalCharError = /** @class */ (function (_super) {
    __extends(IllegalCharError, _super);
    function IllegalCharError(details, pos_start) {
        return _super.call(this, "Illegal Char", details, pos_start) || this;
    }
    return IllegalCharError;
}(Error));
exports.IllegalCharError = IllegalCharError;
var IllegalSyntaxError = /** @class */ (function (_super) {
    __extends(IllegalSyntaxError, _super);
    function IllegalSyntaxError(details, pos_start) {
        return _super.call(this, "Illegal Syntax", details, pos_start) || this;
    }
    return IllegalSyntaxError;
}(Error));
exports.IllegalSyntaxError = IllegalSyntaxError;
var RunTimeError = /** @class */ (function (_super) {
    __extends(RunTimeError, _super);
    function RunTimeError(details, pos_start) {
        return _super.call(this, "Run Time Error", details, pos_start) || this;
    }
    return RunTimeError;
}(Error));
exports.RunTimeError = RunTimeError;
//# sourceMappingURL=exceptions.js.map