<template>
    <div>
        <verses :verses="verses" />
    </div>
</template>

<script setup lang="ts">
import { ApiBibleT, ChapterT } from '@/types/Bible';
import Verses from '@/components/Bible/Verses.vue';
import { computed, inject } from 'vue';
import { useBibleStore } from '../../store/BibleStore';

defineProps<{
    chapter: ChapterT;
}>();
const apiBible = inject('ApiBible') as ApiBibleT
const verses = computed(() => apiBible.getVerses(useBibleStore().getInstance));
</script>

<style></style>
