<template>
    <div>
        <input
            ref="searchInput"
            type="text"
            :placeholder="placeholder"
            :value="modelValue"
            @input="updateVal($event)"
            @keydown.tab="selectFirstAutoValue"
        />
        <div v-if="autoCompletes.length">
            <ul style="list-style: none">
                <li
                    @click="selectAutoCompleteValue(autoComplete)"
                    v-for="(autoComplete, index) in autoCompletes"
                    :key="index"
                >
                    {{ autoComplete }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const searchInput = ref<HTMLInputElement | null>(null);

const props = defineProps<{
    autoCompleteCallback: Function;
    modelValue: string;
}>();
const emit = defineEmits(['update:modelValue']);
const updateVal = ($event: Event) => {
    if ($event.target) {
        const target = $event.target as EventTarget & { value: any };
        emit('update:modelValue', target.value);
    }
};

const placeholder = ref('');
let autoCompleted = false;
const autoCompletes = ref<string[]>([]);

const selectAutoCompleteValue = (
    autoValue: string,
    autofocus: boolean = true
) => {
    autoCompletes.value = [];
    placeholder.value = autoValue;
    autoCompleted = true;
    autofocus && searchInput.value?.focus();
    emit('update:modelValue', autoValue);
};

const selectFirstAutoValue = () => {
    if (autoCompletes.value.length) {
        selectAutoCompleteValue(autoCompletes.value[0], false);
    }
};

watch(
    () => props.modelValue,
    (newValue: string) => {
        if (!autoCompleted) {
            autoCompletes.value = props.autoCompleteCallback(newValue);
        }
        autoCompleted = false;
    }
);
</script>

<style></style>
