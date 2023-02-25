import { createApp } from 'vue'
import './assets/css/style.css'
import App from './App.vue'
import './samples/node-api'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*')
    })
