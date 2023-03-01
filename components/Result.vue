<script setup lang="ts">
const props = defineProps({
  result: {
    type: String,
    default: '',
  },
  totalRes: {
    type: String,
    default: '',
  },
})

const getClasses = (result: string) => {
  if (result)
    return 'font-bold text-gray-500 dark:text-gray-300'

  return 'text-gray-400 dark:text-gray-500'
}
</script>

<template>
  <div
    text="right"
    p="x-4 y-2" mt-3 mx-auto
    w-111 min-h-12
    border="3px rounded gray-400 dark:gray-500"
    transition="all 0.5s linear"
  >
    <div :class="getClasses(result)">
      {{ result ? result : '还没有结果哦...' }}
    </div>
    <div text="2rem" font="bold">
      {{ totalRes }}
    </div>
  </div>
</template>

<style scoped>
</style>
