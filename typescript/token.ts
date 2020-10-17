import { IllegalCharError } from "./exceptions"
import { TT_CORRECT, TT_ERROR} from "./tokenConsts"

export interface Token {
    /**
     * returns the token's type (ie TT_CORRECT or TT_ERROR)
     *
     * @return  {string}  
     * @author Daniel Schechtman
     */
    getTokenType(): string,

    /**
     * returns the token's data type (ie TT_FLOAT, TT_INT, etc)
     *
     * @return  {string}  
     * @author Daniel Schechtman
     */
    getDataType(): string,

    /**
     * returns the data stored in the token
     *
     * @return  {number}  
     * @author Daniel Schechtman
     */
    getData(): number | null,

    /**
     * string represention of the token
     *
     * @return  {string}  
     * @author Daniel Schechtman
     */
    toString(): string,
}

/*
* represents a valid piece of data in the language
*/

export class CorrectToken implements Token {
    private tok_data_type: string
    private tok_data: number | null

    constructor(type: string, data: number | null=null) {
        this.tok_data_type = type
        this.tok_data = data
    }

    getTokenType(): string {
        return TT_CORRECT
    }

    getDataType(): string {
        return this.tok_data_type
    }

    getData(): number | null {
        return this.tok_data
    }

    toString(): string {
        let result = ` ${this.tok_data_type}`

        if (this.tok_data) {
            result = ` ${this.tok_data_type}:${this.tok_data}`
        }

        return result
    }
}

export class ErrorToken implements Token {

    private readonly tok_type: string
    private tok_data_type: IllegalCharError

    constructor(err: IllegalCharError) {
        this.tok_type = TT_ERROR
        this.tok_data_type = err
    }

    getTokenType(): string {
        return this.tok_type
    }

    getDataType(): string {
        return this.tok_data_type.toString()
    }

    getData(): number | null {
        return null
    }

    toString(): string {
        return `${this.tok_data_type}`
    }

}