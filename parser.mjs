import { CstParser } from "chevrotain";
import { tokens } from "./tokens.mjs";

export default class Parser extends CstParser {
    constructor() {
        super(Object.values(tokens));

        this.RULE("File", () => {
            this.MANY1(() => {
                this.SUBRULE(this.IncludeStatement);
            });
            this.MANY2(() => {
                this.SUBRULE(this.FunctionDeclaration);
            });
        });

        this.RULE("IncludeStatement", () => {
            this.CONSUME(tokens.include);
            this.OR([
                { ALT: () => { this.CONSUME(tokens.file_path) } },
                { ALT: () => { this.CONSUME(tokens.external_function_pointer) } }
            ]);
            this.CONSUME(tokens.terminator);
        });

        this.RULE("FunctionDeclaration", () => {
            this.CONSUME(tokens.identifier);
            this.CONSUME(tokens.lparentheses);
            this.CONSUME(tokens.rparentheses);
            this.CONSUME(tokens.lbracket);
            this.SUBRULE(this.BlockStatement);
            this.CONSUME(tokens.rbracket);
        });

        this.RULE("BlockStatement", () => {
            this.MANY(() => {
                this.SUBRULE(this.Statement);
            });
        });

        this.RULE("Statement", () => {
            this.OR([
                { ALT: () => { this.SUBRULE(this.FunctionCall) } },
            ]);
        });

        this.RULE("FunctionCall", () => {
            this.CONSUME(tokens.identifier);
            this.CONSUME(tokens.lparentheses);
            this.CONSUME(tokens.rparentheses);
            this.CONSUME(tokens.terminator);
        });

        this.RULE("String", () => {
            this.CONSUME(tokens.string);
        });

        this.performSelfAnalysis();
    }
}
