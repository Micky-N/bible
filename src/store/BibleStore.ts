import { defineStore } from 'pinia';
import { BibleStoreT } from '../types/Bible';

export const useBibleStore = defineStore('bibleStore', {
    state: (): BibleStoreT => ({
        language: 'fr',
        version: 'YifIs3pOjkCNRDJgFahinQ',
        testament: 0,
        book: 0,
        chapter: 0,
        verses: '*',
    }),
    getters: {
        getInstance: (state) => ({
            language: state.language,
            version: state.version,
            testament: state.testament,
            book: state.book,
            chapter: state.chapter,
            verses: state.verses,
        }),
    },
});
