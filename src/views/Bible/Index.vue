<template>
    <div>
        <aside>
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
import { computed, watch, onMounted, ref } from 'vue';
import Testaments from '@/components/Bible/Testaments.vue';
import Books from '@/components/Bible/Books.vue';
import { useBibleStore } from '../../store/BibleStore';
import { storeToRefs } from 'pinia';
import Api from '../../bible/ApiBible';

const bibleStore = useBibleStore();

const { testament, book, chapter } = storeToRefs(bibleStore);

onMounted(() => {
    chapter.value = 0;
});

const testaments = computed(() => Api.getTestaments(bibleStore.getInstance));

const currentTestament = computed(() => testaments.value[testament.value]);

const books = computed(() => Api.getBooks(bibleStore.getInstance));

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
