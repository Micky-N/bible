import { LinkToolData } from './plugins/LinkTool';
import { ImageToolData } from './plugins/ImageTool/uploader';
import { QuoteToolData, TableToolData, ChecklistToolData } from './index';

const edjsParser = require('editorjs-parser');
const customConfig = {
    paragraph: function (
        data: { [key: string]: string },
        config: { [key: string]: { [key: string]: string } }
    ) {
        return `<div class="ce-paragraph cdx-block ce-${config.paragraph.pClass}--${data.alignment}" contenteditable="false" data-placeholder="Content">${data.text}</div>`;
    },
    separator: function () {
        return "<div class='ce-separator'></div>";
    },
    link: function (data: LinkToolData) {
        return `<a class="link-tool__content link-tool__content--rendered" target="_blank" rel="nofollow noindex noreferrer" href="${data.link}"><div class="link-tool__image" style="background-image: url(${data.meta.image.url});"></div><div class="link-tool__title">${data.meta.title}</div><p class="link-tool__description">${data.meta.description}</p><span class="link-tool__anchor">${data.meta.site_name}</span></a>`;
    },
    image: function (data: ImageToolData) {
        return `<div class="cdx-block image-tool image-tool--filled"><div class="image-tool__image"><img class="image-tool__image-picture" src="${data.file.url}"></div><div class="image-tool__caption" contenteditable="false" data-placeholder="Caption">${data.caption}</div></div>`;
    },
    quote: function (data: QuoteToolData) {
        return `<blockquote class="ce-blockquote"><p>${data.text}</p><cite>__ ${data.caption} __<cite></blockquote>`;
    },
    table: function (data: TableToolData) {
        let withHeading = data.withHeadings;
        const content = data.content;
        let text = '';
        content.forEach((row) => {
            text += '<div class="tc-row">';
            row.forEach((col) => {
                text += `<div class="tc-cell" contenteditable="false">${col}</div>`;
            });
            text += '</div>';
        });
        if (text) {
            return `<div class="tc-wrap tc-wrap--readonly"><div class="tc-table ${
                withHeading ? 'tc-table--heading' : ''
            }">${text}</div></div>`;
        }
        return text;
    },
    checklist: function (data: ChecklistToolData) {
        let text = '';
        data.items.forEach((item) => {
            text += `
                <div class="cdx-checklist__item cdx-checklist__item${
                    item.checked ? '--checked' : ''
                }">
                    <span class="cdx-checklist__item-checkbox"></span>
                    <div class="cdx-checklist__item-text" contenteditable="false">${
                        item.text
                    }</div>
                </div>`;
        });
        if (text) {
            return `<div class="cdx-block cdx-checklist">${text}</div>`;
        }
        return text;
    },
};

export default new edjsParser(undefined, customConfig);
