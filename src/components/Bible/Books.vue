<template>
    <ul>
        <li
            @click="$emit('select-book', index)"
            v-for="(book, index) in books"
            :key="index"
        >
            {{ book }}
        </li>
    </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
    currentBook: number;
    books: string[];
}>();
</script>

<style scoped>
a {
    cursor: pointer;
}
</style>
