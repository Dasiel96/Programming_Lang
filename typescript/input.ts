import * as readline from 'readline'

export class Input {

    private input_taker: readline.Interface

    constructor() {
        this.input_taker = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }


    getInput(display_msg: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.input_taker.question(display_msg, (text) => {
                resolve(text)
            })
        })
    }

    close(): void {
        this.input_taker.close()
    }
}