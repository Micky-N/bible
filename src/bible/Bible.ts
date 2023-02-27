import path from 'node:path';

export default class Bible {
    private extension: string;
    private currentVersion: string;
    private folder: string;
    private language: string;

    constructor() {
        this.language = 'fr';
        this.currentVersion = 'YifIs3pOjkCNRDJgFahinQ';
        this.folder = path.join(__dirname, '../../src/bible', 'lib');
        this.extension = '.json';
    }

    getBible(): IBible {
        const bible = path.resolve(
            this.folder,
            this.language,
            this.getVersion()
        );
        return require(bible);
    }

    getBook({testament, book}: {testament: number, book: number}) {
        return this.getBible().testaments[testament].books[book]
    }

    getVerses({testament, book, verses}: {testament: number, book: number, verses: number|string}) {
        return this.getBible().testaments[testament].books[book]
    }

    getVersion(): string {
        return this.currentVersion + this.extension;
    }
}
