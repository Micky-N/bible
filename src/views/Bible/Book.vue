<template>
    <p>{{ book.value + ' - ' + (chapter + 1) }}</p>
    <search-bar />
    <select v-model="version">
        <option
            :selected="v.guid == version"
            v-for="v in versions"
            :key="v.guid"
            :value="v.guid"
        >
            {{ v.description }}
        </option>
    </select>
    <chapter-nav
        @select-chapter="selectChapter"
        :current-chapter="chapter"
        :chapters="book.chapters"
    />
    <chapter :chapter="currentChapter" />
</template>

<script setup lang="ts">
import ChapterNav from '@/components/Bible/Book/ChapterNav.vue';
import Chapter from '@/components/Bible/Book/Chapter.vue';
import SearchBar from '@/components/Bible/Search/SearchBar.vue';
import { computed, inject } from 'vue';
import { useBibleStore } from '../../store/BibleStore';
import { ApiBibleT } from '../../types/Bible';
import { storeToRefs } from 'pinia';

const bibleStore = useBibleStore();

const { chapter, version } = storeToRefs(bibleStore);

const apiBible = inject('ApiBible') as ApiBibleT;

const book = computed(() => apiBible.getBook(bibleStore.$state));

const versions = apiBible.getVersions();

const selectChapter = (selectedChapter: number) => {
    if (chapter.value != selectedChapter) {
        bibleStore.setVerses('*');
        bibleStore.setChapter(selectedChapter);
    }
};

const currentChapter = computed(() => book.value.chapters[chapter.value]);
</script>

<style></style>
