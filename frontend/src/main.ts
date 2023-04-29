import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { createRouter, createWebHistory } from 'vue-router'
import config from '@config'

const router = createRouter({
    history: createWebHistory(),
    routes: Object.keys(config.views)
        .map(e => {
            const key = e as keyof typeof config.views
            return {
                name: key,
                path: key,
                component: () => import(`views/${config.views[key]['path']}`),
            }
        })
})

library.add(fas)

createApp(App)
    .component('fa', FontAwesomeIcon)
    .mount('#app')
