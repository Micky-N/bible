<template>
    <p>{{ getBook.value + ' - ' + (chapter + 1) }}</p>
    <select v-model="version">
        <option :selected="v.guid == version" v-for="v in getVersions" :key="v.guid" :value="v.guid">{{ v.description }}</option>
    </select>
    <chapter-nav
        @select-chapter="selectChapter"
        :current-chapter="chapter"
        :chapters="chapters"
    />
    <chapter :chapter="currentChapter" />
</template>

<script setup lang="ts">
import ChapterNav from '@/components/Bible/ChapterNav.vue';
import Chapter from '@/components/Bible/Chapter.vue';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useBibleStore } from '../../store/BibleStore';

const bibleStore = useBibleStore();

const { getBook, chapter, getVersions, version } = storeToRefs(bibleStore);

const selectChapter = (selectedChapter: number) => {
    chapter.value = selectedChapter;
};

const currentChapter = computed(() => {
    return getBook.value.chapters[chapter.value];
});

const chapters = computed(() => {
    return Array.from(Object.keys(getBook.value.chapters).keys());
});
</script>

<style></style>
