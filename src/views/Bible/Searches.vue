<template>
    <div>
        <button @click="clearStory">Clear</button>
        <ul v-if="hasSearch">
            <search
                @delete-search="deleteSearch"
                :search="search"
                :time="time"
                v-for="(search, time) in searches"
                :key="time"
            />
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { ApiBibleT } from '../../types/Bible';
import Search from '@/components/Bible/Searches/Search.vue';
import { useBibleStore } from '../../store/BibleStore';

const api = inject('ApiBible') as ApiBibleT;
const searches = ref(api.getSearches());

const deleteSearch = (time: string) => {
    if (searches.value) {
        const deleted = api.deleteSearch(time);
        if (deleted) {
            delete searches.value[time];
        }
    }
};

const clearStory = () => {
    const clear = api.clearSearch();
    if (clear) {
        useBibleStore().resetLastSearchTime();
        searches.value = {};
    }
};

const hasSearch = computed(() => Object.keys(searches).length > 0);
</script>

<style></style>
