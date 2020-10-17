"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* used to catch errors during runtime
* either the value can be set to an object or the error can be set to an object
* when one is set to a object the other will be set to null
*/
var RTResult = /** @class */ (function () {
    function RTResult() {
        this.value = null;
        this.error = null;
    }
    /**
     * will store the error if the passed in RTResult has an error, otherwise will store the value
     *
     * @param   {RTResult}  res
     *
     * @author Daniel Schechtman
     */
    RTResult.prototype.register = function (res) {
        if (res.getError()) {
            this.failure(res.getError());
        }
        else if (res.getValue()) {
            this.success(res.getValue());
        }
    };
    /**
     * will set the value to the passed in NumberType, and the error to null
     *
     * @param   {NumberType}  new_val
     *
     * @author Daniel Schechtman
     */
    RTResult.prototype.success = function (new_val) {
        this.value = new_val;
        this.error = null;
    };
    /**
     * will set the error to the passed in RunTimeError, and the value to null
     *
     * @param   {RunTimeError}  err
     *
     * @author Daniel Schechtman
     */
    RTResult.prototype.failure = function (err) {
        this.error = err;
        this.value = null;
    };
    RTResult.prototype.getValue = function () {
        return this.value;
    };
    RTResult.prototype.getError = function () {
        return this.error;
    };
    RTResult.prototype.toString = function () {
        var str = "";
        if (this.error) {
            str = this.error.toString();
        }
        else if (this.value) {
            str = this.value.toString();
        }
        return str;
    };
    return RTResult;
}());
exports.RTResult = RTResult;
//# sourceMappingURL=runTimeResult.js.map