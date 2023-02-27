<template>
    <div>
        <aside>
            {{ currentTestament }} - {{ currentBook }}
            <router-link :to="{name: 'bible.book', params: {testament: idTestament, book: idBook}}">Go book</router-link>
            <div>
                <testaments @select-testament="selectTestament" :testaments="testaments" :current-testament="idTestament" />
            </div>
        </aside>
        <div>
            <books @select-book="selectBook" :books="books" :current-book="idBook" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, } from "vue"
import Testaments from "@/components/Bible/Testaments.vue";
import Books from "@/components/Bible/Books.vue";

const props: {
    bible: IBible
} = defineProps({
    bible: {type: Object, default: () => {}}
})

const idTestament = ref(0)
const idBook = ref(0)
const currentTestament = computed(() => props.bible.testaments[idTestament.value].value)
const currentBook = computed(() => props.bible.testaments[idTestament.value].books[idBook.value].value)

const testaments = computed(() => {
    return props.bible.testaments.map(testament => testament.value)
})

const books = computed(() => {
    return props.bible.testaments[idTestament.value].books.map(book => book.value)
})

const selectTestament = (testament: number) => {
    idTestament.value = testament
}

const selectBook = (book: number) => {
    idBook.value = book
}

watch(idTestament, ( newValue, oldValue ) => {
    if(newValue !== oldValue){
        idBook.value = 0
    }
})

</script>

<style></style>
