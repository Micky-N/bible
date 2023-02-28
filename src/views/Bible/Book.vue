<template>
    <p>{{ book.value + ' - ' + (chapter + 1) }}</p>
    <select v-model="version">
        <option :selected="v.guid == version" v-for="v in versions" :key="v.guid" :value="v.guid">{{ v.description }}</option>
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
import Api from '../../bible/ApiBible'

const bibleStore = useBibleStore();

const { chapter, version } = storeToRefs(bibleStore);

const book = computed(() => Api.getBook(bibleStore.getInstance))

const versions = Api.getVersions()

const selectChapter = (selectedChapter: number) => {
    chapter.value = selectedChapter;
};

const currentChapter = computed(() => book.value.chapters[chapter.value]);

const chapters = computed(() => {
    return Array.from(Object.keys(book.value.chapters).keys());
});
</script>

<style></style>
