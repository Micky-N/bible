import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import BibleIndex from '../views/Bible/Index.vue';
import BibleBook from '../views/Bible/Book.vue';
import BibleVerse from '../views/Bible/Verse.vue';
import BibleSearches from '../views/Bible/Searches.vue';
import HelloWorld from '../views/HelloWorld.vue';
import NotesIndex from '../views/Notes/Index.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HelloWorld,
        props: { msg: 'Electron + Vite + Vue' },
    },
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
    {
        path: '/notes',
        name: 'notes.index',
        component: NotesIndex,
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
