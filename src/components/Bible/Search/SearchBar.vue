<template>
    <form @submit.prevent="search">
        <button type="button" @click="openSearchForm = !openSearchForm">
            {{ openSearchForm ? '<' : '>' }}
        </button>
        <auto-complete
            :auto-complete-callback="autoCompleteCallback"
            v-model="bookSearch"
        />
        <div v-if="openSearchForm">
            <select v-model="form.chapter">
                <option
                    selected
                    :value="index"
                    v-for="(chapter, index) in chapters"
                    :key="index"
                >
                    {{ index + 1 }}
                </option>
            </select>
            <select v-model="form.verses.from">
                <option
                    selected
                    :value="index"
                    v-for="(verse, index) in verses"
                    :key="index"
                >
                    {{ index + 1 }}
                </option>
            </select>
            <select v-model="form.verses.to">
                <option :value="777"></option>
                <template v-for="(verse, index) in verses" :key="index">
                    <option
                        v-if="
                            form.verses &&
                            form.verses.from != undefined &&
                            index > form.verses.from
                        "
                        :value="index"
                    >
                        {{ index + 1 }}
                    </option>
                </template>
            </select>
        </div>
        <button type="submit">search</button>
    </form>
</template>

<script setup lang="ts">
import {
    ApiBibleT,
    AutoCompleteT,
    ChapterT,
    VerseT,
} from '../../../types/Bible';
import { computed, inject, ref, watch } from 'vue';
import { useBibleStore } from '../../../store/BibleStore';
import AutoComplete from '@/components/Bible/Search/AutoComplete.vue';
import { useRoute, useRouter } from 'vue-router';

const bookSearch = ref('');
const openSearchForm = ref(false);
const form = ref<{
    testament?: number;
    book?: number;
    chapter?: number;
    verses: {
        from?: number;
        to?: number;
    };
}>({
    testament: undefined,
    book: undefined,
    chapter: undefined,
    verses: {
        from: undefined,
        to: undefined,
    },
});

const router = useRouter();
const api = inject('ApiBible') as ApiBibleT;
const bibleStore = useBibleStore();
const search = () => {
    let found = true;
    if (!openSearchForm.value) {
        found = searchOne();
    } else {
        if (
            form.value.testament != undefined &&
            form.value.book != undefined &&
            form.value.chapter != undefined
        ) {
            bibleStore.setTestament(form.value.testament);
            bibleStore.setBook(form.value.book);
            bibleStore.setChapter(form.value.chapter);
            if (form.value.verses.from != undefined) {
                bibleStore.setVerses(form.value.verses.from);
            }
            if (form.value.verses.to != undefined) {
                bibleStore.setVerses(
                    bibleStore.$state.verses.toString() +
                        '-' +
                        form.value.verses.to.toString()
                );
            }
            bibleStore.saveSearch();
        } else {
            found = false;
        }
    }

    if (found) {
        router.push({ name: 'bible.book', query: {colored: 1} });
    }
};

const searchOne = () => {
    const result = api.search(bibleStore.$state, bookSearch.value);
    if (!result) {
        return false;
    }
    bibleStore.setTestament(result.testament);
    bibleStore.setBook(result.book);
    bibleStore.setChapter(result.chapter);
    bibleStore.setVerses(result.verses);
    bibleStore.saveSearch();
    return true;
};

const chapters = computed((): ChapterT[] => {
    if (form.value.book != undefined && form.value.testament != undefined) {
        return api.getBook({
            ...bibleStore.$state,
            testament: form.value.testament,
            book: form.value.book,
        }).chapters;
    }
    return [];
});

const verses = computed((): VerseT[] => {
    if (
        form.value.testament != undefined &&
        form.value.book != undefined &&
        form.value.chapter != undefined
    ) {
        return api.getChapter(
            bibleStore.$state,
            form.value.testament,
            form.value.book,
            form.value.chapter
        ).verses;
    }
    return [];
});

const autoCompleteCallback = (value: string): AutoCompleteT[] => {
    return api.autoCompleteBooks(bibleStore.$state, value);
};

watch(bookSearch, () => {
    const bookObject = api
        .getAllBooks(bibleStore.$state)
        .find(
            (b: { idTestament: number; idBook: number; book: string }) =>
                b.book == bookSearch.value
        ) as { idTestament: number; idBook: number; book: string } | undefined;
    if (bookObject !== undefined) {
        form.value.testament = bookObject.idTestament;
        form.value.book = bookObject.idBook;
    } else {
        form.value.testament = undefined;
        form.value.book = undefined;
    }
});

watch(
    () => form.value.verses.to,
    (val) => {
        if (val == 777) {
            form.value.verses.to = undefined;
        }
    }
);

watch(
    () => form.value.verses.from,
    (newVal, oldVal) => {
        if (newVal != oldVal) {
            form.value.verses.to = undefined;
        }
    }
);
</script>

<style></style>
