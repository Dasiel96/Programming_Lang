import { TT_NEW_LINE } from "./tokenConsts"

/*
* keeps track of where the program is (during lexing, parsing, or interpreting)
* also used to keep track of what piece of data is being processed during lexing or parsing
*/
export class Position {
    private index: number
    private line: number
    private col: number
    private file_name: string

    constructor(file_name: string) {
        this.index = 0
        this.line = 1
        this.col = 1
        this.file_name = file_name
    }

    advance(cur_char: string) {
        this.index++
        this.col++

        if (cur_char === TT_NEW_LINE) {
            this.line++
            this.col = 0
        }
    }

    copy(){
        return new Position(this.file_name)
    }

    getIndex(): number {
        return this.index
    }

    getLine(): number {
        return this.line
    }

    getCol(): number {
        return this.col
    }

    getFileName(): string {
        return this.file_name
    }
}