import { ipcRenderer } from 'electron';
import {
    BibleStoreT,
    BookT,
    ChapterT,
    DefaultT,
    LastSearchBibleT,
    VerseT,
    VersionT,
} from '../types/Bible';

const getInstance = (state: BibleStoreT): BibleStoreT => {
    return {
        language: state.language,
        version: state.version,
        testament: state.testament,
        book: state.book,
        chapter: state.chapter,
        verses: state.verses,
    };
};
export const getTestaments = (state: BibleStoreT): DefaultT[] => {
    return ipcRenderer.sendSync('testaments', getInstance(state));
};

export const getVerses = (state: BibleStoreT): VerseT[] => {
    return ipcRenderer.sendSync('verses', getInstance(state));
};

export const getChapter = (
    state: BibleStoreT,
    idTestament: number,
    idBook: number,
    idChapter: number
): ChapterT => {
    return ipcRenderer.sendSync(
        'chapter',
        getInstance(state),
        idTestament,
        idBook,
        idChapter
    );
};

export const getAllBooks = (
    state: BibleStoreT
): { idTestament: number; book: DefaultT }[] => {
    return ipcRenderer.sendSync('allBooks', getInstance(state));
};

export const getBooks = (
    state: BibleStoreT
): { value: string; id: number }[] => {
    return ipcRenderer.sendSync('books', getInstance(state));
};

export const getBook = (state: BibleStoreT): BookT => {
    return ipcRenderer.sendSync('book', getInstance(state));
};

export const getVersions = (): VersionT[] => {
    return ipcRenderer.sendSync('versions');
};

export const getVersion = (state: BibleStoreT): VersionT => {
    return ipcRenderer.sendSync('version', getInstance(state));
};

export const autoCompleteBooks = (state: BibleStoreT, searchValue: string) => {
    return ipcRenderer.sendSync(
        'autoCompleteBooks',
        getInstance(state),
        searchValue
    );
};

export const search = (
    state: BibleStoreT,
    searchText: string
): LastSearchBibleT | false => {
    return ipcRenderer.sendSync('search', getInstance(state), searchText);
};

export const getAllVersionsVerse = (
    state: BibleStoreT
): { [version_guid: string]: VerseT & { version_description: string } } => {
    return ipcRenderer.sendSync('allVersionsVerse', getInstance(state));
};

export const setState = (key: string, state: string): boolean => {
    return ipcRenderer.sendSync('electronStoreSet', key, state);
};

export const getState = (key: string): string | false => {
    return ipcRenderer.sendSync('electronStoreGet', key);
};

export default {
    getTestaments,
    getBooks,
    getAllBooks,
    getVerses,
    getChapter,
    getBook,
    getVersion,
    getVersions,
    autoCompleteBooks,
    search,
    getAllVersionsVerse,
    setState,
    getState,
};
