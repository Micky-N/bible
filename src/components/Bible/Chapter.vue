<template>
    <div>
        <verses :verses="verses" />
    </div>
</template>

<script setup lang="ts">
import { ChapterT } from '../../types/Bible';
import Verses from '@/components/Bible/Verses.vue';
import { computed } from 'vue';
import Api from '../../bible/ApiBible';
import { useBibleStore } from '../../store/BibleStore';

defineProps<{
    chapter: ChapterT;
}>();

const verses = computed(() => Api.getVerses(useBibleStore().getInstance));
</script>

<style></style>
