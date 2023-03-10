import { defineStore } from 'pinia';
import { BibleStoreT, SearchBibleT } from '../types/Bible';
import ApiBible from '../bible/ApiBible';
import { DateTime } from 'luxon';

const eStoreStorage: Storage = {
    length: 1,
    setItem(key: string, state: string): boolean {
        return ApiBible.setState(key, state);
    },
    getItem(key: string): string {
        return ApiBible.getState(key) || '';
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
        lastSearchTime: undefined,
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
        setLastSearchTime(lastSearchTime?: string) {
            this.lastSearchTime =
                lastSearchTime || DateTime.now().toMillis().toString();
        },
        setSearchData(searchData: SearchBibleT) {
            this.$state = { ...this.$state, ...searchData };
        },
        resetLastSearchTime() {
            this.lastSearchTime = undefined;
        },
    },
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
                    'lastSearchTime',
                ],
            },
        ],
    },
});
