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

export type BibleStoreT = {
    language: string;
    version: string;
    testament: number;
    book: number;
    chapter: number;
    verses: number | string;
};

export type ApiBibleT {
    getTestaments: function;
    getVerses: function;
    getBooks: function;
    getBook: function;
    getVersions: function;
    getVersion: function;
}