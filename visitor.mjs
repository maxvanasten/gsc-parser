import GSC_PARSER from "./parser.mjs";

const parser = new GSC_PARSER([], { outputCst: true });
const visitor = parser.getBaseCstVisitorConstructor();
class CustomVisitor extends visitor {
    constructor() {
        super();
        this.validateVisitor();
    }
    
    File(ctx) {
        let include_statements = [];

        ctx.IncludeStatement.forEach((include_statement) => {
            include_statements.push({
                file: include_statement.children.FilePath[0].image
            });
        });

        let function_declarations = [];

        ctx.FunctionDeclaration.forEach((function_declaration) => {
            let args = [];
            function_declaration.children.Identifier.map((identifier, index) => {
                if (index != 0) {
                    args.push({
                        name: identifier
                    });
                }
            });

            function_declarations.push({
                name: function_declaration.children.Identifier[0].image,
                arguments: args 
            });
        });

        return {
            type: "GLOBAL",
            include_statements: include_statements,
            function_declarations: function_declarations
        }
    }
    
    IncludeStatement(ctx) {
        return {
            type: "INCLUDE_STATEMENT",
            path: ctx.FilePath[0].image | ctx.ExternalFunctionPointer[0].image
        }
    }

    FunctionDeclaration(ctx) {
        return {
            type: "FUNCTION_DECLARATION",
            func_name: ctx.Identifier[0].image
        }
    }

    BlockStatement(ctx) {
        return {
            type: "BLOCK_STATEMENT",
        }
    }

    Statement(ctx) {
        return {
            type: "STATEMENT"
        }
    }
    
    FunctionCall(ctx) {
        return {
            type: "FUNCTION_CALL"
        }
    }
    
}
const GSC_VISITOR = new CustomVisitor();
export default GSC_VISITOR;
