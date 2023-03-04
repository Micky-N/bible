import path from 'node:path';
import {
    AllBooksT,
    BibleT,
    DefaultT,
    ReferenceT,
    SearchBibleT,
    VerseT,
    VersionT,
} from '../types/Bible';

export default class Bible {
    public static readonly DB_NAME: string = 'bibleDB';
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

    fromState(state: { language: string; version: string }): Bible {
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

    getTestaments(): DefaultT[] {
        return this.getBible().testaments.map((testament) => {
            return { value: testament.value, id: testament.id };
        });
    }

    getTestament(idTestament: number): DefaultT {
        return this.getTestaments().find(
            (testament) => testament.id == idTestament
        );
    }

    getBooks(idTestament: number) {
        return this.getBible().testaments[idTestament].books.map((book) => ({
            value: book.value,
            id: book.id,
        }));
    }

    getAllBooks(): AllBooksT {
        const books = [];
        this.getBible().testaments.forEach((testament, idTestament) => {
            this.getBooks(idTestament).forEach((book) => {
                books.push({
                    idTestament,
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
                    return allVerses.filter(
                        (verse) =>
                            versesSplit[0] <= verse.id &&
                            verse.id <= versesSplit[1]
                    );
                } else {
                    const versesSplit = parseInt(verses);
                    return allVerses.filter((verse) => versesSplit == verse.id);
                }
            }
        } else if (typeof verses == 'number') {
            return allVerses.filter((verse) => verses == verse.id);
        }
        return allVerses;
    }

    getVersions(): VersionT[] {
        return require(path.resolve(this.folder, 'versions.json'));
    }

    getVersion(version: string | undefined = undefined): VersionT {
        return this.getVersions().find(
            (v) => v.guid == (version || this.currentVersion)
        );
    }

    getAutoCompleteBooks(searchValue: string): string[] {
        const matchedBooks: string[] = [];
        this.getBible().testaments.forEach((testament, idTestament) => {
            this.getBooks(idTestament).forEach((book) => {
                if (
                    searchValue.length >= 3 &&
                    this.matchBook(book.value, searchValue)
                ) {
                    matchedBooks.push(book.value);
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

    search(searchText: string): SearchBibleT | false {
        searchText = searchText
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        const matches = searchText.match(
            /^(\d{0,1})\s*(\w+)\s+(\d{1,3})\s*((:{1}|\s{1})\s*(\d{1,3}(-\d{1,3}){0,1})){0,1}\s*$/
        );

        if (!matches || !matches.length) {
            return false;
        }
        if (matches.length < 7) {
            return false;
        }
        const bookMatched = matches[1]
            ? matches[1] + ' ' + matches[2]
            : matches[2];
        const chapterMatched = parseInt(matches[3]);
        let versesMatched: string | number = '*';
        if (matches[6]) {
            versesMatched = matches[6].includes('-')
                ? matches[6]
                : parseInt(matches[6]);
        }
        const result: SearchBibleT = {
            testament: 0,
            book: 0,
            chapter: 0,
            verses: '*',
        };
        if (
            !this.isValidSearch(
                { bookMatched, chapterMatched, versesMatched },
                result
            )
        ) {
            return false;
        }

        return result;
    }

    private isValidSearch(
        { bookMatched, chapterMatched, versesMatched },
        result: SearchBibleT
    ): boolean {
        let error = false;
        error = this.findBook(bookMatched, result);
        if (error) {
            return false;
        }
        error = this.checkChapterMax(chapterMatched, result);
        if (error) {
            return false;
        }
        if (versesMatched != '*') {
            error = this.checkVersesMax(versesMatched, result);
            if (error) {
                return false;
            }
        }
        return true;
    }

    private findBook(bookName: string, result: SearchBibleT) {
        const books: AllBooksT = [];
        const allBooks = this.getAllBooks();
        allBooks.forEach((b) => {
            if (this.matchBook(b.book.value, bookName)) {
                books.push(b);
            }
        });
        if (!books.length) {
            return true;
        }
        result.testament = books[0].idTestament;
        result.book = books[0].book.id;
        return false;
    }

    private checkChapterMax(idChapter: number, result: SearchBibleT) {
        idChapter = idChapter - 1;
        const chaptersLength = this.getBook(result.testament, result.book)
            .chapters.length;
        if (idChapter < 0) {
            return false;
        }

        if (idChapter >= chaptersLength) {
            idChapter = chaptersLength - 1;
        }

        result.chapter = idChapter;

        return false;
    }

    private checkVersesMax(verses: number | string, result: SearchBibleT) {
        if (typeof verses == 'string') {
            const versesSplit = verses.split('-').map((v) => parseInt(v) - 1);
            if (versesSplit[0] >= versesSplit[1]) {
                return true;
            }

            if (versesSplit[0] < 0) {
                return true;
            }

            if (versesSplit[1] < 0) {
                return true;
            }
            const versesLength = this.getChapter(
                result.testament,
                result.book,
                result.chapter
            ).verses.length;
            if (versesSplit[0] >= versesLength) {
                versesSplit[0] = versesLength - 1;
            }

            if (versesSplit[1] >= versesLength) {
                versesSplit[1] = versesLength - 1;
            }

            if (versesSplit[0] == versesSplit[1]) {
                versesSplit.splice(1, 1);
            }

            verses = versesSplit.join('-');
        } else {
            verses = verses - 1;
            if (verses < 0) {
                return false;
            }

            const versesLength = this.getChapter(
                result.testament,
                result.book,
                result.chapter
            ).verses.length;

            if (verses >= versesLength) {
                verses = versesLength - 1;
            }
        }
        result.verses = verses;
        return false;
    }

    getAllVersionsVerse({
        testament,
        book,
        chapter,
        verses,
    }: {
        testament: number;
        book: number;
        chapter: number;
        verses: number;
    }): {
        [version_guid: string]: VerseT & { version_guid: string };
    } {
        const versions = this.getVersions().filter(
            (version) => version.guid != this.currentVersion
        );
        const versionsVerse = {};
        versions.forEach((version) => {
            const bibleInstance = this.fromState({
                language: this.language,
                version: version.guid,
            });
            const foundedVerses = bibleInstance.getVerses({
                testament,
                book,
                chapter,
                verses,
            });
            if (foundedVerses.length) {
                const verseToAdd = foundedVerses[0] as VerseT & {
                    version_description: string;
                };
                verseToAdd.version_description = version.description;
                versionsVerse[version.guid] = verseToAdd;
            }
        });
        return versionsVerse;
    }

    getReferences(verse: string): Array<ReferenceT> {
        const references = require(path.resolve(
            this.folder,
            'references.json'
        ));
        if (!references[verse] || !references[verse].length) {
            return [];
        }

        return references[verse].map((ref: string) => {
            const refPart = ref
                .split('.')
                .map((r) => (!isNaN(r) ? parseInt(r) : r));
            const bookName = this.getBook(
                refPart[0] as number,
                refPart[1] as number
            ).value;
            let verseVal = refPart[3];
            if (typeof verseVal == 'string' && verseVal.includes('-')) {
                verseVal = verseVal
                    .split('-')
                    .map((v) => parseInt(v) + 1)
                    .join('-');
            } else {
                verseVal = (verseVal as number) + 1;
            }
            return {
                value: `${bookName} ${(refPart[2] as number) + 1}: ${verseVal}`,
                verses: this.getVerses({
                    testament: refPart[0] as number,
                    book: refPart[1] as number,
                    chapter: refPart[2] as number,
                    verses: refPart[3],
                }),
                testament: refPart[0] as number,
                book: refPart[1] as number,
                chapter: refPart[2] as number,
                verse: refPart[3],
            };
        });
    }
}
