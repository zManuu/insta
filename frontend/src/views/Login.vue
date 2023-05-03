<template>
  <div class="bg-gray-800 flex flex-col w-max p-3 rounded border-2 border-gray-700 gap-1">
    <input
      v-model="i_name"
      class="bg-inherit px-2 py-1 border-gray-700 border-2 rounded text-white"
      placeholder="Account Name"
    >
    <input
      v-model="i_password"
      type="password"
      class="bg-inherit px-2 py-1 border-gray-700 border-2 rounded text-white"
      placeholder="Password"
    >
    <button
      class="bg-blue-500 border-blue-600 text-white border-2 rounded hover:border-blue-700 hover:bg-blue-600 duration-300"
      @click="login"
    >
      Login
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Nullable } from '@shared/Types'
import { fetch } from '@/utils/Helper'

export default defineComponent({
  data() {
    return {
      i_name: undefined as Nullable<string>,
      i_password: undefined as Nullable<string>
    }
  },
  methods: {
    async login() {
      if (!this.i_name
        || !this.i_password)
        return

      const isSuccess = await fetch<boolean>('GET', 'login', [this.i_name, this.i_password])

      if (isSuccess)
        this.$router.push('/')
    }
  }
})
</script>