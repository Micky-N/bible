<template>
    <div>
        <verse
            :verse="verse"
            v-for="verse in verses"
            :key="verse.id"
            :colored="verseColored(verse.id)"
        />
    </div>
</template>

<script setup lang="ts">
import { VerseT } from '../../../types/Bible';
import Verse from '@/components/Bible/Book/Verse.vue';
import { useBibleStore } from '../../../store/BibleStore';
import { useRoute } from 'vue-router';

const route = useRoute();
defineProps<{
    verses: VerseT[];
}>();

const bs = useBibleStore();

const verseColored = (idVerse: number) => {
    const verses = bs.verses;
    if (route.query.colored) {
        if (typeof verses == 'number') {
            return verses == idVerse;
        } else {
            const splittedVerses = verses.split('-').map((n) => parseInt(n));
            const allVerses = [];
            for (let i = splittedVerses[0]; i <= splittedVerses[1]; i++) {
                allVerses.push(i);
            }
            return allVerses.includes(idVerse!);
        }
    }
    return false;
};
</script>

<style></style>
