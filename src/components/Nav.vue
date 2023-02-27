<template>
    <div>
        <div class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link">home</a>
            </li>
            <li class="nav-item">
                <ipc-link link="readBible" title="bible" />
            </li>
            <li class="nav-item">
                <a class="nav-link">about</a>
            </li>
        </div>
    </div>
</template>

<script setup lang="ts">
import IpcLink from "./IpcLink.vue";
</script>

<style></style>
