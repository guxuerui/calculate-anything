import type { IIndex } from '~/types/index'

const isNumber = (token: string) => {
  return !(token === '+' || token === '-' || token === '*' || token === '/' || token === '%')
}

// 中缀表达式转后缀表达式
export function infixToPostfix(infix: string) {
  const operatorStack = []
  const postfixQueue = []
  const operators: IIndex = {
    '+': { precedence: 1, associativity: 'left' },
    '-': { precedence: 1, associativity: 'left' },
    '*': { precedence: 2, associativity: 'left' },
    '/': { precedence: 2, associativity: 'left' },
    '%': { precedence: 2, associativity: 'left' },
  }
  const tokens: any[] = infix.split(/\s+/)

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (!isNaN(token)) {
      postfixQueue.push(token)
    }
    else if (token === '(') {
      operatorStack.push(token)
    }
    else if (token === ')') {
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(')
        postfixQueue.push(operatorStack.pop())

      operatorStack.pop() // remove '('
    }
    else {
      while (operatorStack.length > 0 && operators[operatorStack[operatorStack.length - 1]].precedence >= operators[token].precedence && operators[token].associativity === 'left')
        postfixQueue.push(operatorStack.pop())

      operatorStack.push(token)
    }
  }

  while (operatorStack.length > 0)
    postfixQueue.push(operatorStack.pop())

  // return postfixQueue.join(' ');
  return postfixQueue
}

// 逆波兰表达式 - 计算值
export const evalRPN = (tokens: string[]) => {
  // const tokens = str.split(/\s+/)
  const stack: any[] = []
  const n = tokens.length
  for (let i = 0; i < n; i++) {
    const token = tokens[i]
    if (isNumber(token)) {
      stack.push(parseFloat(token))
    }
    else {
      const num2 = stack.pop()
      const num1 = stack.pop()
      if (token === '+')
        stack.push(num1 + num2)
      else if (token === '-')
        stack.push(num1 - num2)
      else if (token === '*')
        stack.push(num1 * num2)
      else if (token === '/')
        stack.push(num1 / num2)
      else if (token === '%')
        stack.push(num1 % num2)
    }
  }
  return stack.pop()
}

export const addFromLeftToRight = (result: string): string => {
  const resArr = (result.replace(/\s+/g, '')).split('')
  let res = ''
  for (let i = 0; i < resArr.length; i++) {
    if (resArr[i] === '+' || resArr[i] === '=')
      continue

    res += resArr[i]
  }
  return res
}
