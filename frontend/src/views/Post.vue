<template>
  <div
    v-if="post"
    class="w-full h-screen flex justify-center items-center gap-1"
  >
    <div class="bg-gray-800 p-3 rounded">
      <div class="w-full flex justify-between items-center">
        <h1
          v-if="post.place"
          class="font-light text-gray-300"
        >
          <fa icon="location-dot" />
          {{ post.place }}
        </h1>
        <!-- empty element so the share btn is on the right -->
        <h1 v-else />
        <button
          class="text-gray-300"
          @click="toggleShareMenu"
        >
          <fa icon="paper-plane" />
          Share
        </button>
      </div>
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
    <div
      v-if="shareMenuOpened"
      class="flex flex-col gap-1"
    >
      <div
        v-for="(chat, index) in chats"
        :key="index"
        class="p-3 bg-gray-700 rounded flex gap-5 items-center"
      >
        <avatar :user="chat" />
        <div>
          <h1 class="leading-none text-lg font-semibold">
            {{ chat.displayName }}
          </h1>
          <h1 class="leading-none text-gray-400">
            @{{ chat.uniqueName }}
          </h1>
        </div>
        <fa
          class="cursor-pointer hover:text-gray-400 duration-300"
          icon="share"
          @click="share(chat)"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import avatar from '@/components/Avatar.vue'
import { fetch } from '@/utils/Helper'
import { Nullable } from '@shared/Types'
import { IPost } from '@shared/models/IPost'
import { IUser } from '@shared/models/IUser'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { avatar },
  data() {
    return {
      post: undefined as Nullable<IPost>,
      imgBase64: undefined as Nullable<string>,
      shareMenuOpened: false,
      chats: [] as IUser[]
    }
  },
  async mounted() {
    const postID = this.$route.params.postID as string

    this.post = await fetch('GET', 'post', [postID])
    this.imgBase64 = await fetch('GET', 'img', [postID])
    this.chats = await fetch('GET', 'chats') || []
  },
  methods: {
    visitUser() {
      this.$router.push(`/user/${this.post?.user.uniqueName}`)
    },
    toggleShareMenu() {
      this.shareMenuOpened = !this.shareMenuOpened
    },
    async share(chat: IUser) {
      fetch('POST', 'message', undefined,
      {
        targetName: chat.uniqueName,
        type: 'share',
        content: `${this.post?.id} - ${this.post?.title}`
      })
    }
  }
})
</script>