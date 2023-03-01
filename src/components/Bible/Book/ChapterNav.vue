<template>
    <div>
        <ul style="display: inline-flex; list-style: none">
            <li
                style="margin-right: 5px"
                @click="$emit('select-chapter', chapter)"
                v-for="chapter in chapters"
                :key="chapter"
            >
                {{ showChapter(chapter) }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    chapters: number[];
    currentChapter: number;
}>();

const showChapter = (chapter: number) => {
    return (chapter + 1).toString().padStart(2, '0');
};
</script>

<style></style>
