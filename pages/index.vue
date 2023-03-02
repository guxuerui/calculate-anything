<script setup lang="ts">
import { calculateTable } from '~/constants'
import { vRipple } from '~/directives/ripple'

const output = ref('')

let result = $ref('')

const total = ref('')

const saveToStorage = () => {
  let historyArr: string[] = JSON.parse(localStorage.getItem('calculateList')!) || []
  if (historyArr.length >= 5)
    historyArr.shift()

  const currRes = result + total.value
  historyArr = [...historyArr, currRes]
  localStorage.setItem('calculateList', JSON.stringify(historyArr))
}

const handleResult = (str: string) => {
  // const resArr = result.split(' ')
  // let i = 0
  // let res: any = numReg.test(resArr[0]) ? +resArr[0] : resArr[0]
  // while (i <= resArr.length) {
  //   switch (resArr[i + 1]) {
  //     case '+':
  //       res = res + (numReg.test(resArr[i + 2]) ? parseFloat(resArr[i + 2]) : resArr[i + 2])
  //       break
  //     case '-':
  //       res = res - parseFloat(resArr[i + 2])
  //       break
  //     case '*':
  //       res = res * parseFloat(resArr[i + 2])
  //       break
  //     case '/':
  //       res = res / parseFloat(resArr[i + 2])
  //       break
  //     case '%':
  //       res = res % parseFloat(resArr[i + 2])
  //       break
  //     default:
  //       break
  //   }
  //   i += 2
  // }
  // 去除空格
  str = str.replace(/\s+/g, '')
  const stack: any[] = []
  let num: any = 0
  const char = ''
  let sign = '+'
  const operators = ['+', '-', '*', '/', '%', '=']
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i)
    if (!operators.includes(char)) {
      if (/\d/.test(char)) {
        num = num * 10 + parseInt(char)
      }

      else {
        num = char
        stack.push({ num, isSpecial: false })
        num = ''
      }
    }

    if (operators.includes(char) || i === str.length - 1) {
      let val: any = {}
      if (sign === '+') {
        val = { num, isSpecial: false }
      }
      else if (sign === '-') {
        val = { num: -num, isSpecial: false }
      }
      else if (sign === '*') {
        const prevVal = stack.pop()
        if (prevVal.isSpecial || val.isSpecial || prevVal.num === '')
          val = { num: NaN, isSpecial: true }
        else
          val = { num: prevVal.num * num, isSpecial: false }
      }
      else if (sign === '/') {
        const prevVal = stack.pop()
        console.log('[pages/index.vue:84] prevVal: ', prevVal)
        if (prevVal.isSpecial || val.isSpecial || num === 0 || prevVal.num === '')
          val = { num: NaN, isSpecial: true }
        else
          val = { num: (prevVal.num / num), isSpecial: false }
      }
      stack.push(val)
      num = 0
      sign = char
    }
    // stack.push(val)
  }
  const isString = stack.filter(s => !/\d/.test(s.num))
  console.log('stack res: ', stack, isString.length)
  const res = stack.reduce((acc, val) => acc + val.num, isString.length > 0 ? '' : 0)
  total.value = (typeof res === 'string' && res.includes('NaN')) ? 'NaN' : `${res}`
}

const handleClick = (value: string | number) => {
  const operators = ['+', '-', '*', '/', '%', '=']

  if (value === 'clear' || (operators.includes(value as string) && result.length === 0) || total.value) {
    result = ''
    total.value = ''
    output.value = ''
  }

  if (operators.includes(value as string) && !total.value && result.length) {
    result += ` ${value} `
  }
  else if (!operators.includes(value as string) && !total.value && value !== 'clear' && value !== 'back') {
    result += value
  }
  else if (!total.value && value !== 'clear' && value === 'back') {
    result = result.slice(0, -1)
    if (result.length <= 0)
      output.value = ''
  }

  if (value === '=' && !total.value)
    handleResult(result)
}

const handleKeyup = () => {
  if (result.length <= 1)
    result = output.value
  else
    result += output.value.slice(-1)
}

// random color
const random = ref(false)
const generateRandomColor = () => {
  const r = (Math.random() * 255).toFixed(0)
  const g = (Math.random() * 255).toFixed(0)
  const b = (Math.random() * 255).toFixed(0)
  return random.value ? `rgba(${r}, ${g}, ${b}, 1)` : 'white'
}
</script>

<template>
  <div border="2 solid #555" w-120 mx-auto pa-1 class="out-box">
    <Result :result="result" :total-res="total" />
    <input
      v-model="output"
      placeholder="随便输入些什么都行..."
      type="text" autocomplete="off"
      p="x-4 y-2" my-3 mx-auto w-111
      bg="transparent"
      text="right gray-500 dark:gray-300"
      border="3px rounded gray-400 dark:gray-500"
      outline="none active:none"
      @keyup="handleKeyup"
    >
    <div class="wrapper">
      <div
        v-for="card, i in calculateTable"
        :key="i"
        v-ripple
        class="card grid place-items-center"
        bg="gray" ma-3
        cursor-pointer
        position="relative"
        border="rounded"
        :style="{ color: generateRandomColor() }"
        @click="handleClick(card.value)"
      >
        <span v-if="card.value === 'back'" i-carbon-arrow-left />
        <span v-else>{{ card.title }}</span>
      </div>
    </div>
  </div>
  <button btn mt-6 @click="random = !random">
    Random Color
  </button>
</template>

<style scoped>
  .out-box {
    box-shadow: 2px 3px 5px #555, -2px -3px 5px #555;
  }
  .wrapper {
    height: 20rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .card:nth-child(1) {
    background: #c85953;
  }
  .card:nth-child(2) {
    background: #c8511f;
  }
  .card:nth-child(17) {
    grid-column-start: span 2;
  }
  .card:last-child {
    background: #bb6a46;
  }
</style>
