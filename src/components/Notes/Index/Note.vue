<template>
    <div class="inline">
        <span @click="showNote">{{ note.id }}</span>
        <p>{{ note.title }}</p>
        <button @click="deleteNote">delete</button>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { Note } from '../../../types/Note';
import { ApiNoteT } from '../../../types/Note';
import { useRouter } from 'vue-router';

const props = defineProps<{
    note: Note & { id: string };
}>();

const router = useRouter();
let apiNote = inject('ApiNote') as ApiNoteT;

const deleteNote = () => {
    const res = apiNote.deleteNote(props.note.id);
    if (!res) {
        console.error('error in delete note #' + props.note.id);
    }
};

const showNote = () => {
    const res = apiNote.noteExists(props.note.id);
    if (res) {
        router.push({ name: 'notes.show', params: { note: props.note.id } });
    } else {
        console.error('Note not exists: #' + props.note.id);
    }
};
</script>

<style scoped>
.inline {
    display: flex;
    justify-content: space-between;
    align-content: center;
}
</style>
