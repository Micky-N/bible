<template>
    <div>
        <verses :verses="verses" />
    </div>
</template>

<script setup lang="ts">
import { ApiBibleT, ChapterT } from '../../../types/Bible';
import Verses from '@/components/Bible/Book/Verses.vue';
import { computed, inject } from 'vue';
import { useBibleStore } from '../../../store/BibleStore';

const props = defineProps<{
    chapter: ChapterT;
}>();
const apiBible = inject('ApiBible') as ApiBibleT;
const verses = computed(() => props.chapter.verses.map((v, index) => {
    v.id = index;
    return v;
}));
</script>

<style></style>
