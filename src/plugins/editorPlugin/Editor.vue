<template>
    <div>
        <button v-if="!config.readOnly" @click="save">
            {{ config.saveName || 'Save' }}
        </button>
        <button @click="exportHTML">
            {{ config.exportName || 'Export HTML' }}
        </button>
        <div ref="editorDiv" id="editorjs"></div>
    </div>
</template>

<script setup lang="ts">
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import { computed, inject, ref, watch } from 'vue';
import DragDrop from 'editorjs-drag-drop';

const emit = defineEmits(['save', 'export-html']);

const props = defineProps({
    config: { type: Object, default: () => {} },
});

const editorDiv = ref<HTMLDivElement | null>(null);
const defaultConfig = inject('defaultConfig') as EditorConfig;

let editor = new EditorJS({
    onReady: () => {
        new DragDrop(editor);
    },
    ...defaultConfig,
    ...(props.config || {}),
});

const save = () => {
    editor
        .save()
        .then((outputData) => {
            console.log(outputData)
            emit('save', outputData);
        })
        .catch((error) => {
            console.error('Saving failed: ', error);
        });
};

const exportHTML = () => {
    editor
        .save()
        .then((outputData) => {
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
            };
            const parser = new edjsParser(undefined, test);
            emit('export-html', parser.parse(outputData));
        })
        .catch((error) => {
            console.error('Saving failed: ', error);
        });
};
watch(
    () => props.config.readOnly,
    () => {
        if (editorDiv.value) {
            editorDiv.value.innerHTML = '';
            editor = new EditorJS({
                onReady: () => {
                    new DragDrop(editor);
                },
                ...defaultConfig,
                ...(props.config || {}),
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
