<template>
  <background />
  <sidebar />
  <router-view v-slot="{ Component }">
    <!-- ml-[4.05rem] due to the sidebar -->
    <component
      :is="Component"
      :class="{ 'ml-[4.05rem] text-white' : $router.currentRoute.value.path != '/login' }"
    />
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sidebar from './components/Sidebar.vue'
import background from './components/Background.vue'
import { fetch } from './utils/Helper'
import { logger } from './main'
import { store } from './utils/Store'
import config from '@shared/config.json'

export default defineComponent({
  components: { sidebar, background },
  async mounted() {
    const name = localStorage.getItem(config.frontend.localstorage.name)
    const password = localStorage.getItem(config.frontend.localstorage.password)

    logger.log('Autologin with $0 and $1...', name, password)
    
    if (!name || !password) {
      logger.log('Name and/or password aren\'t saved in localstorage. Redirecting to login.')
      this.$router.push('/login')
      return
    }

    const loginReq = await fetch<boolean>('GET', 'login', [name, password])

    if (loginReq) {
      logger.log('Autologin was successfull for $0', name)
      store.commit('setUniqueName', name)
    } else {
      logger.log('Autologin response from server was false. Redirecting to login.')
      this.$router.push('/login')
    }
  }
})
</script>