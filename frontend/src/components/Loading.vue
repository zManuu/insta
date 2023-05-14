<template>
  <h1
    v-if="isActive()"
    class="fixed bottom-3 right-3 text-lg animate-pulse text-white"
  >
    Loading
    <fa
      icon="rotate"
      class="animate-spin"
    />
  </h1>
</template>
<script lang="ts">
import { store } from '@/utils/Store'
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    isActive() {
      return store.state.fetchingLevel > 0
    }
  }
})
</script>