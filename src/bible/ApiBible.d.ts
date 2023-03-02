import {
    AutoCompleteBookT,
    BibleStoreT,
    BookT,
    ChapterT,
    LastSearchBibleT,
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
): ChapterT;

export declare function getBooks(state: BibleStoreT): string[];

export declare function getAllBooks(state: BibleStoreT): [];

export declare function getBook(state: BibleStoreT): BookT;

export declare function getVersions(): VersionT[];

export declare function getVersion(state: BibleStoreT): VersionT;

export declare function autoCompleteBooks(
    state: BibleStoreT,
    searchValue: string
): AutoCompleteBookT[];

export declare function search(
    state: BibleStoreT,
    searchText: string
): LastSearchBibleT | false;

export declare function getAllVersionsVerse(state: BibleStoreT): {
    [key: string]: VerseT & { version_description: string };
};
