import ApiBible from '../bible/ApiBible';
export type BibleT = {
    testaments: TestamentT[];
};

export type BookT = {
    value: string;
    chapters: ChapterT[];
};

export type ChapterT = {
    verses: VerseT[];
};

export type TestamentT = {
    value: string;
    books: BookT[];
};

export type VerseT = {
    value: string;
    id?: number;
};

export type VersionT = {
    abbreviation: string;
    language: string;
    description: string;
    guid: string;
};

export type BibleStoreT = LastSearchBibleT & {
    language: string;
    version: string;
    lastSearch?: LastSearchBibleT;
};

export type LastSearchBibleT = {
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
    idBook: number;
    book: string;
}>;
