<template>
  <background />
  <sidebar />
  <router-view v-slot="{ Component }">
    <!-- ml-[4.125rem] due to the sidebar -->
    <component
      :is="Component"
      :class="{ 'ml-[4.125rem] text-white' : $router.currentRoute.value.path != '/login' }"
    />
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sidebar from './components/Sidebar.vue'
import background from './components/Background.vue'

export default defineComponent({
  components: { sidebar, background }
})
</script>