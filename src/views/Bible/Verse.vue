<template>
    <div>
        <search-bar />
        <verse :verse="verse.value" :index="verse.id" />
    </div>
</template>

<script setup lang="ts">
import SearchBar from '@/components/Bible/Search/SearchBar.vue';
import Verse from '@/components/Bible/Book/Verse.vue';
import { computed, inject } from 'vue';
import { useBibleStore } from '../../store/BibleStore';
import { ApiBibleT } from '../../types/Bible';

const apiBible = inject('ApiBible') as ApiBibleT;
const verse = computed(() => apiBible.getVerses(useBibleStore().$state)[0]);

const allVersionsVerse = computed(() =>
    apiBible.getAllVersionsVerse(useBibleStore().$state)
);
</script>

<style></style>
