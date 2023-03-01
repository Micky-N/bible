<template>
    <div>
        <verse
            :index="verse.id || index"
            :verse="verse.value"
            v-for="(verse, index) in verses"
            :key="verse.id || index"
        />
    </div>
</template>

<script setup lang="ts">
import { VerseT } from '../../../types/Bible';
import Verse from '@/components/Bible/Book/Verse.vue';

const props = defineProps<{
    verses: VerseT[];
}>();
</script>

<style></style>
