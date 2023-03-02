<template>
    <div>
        <verse
            :index="verse.id || index"
            :verse="verse.value"
            v-for="(verse, index) in verses"
            :key="verse.id || index"
            :colored="verseColored(verse)"
        />
    </div>
</template>

<script setup lang="ts">
import { VerseT } from '../../../types/Bible';
import Verse from '@/components/Bible/Book/Verse.vue';
import { useBibleStore } from '../../../store/BibleStore';
import { useRoute } from 'vue-router';

const route = useRoute();
const props = defineProps<{
    verses: VerseT[];
}>();

const bs = useBibleStore();

const verseColored = (verse: VerseT) => {
    const verses = bs.verses;
    if (route.query.colored) {
        if (typeof verses == 'number') {
            return verses == verse.id;
        } else {
            const splittedVerses = verses.split('-').map(n => parseInt(n));
            const allVerses = []
            for (let i = splittedVerses[0]; i <= splittedVerses[1]; i++) {
                allVerses.push(i);
            }
            return allVerses.includes(verse.id!)
        }
    }
};
</script>

<style></style>
