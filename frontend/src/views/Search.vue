<template>
  <div>
    <div class="ml-5 relative top-5 mb-5">
      <h1 class="text-2xl font-black mb-1 underline">
        Search
      </h1>
      <input
        v-model="i_search"
        class="bg-inherit border-2 border-gray-700 rounded px-2 py-1"
        placeholder="User / Post / ..."
        type="text"
      >
    </div>
    <div class="flex w-full">
      <div class="flex flex-col gap-1 p-10 w-1/4 overflow-y-scroll max-h-[60rem] noscroll">
        <!-- users -->
        <div
          v-for="(user, index) in getResultUsers()"
          :key="index"
          class="flex items-center justify-between"
        >
          <div class="flex flex-row gap-2">
            <avatar :user="user" />
            <div>
              <h1 class="font-semibold">
                {{ user.displayName }}
              </h1>
              <h1 class="text-gray-400 font-light">
                {{ user.uniqueName }}
              </h1>
            </div>
          </div>
          <div class="text-gray-400 font-light">
            <h1>{{ user.likeCount }} <fa icon="heart" /></h1>
            <h1>{{ user.followerCount }} <fa icon="bell" /></h1>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-3 w-3/4 p-10 overflow-y-scroll max-h-[60rem] noscroll">
        <!-- posts -->
        <post
          v-for="(post, index) in getResultPosts()"
          :key="index"
          :post="post"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { fetch } from '@/utils/Helper'
import { SearchResult, Nullable } from '@shared/Types'
import avatar from '@/components/Avatar.vue'
import post from '@/components/Post.vue'
import { IUser } from '@shared/models/IUser'
import { IPost } from '@shared/models/IPost'

export default defineComponent({
  components: { avatar, post },
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
  },
  methods: {
    getResultUsers() {
      return this.results.filter(e => 'displayName' in e) as IUser[]
    },
    getResultPosts() {
      return this.results.filter(e => !('displayName' in e)) as IPost[]
    }
  }
})
</script>