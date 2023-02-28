<script setup lang="ts">
import { vRipple } from '~/directives/ripple'

const online = useOnline()

const handleClick = () => {}
</script>

<template>
  <div>
    <Logos mb-6 />
    <Suspense>
      <ClientOnly>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
      </ClientOnly>
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <InputEntry />

    <div class="wrapper" mx-auto mt-8>
      <div
        v-for="i in 16"
        :key="i"
        v-ripple
        class="card grid place-items-center"
        bg="green"
        ma-1
        cursor-pointer
        position="relative"
        border="rounded"
        @click="handleClick"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .out-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .wrapper {
    width: 30rem;
    height: 20rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
</style>
