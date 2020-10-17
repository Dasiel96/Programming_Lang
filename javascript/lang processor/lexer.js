"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exceptions_1 = require("../exceptions");
var position_1 = require("../position");
var token_1 = require("../token");
var tokenConsts_1 = require("../tokenConsts");
/*
* breaks up input text into individual tokens
*/
var Lexer = /** @class */ (function () {
    function Lexer(text, file_name) {
        this.text = text;
        this.text_index = new position_1.Position(file_name);
        if (this.text.length > 0) {
            this.cur_char = this.text[this.text_index.getIndex()];
        }
        else {
            this.cur_char = null;
        }
        this.token_list = new Array();
    }
    /**
     * stores the next character in the text to this.cur_char
     *
     * @author Daniel Schechtman
     */
    Lexer.prototype.advance = function () {
        this.text_index.advance("" + this.cur_char);
        if (this.text_index.getIndex() < this.text.length) {
            this.cur_char = this.text[this.text_index.getIndex()];
        }
        else {
            this.cur_char = null;
        }
    };
    /**
     * processes all number sequences in the input text and turns it into
     * a token representing an int, float or double
     *
     * @param   {Position}  pos_start
     *
     * @return  {Token}
     * @author Daniel Schechtman
     */
    Lexer.prototype.makeNumberToken = function (pos_start) {
        // keeps track of if a number that is created from the string is
        // an int or decimal number
        var dotCount = 0;
        var num_text = "";
        var token;
        // makaes a string representation of a number that contains 0 or 1 decimal
        // point
        while (this.cur_char && (tokenConsts_1.DIGITS + ".").includes(this.cur_char)) {
            if (this.cur_char == '.') {
                dotCount++;
                if (dotCount > 1) {
                    break;
                }
                else {
                    num_text += this.cur_char;
                }
            }
            else {
                num_text += this.cur_char;
            }
            this.advance();
        }
        if (dotCount < 2) {
            if (num_text.length <= tokenConsts_1.TT_FLOAT_SIZE && dotCount === 1) {
                token = new token_1.CorrectToken(tokenConsts_1.TT_FLOAT, Number(num_text));
            }
            else if (dotCount === 1) {
                token = new token_1.CorrectToken(tokenConsts_1.TT_DOUBLE, Number(num_text));
            }
            else {
                token = new token_1.CorrectToken(tokenConsts_1.TT_INT, Number(num_text));
            }
        }
        else {
            token = new token_1.ErrorToken(new exceptions_1.IllegalCharError("\"" + num_text + "\"", this.text_index));
        }
        return token;
    };
    /**
     * takes the text that was passed into the lexer and tries to convert them
     * into the appropreate tokens
     *
     * @return  {Array<Token>}
     * @author Daniel Schechtman
     */
    Lexer.prototype.makeTokens = function () {
        var digits_or_dec_point = tokenConsts_1.DIGITS + ".";
        // loops over the entire input text one character at a time
        // deciding what action to perform (ie skip white spaces or make a token)
        // based on what the current character from the text is being looked at
        while (this.cur_char != null) {
            var start_pos = this.text_index.copy();
            if (tokenConsts_1.TT_WHITE_SPACE.includes(this.cur_char)) {
                this.advance();
            }
            else if (tokenConsts_1.TT_OP_PAREN_TYPES.has(this.cur_char)) {
                var token = new token_1.CorrectToken(tokenConsts_1.TT_OP_PAREN_TYPES.get(this.cur_char));
                this.token_list.push(token);
                this.advance();
            }
            else if (digits_or_dec_point.includes(this.cur_char)) {
                var token = this.makeNumberToken(start_pos);
                this.token_list.push(token);
            }
            else if (this.cur_char === tokenConsts_1.TT_NEW_LINE) {
                var token = new token_1.CorrectToken(tokenConsts_1.TT_NEW_LINE);
            }
            else {
                this.token_list.push(new token_1.ErrorToken(new exceptions_1.IllegalCharError("\"" + this.cur_char + "\"", this.text_index)));
                break;
            }
        }
        // makes sure that there is always at least one token being returned to avoid errors
        if (this.token_list.length == 0) {
            this.token_list.push(new token_1.CorrectToken(tokenConsts_1.TT_EOF));
        }
        // makes sure that if an error occured it will always be found at the end of the token list
        else if (this.token_list[this.token_list.length - 1].getTokenType() !== tokenConsts_1.TT_ERROR) {
            this.token_list.push(new token_1.CorrectToken(tokenConsts_1.TT_EOF));
        }
        return this.token_list;
    };
    return Lexer;
}());
exports.Lexer = Lexer;
//# sourceMappingURL=lexer.js.map