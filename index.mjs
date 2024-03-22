import GSC_PARSER from "./parser.mjs";
import { GSC_LEXER } from "./tokens.mjs";
import GSC_VISITOR from "./visitor.mjs";

const parser = new GSC_PARSER([], { outputCst: true });

function toAst(text) {
    const lexing_result = GSC_LEXER.tokenize(text);
    parser.input = lexing_result.tokens;

    const cst = parser.File();

    if (parser.errors.length) {
        const ERROR = `Error message: ${parser.errors[0].message}\n\nOn line: ${parser.errors[0].token.startLine}\n\n`;
        console.error(ERROR);
    }

    return GSC_VISITOR.visit(cst);
}

import fs from 'fs';
import path from "path";

const input_folder = "./input_files";

const input_files = fs.readdirSync(input_folder);
input_files.forEach((input_file_path) => {
    const input_text = fs.readFileSync(path.join(input_folder, input_file_path), { encoding: 'utf8' });

    console.log(`=====Input text:=====\n\n${input_text}\n\n=====AST:=====\n\n`);

    const ast = toAst(input_text);
    console.log(ast);
});
