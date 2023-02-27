import { createApp } from 'vue';
import './assets/css/style.css';
import App from './App.vue';
import './samples/node-api';
import { ipcRenderer } from 'electron';
import router from './router';
import { createPinia } from 'pinia';

const Vue = createApp(App);

Vue.provide('ipcRenderer', ipcRenderer);

Vue.use(createPinia())
    .use(router)
    .mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*');
    });
