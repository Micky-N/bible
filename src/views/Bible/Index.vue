<template>
    <div>
        <router-link :to="{ name: 'bible.searches' }">Historiques</router-link>
        <last-search-button />
        <aside>
            <search-bar />
            {{ currentTestament.value }} - {{ currentBook.value }}
            <router-link
                :to="{
                    name: 'bible.book',
                }"
                >Go book</router-link
            >
            <div>
                <testaments
                    @select-testament="selectTestament"
                    :testaments="testaments"
                    :current-testament="testament"
                />
            </div>
        </aside>
        <div>
            <books
                @select-book="selectBook"
                :books="books"
                :current-book="book"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, inject } from 'vue';
import Testaments from '@/components/Bible/Index/Testaments.vue';
import LastSearchButton from '@/components/Bible/LastSearchButton.vue';
import Books from '@/components/Bible/Index/Books.vue';
import SearchBar from '@/components/Bible/Search/SearchBar.vue';
import { useBibleStore } from '../../store/BibleStore';
import { storeToRefs } from 'pinia';
import { ApiBibleT } from '../../types/Bible';

const bibleStore = useBibleStore();

const { testament, book } = storeToRefs(bibleStore);

onMounted(() => {
    bibleStore.setChapter(0);
});
const apiBible = inject('ApiBible') as ApiBibleT;

const testaments = computed(() => apiBible.getTestaments(bibleStore.$state));

const currentTestament = computed(() => testaments.value[testament.value]);

const books = computed(() => apiBible.getBooks(bibleStore.$state));

const currentBook = computed(() => books.value[book.value]);

const selectTestament = (idTestament: number) => {
    bibleStore.setTestament(idTestament);
};

const selectBook = (idBook: number) => {
    bibleStore.setBook(idBook);
};
</script>

<style></style>
