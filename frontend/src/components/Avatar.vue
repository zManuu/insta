<template>
  <img
    class="rounded-full cursor-pointer"
    :style="`width: ${size}; height: ${size};`"
    :src="user.avatarUrl || $config.frontend.fallbackAvatarUrl"
    @click="$router.push(`/user/${user.uniqueName}`)"
  >
</template>
<script lang="ts">
import { IUser } from '@shared/models/IUser'
import { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<IUser>,
      required: true
    },
    size: {
      type: String,
      required: false,
      default: '2.5rem'
    }
  }
})
</script>