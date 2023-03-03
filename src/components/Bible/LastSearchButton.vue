<template>
    <button v-if="bS.lastSearchTime" @click="goToLastSearch">
        Last Search
    </button>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBibleStore } from '../../store/BibleStore';
import { ApiBibleT } from '../../types/Bible';

const bS = useBibleStore();

const router = useRouter();

const route = useRoute();

const api = inject('ApiBible') as ApiBibleT;

const goToLastSearch = () => {
    const lastSearchTime = bS.lastSearchTime;
    if (lastSearchTime) {
        const lastSearch = api.getSearch(lastSearchTime);
        if (lastSearch) {
            bS.setSearchData(lastSearch);
            let name = 'bible.book';
            if (typeof bS.verses == 'number') {
                name = 'bible.verse';
            }
            if (route.name !== name) {
                router.push({ name });
            }
        }
    }
};
</script>

<style></style>
