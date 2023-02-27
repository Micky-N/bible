<template>
    <div>{{ book.chapters[0].verses.map((verse) => verse.value) }}</div>
</template>

<script setup lang="ts">
defineProps({
    book: Object,
});
</script>

<style></style>
