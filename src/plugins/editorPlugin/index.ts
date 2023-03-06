import type { App } from 'vue';
import Editor from './Editor.vue';

const editorPlugin = (app: App) => {
    app.component('Editor', Editor);
};

export default editorPlugin;
