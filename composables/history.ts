import { useStorage } from '@vueuse/core'

export const historyRes = ref<string[]>([])

if (process.client) {
  const calculateList = useStorage('calculateList', JSON.parse(localStorage.getItem('calculateList') || '[]'))
  historyRes.value = toRaw(calculateList.value)
}
