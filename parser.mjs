import { CstParser } from "chevrotain";
import GSC_TOKENS, { GSC_TOKENS_OBJ } from "./tokens.mjs";

export default class GSC_PARSER extends CstParser {
    constructor() {
        super(GSC_TOKENS);

        this.RULE("File", () => {
            this.MANY1(() => {
                this.SUBRULE(this.IncludeStatement);
            });
            this.MANY2(() => {
                this.SUBRULE(this.FunctionDeclaration);
            });
        });

        this.RULE("IncludeStatement", () => {
            this.CONSUME(GSC_TOKENS_OBJ.include);
            this.OR([
                { ALT: () => { this.CONSUME(GSC_TOKENS_OBJ.file_path) } },
                { ALT: () => { this.CONSUME(GSC_TOKENS_OBJ.external_function_pointer) } }
            ]);
            this.CONSUME(GSC_TOKENS_OBJ.terminator);
        });

        this.RULE("FunctionDeclaration", () => {
            this.CONSUME(GSC_TOKENS_OBJ.identifier);
            this.CONSUME(GSC_TOKENS_OBJ.lparentheses);
            this.CONSUME(GSC_TOKENS_OBJ.rparentheses);
            this.CONSUME(GSC_TOKENS_OBJ.lbracket);
            this.SUBRULE(this.BlockStatement);
            this.CONSUME(GSC_TOKENS_OBJ.rbracket);
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
            this.CONSUME(GSC_TOKENS_OBJ.identifier);
            this.CONSUME(GSC_TOKENS_OBJ.lparentheses);
            this.CONSUME(GSC_TOKENS_OBJ.rparentheses);
            this.CONSUME(GSC_TOKENS_OBJ.terminator);
        });

        this.RULE("String", () => {
            this.CONSUME(GSC_TOKENS_OBJ.string);
        });

        this.performSelfAnalysis();
    }
}
