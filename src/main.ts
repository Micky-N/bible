import { createApp } from 'vue';
import './assets/css/style.css';
import App from '@/App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import ApiBible from './bible/ApiBible';

const Vue = createApp(App);
const pinia = createPinia();

pinia.use(piniaPersist);
Vue.provide('ApiBible', ApiBible);

Vue.use(pinia)
    .use(router)
    .mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*');
    });
