<template>
    <div>
        <input
            type="text"
            :readonly="config.readOnly"
            v-model="updatedTitle"
            placeholder="Note title"
        />
        <editor
            @dblclick="edit"
            @save="updateNote"
            @export-html="show"
            :config="config"
            :data="currentNote"
        ></editor>
        <div v-html="html"></div>
    </div>
</template>

<script setup lang="ts">
import { OutputData } from '@editorjs/editorjs';
import { inject, ref } from 'vue';
import { ApiNoteT, Note } from '../../types/Note';

const props = defineProps<{
    note: Note & { id: string };
}>();

const currentNote = ref<typeof props.note>(props.note);

const config = ref({
    readOnly: true,
    saveName: 'Update',
});

const updatedTitle = ref(currentNote.value.title);
const apiNote = inject('ApiNote') as ApiNoteT;

const updateNote = (data: OutputData) => {
    const updatedNote = { ...currentNote.value, ...data };
    if (updatedTitle.value !== currentNote.value.title) {
        updatedNote.title = updatedTitle.value;
    }
    const res = apiNote.saveNote(updatedNote);
    if (!res) {
        console.error('error in saving !');
    }
    currentNote.value.blocks = updatedNote.blocks;
    config.value.readOnly = true;
};

const edit = () => {
    config.value.readOnly = false;
};

const html = ref('');

const show = (toHtml: string) => {
    html.value = toHtml;
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
