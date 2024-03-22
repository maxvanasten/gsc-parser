import Parser from "./parser.mjs";
import { lexer } from "./tokens.mjs";
import { visitor } from "./visitor.mjs";

// Spawn parser
const parser = new Parser([], { outputCst: true });

function toAst(text) {
    // Get tokens from text
    const lexing_result = lexer.tokenize(text);
    parser.input = lexing_result.tokens;

    // Parse text to a Concrete Syntax Tree
    const cst = parser.File();

    if (parser.errors.length) {
        const ERROR = `Error message: ${parser.errors[0].message}\n\nOn line: ${parser.errors[0].token.startLine}\n\n`;
        console.error(ERROR);
    }
    
    // Parse Concrete Syntax Tree to Abstract Syntax Tree
    return visitor.visit(cst);
}

import fs from 'fs';
import config from './config.json' with { type: "json" };

const input_file_path = config.input_file;
if (!input_file_path) throw console.error(`Usage: node index.mjs path/to/input_file.gsc`);
if (!fs.existsSync(input_file_path)) throw console.error(`File ${input_file_path} does not exist.`);

const input_text = fs.readFileSync(input_file_path, { encoding: 'utf8' });

console.log(`=====Input text:=====\n\n${input_text}\n\n=====AST:=====\n\n`);

const ast = toAst(input_text);
console.log(ast);
