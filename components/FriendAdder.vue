<script setup lang="ts">
import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'
import type { Observable } from 'dexie'
import { db } from '~/utils/db'
import type { Friend } from '~/utils/db'

const props = defineProps({
  defaultAge: {
    type: Number,
    default: 21,
  },
})
const status = ref('')
const friendName = ref('')
const friendAge = ref(props.defaultAge)

const addFriend = async () => {
  try {
    // Add the new friend!
    const id = await db.friends.add({
      name: friendName.value,
      age: friendAge.value,
    })

    status.value = `Friend ${friendName.value} successfully added. Got id ${id}`

    // Reset form:
    friendName.value = ''
    friendAge.value = props.defaultAge
  }
  catch (error) {
    status.value = `Failed to add ${friendName.value}: ${error}`
  }
}

const friends: Observable<Friend[]> = useObservable(
  liveQuery(() => db.friends.toArray()),
)
onMounted(() => {
  setTimeout(() => {
    console.log('friends: ', friends)
  }, 500)
})
</script>

<template>
  <fieldset>
    <legend>Add new friend</legend>
    <div mt-4>
      <label>
        Name:
        <input
          id="input"
          v-model="friendName"
          placeholder="What's your name?"
          type="text" autocomplete="off"
          p="x-4 y-2" m="t-5" w="250px"
          text="center" bg="transparent"
          border="~ rounded gray-200 dark:gray-700"
          outline="none active:none"
        >
      </label>
    </div>
    <br>
    <label>
      Age:
      <input
        id="input"
        v-model="friendAge"
        placeholder="What's your name?"
        type="number" autocomplete="off"
        p="x-4 y-2" m="t-5" w="250px"
        text="center" bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
    </label>
    <br>
    <button btn mt-4 @click="addFriend">
      Add Friend
    </button>
    <p my-4 text="green">
      {{ status }}
    </p>
  </fieldset>

  <ul>
    <li text="orange 2rem" pa-4>
      Friend List
    </li>
    <li v-for="friend in friends" :key="friend.id">
      <span mr-2 inline-block w-20 text-right>{{ friend.name }},</span> <span>{{ friend.age }}</span>
    </li>
  </ul>
</template>
