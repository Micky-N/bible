<template>
    <span :class="{'colored': colored}">
        <sup @click="showVerse()">{{ id + 1 }}</sup
        >{{ verse + ' ' }}
    </span>
</template>

<script setup lang="ts">
import { useBibleStore } from '../../../store/BibleStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const props = defineProps<{
    verse: string;
    index: number | string;
    colored: boolean | false
}>();

const r = useRouter();

const showVerse = () => {
    useBibleStore().verses = props.index;
    r.push({ name: 'bible.verse' });
};

const id = computed(() => {
    return typeof props.index == 'string' ? 0 : props.index
})
</script>

<style scoped>
.colored {
    background: #fff1c5;
}
</style>
