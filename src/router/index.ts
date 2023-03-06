import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HelloWorld from '../views/HelloWorld.vue';
import routesBible from './bible';
import routesNote from './note';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HelloWorld,
        props: { msg: 'Electron + Vite + Vue' },
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
    ...routesBible,
    ...routesNote,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
