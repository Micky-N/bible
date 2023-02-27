<template>
    <div>
        <aside>
            {{ name }}
            <ul>
                {{ testaments }}
            </ul>
        </aside>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps({
    bible: {type: Object, default: () => {}}
})

const testaments = computed(() => {
    const t: [{value: string}] = props.bible.testaments
    return t.map(testament => testament.value)
})

const name = 'test'

</script>

<style></style>
