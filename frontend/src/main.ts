import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'
import 'floating-vue/dist/style.css'
import FloatingVue from 'floating-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Logger } from '@shared/Logger'
import config from '@shared/config.json'
import { store } from './utils/Store'
import { router } from './utils/Router'
import { getImgSrc } from './utils/Helper'

const logger = new Logger(
    config.frontend.logger.includeDate,
    config.frontend.logger.isVerbose,
    config.frontend.logger.highlightColor
)

library.add(fas)

const app = createApp(App)
app.use(router)
app.use(store)
app.use(FloatingVue)
app.component('fa', FontAwesomeIcon)
app.config.globalProperties.$config = config
app.config.globalProperties.getImgSrc = getImgSrc
app.mount('#app')

export {
    logger
}