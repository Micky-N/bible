<template>
    <button v-if="bS.lastSearchTime" @click="goToLastSearch">
        Last Search
    </button>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { useBibleStore } from '../../store/BibleStore';
import { ApiBibleT } from '../../types/Bible';

const bS = useBibleStore();

const router = useRouter();

const api = inject('ApiBible') as ApiBibleT;

const goToLastSearch = () => {
    const lastSearchTime = bS.lastSearchTime;
    if (lastSearchTime) {
        const lastSearch = api.getSearch(lastSearchTime);
        if (lastSearch) {
            bS.setSearchData(lastSearch);
            let routeParam: { name: string; query?: {} } = {
                name: 'bible.book',
                query: { colored: 1 },
            };
            if (typeof bS.verses == 'number') {
                routeParam = { name: 'bible.verse' };
            }
            router.push(routeParam);
        }
    }
};
</script>

<style></style>
