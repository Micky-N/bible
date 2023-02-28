import { defineStore } from 'pinia';
import { BibleStoreT, BookT } from '../types/Bible';
import Api from '../bible/ApiBible';

const getInstance = (state: BibleStoreT) => ({
    language: state.language,
    version: state.version,
    testament: state.testament,
    book: state.book,
    chapter: state.chapter,
    verses: state.verses,
});

export const useBibleStore = defineStore('bibleStore', {
    state: (): BibleStoreT => ({
        language: 'fr',
        version: 'YifIs3pOjkCNRDJgFahinQ',
        testament: 0,
        book: 0,
        chapter: 0,
        verses: 0,
    }),
    getters: {
        getVersion: (state) => Api.getVersion(state.version),
        getVersions: (state) => Api.getVersions(),
        getTestaments: (state): string[] =>
            Api.getTestaments(getInstance(state)),
        getBooks: (state): string[] => Api.getBooks(getInstance(state)),
        getBook: (state): BookT => Api.getBook(getInstance(state)),
    },
});
