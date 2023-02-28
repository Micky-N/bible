import { ipcRenderer } from 'electron';
import { BibleStoreT, BibleT, BookT, VerseT, VersionT } from '../types/Bible';

export const getTestaments = (state: BibleStoreT): string[] => {
    return ipcRenderer.sendSync('testaments', state) as string[];
};

export const getVerse = (state: BibleStoreT): VerseT[] => {
    return ipcRenderer.sendSync('verses', state);
};

export const getBooks = (state: BibleStoreT): string[] => {
    return ipcRenderer.sendSync('books', state);
};

export const getBook = (state: BibleStoreT): BookT => {
    return ipcRenderer.sendSync('book', state);
};

export const getVersions = (): VersionT[] => {
    return ipcRenderer.sendSync('versions');
};

export const getVersion = (version: string): VersionT => {
    return ipcRenderer.sendSync('version', version);
};

export default {
    getTestaments,
    getBooks,
    getVerse,
    getBook,
    getVersion,
    getVersions,
};
