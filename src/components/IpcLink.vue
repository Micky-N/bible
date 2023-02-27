<template>
    <a @click="send" class="nav-link">{{ title }}</a>
</template>

<script setup lang="ts">
import { IpcRenderer } from 'electron/renderer';
import { inject } from 'vue';

const ipcRenderer: IpcRenderer = inject('ipcRenderer') as IpcRenderer;
const props = defineProps({
    title: { type: String, required: true },
    link: { type: String, required: true },
    value: { type: Object, default: {} },
});

const send = () => {
    ipcRenderer.send(props.link, props.value);
};
</script>

<style scoped>
a {
    cursor: pointer;
}
</style>
