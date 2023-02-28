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
        lastSearch: undefined,
    }),
    actions: {
        setLanguage(language: string) {
            this.language = language;
        },
        setVersion(version: string) {
            this.version = version;
        },
        setTestament(testament: number) {
            if (testament !== this.testament) {
                this.setBook(0);
            }
            this.testament = testament;
        },
        setBook(book: number) {
            this.book = book;
        },
        setChapter(chapter: number) {
            this.chapter = chapter;
        },
        setVerses(verses: string | number) {
            this.verses = verses;
        },
        setLastSearch(lastSearch?: string) {
            this.lastSearch = lastSearch;
        },
    },
});
