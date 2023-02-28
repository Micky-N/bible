import { ipcRenderer } from 'electron';
import { BibleStoreT, BookT, VerseT, VersionT } from '../types/Bible';

const getInstance = (state: &BibleStoreT): BibleStoreT => {
    return {
        language: state.language,
        version: state.version,
        testament: state.testament,
        book: state.book,
        chapter: state.chapter,
        verses: state.verses,
    };
};
export const getTestaments = (state: &BibleStoreT): string[] => {
    return ipcRenderer.sendSync('testaments', getInstance(state)) as string[];
};

export const getVerses = (state: &BibleStoreT): VerseT[] => {
    return ipcRenderer.sendSync('verses', getInstance(state));
};

export const getBooks = (state: &BibleStoreT): string[] => {
    return ipcRenderer.sendSync('books', getInstance(state));
};

export const getBook = (state: &BibleStoreT): BookT => {
    return ipcRenderer.sendSync('book', getInstance(state));
};

export const getVersions = (): VersionT[] => {
    return ipcRenderer.sendSync('versions');
};

export const getVersion = (state: &BibleStoreT): VersionT => {
    return ipcRenderer.sendSync('version', getInstance(state));
};

export default {
    getTestaments,
    getBooks,
    getVerses,
    getBook,
    getVersion,
    getVersions,
};
