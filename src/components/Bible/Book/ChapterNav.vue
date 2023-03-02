<template>
    <div>
        <ul style="display: inline-flex; list-style: none">
            <li
                style="margin-right: 5px"
                @click="$emit('select-chapter', chapter.id)"
                v-for="chapter in chapters"
                :key="chapter.id"
            >
                {{ showChapter(chapter.id) }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ChapterT } from '../../../types/Bible';

defineProps<{
    chapters: ChapterT[];
    currentChapter: number;
}>();

const showChapter = (idChapter: number) => {
    return (idChapter + 1).toString().padStart(2, '0');
};
</script>

<style></style>
