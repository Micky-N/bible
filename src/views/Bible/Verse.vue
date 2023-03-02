<template>
    <div>
        <search-bar />
        <h5>{{ book +' '+ (chapter + 1)+': '+(verse + 1) }} - {{ version.description }}</h5>
        <div>
            <button @click="goToPrevious">-</button>
            <button @click="$router.push({name: 'bible.book', query: {colored: 1}})">Voir dans la bible</button>
            <button @click="goToNext">+</button>
        </div>
        <verse :colored="verse == v.id" v-for="v in versesPN(verse)" :key="v.id" :verse="v.value" :index="v.id" />
        <version-verses
            @click="goToVersion(guid)"
            v-for="(verse, guid) in allVersionsVerse"
            :key="guid"
            :verses="versesPN(verse.id!)"
            :version_description="verse.version_description"
            :current-verse="verse.id!"
        />
    </div>
</template>

<script setup lang="ts">
import SearchBar from '@/components/Bible/Search/SearchBar.vue';
import Verse from '@/components/Bible/Book/Verse.vue';
import VersionVerses from '@/components/Bible/Verse/VersionVerses.vue';
import { computed, inject } from 'vue';
import { useBibleStore } from '../../store/BibleStore';
import { ApiBibleT, VerseT } from '../../types/Bible';

const apiBible = inject('ApiBible') as ApiBibleT;
const bstore = useBibleStore();
const verse = computed(() => bstore.verses as number);
const book = computed(() => apiBible.getBook(bstore.$state).value);
const chapter = computed(() => bstore.chapter);

const versesPN = (verse: number) => {
    const prev = verse == 0 ? 0 : verse-1
    const next = verse >= versesLength.value ? undefined : verse+1
    const joinVerses = [prev, next].filter(n => n != undefined).join('-')
    return apiBible.getVerses({...bstore.$state, verses: joinVerses})
}
const versesLength = computed(
    () =>
        apiBible.getChapter(
            bstore.$state,
            bstore.testament,
            bstore.book,
            bstore.chapter
        ).verses.length
);

const chaptersLength = computed(
    () => apiBible.getBook(bstore.$state).chapters.length
);

const booksLength = computed(() => apiBible.getBooks(bstore.$state).length);

const testamentsLength = computed(() => apiBible.getTestaments(bstore.$state).length);

const goToNext = () => {
    let chapter = bstore.chapter;
    let book = bstore.book;
    let testament = bstore.testament;
    let i = verse.value! + 1
    if (i >= versesLength.value) {
        chapter += 1;
        i = 0;
    }
    if (chapter >= chaptersLength.value) {
        book += 1;
        chapter = 0;
    }
    if (book >= booksLength.value) {
        testament += 1;
        book = 0;
    }
    if (testament >= testamentsLength.value) {
        testament = 0;
    }
    bstore.setTestament(testament);
    bstore.setBook(book);
    bstore.setChapter(chapter);
    bstore.setVerses(i);
};

const goToPrevious = () => {
    let chapter = bstore.chapter;
    let book = bstore.book;
    let testament = bstore.testament;
    let i = verse.value! - 1
    if (i < 0) {
        chapter -= 1;
    }
    if (chapter < 0) {
        book -= 1;
    }
    if (book < 0) {
        testament -= 1;
    }

    if (testament < 0) {
        bstore.setTestament(0);
    }else{
        bstore.setTestament(testament);
    }
    if (book < 0) {
        bstore.setBook(booksLength.value - 1);
    }else{
        bstore.setBook(book);
    }
    if(chapter < 0){
        bstore.setChapter(chaptersLength.value - 1);
    }else{
        bstore.setChapter(chapter);
    }
    if(i < 0){
        bstore.setVerses(versesLength.value - 1);
    }else{
        bstore.setVerses(i);
    }
};

const allVersionsVerse = computed(() =>
    apiBible.getAllVersionsVerse(bstore.$state)
);

const goToVersion = (guid: string | number) => {
    bstore.setVersion(guid as string);
};

const version = computed(() => apiBible.getVersion(bstore.$state));
</script>

<style></style>
