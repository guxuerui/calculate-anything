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

const handleResult = () => {
  const resArr = result.split(' ')
  let i = 0
  let res = +resArr[0]
  while (i <= resArr.length) {
    switch (resArr[i + 1]) {
      case '+':
        res = res + parseFloat(resArr[i + 2])
        break
      case '-':
        res = res - parseFloat(resArr[i + 2])
        break
      case '*':
        res = res * parseFloat(resArr[i + 2])
        break
      case '/':
        res = res / parseFloat(resArr[i + 2])
        break
      case '%':
        res = res % parseFloat(resArr[i + 2])
        break
      default:
        break
    }
    i += 2
  }
  total.value = `${res}`
  saveToStorage()
}

const handleClick = (value: string | number) => {
  const operators = ['+', '-', '*', '/', '%', '=']

  if (value === 'clear' || (operators.includes(value as string) && result.length === 0) || total.value) {
    result = ''
    total.value = ''
    output.value = ''
  }

  if (operators.includes(value as string) && !total.value)
    result += ` ${value} `
  else if (!total.value && value !== 'clear')
    result += value

  if (value === '=' && !total.value)
    handleResult()
}

const handleKeyup = () => {
  if (result.length <= 1)
    result = output.value
  else
    result += output.value.slice(-1)
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
        bg="gray" text="white"
        ma-3
        cursor-pointer
        position="relative"
        border="rounded"
        @click="handleClick(card.value)"
      >
        {{ card.title }}
      </div>
    </div>
  </div>
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
  .card:nth-child(1), .card:nth-child(16) {
    grid-column-start: span 2;
  }
  .card:last-child {
    background: #bb6a46;
  }
</style>
