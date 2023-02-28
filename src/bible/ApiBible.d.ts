import { BibleStoreT, BookT, VerseT, VersionT } from '../types/Bible';

export declare function getTestaments(state: BibleStoreT): string[];

export declare function getVerses(state: BibleStoreT): VerseT[];

export declare function getBooks(state: BibleStoreT): string[];

export declare function getBook(state: BibleStoreT): BookT;

export declare function getVersions(): VersionT[];

export declare function getVersion(state: BibleStoreT): VersionT;
