<template>
    <div>test</div>
    <router-link :to="{ name: 'notes.new' }">New note</router-link>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { ApiNoteT } from '../../types/Note';

const apiNote = inject('ApiNote') as ApiNoteT;
const notes = apiNote.getNotes();
const deleteNote = (idNote: string) => {
    apiNote.deleteNote(idNote);
};
</script>

<style></style>
