import { Position } from "./position"

/*
* base class that represents an error of anykind in my basic language
* this is used instead of letting typescript throw an error because I don't
* want the interpreter to crash every time a program causes something to crash
*/
export class Error {
    private name: string
    private details: string
    private pos: Position

    get message(): string {
        return this.details
    }

    constructor(name: string, details: string, pos: Position) {
        this.name = name
        this.details = details

        this.pos = pos
    }

    toString() {
        const fileName = this.pos.getFileName()
        const line = this.pos.getLine()
        const col = this.pos.getCol()
        return `${this.name}: ${this.details}. File ${fileName}, line ${line} col ${col}`
    }
}

export class IllegalCharError extends Error {
    constructor(details: string, pos_start: Position) {
        super("Illegal Char", details, pos_start)
    }
}

export class IllegalSyntaxError extends Error {
    constructor(details: string, pos_start: Position) {
        super("Illegal Syntax", details, pos_start)
    }
}

export class RunTimeError extends Error {
    constructor(details: string, pos_start: Position){
        super("Run Time Error", details, pos_start)
    }
}