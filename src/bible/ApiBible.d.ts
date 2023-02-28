import {
    AutoCompleteBookT,
    BibleStoreT,
    BookT,
    VerseT,
    VersionT,
} from '../types/Bible';

declare function getInstance(state: BibleStoreT): BibleStoreT;

export declare function getTestaments(state: BibleStoreT): string[];

export declare function getVerses(state: BibleStoreT): VerseT[];

export declare function getChapter(
    state: BibleStoreT,
    idTestament: number,
    idBook: number,
    idChapter: number
): string[];

export declare function getBooks(state: BibleStoreT): string[];

export declare function getAllBooks(state: BibleStoreT): [];

export declare function getBook(state: BibleStoreT): BookT;

export declare function getVersions(): VersionT[];

export declare function getVersion(state: BibleStoreT): VersionT;

export declare function autoCompleteBooks(
    state: BibleStoreT,
    searchValue: string
): AutoCompleteBookT[];
