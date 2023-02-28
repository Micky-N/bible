<template>
    <form @submit.prevent="search">
        <input type="text" v-model="searchValue" />
        <button type="submit">search</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchValue = ref('');
const search = () => {
    console.log(searchValue);
};
</script>

<style></style>
