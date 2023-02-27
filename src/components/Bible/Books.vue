<template>
    <ul>
        <li @click="$emit('select-book', index)" v-for="(book, index) in books" :key="index">{{ book }}</li>
    </ul>
</template>

<script setup lang="ts">
const props: {
    currentBook: number,
    books: string[]
} = defineProps({
    currentBook: { type: Number},
    books: {type: Array}
})
</script>

<style scoped>
a {
    cursor: pointer;
}
</style>
