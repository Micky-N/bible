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

    getBible() {
        const bible = path.resolve(
            this.folder,
            this.language,
            this.getVersion()
        );
        return require(bible);
    }

    getVersion(): string {
        return this.currentVersion + this.extension;
    }
}
