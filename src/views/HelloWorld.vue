<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBibleStore } from '../store/BibleStore';

defineProps<{ msg: string }>();

const store = useBibleStore();
</script>

<template>
    <div>
        <h1>{{ msg }}</h1>

        <div class="card">
            <p>
                Edit
                <code>components/HelloWorld.vue</code> to test HMR
            </p>
        </div>

        <p>
            Check out
            <a
                href="https://vuejs.org/guide/quick-start.html#local"
                target="_blank"
                >create-vue</a
            >, the official Vue + Vite starter
        </p>
        <p>
            Install
            <a href="https://github.com/johnsoncodehk/volar" target="_blank"
                >Volar</a
            >
            in your IDE for a better DX
        </p>
        <p class="read-the-docs">
            Click on the Vite and Vue logos to learn more
        </p>
    </div>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
