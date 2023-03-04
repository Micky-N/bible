<template>
    <div>
        {{ dateSearch }} - {{ book + ' ' + (search.chapter + 1) }}: {{ verses }}
        <button @click="showSearch(time)">voir</button>
        <button @click="$emit('delete-search', time)">delete</button>
    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { ApiBibleT, SearchBibleT } from '../../../types/Bible';
import { DateTime } from 'luxon';
import { useBibleStore } from '../../../store/BibleStore';
import { useRouter } from 'vue-router';

const api = inject('ApiBible') as ApiBibleT;
const props = defineProps<{
    search: SearchBibleT;
    time: string;
}>();

const useBible = useBibleStore();

const router = useRouter();

const showSearch = (time: string) => {
    const foundedSearch = api.getSearch(time);
    if (foundedSearch) {
        useBible.testament = foundedSearch.testament;
        useBible.book = foundedSearch.book;
        useBible.chapter = foundedSearch.chapter;
        useBible.verses = foundedSearch.verses;
        let routeParam: { name: string; query?: {} } = {
            name: 'bible.book',
            query: { colored: 1 },
        };
        if (typeof useBible.verses == 'number') {
            routeParam = { name: 'bible.verse' };
        }
        router.push(routeParam);
    }
};

const dateSearch = computed(() =>
    DateTime.fromMillis(parseInt(props.time)).toLocaleString(
        DateTime.DATE_MED_WITH_WEEKDAY
    )
);
const book = computed(
    () => api.getBook({ ...useBible.$state, ...props.search }).value
);
const verses = computed(() => {
    let verses = props.search.verses;
    if (typeof verses === 'string') {
        return verses
            .split('-')
            .map((v) => parseInt(v) + 1)
            .join('-');
    }
    return verses + 1;
});
</script>

<style></style>
