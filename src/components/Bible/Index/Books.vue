<template>
    <ul>
        <li
            @click="$emit('select-book', book.id)"
            v-for="book in books"
            :key="book.id"
        >
            {{ book.value }}
        </li>
    </ul>
</template>

<script setup lang="ts">
defineProps<{
    currentBook: number;
    books: {
        value: string;
        id: number;
    }[];
}>();
</script>

<style scoped>
a {
    cursor: pointer;
}
</style>
