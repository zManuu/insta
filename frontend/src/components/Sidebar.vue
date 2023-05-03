<template>
  <div class="fixed p-5 flex flex-col gap-5 w-max h-screen bg-gray-800 border-r-2 border-gray-700">
    <div
      v-for="(action, index) in actions"
      :key="index"
      :tooltip="action.name"
      class="text-white text-xl cursor-pointer"
      @click="$router.push(action.ref)"
    >
      <fa :icon="action.icon" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      actions: [
        { icon: 'house', ref: '/', name: 'Home' },
        { icon: 'magnifying-glass', ref: '/search', name: 'Browse' },
        { icon: 'share', ref: '/inbox', name: 'Inbox' },
        { icon: 'user', ref: '/profile', name: 'Profile' },
        { icon: 'gear', ref: '/settings', name: 'Settings' }
      ]
    }
  }
})
</script>