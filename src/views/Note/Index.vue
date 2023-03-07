<template>
    <div>test</div>
    <router-link :to="{ name: 'notes.new' }">New note</router-link>
    <note v-for="note in notes" :key="note.id" :note="note" />
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { ApiNoteT } from '../../types/Note';
import Note from '@/components/Notes/Index/Note.vue';

let apiNote = inject('ApiNote') as ApiNoteT;
const notes = apiNote.getNotes();
</script>

<style></style>
