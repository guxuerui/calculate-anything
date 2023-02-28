<script setup lang="ts">
import { calculateTable } from '~/constants'
import { vRipple } from '~/directives/ripple'

const handleClick = (value: string | number) => {
  console.log('value: ', value)
}
</script>

<template>
  <div border="2 solid #555" w-120 mx-auto pa-1 class="out-box">
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
