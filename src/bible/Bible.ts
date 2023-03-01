import path from 'node:path';
import {
    AutoCompleteT,
    BibleStoreT,
    BibleT,
    LastSearchBibleT,
    VerseT,
    VersionT,
} from '../types/Bible';

export default class Bible {
    private extension: string;
    private currentVersion: string;
    private folder: string;
    private language: string;

    constructor(
        language: string = 'fr',
        currentVersion: string = 'YifIs3pOjkCNRDJgFahinQ'
    ) {
        this.language = language;
        this.currentVersion = currentVersion;
        this.folder = path.join(__dirname, '../../src/bible', 'lib');
        this.extension = '.json';
    }

    fromState(state: BibleStoreT): Bible {
        this.language = state.language;
        this.currentVersion = state.version;
        return this;
    }

    getBible(): BibleT {
        const bible = path.resolve(
            this.folder,
            this.language,
            this.currentVersion + this.extension
        );
        return require(bible);
    }

    getTestaments(): string[] {
        return this.getBible().testaments.map((testament) => testament.value);
    }

    getTestament(idTestament: number): string {
        return this.getBible().testaments[idTestament].value;
    }

    getBooks(idTestament: number) {
        return this.getBible().testaments[idTestament].books.map(
            (book) => book.value
        );
    }

    getAllBooks() {
        const books = [];
        this.getBible().testaments.forEach((testament, idTestament) => {
            this.getBooks(idTestament).forEach((book, idBook) => {
                books.push({
                    idTestament,
                    idBook,
                    book,
                });
            });
        });
        return books;
    }

    getBook(idTestament: number, idBook: number) {
        return this.getBible().testaments[idTestament].books[idBook];
    }

    getChapter(idTestament: number, idBook: number, idChapter: number) {
        return this.getBible().testaments[idTestament].books[idBook].chapters[
            idChapter
        ];
    }

    getVerses({
        testament,
        book,
        chapter,
        verses,
    }: {
        testament: number;
        book: number;
        chapter: number;
        verses: number | string;
    }): VerseT[] {
        const allVerses =
            this.getBible().testaments[testament].books[book].chapters[chapter]
                .verses;
        if (typeof verses == 'string') {
            if (verses == '*') {
                return allVerses;
            } else {
                if (verses.includes('-')) {
                    const versesSplit = verses
                        .split('-')
                        .map((verse) => parseInt(verse));
                    return allVerses.filter((verse, index) => {
                        verse.id = index;
                        const isValid =
                            versesSplit[0] <= index && index <= versesSplit[1];
                        if (isValid) {
                            verse.id = index;
                        }
                        return isValid;
                    });
                } else {
                    const versesSplit = parseInt(verses);
                    return allVerses.filter((verse, index) => {
                        const isValid = versesSplit == index;
                        if (isValid) {
                            verse.id = index;
                        }
                        return isValid;
                    });
                }
            }
        } else if (typeof verses == 'number') {
            return allVerses.filter((verse, index) => {
                const isValid = verses == index;
                if (isValid) {
                    verse.id = index;
                }
                return isValid;
            });
        }
        return allVerses;
    }

    getVersions(): VersionT[] {
        return require(path.join(__dirname, '../../src/bible/versions.json'));
    }

    getVersion(): VersionT {
        const versions: VersionT[] = require(path.join(
            __dirname,
            '../../src/bible/versions.json'
        ));
        return versions.find((vs) => vs.guid == this.currentVersion);
    }

    getAutoCompleteBooks(searchValue: string): string[] {
        const matchedBooks: string[] = [];
        this.getBible().testaments.forEach((testament, idTestament) => {
            this.getBooks(idTestament).forEach((book) => {
                if (
                    searchValue.length >= 3 &&
                    this.matchBook(book, searchValue)
                ) {
                    matchedBooks.push(book);
                }
            });
        });
        return matchedBooks;
    }

    private matchBook(bookName: string, searchValue: string): boolean {
        const bookNormalize = bookName
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        const regexSearch = new RegExp(`^${searchValue}`, 'i');
        if (regexSearch.test(bookNormalize)) {
            return true;
        }
        return false;
    }

    search(searchText: string): LastSearchBibleT | false {
        const matches = searchText.match(
            /^(\d{0,1})\s*(\w+)\s+(\d{1,3})\s*((:{1}|\s{1})\s*(\d{1,3}(-\d{1,3}){0,1})){0,1}\s*$/
        );
        if (!matches || !matches.length) {
            return false;
        }
        if (matches.length < 7) {
            return false;
        }
        const book = matches[1] ? matches[1] + ' ' + matches[2] : matches[2];
        const chapter = matches[3];
        const verses = matches[6];
        console.log(book, chapter, verses);
        return false;
    }
}
