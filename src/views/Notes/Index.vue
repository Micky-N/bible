<template>
    <div>
        <editor @save-blocks="saveBlock"></editor>
    </div>
</template>

<script setup lang="ts">
import { OutputData } from '@editorjs/editorjs';

const saveBlock = (data: OutputData) => {
    console.log(data);
};
</script>

<style></style>
