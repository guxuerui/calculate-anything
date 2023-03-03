<script setup lang="ts">
import { calculateTable } from '~/constants'
import { vRipple } from '~/directives/ripple'
import { evalRPN, infixToPostfix } from '~/utils/calculate'

const output = ref('')

let result = $ref('')

const total = ref('')

const handleResult = (str: string) => {
  if (output.value) {
    if (str.includes('-') || str.includes('*') || str.includes('/') || str.includes('%'))
      total.value = 'NaN'
    else
      total.value = addFromLeftToRight(str)
  }
  else {
    const infix = str.slice(0, -3)
    const res = evalRPN(infixToPostfix(infix))
    total.value = `${res}`
  }
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
