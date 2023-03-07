<template>
    <div>test</div>
    <router-link :to="{ name: 'notes.new' }">New note</router-link>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import { ApiNoteT } from '../../types/Note';

const apiNote = inject('ApiNote') as ApiNoteT;
const notes = apiNote.getNotes();
const router = useRouter();
const deleteNote = (idNote: string) => {
    const res = apiNote.deleteNote(idNote);
    if (!res) {
        console.error('error in delete note #' + idNote);
    }
};

const showNote = (idNote: string) => {
    const res = apiNote.noteExists(idNote);
    if (res) {
        router.push({ name: 'notes.show', params: { note: idNote } });
    } else {
        console.error('Note not exists: #' + idNote);
    }
};
</script>

<style></style>
