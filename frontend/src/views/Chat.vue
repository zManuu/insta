<template>
  <div
    v-if="user && messages"
    class="w-full h-screen flex"
  >
    <div class="w-full h-full px-[20rem] py-[5rem]">
      <div class="w-full flex items-center gap-5 bg-gray-700 p-2 rounded-t-xl">
        <avatar :user="user" />
        <h1 class="font-semibold text-xl">
          {{ user.displayName }}
        </h1>
      </div>
      <div class="w-full border-x-2 border-gray-700 px-10 py-1 flex flex-col gap-1 max-h-[30rem] overflow-y-scroll noscroll">
        <div
          v-for="(message, index) in getMessages()"
          :key="index"
          class="max-w-[50rem] rounded-xl p-3"
          :class="isMessageSentByMe(message) ? 'float-right bg-gray-700 rounded-br-none ml-auto' : 'float-left bg-gray-800 rounded-bl-none mr-auto'"
        >
          <h1>{{ message.content }}</h1>
        </div>
      </div>
      <div class="w-full border-2 border-gray-700 border-t-0 rounded-b-xl p-3">
        <input
          v-model="i_message"
          placeholder="Message"
          class="bg-inherit border-gray-800 border-2 px-2 py-1 w-full"
          @keydown="keyPress"
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { fetch } from '@/utils/Helper'
import { Nullable } from '@shared/Types'
import { IMessage } from '@shared/models/IMessage'
import { IUser } from '@shared/models/IUser'
import { defineComponent } from 'vue'
import avatar from '@/components/Avatar.vue'
import { logger } from '@/main'

export default defineComponent({
  components: { avatar },
  data() {
    return {
      user: undefined as Nullable<IUser>,
      messages: undefined as Nullable<IMessage[]>,
      i_message: undefined as Nullable<string>
    }
  },
  async mounted() {
    const userName = this.$route.params.userName as string
    const data = await fetch<{ user: IUser, messages: IMessage[] }>('GET', 'chat', [userName])

    if (data) {
      this.user = data.user
      this.messages = data.messages
    } else {
      logger.log('Chat with $0 couldn\'t be opened.', this.$route.params.userName)
    }
  },
  methods: {
    getMessages() {
      return this.messages
        ? this.messages.sort((a, b) => a.id - b.id)
        : []
    },
    isMessageSentByMe(message: IMessage) {
      return 'to' in message
    },
    keyPress(ev: KeyboardEvent) {
      if (ev.code == 'Enter')
        this.sendMessage()
    },
    async sendMessage() {
      const text = this.i_message

      if (!text
        || !this.user
        || !this.messages)
        return

      logger.log('Sending message $0 to $1', text, this.user.uniqueName)

      this.i_message = undefined

      const newMessage = await fetch<IMessage>('POST', 'message', undefined,
      {
        targetName: this.user.uniqueName,
        type: 'text',
        content: text
      })

      if (newMessage) {
        this.messages.push(newMessage)
      } else {
        logger.log('Something wen\'t wrong with sending the message: $0', this)
      }
    }
  }
})
</script>