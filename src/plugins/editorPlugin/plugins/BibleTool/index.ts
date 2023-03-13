import { BlockToolData, OutputBlockData } from '@editorjs/editorjs';
import ApiBible from '../../../../bible/ApiBible';
import { BibleStoreT, SearchBibleT, VerseT } from '../../../../types/Bible';

type BibleToolData = {
    reference: SearchBibleT | false;
    verses: VerseT[];
};

export default class BibleTool {
    data: BibleToolData;
    wrapper: HTMLElement;
    readOnly: boolean;
    static get toolbox() {
        return {
            title: 'Bible Verses',
            icon: '<svg width="17" height="15" viewBox="0 0 64 64" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><polyline points="50.83 18.04 55.47 18.04 55.47 51.97 8.53 51.97 8.53 18.04 13.05 18.04" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><path d="M49.83,47V12c-13.57.44-17.89,6-17.89,6s-5.44-6.23-17.88-6V47a44.38,44.38,0,0,1,17.88,5S41.8,47.33,49.83,47Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><line x1="31.94" y1="18.04" x2="31.94" y2="51.97" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/></svg>',
        };
    }

    static get isReadOnlySupported(): boolean {
        return true;
    }

    constructor({
        data,
        readOnly,
    }: {
        data: BibleToolData;
        readOnly: boolean;
    }) {
        this.readOnly = readOnly;
        this.data = {
            verses: data.verses || [],
            reference: data.reference || false,
        };

        this.wrapper = document.createElement('div');
        const input = document.createElement('input');

        this.wrapper.appendChild(input);

        input.placeholder = 'Set verses...';

        input.addEventListener('input', (event: Event) => {
            this.removeList();
            const target = event.target as HTMLInputElement | null;
            const state = ApiBible.getState('bibleStore');
            if (target && state) {
                const stateJson = JSON.parse(state) as BibleStoreT;
                if (target.value.length >= 3) {
                    const books = ApiBible.autoCompleteBooks(
                        stateJson,
                        target.value
                    );
                    if (books.length) {
                        const ul = document.createElement('ul');
                        books.forEach((book) => {
                            const li = document.createElement('li');
                            li.innerHTML = book;
                            ul.appendChild(li);
                            li.addEventListener('click', (event: Event) => {
                                const currentLi =
                                    event.target as HTMLInputElement | null;
                                if (currentLi) {
                                    target.value = currentLi.innerText;
                                    ul.remove();
                                    target.focus();
                                }
                            });
                        });
                        that.wrapper.appendChild(ul);
                    }
                }
            }
        });
        const that = this;
        input.addEventListener('keypress', function (event) {
            const target = event.target as HTMLInputElement | null;
            const state = ApiBible.getState('bibleStore');
            if (target && state) {
                const stateJson = JSON.parse(state) as BibleStoreT;
                if (event.key === 'Enter') {
                    event.preventDefault();
                    that.data.reference = ApiBible.search(
                        stateJson,
                        target.value
                    );
                    that.data.verses = ApiBible.getVerses({
                        ...stateJson,
                        ...that.data.reference,
                    });
                    that.showVerses();
                }
            }
        });
    }

    render() {
        return this.showVerses();
    }

    save() {
        return this.data;
    }

    validate(savedData: BibleToolData) {
        if (!savedData.reference || !savedData.verses.length) {
            return false;
        }

        return true;
    }

    showVerses() {
        if (this.data.verses.length) {
            this.setTitle();
            const p = document.createElement('p');
            this.data.verses.forEach((verse) => {
                const span = document.createElement('span');
                const sup = document.createElement('sup');
                sup.innerText = (verse.id + 1).toString();
                sup.dataset.idVerse = verse.id;
                span.appendChild(sup);
                span.innerHTML += verse.value + ' ';
                p.appendChild(span);
            });
            this.wrapper.appendChild(p);
            document.querySelectorAll('[data-id-verse]').forEach((verseSup) => {
                verseSup.addEventListener('click', (event: Event) => {
                    const target = event.target as HTMLElement | null;
                    if (target) {
                        console.log(target.dataset.idVerse);
                    }
                });
            });
            this.removeInput();
        }
        return this.wrapper;
    }

    removeInput() {
        for (const [k, item] of Object.entries(this.wrapper.children)) {
            if (['INPUT', 'UL'].includes(item.nodeName)) {
                item.remove();
            }
        }
    }

    removeList() {
        for (const [k, item] of Object.entries(this.wrapper.children)) {
            if (item.nodeName == 'UL') {
                item.remove();
            }
        }
    }

    setTitle() {
        const a = document.createElement('span');
        const state = ApiBible.getState('bibleStore');
        if (state) {
            const stateJson = JSON.parse(state) as BibleStoreT;
            const book = ApiBible.getBook({
                ...stateJson,
                ...this.data.reference,
            });
            const { chapter, verses } = this.data.reference as SearchBibleT;
            const versesText = verses
                .toString()
                .split('-')
                .map((v) => parseInt(v) + 1)
                .join('-');
            a.innerText = `${book.value} ${chapter + 1}: ${versesText}`;
            this.wrapper.appendChild(a);
        }
    }
}
