<template>
    <div>
        <button v-if="!config.readOnly" @click="save">
            {{ config.saveName || 'Save' }}
        </button>
        <button v-if="config.readOnly" @click="exportHTML">
            {{ config.exportName || 'Export HTML' }}
        </button>
        <div ref="editorDiv" id="editorjs"></div>
    </div>
</template>

<script setup lang="ts">
import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs';
import { computed, inject, ref, watch } from 'vue';
import DragDrop from 'editorjs-drag-drop';
import LinkTool, { LinkToolData } from './plugins/LinkTool';
import { Blocks } from '@editorjs/editorjs/types/api';

const emit = defineEmits(['save', 'export-html']);

const props = withDefaults(
    defineProps<{
        config?: EditorConfig;
        data?: OutputData;
    }>(),
    {
        config: undefined,
        data: undefined,
    }
);

const editorDiv = ref<HTMLDivElement | null>(null);
const defaultConfig = inject('defaultConfig') as EditorConfig;

let editor = new EditorJS({
    onReady: () => {
        new DragDrop(editor);
    },
    ...defaultConfig,
    ...(props.config || {}),
    data: props.data || ({} as OutputData),
});

const save = () => {
    editor
        .save()
        .then((outputData) => {
            emit('save', outputData);
        })
        .catch((error) => {
            console.error('Saving failed: ', error);
        });
};

const exportHTML = () => {
    if (!props.data) {
        return false;
    }
    const edjsParser = require('editorjs-parser');
    const test = {
        paragraph: function (
            data: { [key: string]: string },
            config: { [key: string]: { [key: string]: string } }
        ) {
            return `<p class='${config.paragraph.pClass} ${data.alignment}'>${data.text}</p>`;
        },
        separator: function () {
            return "<div class='separator'></div>";
        },
        link: function (data: LinkToolData) {
            return `<a class="link-tool__content link-tool__content--rendered" target="_blank" rel="nofollow noindex noreferrer" href="${data.link}"><div class="link-tool__image" style="background-image: url(${data.meta.image.url});"></div><div class="link-tool__title">${data.meta.title}</div><p class="link-tool__description">${data.meta.description}</p><span class="link-tool__anchor">${data.meta.site_name}</span></a>`;
        },
    };
    const parser = new edjsParser(undefined, test);
    emit('export-html', parser.parse(props.data));
};
watch(
    () => props.config?.readOnly,
    () => {
        if (editorDiv.value) {
            editorDiv.value.innerHTML = '';
            editor = new EditorJS({
                onReady: () => {
                    new DragDrop(editor);
                },
                ...defaultConfig,
                ...(props.config || {}),
                data: props.data || ({} as OutputData),
            });
        }
    }
);
</script>
<style>
#editorjs .ce-block__content {
    max-width: 80vw;
}
#editorjs .ce-toolbar__content {
    max-width: 80vw;
}
</style>
