<template>
    <div>
        <verses :verses="chapter.verses" />
    </div>
</template>

<script setup lang="ts">
import { ChapterT } from '../../types/Bible';
import Verses from '@/components/Bible/Verses.vue';

defineProps<{
    chapter: ChapterT;
}>();
</script>

<style></style>
