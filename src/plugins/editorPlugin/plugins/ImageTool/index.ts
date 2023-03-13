import './index.css';

import Ui from './ui';
import Uploader, { ImageConfig, ImageToolData } from './uploader';

import {
    IconAddBorder,
    IconStretch,
    IconAddBackground,
    IconPicture,
} from '@codexteam/icons';

export default class ImageTool {
    api: object;
    readOnly: boolean;
    config: {
        endpoints: { byFile: string; byUrl: string };
        additionalRequestData: object;
        additionalRequestHeaders: object;
        field: string;
        types: string;
        captionPlaceholder: any;
        buttonContent: string;
        uploader:
            | {
                  uploadByFile?:
                      | ((
                            arg: File
                        ) => Promise<import('./uploader').UploadResponseFormat>)
                      | undefined;
                  uploadByUrl?:
                      | ((
                            arg: string
                        ) => Promise<import('./uploader').UploadResponseFormat>)
                      | undefined;
                  /**
                   * Available image tools
                   *
                   * @returns {Array}
                   */
              }
            | undefined;
        actions: any;
    };
    uploader: Uploader;
    ui: Ui;
    _data: {};
    /**
     * Notify core that read-only mode is supported
     *
     * @returns {boolean}
     */
    static get isReadOnlySupported() {
        return true;
    }

    /**
     * Get Tool toolbox settings
     * icon - Tool icon's SVG
     * title - title to show in toolbox
     *
     * @returns {{icon: string, title: string}}
     */
    static get toolbox() {
        return {
            icon: IconPicture,
            title: 'Image',
        };
    }

    /**
     * Available image tools
     *
     * @returns {Array}
     */
    static get tunes() {
        return [
            {
                name: 'withBorder',
                icon: IconAddBorder,
                title: 'With border',
                toggle: true,
            },
            {
                name: 'stretched',
                icon: IconStretch,
                title: 'Stretch image',
                toggle: true,
            },
            {
                name: 'withBackground',
                icon: IconAddBackground,
                title: 'With background',
                toggle: true,
            },
        ];
    }

    /**
     * @param {object} tool - tool properties got from editor.js
     * @param {ImageToolData} tool.data - previously saved data
     * @param {ImageConfig} tool.config - user config for Tool
     * @param {object} tool.api - Editor.js API
     * @param {boolean} tool.readOnly - read-only mode flag
     */
    constructor({
        data,
        config,
        api,
        readOnly,
    }: {
        data: ImageToolData;
        config: ImageConfig;
        api: object;
        readOnly: boolean;
    }) {
        this.api = api;
        this.readOnly = readOnly;

        /**
         * Tool's initial config
         */
        this.config = {
            endpoints: config.endpoints || '',
            additionalRequestData: config.additionalRequestData || {},
            additionalRequestHeaders: config.additionalRequestHeaders || {},
            field: config.field || 'image',
            types: config.types || 'image/*',
            captionPlaceholder: this.api.i18n.t(
                config.captionPlaceholder || 'Caption'
            ),
            buttonContent: config.buttonContent || '',
            uploader: config.uploader || undefined,
            actions: config.actions || [],
        };

        /**
         * Module for file uploading
         */
        this.uploader = new Uploader({
            config: this.config,
            onUpload: (response: any) => this.onUpload(response),
            onError: (error: any) => this.uploadingFailed(error),
        });

        /**
         * Module for working with UI
         */
        this.ui = new Ui({
            api,
            config: this.config,
            onSelectFile: () => {
                this.uploader.uploadSelectedFile({
                    onPreview: (src) => {
                        this.ui.showPreloader(src);
                    },
                });
            },
            readOnly,
        });

        /**
         * Set saved state
         */
        this._data = {};
        this.data = data;
    }

    /**
     * Renders Block content
     *
     * @public
     *
     * @returns {HTMLDivElement}
     */
    render() {
        return this.ui.render(this.data);
    }

    /**
     * Validate data: check if Image exists
     *
     * @param {ImageToolData} savedData — data received after saving
     * @returns {boolean} false if saved data is not correct, otherwise true
     * @public
     */
    validate(savedData) {
        return savedData.file && savedData.file.url;
    }

    /**
     * Return Block data
     *
     * @public
     *
     * @returns {ImageToolData}
     */
    save() {
        const caption = this.ui.nodes.caption;

        this._data.caption = caption.innerHTML;

        return this.data;
    }

    /**
     * Returns configuration for block tunes: add background, add border, stretch image
     *
     * @public
     *
     * @returns {Array}
     */
    renderSettings() {
        // Merge default tunes with the ones that might be added by user
        // @see https://github.com/editor-js/image/pull/49
        const tunes = ImageTool.tunes.concat(this.config.actions);

        return tunes.map((tune) => ({
            icon: tune.icon,
            label: this.api.i18n.t(tune.title),
            name: tune.name,
            toggle: tune.toggle,
            isActive: this.data[tune.name],
            onActivate: () => {
                /* If it'a user defined tune, execute it's callback stored in action property */
                if (typeof tune.action === 'function') {
                    tune.action(tune.name);

                    return;
                }
                this.tuneToggled(tune.name);
            },
        }));
    }

    /**
     * Fires after clicks on the Toolbox Image Icon
     * Initiates click on the Select File button
     *
     * @public
     */
    appendCallback() {
        this.ui.nodes.fileButton.click();
    }

    /**
     * Specify paste substitutes
     *
     * @see {@link https://github.com/codex-team/editor.js/blob/master/docs/tools.md#paste-handling}
     * @returns {{tags: string[], patterns: object<string, RegExp>, files: {extensions: string[], mimeTypes: string[]}}}
     */
    static get pasteConfig() {
        return {
            /**
             * Paste HTML into Editor
             */
            tags: [
                {
                    img: { src: true },
                },
            ],
            /**
             * Paste URL of image into the Editor
             */
            patterns: {
                image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png|svg|webp)(\?[a-z0-9=]*)?$/i,
            },

            /**
             * Drag n drop file from into the Editor
             */
            files: {
                mimeTypes: ['image/*'],
            },
        };
    }

    /**
     * Specify paste handlers
     *
     * @public
     * @see {@link https://github.com/codex-team/editor.js/blob/master/docs/tools.md#paste-handling}
     * @param {CustomEvent} event - editor.js custom paste event
     *                              {@link https://github.com/codex-team/editor.js/blob/master/types/tools/paste-events.d.ts}
     * @returns {void}
     */
    async onPaste(event) {
        switch (event.type) {
            case 'tag': {
                const image = event.detail.data;

                /** Images from PDF */
                if (/^blob:/.test(image.src)) {
                    const response = await fetch(image.src);
                    const file = await response.blob();

                    this.uploadFile(file);
                    break;
                }

                this.uploadUrl(image.src);
                break;
            }
            case 'pattern': {
                const url = event.detail.data;

                this.uploadUrl(url);
                break;
            }
            case 'file': {
                const file = event.detail.file;
                this.uploadFile(file);
                break;
            }
        }
    }

    /**
     * Stores all Tool's data
     *
     * @private
     *
     * @param {ImageToolData} data - data in Image Tool format
     */
    set data(data) {
        this.image = data.file;

        this._data.caption = data.caption || '';
        this.ui.fillCaption(this._data.caption);

        ImageTool.tunes.forEach(({ name: tune }) => {
            const value =
                typeof data[tune] !== 'undefined'
                    ? data[tune] === true || data[tune] === 'true'
                    : false;

            this.setTune(tune, value);
        });
    }

    /**
     * Return Tool data
     *
     * @private
     *
     * @returns {ImageToolData}
     */
    get data() {
        return this._data;
    }

    /**
     * Set new image file
     *
     * @private
     *
     * @param {object} file - uploaded file data
     */
    set image(file) {
        this._data.file = file || {};

        if (file && file.url) {
            this.ui.fillImage(file.url);
        }
    }

    /**
     * File uploading callback
     *
     * @private
     *
     * @param {UploadResponseFormat} response - uploading server response
     * @returns {void}
     */
    onUpload(response) {
        if (response.success && response.file) {
            this.image = response.file;
        } else {
            this.uploadingFailed(
                'incorrect response: ' + JSON.stringify(response)
            );
        }
    }

    /**
     * Handle uploader errors
     *
     * @private
     * @param {string} errorText - uploading error text
     * @returns {void}
     */
    uploadingFailed(errorText) {
        console.log('Image Tool: uploading failed because of', errorText);

        this.api.notifier.show({
            message: this.api.i18n.t(
                'Couldn’t upload image. Please try another.'
            ),
            style: 'error',
        });
        this.ui.hidePreloader();
    }

    /**
     * Callback fired when Block Tune is activated
     *
     * @private
     *
     * @param {string} tuneName - tune that has been clicked
     * @returns {void}
     */
    tuneToggled(tuneName) {
        // inverse tune state
        this.setTune(tuneName, !this._data[tuneName]);
    }

    /**
     * Set one tune
     *
     * @param {string} tuneName - {@link Tunes.tunes}
     * @param {boolean} value - tune state
     * @returns {void}
     */
    setTune(tuneName, value) {
        this._data[tuneName] = value;

        this.ui.applyTune(tuneName, value);

        if (tuneName === 'stretched') {
            /**
             * Wait until the API is ready
             */
            Promise.resolve()
                .then(() => {
                    const blockId = this.api.blocks.getCurrentBlockIndex();

                    this.api.blocks.stretchBlock(blockId, value);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    /**
     * Show preloader and upload image file
     *
     * @param {File} file - file that is currently uploading (from paste)
     * @returns {void}
     */
    uploadFile(file) {
        this.uploader.uploadByFile(file, {
            onPreview: (src) => {
                this.ui.showPreloader(src);
            },
        });
    }

    /**
     * Show preloader and upload image by target url
     *
     * @param {string} url - url pasted
     * @returns {void}
     */
    uploadUrl(url) {
        this.ui.showPreloader(url);
        this.uploader.uploadByUrl(url);
    }
}
