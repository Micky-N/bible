<template>
    <div>
        <input type="text" v-model="title" placeholder="Note title" />
        <editor @save="saveBlock"></editor>
    </div>
</template>

<script setup lang="ts">
import { OutputData } from '@editorjs/editorjs';
import { inject, ref } from 'vue';
import { ApiNoteT } from '../../types/Note';

const test = ref('');
const title = ref('');
const apiNote = inject('ApiNote') as ApiNoteT;

const saveBlock = (data: OutputData) => {
    if (title.value) {
        const newNote = { ...data, title: title.value };
        const res = apiNote.saveNote(newNote);
        if (!res) {
            console.error('error in saving !');
        }
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
