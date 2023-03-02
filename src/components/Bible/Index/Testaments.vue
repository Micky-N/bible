<template>
    <ul>
        <li
            @click="$emit('select-testament', testament.id)"
            v-for="testament in testaments"
            :key="testament.id"
        >
            {{ testament.value }}
        </li>
    </ul>
</template>

<script setup lang="ts">
defineProps<{
    currentTestament: number;
    testaments: {
        value: string;
        id: number;
    }[];
}>();
</script>

<style scoped>
a {
    cursor: pointer;
}
</style>
