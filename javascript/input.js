"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = __importStar(require("readline"));
var Input = /** @class */ (function () {
    function Input() {
        this.input_taker = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    Input.prototype.getInput = function (display_msg) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.input_taker.question(display_msg, function (text) {
                resolve(text);
            });
        });
    };
    Input.prototype.close = function () {
        this.input_taker.close();
    };
    return Input;
}());
exports.Input = Input;
//# sourceMappingURL=input.js.map