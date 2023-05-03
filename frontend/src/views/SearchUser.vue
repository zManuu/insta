<template>
  <div>
    <input
      v-model="i_search"
      type="text"
    >
    {{ results }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { fetch } from '@/utils/Helper'
import { SearchResult, Nullable } from '@shared/Types'

export default defineComponent({
  data() {
    return {
      i_search: undefined as Nullable<string>,
      results: [] as SearchResult[]
    }
  },
  watch: {
    async i_search(val: string) {
      this.results = await fetch('GET', 'search', [val]) || []
    }
  }
})
</script>