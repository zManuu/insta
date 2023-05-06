import { State, createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'
import 'floating-vue/dist/style.css'
import FloatingVue from 'floating-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import { Logger } from '@shared/Logger'
import config from '@shared/config.json'

const logger = new Logger(
    config.frontend.logger.includeDate,
    config.frontend.logger.isVerbose,
    config.frontend.logger.highlightColor
)

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('./views/Home.vue') },
        { path: '/search', component: () => import('./views/Search.vue') },
        { path: '/login', component: () => import('./views/Login.vue') },
        { path: '/user/:userName', component: () => import('./views/Profile.vue') }
    ]
})

const store = createStore({
    state() {
        return {
            fetchingLevel: 0
        }
    },
    mutations: {
        setFetching(state: State, val: boolean) {
            state.fetchingLevel += val
                ? 1
                : -1   
        }
    }
})

library.add(fas)

const app = createApp(App)
app.use(router)
app.use(store)
app.use(FloatingVue)
app.component('fa', FontAwesomeIcon)
app.config.globalProperties.$config = config
app.mount('#app')

export {
    logger,
    store
}