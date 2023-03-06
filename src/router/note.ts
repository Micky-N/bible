import { RouteRecordRaw } from 'vue-router';
import NoteLayout from '../views/Note/Layout.vue';
import NoteIndex from '../views/Note/Index.vue';
import NoteShow from '../views/Note/Show.vue';
import NoteNew from '../views/Note/New.vue';
import { SavedData } from '../types/Note';
import ApiNote from '../note/ApiNote';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/notes',
        component: NoteLayout,
        children: [
            {
                path: '',
                name: 'notes.index',
                component: NoteIndex,
            },
            {
                path: 'new',
                name: 'notes.new',
                component: NoteNew,
            },
            {
                path: ':note/show',
                name: 'notes.show',
                component: NoteShow,
                props: (route) => ({ idNote: route.params.note }),
            },
        ],
    },
];

export default routes;
