import ajax from '@codexteam/ajax';
import isPromise from './utils/isPromise';
import ApiNote from '../../../../note/ApiNote';

export type ImageToolData = {
    caption: string;
    withBorder: boolean;
    withBackground: boolean;
    stretched: boolean;
    file: {
        url: string;
    };
};

export type ImageConfig = {
    actions: never[];
    endpoints: {
        byFile: string;
        byUrl: string;
    };
    field: string;
    types: string;
    captionPlaceholder: string;
    additionalRequestData: object;
    additionalRequestHeaders: object;
    buttonContent: string;
    uploader?: {
        uploadByFile?: (arg: File) => Promise<UploadResponseFormat>;
        uploadByUrl?: (arg: string) => Promise<UploadResponseFormat>;
    };
};

export type UploadResponseFormat = {
    success: number;
    file: {
        url: string;
    };
};

export default class Uploader {
    config: ImageConfig;
    onUpload: Function;
    onError: Function;

    constructor({
        config,
        onUpload,
        onError,
    }: {
        config: ImageConfig;
        onUpload: Function;
        onError: Function;
    }) {
        this.config = config;
        this.onUpload = onUpload;
        this.onError = onError;
    }

    uploadSelectedFile({ onPreview }: { onPreview: Function }) {
        const preparePreview = function (file: File) {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = (e: ProgressEvent<FileReader>) => {
                onPreview(e.target?.result);
            };
        };

        /**
         * Custom uploading
         * or default uploading
         */
        let upload = ajax
            .selectFiles({ accept: this.config.types })
            .then((files: File[]) => {
                const file = files[0];
                preparePreview(file);

                const customUpload = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const base64 = ApiNote.getImageFromLocal(file.path);
                        resolve({
                            success: 1,
                            file: {
                                url: `data:${file.type};base64,${base64}`,
                            },
                        });
                        reject({ success: 0, text: 'file not correct' });
                    }, 1000);
                });

                return customUpload;
            });

        upload
            .then((response: UploadResponseFormat) => {
                this.onUpload(response);
            })
            .catch((error: { success: number; text: string }) => {
                this.onError(error);
            });
    }

    uploadByUrl(url: string) {
        let upload;

        if (
            this.config.uploader &&
            typeof this.config.uploader.uploadByUrl === 'function'
        ) {
            upload = this.config.uploader.uploadByUrl(url);

            if (!isPromise(upload)) {
                console.warn(
                    'Custom uploader method uploadByUrl should return a Promise'
                );
            }
        } else {
            /**
             * Default uploading
             */
            upload = ajax
                .post({
                    url: this.config.endpoints.byUrl,
                    data: Object.assign(
                        {
                            url: url,
                        },
                        this.config.additionalRequestData
                    ),
                    type: ajax.contentType.JSON,
                    headers: this.config.additionalRequestHeaders,
                })
                .then((response: { [key: string]: any }) => response.body);
        }

        upload
            .then((response: UploadResponseFormat) => {
                this.onUpload(response);
            })
            .catch((error: object) => {
                this.onError(error);
            });
    }

    uploadByFile(file: File, { onPreview }: { onPreview: Function }) {
        /**
         * Load file for preview
         *
         * @type {FileReader}
         */
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = (e: ProgressEvent<FileReader>) => {
            onPreview(e.target?.result);
        };

        const upload = new Promise((resolve, reject) => {
            setTimeout(() => {
                const base64 = ApiNote.getImageFromLocal(file.path);
                resolve({
                    success: 1,
                    file: {
                        url: `data:${file.type};base64,${base64}`,
                    },
                });
                reject({ success: 0, text: 'file not correct' });
            }, 1000);
        });

        upload
            .then((response) => {
                this.onUpload(response);
            })
            .catch((error) => {
                this.onError(error);
            });
    }
}
