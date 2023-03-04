<template>
    <div style="margin-top: 10px">
        <small @click="goToReference">{{ reference.value }}</small>
        <div>
            <verse
                :verse="verse"
                v-for="verse in reference.verses"
                :key="verse.id"
                :colored="false"
                :clickable="false"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import Verse from '@/components/Bible/Book/Verse.vue';
import { useRouter } from 'vue-router';
import { useBibleStore } from '../../../../store/BibleStore';
import { ReferenceT } from '../../../../types/Bible';

const props = defineProps<{ reference: ReferenceT }>();
const useBible = useBibleStore();
const router = useRouter();

const goToReference = () => {
    useBible.testament = props.reference.testament;
    useBible.book = props.reference.book;
    useBible.chapter = props.reference.chapter;
    useBible.verses = props.reference.verse;
    let routeParam: { name: string; query?: {} } = {
        name: 'bible.book',
        query: { colored: 1 },
    };
    if (typeof useBible.verses == 'number') {
        routeParam = { name: 'bible.verse' };
    }
    router.push(routeParam);
};
</script>

<style></style>
