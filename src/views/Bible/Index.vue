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
import { computed, watch, onMounted } from 'vue';
import Testaments from '@/components/Bible/Testaments.vue';
import Books from '@/components/Bible/Books.vue';
import { useBibleStore } from '../../store/BibleStore';
import { storeToRefs } from 'pinia';

const bibleStore = useBibleStore();

const { getTestaments, getBooks, testament, book, chapter } =
    storeToRefs(bibleStore);

onMounted(() => {
    chapter.value = 0;
});

const currentTestament = computed(() => getTestaments.value[testament.value]);

const books = computed(() => {
    return getBooks.value;
});

const currentBook = computed(() => books.value[book.value]);

const testaments = computed(() => {
    return getTestaments.value.map((testament: string) => testament);
});

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
