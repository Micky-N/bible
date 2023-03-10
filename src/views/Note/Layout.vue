<template>
    <div>test</div>
    <router-view />
</template>

<script setup lang="ts">
import { useBibleStore } from '../../store/BibleStore';

useBibleStore();
</script>

<style></style>
