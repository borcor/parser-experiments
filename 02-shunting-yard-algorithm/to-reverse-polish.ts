import { operators } from "./operators";
import { OperatorToken, Token, makeTokenizer } from "./tokenizer";

export const getPrevOperator = (stack: Token[]): OperatorToken | undefined => {
  const lastToken = stack.at(-1);
  return lastToken?.token === 'operator' ? lastToken : undefined;
}

export const handleToken = (stack: Token[], output: string, token: Token): [Token[], string] => {
  if (token.token === 'number') {
    return [stack, output + `${output.length ? ' ' : ''}${token.raw}`];
  }

  if (token.token === 'operator') {
    const o1 = operators.find(({ symbol }) => symbol === token.symbol)!;
    let prevOperator = getPrevOperator(stack);
    let o2 = prevOperator && operators.find(({ symbol }) => symbol === prevOperator!.symbol)
    while (o2 &&
      (o2.precedence > o1?.precedence ||
        (o2.precedence === o1.precedence && o1.associativity === 'left')
      )
    ) {
      output += ' ' + prevOperator!.symbol;
      stack.pop();
      prevOperator = getPrevOperator(stack);
      o2 = prevOperator && operators.find(({ symbol }) => symbol === prevOperator!.symbol)
    }

    stack.push(token);

    return [stack, output];
  }

  if (token.token === 'left-paren') {
    stack.push(token);

    return [stack, output];
  }

  if (token.token === 'right-paren') {
    let prevToken = stack.at(-1);
    while (prevToken) {
      if (prevToken.token === 'left-paren') {
        stack.pop();
        return [stack, output];
      } else if (prevToken.token === 'operator') {
        output += ' ' + prevToken.symbol;
        stack.pop();
        prevToken = stack.at(-1);
        continue;
      }

      throw new Error(`Unexpected token in stack: ${prevToken.token}`);
    }

    throw new Error(`Unmatched parenthesis`);
  }

  throw new Error(`Unexpected token: ${(token as any).token}`);
}

export const toReversePolish = (input: string): string => {
  let stack: Token[] = [];
  let output = '';

  const tokenizer = makeTokenizer(input);
  let token: Token | undefined;

  while (token = tokenizer.next()) {
    [stack, output] = handleToken(stack, output, token);
  }

  while (stack.length) {
    const token = stack.pop();
    if (token?.token === 'operator') {
      output += ' ' + token.symbol;
    }
  }

  return output;
}