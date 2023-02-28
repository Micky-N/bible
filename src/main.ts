import { createApp } from 'vue';
import './assets/css/style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import ApiBible from './bible/ApiBible';

const Vue = createApp(App);

Vue.provide('ApiBible', ApiBible);

Vue.use(createPinia())
    .use(router)
    .mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*');
    });
