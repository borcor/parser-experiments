import { operators } from "../02-shunting-yard-algorithm/operators";
import { OperatorToken, Token, makeTokenizer } from "../02-shunting-yard-algorithm/tokenizer";

export const getPrevOperator = (stack: Token[]): OperatorToken | undefined => {
  const lastToken = stack.at(-1);
  return lastToken?.token === 'operator' ? lastToken : undefined;
}

const applyOperator = (operator: Token | undefined, output: number[]): number[] => {
  if (!operator || operator.token !== 'operator') {
    throw new Error(`Attempt to apply non-operator: ${operator?.token}`);
  }

  const right = output.pop();
  const left = output.pop();

  if (typeof right === 'undefined' || typeof left === 'undefined') {
    throw new Error(`Cannot apply operator ${operator.symbol}, not enough arguments`);
  }

  if (operator.symbol === '*') {
    output.push(left * right);
  } else if (operator.symbol === '/') {
    output.push(left / right);
  } else if (operator.symbol === '+') {
    output.push(left + right);
  } else if (operator.symbol === '-') {
    output.push(left - right);
  } else if (operator.symbol === '^') {
    output.push(left ** right);
  }

  return output;
}

export const handleToken = (stack: Token[], output: number[], token: Token): [Token[], number[]] => {
  if (token.token === 'number') {
    output.push(token.value);
    return [stack, output];
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
      applyOperator(stack.pop(), output);
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
        applyOperator(stack.pop(), output);
        prevToken = stack.at(-1);
        continue;
      }

      throw new Error(`Unexpected token in stack: ${prevToken.token}`);
    }

    throw new Error(`Unmatched parenthesis`);
  }

  throw new Error(`Unexpected token: ${(token as any).token}`);
}

export const evaluateExpression = (input: string): number => {
  let stack: Token[] = [];
  let output: number[] = [];

  const tokenizer = makeTokenizer(input);
  let token: Token | undefined;

  while (token = tokenizer.next()) {
    [stack, output] = handleToken(stack, output, token);
  }

  while (stack.length) {
    const token = stack.pop();
    if (token?.token === 'operator') {
      applyOperator(token, output);
    }
  }

  if (output.length !== 1) {
    throw new Error(`Unbalanced arguments`);
  }

  return output[0];
}