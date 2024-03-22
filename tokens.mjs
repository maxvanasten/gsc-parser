import { createToken, Lexer } from "chevrotain";

export const tokens = {
    whitespace: createToken({
        name: "Whitespace",
        pattern: /\s+/,
        group: Lexer.SKIPPED
    }),
    terminator: createToken({ name: "Terminator", pattern: /;/ }),
    include: createToken({ name: "Include", pattern: /#include/ }),
    thread: createToken({ name: "Thread", pattern: /thread/ }),
    
    file_path: createToken({ name: "FilePath", pattern: /([a-zA-Z0-9_]+\\)+[a-zA-Z0-9_]+/ }),
    external_function_pointer: createToken({ name: "ExternalFunctionPointer", pattern: /[a-zA-Z0-9_]\\*[a-zA-Z0-9_]::[a-zA-Z0-9_]*/ }),

    //functioncall: createToken({ name: "FunctionCall", pattern: /[a-zA-Z0-9]+\(\)/ }),

    lbracket: createToken({ name: "LeftBracket", pattern: /\{/ }),
    rbracket: createToken({ name: "RightBracket", pattern: /\}/ }),

    lparentheses: createToken({ name: "LeftParentheses", pattern: /\(/ }),
    rparentheses: createToken({ name: "RightParentheses", pattern: /\)/ }),

    comma: createToken({ name: "Comma", pattern: /,/ }),

    string: createToken({ name: "StringToken", pattern: /["]{1}[.]*["]/ }),

    identifier: createToken({ name: "Identifier", pattern: /[a-zA-Z0-9_/s]+/ })
};

export const lexer = new Lexer(Object.values(tokens));
