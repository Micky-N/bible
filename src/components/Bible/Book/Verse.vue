<template>
    <span :class="{ colored }">
        <sup @click="clickable && showVerse()">{{ verse.id + 1 }}</sup
        >{{ verse.value + ' ' }}
    </span>
</template>

<script setup lang="ts">
import { useBibleStore } from '../../../store/BibleStore';
import { useRouter } from 'vue-router';
import { VerseT } from '../../../types/Bible';

const props = withDefaults(
    defineProps<{
        verse: VerseT;
        colored: boolean;
        clickable: boolean;
    }>(),
    {
        colored: false,
        clickable: true,
    }
);

const r = useRouter();
const useB = useBibleStore();
const showVerse = () => {
    useB.verses = props.verse.id;
    r.push({ name: 'bible.verse' });
};
</script>

<style scoped>
.colored {
    background: #fff1c5;
}
</style>
