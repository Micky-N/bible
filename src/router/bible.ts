import { RouteRecordRaw } from 'vue-router';
import BibleLayout from '../views/Bible/Layout.vue';
import BibleIndex from '../views/Bible/Index.vue';
import BibleBook from '../views/Bible/Book.vue';
import BibleVerse from '../views/Bible/Verse.vue';
import BibleSearches from '../views/Bible/Searches.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/bible',
        component: BibleLayout,
        children: [
            {
                path: '',
                name: 'bible.index',
                component: BibleIndex,
            },
            {
                path: 'book',
                name: 'bible.book',
                component: BibleBook,
            },
            {
                path: 'verse',
                name: 'bible.verse',
                component: BibleVerse,
            },
            {
                path: 'searches',
                name: 'bible.searches',
                component: BibleSearches,
            },
        ],
    },
];

export default routes;
