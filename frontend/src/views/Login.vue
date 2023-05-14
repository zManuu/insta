<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div class="text-white flex flex-col gap-1">
      <h1 class="text-4xl font-black mb-3 underline">
        Login
      </h1>
      <p
        v-if="showError"
        class="mb-3 text-red-500 font-light"
      >
        Incorrect login information.
      </p>
      <input
        v-model="i_name"
        class="bg-inherit px-4 py-2 border-gray-700 border-2 rounded text-white focus:py-3 duration-300"
        placeholder="Account Name"
      >
      <input
        v-model="i_password"
        type="password"
        class="bg-inherit px-4 py-2 border-gray-700 border-2 rounded text-white focus:py-3 duration-300"
        placeholder="Password"
      >
      <button
        class="px-4 py-2 bg-blue-500 border-blue-600 text-white border-2 rounded hover:border-blue-700 hover:bg-blue-600 duration-300 hover:py-3"
        @click="login"
      >
        Login
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Nullable } from '@shared/Types'
import { fetch } from '@/utils/Helper'
import { logger } from '@/main'
import { store } from '@/utils/Store'
import config from '@shared/config.json'

export default defineComponent({
  data() {
    return {
      i_name: undefined as Nullable<string>,
      i_password: undefined as Nullable<string>,
      showError: false
    }
  },
  watch: {
    i_name() { this.showError = false },
    i_password() { this.showError = false }
  },
  methods: {
    async login() {
      if (!this.i_name
        || !this.i_password)
        return

      const loginReq = await fetch<boolean>('POST', 'login', undefined,
        {
          name: this.i_name,
          password: this.i_password
        }
      )

      if (loginReq) {
        logger.log('Login was successfull for $0', this.i_name)
        store.commit('setUniqueName', this.i_name)
        localStorage.setItem(config.frontend.localstorage.name, this.i_name)
        localStorage.setItem(config.frontend.localstorage.password, this.i_password)
        this.$router.push('/')
      }
      else
        this.showError = true
    }
  }
})
</script>