<template>
    <div v-html="scripture" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { VerseT } from '../../types/Bible';

const props = defineProps<{
    verses: VerseT[];
}>();

const scripture = computed(() => {
    return props.verses
        .map((verse, index) => verseNumber(index) + ' ' + verse.value)
        .join(' ');
});
const verseNumber = (index: number) => `<sup>${index + 1}</sup>`;
</script>

<style></style>
