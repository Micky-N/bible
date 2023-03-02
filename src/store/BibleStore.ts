import { defineStore } from 'pinia';
import { BibleStoreT, LastSearchBibleT } from '../types/Bible';
import EStore from '../utils/EStore';

const eStore = new EStore('test');

const eStoreStorage: Storage = {
    length: 1,
    setItem(key, state) {
        eStore.set(key, state);
    },
    getItem(key) {
        console.log(key);
        return JSON.stringify(eStore.get(key));
    },
    clear(): void {
        throw new Error('Function not implemented.');
    },
    key(index: number): string | null {
        throw new Error('Function not implemented.');
    },
    removeItem(key: string): void {
        throw new Error('Function not implemented.');
    },
};

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
    persist: {
        enabled: true,
        strategies: [
            {
                storage: eStoreStorage,
                paths: [
                    'language',
                    'version',
                    'testament',
                    'book',
                    'chapter',
                    'verses',
                ],
            },
        ],
    },
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
        setLastSearch(lastSearch?: LastSearchBibleT) {
            this.lastSearch = lastSearch;
        },
        saveSearch() {
            const { testament, book, chapter, verses } = this.$state;
            this.lastSearch = { testament, book, chapter, verses };
        },
        goToLastSearch() {
            this.$state = { ...this.$state, ...this.$state.lastSearch };
        },
    },
});
