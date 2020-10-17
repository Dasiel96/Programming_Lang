"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("./exceptions");
const position_1 = require("./position");
const token_1 = require("./token");
const tokenConsts_1 = require("./tokenConsts");
class Lexer {
    constructor(text, file_name) {
        this.text = text;
        this.text_index = new position_1.Position(0, 0, 0, file_name, text);
        if (this.text.length > 0) {
            this.cur_char = this.text[this.text_index.index];
        }
        else {
            this.cur_char = null;
        }
        this.token_list = new Array();
    }
    advance() {
        this.text_index.advance(`${this.cur_char}`);
        if (this.text_index.index < this.text.length) {
            this.cur_char = this.text[this.text_index.index];
        }
        else {
            this.cur_char = null;
        }
    }
    makeNumberToken(pos_start) {
        let dotCount = 0;
        let num_text = "";
        let token;
        while (this.cur_char && `${tokenConsts_1.DIGITS}.`.includes(this.cur_char)) {
            if (this.cur_char == '.') {
                dotCount++;
                if (dotCount > 1) {
                    break;
                }
                num_text += this.cur_char;
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
            token = new token_1.ErrorToken(new exceptions_1.IllegalCharError(`"${num_text}"`, pos_start, this.text_index));
        }
        return token;
    }
    makeTokens() {
        while (this.cur_char != null) {
            const start_pos = this.text_index.copy();
            if (tokenConsts_1.TT_WHITE_SPACE.includes(this.cur_char)) {
                this.advance();
            }
            else if (tokenConsts_1.TT_TYPE_DICT.has(this.cur_char)) {
                const token = new token_1.CorrectToken(tokenConsts_1.TT_TYPE_DICT.get(this.cur_char));
                this.token_list.push(token);
                this.advance();
            }
            else if (`${tokenConsts_1.DIGITS}.`.includes(this.cur_char)) {
                const token = this.makeNumberToken(start_pos);
                this.token_list.push(token);
            }
            else {
                this.token_list.push(new token_1.ErrorToken(new exceptions_1.IllegalCharError(`"${this.cur_char}"`, start_pos, this.text_index)));
                break;
            }
        }
        if (this.token_list.length == 0) {
            this.token_list.push(new token_1.CorrectToken(tokenConsts_1.TT_EOF));
        }
        else if (this.token_list[this.token_list.length - 1].getType() !== tokenConsts_1.TT_ERROR) {
            this.token_list.push(new token_1.CorrectToken(tokenConsts_1.TT_EOF));
        }
        return this.token_list;
    }
}
exports.Lexer = Lexer;
//# sourceMappingURL=lexer.js.map