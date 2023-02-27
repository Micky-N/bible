import { defineStore } from 'pinia';

interface IBibleStore {
    currentVersion: string;
    versions:
        | [
              {
                  title: string;
                  version: string;
              }
          ]
        | [];
    bible: IBible | {};
}

export const useBibleStore = defineStore('bibleStore', {
    state: (): IBibleStore => ({
        currentVersion: '',
        versions: [],
        bible: {},
    }),
});
