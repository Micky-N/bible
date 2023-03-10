<template>
    <div>test</div>
    <router-link :to="{ name: 'notes.new' }">New note</router-link>
    <note
        @delete-note="deleteNote"
        v-for="note in notes"
        :key="note.id"
        :note="note"
    />
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import Note from '@/components/Notes/Index/Note.vue';
import NoteType from '../../types/Note';

let apiNote = inject('ApiNote') as NoteType.ApiNoteT;
const notes = ref<NoteType.Note[]>(Object.values(apiNote.getNotes()));

const deleteNote = (idNote: string) => {
    notes.value = notes.value.filter((note) => note.id !== idNote);
};
</script>

<style></style>
