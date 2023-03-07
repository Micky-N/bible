import { createApp } from 'vue';
import './assets/css/style.css';
import App from '@/App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import ApiBible from './bible/ApiBible';
import editor from './plugins/editorPlugin';
import ApiNote from './note/ApiNote';

const Vue = createApp(App);
const pinia = createPinia();

pinia.use(piniaPersist);
Vue.provide('ApiBible', ApiBible);
Vue.provide('ApiNote', ApiNote);

Vue.use(pinia)
    .use(router)
    .use(editor)
    .mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*');
    });
