<template>
    <button v-if="bS.lastSearch" @click="goToLastSearch">Last Search</button>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useBibleStore } from '../../store/BibleStore';

const bS = useBibleStore();

const router = useRouter();

const route = useRoute();

const goToLastSearch = () => {
    bS.goToLastSearch();
    let name = 'bible.book';
    if (typeof bS.verses == 'number') {
        name = 'bible.verse';
    }
    if (route.name !== name) {
        router.push({ name });
    }
};
</script>

<style></style>
