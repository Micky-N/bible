<template>
    <div>
        <aside>
            <search-bar />
            {{ currentTestament }} - {{ currentBook }}
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
import { computed, watch, onMounted, inject } from 'vue';
import Testaments from '@/components/Bible/Testaments.vue';
import Books from '@/components/Bible/Books.vue';
import SearchBar from '@/components/Bible/SearchBar.vue';
import { useBibleStore } from '@/store/BibleStore';
import { storeToRefs } from 'pinia';
import { ApiBibleT } from '@/types/Bible';

const bibleStore = useBibleStore();

const { testament, book, chapter } = storeToRefs(bibleStore);

onMounted(() => {
    chapter.value = 0;
});
const apiBible = inject('ApiBible') as ApiBibleT
const testaments = computed(() => apiBible.getTestaments(bibleStore.getInstance));

const currentTestament = computed(() => testaments.value[testament.value]);

const books = computed(() => apiBible.getBooks(bibleStore.getInstance));

const currentBook = computed(() => books.value[book.value]);

const selectTestament = (idTestament: number) => {
    testament.value = idTestament;
};

const selectBook = (idBook: number) => {
    book.value = idBook;
};

watch(testament, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        book.value = 0;
    }
});
</script>

<style></style>
