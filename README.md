# Usage

Simply edit the `config.json` file to configure the parser.
After editing the configuration file, you can run the parser by executing `npm start`.

## Components

### `tokens.mjs`

This file contains all of the tokens that the parser will need.

### `parser.mjs`

The parser has all the rules that it will try to apply to each set of tokens.

### `visitor.mjs`

The visitor will convert the CST to an AST.
