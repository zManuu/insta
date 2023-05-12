<template>
  <div
    v-if="post"
    class="w-full h-screen flex justify-center items-center"
  >
    <div class="bg-gray-800 p-3 rounded">
      <h1
        v-if="post.place"
        class="font-light text-gray-300"
      >
        <fa icon="location-dot" />
        {{ post.place }}
      </h1>
      <img
        :src="imgBase64"
        class="max-h-[40rem] max-w-[60rem]"
      >
      <div class="flex justify-between items-center w-full">
        <h1 class="font-semibold text-xl">
          {{ post.title }}
        </h1>
        <h1
          class="font-light text-gray-400 cursor-pointer"
          @click="visitUser"
        >
          @{{ post.user.uniqueName }}
        </h1>
      </div>
      <h1 class="font-light text-gray-300">
        {{ post.description }}
      </h1>
    </div>
  </div>
</template>
<script lang="ts">
import { fetch } from '@/utils/Helper'
import { Nullable } from '@shared/Types'
import { IPost } from '@shared/models/IPost'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      post: undefined as Nullable<IPost>,
      imgBase64: undefined as Nullable<string>
    }
  },
  async mounted() {
    const postID = this.$route.params.postID as string

    this.post = await fetch('GET', 'post', [postID])
    this.imgBase64 = await fetch('GET', 'img', [postID])
  },
  methods: {
    visitUser() {
      this.$router.push(`/user/${this.post?.user.uniqueName}`)
    }
  }
})
</script>