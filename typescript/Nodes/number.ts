import { Token } from "../token"
import { ParseNode } from "./nodeInterfaces"

/*
* node that represents a number in my basic language
*/
export class NumberNode implements ParseNode {
    private tok: Token

    constructor(token: Token) {
        this.tok = token
    }

    getData(): number | null {
        return this.tok.getData()
    }

    getType(): string {
        return this.tok.getDataType()
    }

    // override methods below

    toString() {
        return `${this.tok.getDataType()}:${this.tok.getData()}`
    }

    // override methods above
}