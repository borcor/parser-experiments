export type SingleTokenSpec<TokenType> = [matcher: RegExp, type: TokenType];
export type TokenSpec<TokenType> = SingleTokenSpec<TokenType>[];

export interface Token<TokenType> {
  type: TokenType;
  value: string;
}

export class Tokenizer<TokenType> {
  private grammar: TokenSpec<TokenType>;
  input: string;
  cursor: number = 0;

  constructor(grammar: TokenSpec<TokenType>, input: string) {
    this.grammar = grammar;
    this.input = input;
  }

  hasMoreInput(): boolean {
    return this.cursor < this.input.length;
  }

  private match(matcher: RegExp, inputSlice: string): string | null {
    const matched = matcher.exec(inputSlice);

    if (!matched) {
      return null;
    }

    this.cursor += matched[0].length;
    return matched[0];
  }

  next(): Token<TokenType> | null {
    if (!this.hasMoreInput()) {
      return null;
    }

    const inputSlice = this.input.slice(this.cursor);

    for (let [matcher, type] of this.grammar) {
      const value = this.match(matcher, inputSlice);

      if (value === null) {
        continue;
      }

      if (type === 'WHITESPACE') {
        return this.next();
      }

      return { type, value };
    }

    throw new Error(`Unexpected input: `);
  }
}