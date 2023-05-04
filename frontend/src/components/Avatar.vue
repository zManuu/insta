<template>
  <img
    class="rounded-full cursor-pointer"
    :style="`width: ${size}rem; height: ${size}rem;`"
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

    /**
     * w, h in rem
     */
    size: {
      type: Number,
      required: false,
      default: 2.5
    }
  }
})
</script>