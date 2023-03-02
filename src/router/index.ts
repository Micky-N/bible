import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
} from 'vue-router';
import BibleIndex from '../views/Bible/Index.vue';
import BibleBook from '../views/Bible/Book.vue';
import BibleVerse from '../views/Bible/Verse.vue';
import HelloWorld from '../views/HelloWorld.vue';

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
