type LinkToolData = {
    link: string;
    meta: MetaData;
};

type MetaData = {
    image: {
        url?: string;
    };
    site_name?: string;
    title?: string;
    description?: string;
};

import './index.css';
const urlMetadata = require('url-metadata');
import { IconLink } from '@codexteam/icons';

export default class LinkTool {
    private api: { [key: string]: any };
    private readOnly: boolean;
    private nodes: { [key: string]: any };
    private _data: LinkToolData;

    static get isReadOnlySupported(): boolean {
        return true;
    }

    static get toolbox(): { icon: string; title: string } {
        return {
            icon: IconLink,
            title: 'Link',
        };
    }

    static get enableLineBreaks(): boolean {
        return true;
    }

    constructor({
        data,
        api,
        readOnly,
    }: {
        data: LinkToolData;
        api: object;
        readOnly: boolean;
    }) {
        this.api = api;
        this.readOnly = readOnly;

        this.nodes = {
            wrapper: null,
            container: null,
            progress: null,
            input: null,
            inputHolder: null,
            linkContent: null,
            linkImage: null,
            linkTitle: null,
            linkDescription: null,
            linkText: null,
        };

        this._data = {
            link: '',
            meta: {},
        } as LinkToolData & { meta: {} };

        this.data = data;
    }

    render(): HTMLDivElement {
        this.nodes.wrapper = this.make('div', this.CSS.baseClass);
        this.nodes.container = this.make('div', this.CSS.container);

        this.nodes.inputHolder = this.makeInputHolder();
        this.nodes.linkContent = this.prepareLinkPreview();

        /**
         * If Tool already has data, render link preview, otherwise insert input
         */
        if (Object.keys(this.data.meta).length) {
            this.nodes.container.appendChild(this.nodes.linkContent);
            this.showLinkPreview(this.data.meta);
        } else {
            this.nodes.container.appendChild(this.nodes.inputHolder);
        }

        this.nodes.wrapper.appendChild(this.nodes.container);

        return this.nodes.wrapper;
    }

    save(): LinkToolData {
        return this.data;
    }

    validate(): boolean {
        return this.data.link.trim() !== '';
    }

    set data(data: LinkToolData) {
        this._data = Object.assign(
            {},
            {
                link: data.link || this._data.link,
                meta: data.meta || this._data.meta,
            }
        );
    }

    get data(): LinkToolData {
        return this._data;
    }

    get CSS(): { [key: string]: any } {
        return {
            baseClass: this.api.styles.block,
            input: this.api.styles.input,

            /**
             * Tool's classes
             */
            container: 'link-tool',
            inputEl: 'link-tool__input',
            inputHolder: 'link-tool__input-holder',
            inputError: 'link-tool__input-holder--error',
            linkContent: 'link-tool__content',
            linkContentRendered: 'link-tool__content--rendered',
            linkImage: 'link-tool__image',
            linkTitle: 'link-tool__title',
            linkDescription: 'link-tool__description',
            linkText: 'link-tool__anchor',
            progress: 'link-tool__progress',
            progressLoading: 'link-tool__progress--loading',
            progressLoaded: 'link-tool__progress--loaded',
        };
    }

    makeInputHolder(): HTMLElement {
        const inputHolder = this.make('div', this.CSS.inputHolder);

        this.nodes.progress = this.make('label', this.CSS.progress);
        this.nodes.input = this.make(
            'div',
            [this.CSS.input, this.CSS.inputEl],
            {
                contentEditable: !this.readOnly,
            }
        );

        this.nodes.input.dataset.placeholder = this.api.i18n.t('Link');

        if (!this.readOnly) {
            this.nodes.input.addEventListener(
                'paste',
                (event: ClipboardEvent) => {
                    this.startFetching(event);
                }
            );

            this.nodes.input.addEventListener(
                'keydown',
                (event: KeyboardEvent) => {
                    const [ENTER, A] = [13, 65];
                    const cmdPressed = event.ctrlKey || event.metaKey;

                    switch (event.keyCode) {
                        case ENTER:
                            event.preventDefault();
                            event.stopPropagation();

                            this.startFetching(event);
                            break;
                        case A:
                            if (cmdPressed) {
                                this.selectLinkUrl(event);
                            }
                            break;
                    }
                }
            );
        }

        inputHolder.appendChild(this.nodes.progress);
        inputHolder.appendChild(this.nodes.input);

        return inputHolder;
    }

    startFetching(event: ClipboardEvent | KeyboardEvent) {
        let url = this.nodes.input.textContent;

        if (event.type === 'paste') {
            event = event as ClipboardEvent;
            const wd = window as Window &
                typeof globalThis & { clipboardData: DataTransfer };
            url = (event.clipboardData || wd.clipboardData).getData('text');
        }

        this.removeErrorStyle();
        this.fetchLinkData(url);
    }

    /**
     * If previous link data fetching failed, remove error styles
     */
    removeErrorStyle() {
        this.nodes.inputHolder.classList.remove(this.CSS.inputError);
        this.nodes.inputHolder.insertBefore(
            this.nodes.progress,
            this.nodes.input
        );
    }

    selectLinkUrl(event: KeyboardEvent) {
        event.preventDefault();
        event.stopPropagation();

        const selection = window.getSelection() as Selection;
        const range = new Range();

        const currentNode = selection.anchorNode?.parentNode as ParentNode &
            Element;
        const currentItem = currentNode.closest(
            `.${this.CSS.inputHolder}`
        ) as Element;
        const inputElement = currentItem.querySelector(
            `.${this.CSS.inputEl}`
        ) as Element;

        range.selectNodeContents(inputElement);

        selection.removeAllRanges();
        selection.addRange(range);
    }

    prepareLinkPreview(): HTMLElement {
        const holder = this.make('a', this.CSS.linkContent, {
            target: '_blank',
            rel: 'nofollow noindex noreferrer',
        });

        this.nodes.linkImage = this.make('div', this.CSS.linkImage);
        this.nodes.linkTitle = this.make('div', this.CSS.linkTitle);
        this.nodes.linkDescription = this.make('p', this.CSS.linkDescription);
        this.nodes.linkText = this.make('span', this.CSS.linkText);

        return holder;
    }

    showLinkPreview({ image, title, description }: MetaData) {
        this.nodes.container.appendChild(this.nodes.linkContent);

        if (image && image.url) {
            this.nodes.linkImage.style.backgroundImage =
                'url(' + image.url + ')';
            this.nodes.linkContent.appendChild(this.nodes.linkImage);
        }

        if (title) {
            this.nodes.linkTitle.textContent = title;
            this.nodes.linkContent.appendChild(this.nodes.linkTitle);
        }

        if (description) {
            this.nodes.linkDescription.textContent = description;
            this.nodes.linkContent.appendChild(this.nodes.linkDescription);
        }

        this.nodes.linkContent.classList.add(this.CSS.linkContentRendered);
        this.nodes.linkContent.setAttribute('href', this.data.link);
        this.nodes.linkContent.appendChild(this.nodes.linkText);

        try {
            this.nodes.linkText.textContent = new URL(this.data.link).hostname;
        } catch (e) {
            this.nodes.linkText.textContent = this.data.link;
        }
    }

    /**
     * Show loading progress bar
     */
    showProgress() {
        this.nodes.progress.classList.add(this.CSS.progressLoading);
    }

    /**
     * Hide loading progress bar
     *
     * @returns {Promise<void>}
     */
    hideProgress() {
        return new Promise((resolve) => {
            this.nodes.progress.classList.remove(this.CSS.progressLoading);
            this.nodes.progress.classList.add(this.CSS.progressLoaded);

            setTimeout(resolve, 500);
        });
    }

    /**
     * If data fetching failed, set input error style
     */
    applyErrorStyle() {
        this.nodes.inputHolder.classList.add(this.CSS.inputError);
        this.nodes.progress.remove();
    }

    async fetchLinkData(url: string) {
        this.showProgress();
        try {
            const response = await urlMetadata(url);

            this.onFetch(response);
        } catch (error) {
            this.fetchingFailed(
                this.api.i18n.t("Couldn't fetch the link data")
            );
        }
    }

    onFetch(response: { [key: string]: string }) {
        if (!response) {
            this.fetchingFailed(
                this.api.i18n.t(
                    "Couldn't get this link data, try the other one"
                )
            );

            return;
        }

        const metaData: MetaData = {
            title: response['og:title'] || response.title || undefined,
            site_name: response['og:site_name'] || response.source || undefined,
            description:
                response['og:description'] || response.description || undefined,
            image: {
                url: response['og:image'] || response.image || undefined,
            },
        };

        const link = response.url || this.data.link;

        this.data = {
            meta: metaData,
            link,
        };

        if (!metaData) {
            this.fetchingFailed(
                this.api.i18n.t('Wrong response format from the server')
            );
            return;
        }

        this.hideProgress().then(() => {
            this.nodes.inputHolder.remove();
            this.showLinkPreview(metaData);
        });
    }

    fetchingFailed(errorMessage: string) {
        this.api.notifier.show({
            message: errorMessage,
            style: 'error',
        });

        this.applyErrorStyle();
    }

    make(
        tagName: string,
        classNames: string | string[] | null = null,
        attributes: { [key: string]: any } = {}
    ): HTMLElement {
        const el = document.createElement(tagName) as HTMLElement & {
            [key: string]: any;
        };

        if (Array.isArray(classNames)) {
            el.classList.add(...classNames);
        } else if (classNames) {
            el.classList.add(classNames);
        }

        for (const attrName in attributes) {
            el[attrName] = attributes[attrName];
        }

        return el;
    }
}
