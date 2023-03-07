<template>
    <div>
        <input type="text" v-model="updatedTitle" placeholder="Note title" />
        <editor @dblclick="edit" @save="updateNote" :config="config"></editor>
    </div>
</template>

<script setup lang="ts">
import { OutputData } from '@editorjs/editorjs';
import { inject, ref } from 'vue';
import { ApiNoteT, Note } from '../../types/Note';

const props = defineProps<{
    note: Note & { id: string };
}>();

const config = ref({
    data: {...props.note, blocks: [...props.note.blocks, {
    "type" : "image",
    "data" : {
        "file": {
            "url" : "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg"
        },
        "caption" : "Roadster // tesla.com",
        "withBorder" : false,
        "withBackground" : false,
        "stretched" : true
    }
}]},
    readOnly: true,
    saveName: 'Update',
});

const updatedTitle = ref(props.note.title);
const apiNote = inject('ApiNote') as ApiNoteT;

const updateNote = (data: OutputData) => {
    const updatedNote = { ...props.note, ...data };
    if (updatedTitle.value !== props.note.title) {
        updatedNote.title = updatedTitle.value;
    }
    const res = apiNote.saveNote(updatedNote);
    if (!res) {
        console.error('error in saving !');
    }
};

const edit = () => {
    config.value.readOnly = false;
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
