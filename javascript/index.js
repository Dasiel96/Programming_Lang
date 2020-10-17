"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("./input");
var interpreter_1 = require("./lang processor/interpreter");
var lexer_1 = require("./lang processor/lexer");
var parser_1 = require("./lang processor/parser");
var tokenConsts_1 = require("./tokenConsts");
var input = new input_1.Input();
var input_text = "basic >> ";
var file_name = "<stdin>";
var program_name = "<program>";
// the function that is called to run the interpreter
// will always be called after some input has been entered
function main(text) {
    try {
        var lexer = new lexer_1.Lexer(text, file_name);
        var tokens = lexer.makeTokens();
        // checks for errors at every step of the process (lexing, parsing, and interpreting)
        // to make sure that the interpreter displays the correct message to the programmer
        if (tokens[tokens.length - 1].getTokenType() === tokenConsts_1.TT_ERROR) {
            console.log("" + tokens[tokens.length - 1]);
        }
        else {
            var parser = new parser_1.Parser(tokens, file_name, text);
            var interpreter = new interpreter_1.Interpreter(file_name);
            var ast = parser.parse();
            if (ast.getNode()) {
                console.log("" + ast.getNode());
                var res = interpreter.run(ast.getNode());
                if (res.getValue()) {
                    console.log("" + res.getValue());
                }
                else {
                    console.log("" + res.getError());
                }
            }
            else {
                console.log("" + ast.getError());
            }
        }
        input.getInput(input_text).then(function (text) {
            main(text);
        });
    }
    catch (_e) {
        var e = _e;
        console.log(e.stack);
        console.log(e.message);
        input.close();
    }
}
input.getInput(input_text).then(function (text) {
    main(text);
});
//# sourceMappingURL=index.js.map