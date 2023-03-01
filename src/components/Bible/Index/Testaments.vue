<template>
    <ul>
        <li
            @click="$emit('select-testament', index)"
            v-for="(testament, index) in testaments"
            :key="index"
        >
            {{ testament }}
        </li>
    </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
    currentTestament: number;
    testaments: string[];
}>();
</script>

<style scoped>
a {
    cursor: pointer;
}
</style>
