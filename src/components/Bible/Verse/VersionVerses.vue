<template>
    <div>
        <h4>__ {{ version_description }} __</h4>
        <verse
            :colored="currentVerse == verse.id"
            v-for="verse in verses"
            :key="verse.id"
            :verse="verse.value"
            :index="verse.id"
        />
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { useBibleStore } from '../../../store/BibleStore';
import { ApiBibleT, VerseT } from '../../../types/Bible';
import Verse from '@/components/Bible/Book/Verse.vue';

const props = defineProps<{
    verses: Array<VerseT & { id: number }>;
    version_description: string;
    currentVerse: number;
}>();

const bstore = useBibleStore();
const api = inject('ApiBible') as ApiBibleT;
</script>

<style></style>
