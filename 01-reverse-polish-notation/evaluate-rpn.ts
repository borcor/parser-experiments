import { parseToken } from "./parse-token";
import { makeTokenizer } from "./tokenizer"

export const evaluateRPN = (input: string) => {
  const tokenizer = makeTokenizer(input);
  let stack: number[] = [], token;

  while (token = tokenizer.next()) {
    stack = parseToken(stack, token);
  }

  if (stack.length !== 1) {
    throw new Error('Expected more tokens');
  }

  return stack[0];
}
