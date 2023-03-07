<template>
    <div>test</div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { ApiNoteT, Note } from '../../types/Note';

const props = defineProps<{
    note: Note;
}>();
const apiNote = inject('ApiNote') as ApiNoteT;

const deleteNote = (idNote: string) => {
    const res = apiNote.deleteNote(idNote);
    if (!res) {
        console.error('error in delete note #' + idNote);
    }
};

const update = () => {};
</script>

<style></style>
