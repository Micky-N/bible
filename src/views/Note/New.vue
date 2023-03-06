<template>
    <div>
        <input type="text" v-model="title" placeholder="Note title" />
        <editor @save="saveBlock" @export-html="saveHtml"></editor>
        <div class="htmlcontent" v-html="test"></div>
    </div>
</template>

<script setup lang="ts">
import { OutputData } from '@editorjs/editorjs';
import { ref } from 'vue';

const test = ref('');
const title = ref('');

const saveBlock = (data: OutputData) => {
    if (title.value) {
        const savedData = { ...data, title: title.value };
        console.log(savedData);
    } else {
        console.error('title not set');
    }
};

const saveHtml = (html: string) => {
    test.value = html;
};
</script>

<style scoped>
.htmlcontent {
    position: relative;
    max-width: 650px;
    margin: 0 auto;
    padding-bottom: 300px;
}
</style>
