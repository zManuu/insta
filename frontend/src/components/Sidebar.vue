<template>
  <div
    v-if="$router.currentRoute.value.path != '/login'"
    class="fixed p-5 flex flex-col justify-between w-max h-screen bg-gray-800 border-r-2 border-gray-700"
  >
    <div class="flex flex-col gap-5">
      <div
        v-for="(action, index) in actions.upper"
        :key="index"
        v-tooltip="action.name"
        class="text-white text-xl cursor-pointer hover:text-gray-500 duration-300"
        @click="$router.push(action.ref)"
      >
        <fa :icon="action.icon" />
      </div>
    </div>
    <div class="flex flex-col gap-5">
      <div
        v-for="(action, index) in actions.lower"
        :key="index"
        v-tooltip="action.name"
        class="text-white text-xl cursor-pointer hover:text-gray-500 duration-300"
        @click="$router.push(typeof action.ref == 'string' ? action.ref : action.ref())"
      >
        <fa :icon="action.icon" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { store } from '@/utils/Store'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      actions: {
        upper: [
          { icon: 'house', ref: '/', name: 'Home' },
          { icon: 'magnifying-glass', ref: '/search', name: 'Browse' },
          { icon: 'share', ref: '/inbox', name: 'Inbox' },
        ],
        lower: [
          { icon: 'camera', ref: '/upload', name: 'Upload' },
          { icon: 'user', ref: () => `/user/${store.state.uniqueName}`, name: 'Your Profile' },
          { icon: 'gear', ref: '/settings', name: 'Settings' },
        ]
      }
    }
  }
})
</script>