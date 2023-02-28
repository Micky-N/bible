<template>
    <div>
        <input
            type="text"
            :placeholder="placeholder"
            :value="modelValue"
            @input="updateVal($event)"
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

const selectAutoCompleteValue = (autoValue: string) => {
    autoCompletes.value = [];
    placeholder.value = autoValue;
    autoCompleted = true;
    emit('update:modelValue', autoValue);
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
