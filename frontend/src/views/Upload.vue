<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div class="text-white flex flex-col gap-1">
      <h1 class="text-4xl font-black mb-3 underline">
        Post
      </h1>
      <div class="grid grid-cols-2 gap-1">
        <input
          v-model="i_title"
          class="bg-inherit px-4 py-2 border-gray-700 border-2 rounded focus:py-3 duration-300"
          placeholder="Title"
        >
        <input
          v-model="i_description"
          class="bg-inherit px-4 py-2 border-gray-700 border-2 rounded focus:py-3 duration-300"
          placeholder="Description"
        >
        <input
          v-model="i_place"
          class="bg-inherit px-4 py-2 border-gray-700 border-2 rounded focus:py-3 duration-300"
          placeholder="Place"
        >
        <label
          for="input_file"
          class="bg-inherit px-4 py-2 border-gray-700 border-2 rounded focus:py-3 duration-300 cursor-pointer"
          :class="fileName ? 'text-white' : 'text-gray-400'"
        >
          {{ fileName || 'Image File' }}
        </label>
        <input
          id="input_file"
          class="hidden"
          accept=".png,.jpg,.jpeg"
          type="file"
          @change="onFileChanged($event)"
        >
      </div>
      <button
        class="px-4 py-2 bg-blue-500 border-blue-600 text-white border-2 rounded hover:border-blue-700 hover:bg-blue-600 duration-300 hover:py-3"
        @click="post"
      >
        Upload Post
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { logger } from '@/main'
import { fetch } from '@/utils/Helper'
import { Nullable } from '@shared/Types'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      i_title: undefined as Nullable<string>,
      i_description: undefined as Nullable<string>,
      i_place: undefined as Nullable<string>,
      i_file: undefined as Nullable<string>,
      fileName: undefined as Nullable<string>
    }
  },
  methods: {
    async onFileChanged(ev: Event) {
      const target = ev.target as HTMLInputElement

      if (!target
        || !target.files)
        return logger.log('Upload failed (!target || !target.files).')

      const file = target.files[0]
      const fileReader = new FileReader()

      fileReader.readAsBinaryString(file)
      fileReader.onloadend = () => {
        const base64Content = btoa(fileReader.result as string)
        this.i_file = 'data:image/jpeg;base64,' + base64Content
      }

      this.fileName = file.name
    },
    async post() {
      if (!this.i_title
        || !this.i_file)
        return logger.log('Can\'t post because title or file is undefined.')

      const body = {
        title: this.i_title,
        description: this.i_description,
        place: this.i_place,
        base64: this.i_file
      }

      // clear inputs
      this.i_title = undefined
      this.i_description = undefined
      this.i_place = undefined
      this.i_file = undefined
      this.fileName = undefined

      // post
      fetch('POST', 'post', [], body)
    }
  }
})
</script>