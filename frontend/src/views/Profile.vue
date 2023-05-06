<template>
  <div
    v-if="user"
    class="flex flex-col px-[30rem] pt-10"
  >
    <div class="flex flex-row gap-5 items-center">
      <avatar
        :user="user"
        :size="10"
      />
      <div class="flex flex-col gap-2 items-center">
        <div class="flex flex-row gap-5 items-center">
          <div class="flex flex-col">
            <h1 class="font-medium text-3xl">
              {{ user.displayName }}
            </h1>
            <h1
              v-tooltip="'Click to copy'"
              class="font-light text-lg text-gray-400 cursor-pointer"
              @click="copyUniqueName"
            >
              @{{ user.uniqueName }}
            </h1>
          </div>
          <button class="bg-blue-500 px-4 py-2 rounded-2xl">
            Follow
          </button>
        </div>
        <div class="flex flex-row gap-1 items-center">
          <h1 class="px-4 py-2 bg-gray-800 rounded-2xl cursor-help">
            {{ user.followerCount }} Followers
          </h1>
          <h1 class="px-4 py-2 bg-gray-800 rounded-2xl cursor-help">
            {{ user.likeCount }} Likes
          </h1>
        </div>
      </div>
    </div>
    <div class="w-full h-0.5 bg-gray-800 my-10" />
    <div class="grid grid-cols-3 gap-0.5 max-h-[45rem] overflow-y-scroll noscroll">
      <post
        v-for="(post, index) in user.posts"
        :key="index"
        :post="post"
        :show-creator="false"
        :show-title="false"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { fetch } from '@/utils/Helper'
import { Nullable } from '@shared/Types'
import { IUser } from '@shared/models/IUser'
import { defineComponent } from 'vue'
import avatar from '@/components/Avatar.vue'
import post from '@/components/Post.vue'

export default defineComponent({
  components: { avatar, post },
  data() {
    return {
      user: undefined as Nullable<IUser>
    }
  },
  async mounted() {
    const userName = this.$route.params.userName as string
    this.user = await fetch('GET', 'user', [userName])
  },
  methods: {
    copyUniqueName() {
      if (!this.user)
        return

      window.navigator.clipboard.writeText(this.user.uniqueName)
    }
  }
})
</script>