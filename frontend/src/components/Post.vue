<template>
  <div v-if="post">
    <img
      :src="imgBase64"
      :style="`width: ${size};`"
      class="h-auto object-contain cursor-pointer"
      @click="openPost"
    >
    <h1 v-if="showTitle">
      {{ post.title }}
    </h1>
    <h1
      v-if="showCreator"
      class="cursor-pointer text-gray-400"
      @click="$router.push(`/user/${post.user.uniqueName}`)"
    >
      @{{ post.user.uniqueName }}
    </h1>
  </div>
</template>
<script lang="ts">
import { logger } from '@/main'
import { fetch } from '@/utils/Helper'
import { Nullable } from '@shared/Types'
import { IPost } from '@shared/models/IPost'
import { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Nullable<IPost>>,
      required: true
    },
    showCreator: {
      type: Boolean,
      required: false,
      default: true
    },
    showTitle: {
      type: Boolean,
      required: false,
      default: true
    },
    size: {
      type: String,
      required: false,
      default: '100%'
    }
  },
  data() {
    return {
      imgBase64: undefined as Nullable<string>
    }
  },
  async mounted() {
    if (!this.post)
      return logger.log('Post component cannot be mounted as post prop is undefined!')
    
    const postID = this.post.id.toString()
    const base64 = await fetch<string>('GET', 'img', [postID])

    if (!base64)
      return logger.log('Couldn\'t fetch image for post $0', JSON.stringify(this.post))

    this.imgBase64 = base64
  },
  methods: {
    openPost() {
      this.$router.push(`/post/${this.post?.id}`)
    }
  }
})
</script>