import { Input } from './input'
import { Context } from './lang processor/context'
import { Interpreter } from './lang processor/interpreter'
import { Lexer } from './lang processor/lexer'
import { Parser } from './lang processor/parser'
import {TT_ERROR } from './tokenConsts'


const input = new Input()
const input_text = "basic >> "
const file_name = "<stdin>"
const program_name = "<program>"

// the function that is called to run the interpreter
// will always be called after some input has been entered
function main(text: string) {
    try {
        const lexer = new Lexer(text, file_name)
        const tokens = lexer.makeTokens()

        // checks for errors at every step of the process (lexing, parsing, and interpreting)
        // to make sure that the interpreter displays the correct message to the programmer
        if (tokens[tokens.length - 1].getTokenType() === TT_ERROR) {
            console.log(`${tokens[tokens.length - 1]}`)
        }
        else {
            const parser = new Parser(tokens, file_name, text)
            const interpreter = new Interpreter(file_name)
            const ast = parser.parse()

            if (ast.getNode()) {
                console.log(`${ast.getNode()}`)
                const res = interpreter.run(ast.getNode()!!)

                if (res.getValue()){
                    console.log(`${res.getValue()}`)
                }
                else {
                    console.log(`${res.getError()}`)
                }
            }
            else {
                console.log(`${ast.getError()}`)
            }
        }

        input.getInput(input_text).then((text) => {
            main(text)
        })
    }
    catch (_e) {
        const e: Error = _e as Error
        console.log(e.stack)
        console.log(e.message)
        input.close()
    }
}

input.getInput(input_text).then((text) => {
    main(text)
})

