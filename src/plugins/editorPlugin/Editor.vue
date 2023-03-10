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
import editorExport from './editorExport';

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
    emit('export-html', editorExport.parse(props.data));
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
