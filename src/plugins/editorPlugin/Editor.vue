<template>
    <div>
        <button @click="save">Save</button>
        <div id="editorjs"></div>
    </div>
</template>

<script setup lang="ts">
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import SimpleImage from '@editorjs/simple-image';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Link from '@editorjs/link';
import Color from 'editorjs-text-color-plugin';
import DragDrop from 'editorjs-drag-drop';
import Paragraph from 'editorjs-paragraph-with-alignment';
import ToggleBlock from 'editorjs-toggle-block';
import Tooltip from 'editorjs-tooltip';
import Underline from '@editorjs/underline';
import Separator from './plugins/Separator';
import { IconText } from '@codexteam/icons';

const emit = defineEmits(['saveBlocks']);

const editor = new EditorJS({
    onReady: () => {
        new DragDrop(editor);
    },
    /**
     * Id of Element that should contain Editor instance
     */
    holder: 'editorjs',
    autofocus: true,
    tools: {
        /**
         * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
         */
        header: {
            class: Header,
            shortcut: 'CMD+SHIFT+H',
        },
        /**
         * Or pass class directly without any configuration
         */
        image: {
            class: SimpleImage,
            inlineToolbar: ['link'],
        },
        list: {
            class: List,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+L',
        },
        checklist: {
            class: Checklist,
            inlineToolbar: true,
        },
        quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
                quotePlaceholder: 'Enter a quote',
                captionPlaceholder: "Quote's author",
            },
            shortcut: 'CMD+SHIFT+O',
        },
        toggle: {
            class: ToggleBlock,
            inlineToolbar: true,
        },
        warning: Warning,
        color: {
            class: Color,
            config: {
                colorCollections: [
                    '#EC7878',
                    '#9C27B0',
                    '#673AB7',
                    '#3F51B5',
                    '#0070FF',
                    '#03A9F4',
                    '#00BCD4',
                    '#4CAF50',
                    '#8BC34A',
                    '#CDDC39',
                    '#FFF',
                ],
                defaultColor: '#FF1300',
                type: 'text',
                customPicker: true, // add a button to allow selecting any colour
            },
        },
        marker: {
            class: Color,
            config: {
                defaultColor: '#FFBF00',
                type: 'marker',
                icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
            },
        },
        tooltip: {
            class: Tooltip,
            config: {
                location: 'left',
                highlightColor: '#FFEFD5',
                underline: false,
                backgroundColor: '#154360',
                textColor: '#FDFEFE',
                holder: 'editorjs',
            },
        },
        underline: Underline,
        paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            toolbox: {
                icon: IconText,
            },
        },
        code: {
            class: Code,
            shortcut: 'CMD+SHIFT+C',
        },
        delimiter: Delimiter,
        inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+C',
        },
        link: Link,
        embed: Embed,
        table: {
            class: Table,
            inlineToolbar: true,
            shortcut: 'CMD+ALT+T',
        },
        separator: Separator,
    },
    data: {
        blocks: [
            {
                type: 'header',
                data: {
                    text: 'Editor.js',
                    level: 2,
                },
            },
            {
                type: 'paragraph',
                data: {
                    alignment: 'right',
                    text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
                },
            },
            {
                type: 'separator',
                data: {},
            },
            {
                type: 'header',
                data: {
                    text: 'Key features',
                    level: 3,
                },
            },
            {
                type: 'list',
                data: {
                    items: [
                        'It is a block-styled editor',
                        'It returns clean data output in JSON',
                        'Designed to be extendable and pluggable with a simple API',
                    ],
                    style: 'unordered',
                },
            },
            {
                type: 'header',
                data: {
                    text: 'What does it mean «block-styled editor»',
                    level: 3,
                },
            },
            {
                type: 'paragraph',
                data: {
                    text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
                },
            },
            {
                type: 'paragraph',
                data: {
                    text: `There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.`,
                },
            },
            {
                type: 'header',
                data: {
                    text: 'What does it mean clean data output',
                    level: 3,
                },
            },
            {
                type: 'paragraph',
                data: {
                    text: 'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below',
                },
            },
            {
                type: 'paragraph',
                data: {
                    text: `Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.`,
                },
            },
            {
                type: 'paragraph',
                data: {
                    text: 'Clean data is useful to sanitize, validate and process on the backend.',
                },
            },
            {
                type: 'delimiter',
                data: {},
            },
            {
                type: 'paragraph',
                data: {
                    text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
                },
            },
        ],
    },
});

const save = () => {
    editor
        .save()
        .then((outputData) => {
            emit('saveBlocks', outputData);
        })
        .catch((error) => {
            console.error('Saving failed: ', error);
        });
};
</script>
