import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Api from '@/bible/ApiBible';
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
        props: { bible: Api.getBible() }
    },
    {
        path: '/bible/:testament/:book',
        name: 'bible.book',
        component: BibleBook,
        props: route => ({ book: Api.getBook(route.params) })
    },
    {
        path: '/bible/:testament/:book/:verses(\\d+|\\d+-\\d+)',
        name: 'bible.verse',
        component: BibleVerse,
        props: route => ({ verses: Api.getVerse(route) })
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
