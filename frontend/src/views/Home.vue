<template>
  <div
    v-if="results"
    class="w-full flex justify-center"
  >
    <div class="grid grid-cols-3 w-1/2 gap-5 max-h-screen overflow-y-scroll noscroll">
      <div
        v-for="(entry, index) in results"
        :key="index"
      >
        <div
          v-if="'uniqueName' in entry"
          class="w-full h-full flex flex-col gap-3 justify-center items-center"
        >
          <!-- user -->
          <avatar
            :user="entry"
            size="10rem"
          />
          <h1 class="font-semibold">
            {{ entry.displayName }}
          </h1>
        </div>
        <div v-else>
          <post
            :post="entry"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { fetch } from '@/utils/Helper'
import { Nullable, SearchResult } from '@shared/Types'
import { defineComponent } from 'vue'
import post from '@/components/Post.vue'
import avatar from '@/components/Avatar.vue'

export default defineComponent({
  components: { post, avatar },
  data() {
    return {
      results: undefined as Nullable<SearchResult[]>
    }
  },
  async mounted() {
    this.results = await fetch('GET', 'browse')
  }
})
</script>