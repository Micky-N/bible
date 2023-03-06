import { RouteRecordRaw } from 'vue-router';
import BibleIndex from '../views/Bible/Index.vue';
import BibleBook from '../views/Bible/Book.vue';
import BibleVerse from '../views/Bible/Verse.vue';
import BibleSearches from '../views/Bible/Searches.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/bible',
        name: 'bible.index',
        component: BibleIndex,
    },
    {
        path: '/bible/book',
        name: 'bible.book',
        component: BibleBook,
    },
    {
        path: '/bible/verse',
        name: 'bible.verse',
        component: BibleVerse,
    },
    {
        path: '/bible/searches',
        name: 'bible.searches',
        component: BibleSearches,
    },
];

export default routes;
