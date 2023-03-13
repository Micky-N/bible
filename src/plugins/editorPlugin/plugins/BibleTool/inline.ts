import ApiBible from '../../../../bible/ApiBible';
import { BookT, SearchBibleT } from '../../../../types/Bible';
import './index.css';
export default class BibleToolInline {
    static get isInline() {
        return true;
    }

    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;

        this.button.classList.toggle(
            this.api.styles.inlineToolButtonActive,
            state
        );
    }

    constructor({ api }) {
        this.api = api;
        this.button = null;
        this._state = false;

        this.tag = 'SPAN';
        this.class = 'cdx-marker';
    }

    render() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.innerHTML =
            '<svg width="20" height="18"><path d="M10.458 12.04l2.919 1.686-.781 1.417-.984-.03-.974 1.687H8.674l1.49-2.583-.508-.775.802-1.401zm.546-.952l3.624-6.327a1.597 1.597 0 0 1 2.182-.59 1.632 1.632 0 0 1 .615 2.201l-3.519 6.391-2.902-1.675zm-7.73 3.467h3.465a1.123 1.123 0 1 1 0 2.247H3.273a1.123 1.123 0 1 1 0-2.247z"/></svg>';
        this.button.classList.add(this.api.styles.inlineToolButton);

        return this.button;
    }

    surround(range) {
        if (this.state) {
            this.unwrap(range);
            return;
        }

        this.wrap(range);
    }

    wrap(range) {
        const selectedText = range.extractContents();
        const mark = document.createElement(this.tag);

        mark.classList.add(this.class);
        mark.appendChild(selectedText);
        range.insertNode(mark);

        this.api.selection.expandToTag(mark);
    }

    unwrap(range) {
        const mark = this.api.selection.findParentTag(this.tag, this.class);
        const text = range.extractContents();

        mark.remove();

        range.insertNode(text);
    }

    checkState() {
        const mark = this.api.selection.findParentTag(this.tag);

        this.state = !!mark;
    }
}

// button: HTMLButtonElement;
//     state: boolean;

//     public static isInline = true;

//     public static title: string = 'Bible Reference';

//     constructor() {
//         this.button = document.createElement('button');
//         this.button.classList.value = 'ce-inline-tool';
//         this.button.innerHTML =
//             '<svg width="17" height="15" viewBox="0 0 64 64" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><polyline points="50.83 18.04 55.47 18.04 55.47 51.97 8.53 51.97 8.53 18.04 13.05 18.04" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/><path d="M49.83,47V12c-13.57.44-17.89,6-17.89,6s-5.44-6.23-17.88-6V47a44.38,44.38,0,0,1,17.88,5S41.8,47.33,49.83,47Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><line x1="31.94" y1="18.04" x2="31.94" y2="51.97" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/></svg>';
//         this.state = false;
//     }

//     render() {
//         return this.button;
//     }

//     surround(range: Range) {
//         const selectedText = range.extractContents();
//         if (this.state) {
//             const parent = range.commonAncestorContainer.parentElement;
//             if (parent) {
//                 parent.remove();
//             }
//         }

//         const reference = document.createElement('reference');
//         if (selectedText.textContent) {
//             reference.setAttribute('value', '{test: "test"}');
//         }
//         reference.appendChild(selectedText);
//         range.insertNode(reference);

//         const state = ApiBible.getState('bibleStore');
//         if (state) {
//             const stateJson = JSON.parse(state);
//             const ref = ApiBible.search(
//                 stateJson,
//                 reference.getAttribute('value')!
//             );
//             if (ref) {
//                 const verses = ApiBible.getVerses({ ...stateJson, ...ref });
//                 const book = ApiBible.getBook({ ...stateJson, ...ref });
//                 const button = document.createElement('span');
//                 button.innerHTML = this.button.innerHTML;
//                 reference.appendChild(button);

//                 const versesContainer = document.createElement('div');
//                 versesContainer.setAttribute('contenteditable', 'false');
//                 versesContainer.classList.add('tooltip');
//                 const versesTitle = document.createElement('h3');
//                 versesTitle.innerText = this.setTitle(book, ref);
//                 selectedText.textContent = versesTitle.innerText;
//                 reference.appendChild(selectedText);
//                 const versesP = document.createElement('p');
//                 verses.forEach((verse) => {
//                     const span = document.createElement('span');
//                     const sup = document.createElement('sup');
//                     sup.innerText = (verse.id + 1).toString();
//                     sup.dataset.idVerse = verse.id;
//                     span.appendChild(sup);
//                     span.innerHTML += verse.value + ' ';
//                     versesP.appendChild(span);
//                 });
//                 const versesPointer = document.createElement('i');
//                 versesContainer.appendChild(versesTitle);
//                 versesContainer.appendChild(versesP);
//                 versesContainer.appendChild(versesPointer);
//                 reference.appendChild(versesContainer);

//                 range.insertNode(reference);
//             } else {
//                 range.insertNode(
//                     document.createTextNode(selectedText.textContent!)
//                 );
//             }
//         } else {
//             range.insertNode(range.extractContents());
//         }
//     }

//     checkState(selection: Selection) {
//         const text = selection.anchorNode;
//         if (!text) {
//             return;
//         }

//         const anchorElement =
//             text instanceof Element ? text : text.parentElement;

//         this.state = !!anchorElement?.closest('reference');
//     }

//     setTitle(book: BookT, reference: SearchBibleT) {
//         const { verses, chapter } = reference;
//         const versesText =
//             verses == '*'
//                 ? false
//                 : verses
//                       .toString()
//                       .split('-')
//                       .map((v) => parseInt(v) + 1)
//                       .join('-');
//         return `${book.value} ${chapter + 1}${
//             versesText ? ': ' + versesText : ''
//         }`;
//     }

//     createToolBox() {}
