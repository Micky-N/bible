<template>
    <span :class="{ colored }">
        <sup @click="showVerse()">{{ verse.id + 1 }}</sup
        >{{ verse.value + ' ' }}
    </span>
</template>

<script setup lang="ts">
import { useBibleStore } from '../../../store/BibleStore';
import { useRouter } from 'vue-router';
import { VerseT } from '../../../types/Bible';

const props = defineProps<{
    verse: VerseT;
    colored: boolean | false;
}>();

const r = useRouter();

const showVerse = () => {
    useBibleStore().verses = props.verse.id;
    r.push({ name: 'bible.verse' });
};
</script>

<style scoped>
.colored {
    background: #fff1c5;
}
</style>
