<template>
    <div>
        <div class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link">home</a>
            </li>
            <li class="nav-item">
                <a @click="readBible" class="nav-link">bible</a>
            </li>
            <li class="nav-item">
                <a class="nav-link">about</a>
            </li>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IpcRenderer } from "electron/renderer";
import { inject } from "vue"

const ipcRenderer: IpcRenderer = inject('ipcRenderer') as IpcRenderer
    const readBible = () => {
        ipcRenderer.send('readBible')
    }
</script>

<style></style>
