<template>
  <div>
    <img
      :src="post.imgUrl"
      class="w-full h-auto object-contain cursor-pointer"
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
import { IPost } from '@shared/models/IPost'
import { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<IPost>,
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
  },
  methods: {
    openPost() {
      this.$router.push(`/post/${this.post.id}`)
    }
  }
})
</script>