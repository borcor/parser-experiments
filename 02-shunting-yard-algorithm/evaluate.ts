import { evaluateRPN } from "../01-reverse-polish-notation/evaluate-rpn";
import { toReversePolish } from "./to-reverse-polish"

export const evaluate = (input: string): number => {
  const rpnExpression = toReversePolish(input);

  return evaluateRPN(rpnExpression);
}
