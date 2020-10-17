import { IllegalCharError } from "../exceptions"
import { Position } from "../position"
import { Token, CorrectToken, ErrorToken } from "../token"
import { DIGITS, TT_DOUBLE, TT_EOF, TT_ERROR, TT_FLOAT, TT_FLOAT_SIZE, TT_INT, TT_NEW_LINE, TT_NUMBER, TT_OP_PAREN_TYPES, TT_WHITE_SPACE } from "../tokenConsts"


/*
* breaks up input text into individual tokens
*/
export class Lexer {
    private text: string
    private cur_char: string | null
    private text_index: Position
    private token_list: Array<Token>

    constructor(text: string, file_name: string) {
        this.text = text
        this.text_index = new Position(file_name)

        if (this.text.length > 0) {
            this.cur_char = this.text[this.text_index.getIndex()]
        }
        else {
            this.cur_char = null
        }

        this.token_list = new Array()
    }

    /**
     * stores the next character in the text to this.cur_char
     *
     * @author Daniel Schechtman
     */
    private advance(): void {
        this.text_index.advance(`${this.cur_char}`)

        if (this.text_index.getIndex() < this.text.length) {
            this.cur_char = this.text[this.text_index.getIndex()]
        }
        else {
            this.cur_char = null
        }
    }

    /**
     * processes all number sequences in the input text and turns it into
     * a token representing an int, float or double
     *
     * @param   {Position}  pos_start
     *
     * @return  {Token}
     * @author Daniel Schechtman
     */
    private makeNumberToken(pos_start: Position): Token {
        // keeps track of if a number that is created from the string is
        // an int or decimal number
        let dotCount = 0
        let num_text = ""
        let token: Token


        // makaes a string representation of a number that contains 0 or 1 decimal
        // point
        while (this.cur_char && `${DIGITS}.`.includes(this.cur_char)) {
            if (this.cur_char == '.') {
                dotCount++

                if (dotCount > 1) {
                    break
                }
                else {
                    num_text += this.cur_char
                }
            }
            else {
                num_text += this.cur_char
            }
            this.advance()
        }

        if (dotCount < 2) {
            if (num_text.length <= TT_FLOAT_SIZE && dotCount === 1) {
                token = new CorrectToken(TT_FLOAT, Number(num_text))
            }
            else if (dotCount === 1) {
                token = new CorrectToken(TT_DOUBLE, Number(num_text))
            }
            else {
                token = new CorrectToken(TT_INT, Number(num_text))
            }
        }
        else {
            token = new ErrorToken(new IllegalCharError(`"${num_text}"`, this.text_index))
        }

        return token
    }

    /**
     * takes the text that was passed into the lexer and tries to convert them
     * into the appropreate tokens
     *
     * @return  {Array<Token>}
     * @author Daniel Schechtman
     */
    makeTokens(): Array<Token> {

        const digits_or_dec_point = `${DIGITS}.`

        // loops over the entire input text one character at a time
        // deciding what action to perform (ie skip white spaces or make a token)
        // based on what the current character from the text is being looked at
        while (this.cur_char != null) {

            const start_pos = this.text_index.copy()

            if (TT_WHITE_SPACE.includes(this.cur_char)) {
                this.advance()
            }
            else if (TT_OP_PAREN_TYPES.has(this.cur_char)) {
                const token = new CorrectToken(TT_OP_PAREN_TYPES.get(this.cur_char)!!)
                this.token_list.push(token)
                this.advance()
            }
            else if (digits_or_dec_point.includes(this.cur_char)) {
                const token = this.makeNumberToken(start_pos)
                this.token_list.push(token)
            }
            else if (this.cur_char === TT_NEW_LINE) {
                const token = new CorrectToken(TT_NEW_LINE)
            }
            else {
                this.token_list.push(new ErrorToken(new IllegalCharError(`"${this.cur_char}"`, this.text_index)))
                break
            }

        }

        // makes sure that there is always at least one token being returned to avoid errors
        if (this.token_list.length == 0) {
            this.token_list.push(new CorrectToken(TT_EOF))
        }
        // makes sure that if an error occured it will always be found at the end of the token list
        else if (this.token_list[this.token_list.length - 1].getTokenType() !== TT_ERROR) {
            this.token_list.push(new CorrectToken(TT_EOF))
        }

        return this.token_list
    }
}