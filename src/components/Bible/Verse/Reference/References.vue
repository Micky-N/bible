<template>
    <div>
        <reference
            :reference="reference"
            v-for="(reference, index) in references"
            :key="index"
        />
    </div>
</template>

<script setup lang="ts">
import Reference from '@/components/Bible/Verse/Reference/Reference.vue';
import { ReferenceT } from '../../../../types/Bible';

const props = defineProps<{ references: Array<ReferenceT> }>();
</script>

<style></style>
