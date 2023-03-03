import ApiBible from '../bible/ApiBible';
export type DefaultT = { value: string; id: number };

export type BibleT = {
    testaments: TestamentT[];
};

export type BookT = DefaultT & {
    chapters: ChapterT[];
};

export type ChapterT = {
    verses: VerseT[];
    id: number;
};

export type TestamentT = DefaultT & {
    books: BookT[];
};

export type VerseT = DefaultT;

export type VersionT = {
    abbreviation: string;
    language: string;
    description: string;
    guid: string;
};

export type BibleStoreT = SearchBibleT & {
    language: string;
    version: string;
    lastSearchTime?: number;
};

export type SearchBibleT = {
    testament: number;
    book: number;
    chapter: number;
    verses: number | string;
};

export type ApiBibleT = typeof ApiBible;

export type AutoCompleteT = {
    id: number | string;
    value: string;
};

export type AllBooksT = Array<{
    idTestament: number;
    book: { value: string; id: number };
}>;
