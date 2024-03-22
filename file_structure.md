# GSC File Structure

- File
    [0 or more]
    - IncludeStatement
        - IncludeKeyword (#include)
          [OR]
            - FilePath (*/*/*/*)
            - ExternalFunctionPointer (*/*/*/*::*)
        - Terminator (;)
    [1 or more]
    - FunctionDeclaration
        - Identifier
        - (
          [0 or more]
            - Argument
        - )
        - {
          [0 or more]
            - BlockStatement
              [1 or more]
              - Statement
                [OR]
                  - VariableAssignment
                    - Identifier
                    - Equals
                    - Value
                    - Terminator
        - }
