<template>
    <div>
        <h4>__ {{ version_description }} __</h4>
        <verse
            :colored="currentVerse == verse.id"
            v-for="verse in verses"
            :key="verse.id"
            :verse="verse"
        />
    </div>
</template>

<script setup lang="ts">
import { VerseT } from '../../../types/Bible';
import Verse from '@/components/Bible/Book/Verse.vue';

defineProps<{
    verses: Array<VerseT & { id: number }>;
    version_description: string;
    currentVerse: number;
}>();
</script>

<style></style>
