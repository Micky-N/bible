import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Api from '../bible/ApiBible';
import Bible from '../views/Bible.vue';
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
        name: 'bible',
        component: Bible,
        props: { bible: Api.getBible() }
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
