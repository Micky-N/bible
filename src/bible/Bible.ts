import path from 'node:path';
import { BibleStoreT, BibleT, VerseT, VersionT } from '../types/Bible';

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
}
