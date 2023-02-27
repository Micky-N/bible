<template>
    <div>
        <aside>
            <ul>
                <li v-for="testament in testaments"></li>
            </ul>
        </aside>
    </div>
</template>

<script setup lang="ts">
import { IpcRenderer } from 'electron';
import { computed, inject, onMounted, Ref, ref } from 'vue';
let bible: Ref<{
    Testaments: any[];
    Text: string;
}> = ref({
    Testaments: [],
    Text: '',
});
onMounted(() => {
    const ipcRenderer: IpcRenderer = inject('ipcRenderer') as IpcRenderer;
    ipcRenderer.on('bible', (event, arg) => {
        bible = ref(arg);
        console.log(arg)
    });
});

let testaments = computed(() => {
    return bible.value;
});
</script>

<style></style>
