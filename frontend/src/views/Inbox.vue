<template>
  <div class="w-full h-screen flex">
    <div
      v-if="chats.length > 0"
      class="w-1/6 h-full bg-gray-900 border-r-2 border-gray-800 flex flex-col gap-1.5 max-h-screen overflow-y-scroll noscroll"
    >
      <div
        v-for="(chat, index) in chats"
        :key="index"
        class="w-full bg-gray-800 p-3 flex items-center gap-3 cursor-pointer"
        @click="openChat(chat)"
      >
        <avatar :user="chat" />
        <div>
          <h1 class="font-medium">
            {{ chat.displayName }}
          </h1>
          <h1 class="text-gray-400 font-light text-sm">
            @{{ chat.uniqueName }}
          </h1>
        </div>
      </div>
    </div>
    <div
      v-else
      class="w-full h-screen flex justify-center items-center"
    >
      <h1 class="font-medium text-2xl">
        You don't have any open chats yet...
      </h1>
    </div>
  </div>
</template>
<script lang="ts">
import { fetch } from '@/utils/Helper'
import { IUser } from '@shared/models/IUser'
import { defineComponent } from 'vue'
import avatar from '@/components/Avatar.vue'

export default defineComponent({
  components: { avatar },
  data() {
    return {
      chats: [] as IUser[]
    }
  },
  async mounted() {
    this.chats = await fetch('GET', 'chats') || []
  },
  methods: {
    async openChat(chat: IUser) {
      this.$router.push(`/chat/${chat.uniqueName}`)
    }
  }
})
</script>