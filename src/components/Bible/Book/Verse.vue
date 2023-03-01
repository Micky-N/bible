<template>
    <span>
        <sup @click="showVerse()">{{ index + 1 }}</sup
        >{{ verse + ' ' }}
    </span>
</template>

<script setup lang="ts">
import { useBibleStore } from '../../../store/BibleStore';
import { useRouter } from 'vue-router';

const props = defineProps<{
    verse: string;
    index: number;
}>();

const r = useRouter();

const showVerse = () => {
    useBibleStore().verses = props.index;
    r.push({ name: 'bible.verse' });
};
</script>

<style></style>
