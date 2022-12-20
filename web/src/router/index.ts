import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Start from '../views/Start.vue'
import CreateEvent from '../views/CreateEvent.vue'
import CreateActivity from '../views/CreateActivity.vue'
import { createRouter, createWebHashHistory } from 'vue-router'


const routes =  [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUp
    },
    {
        path: '/start',
        name: 'start',
        component: Start
    },
    {
        path: '/create-event',
        name: 'create-event',
        component: CreateEvent
    },
    {
        path: '/create-activity',
        name: 'create-activity',
        component: CreateActivity
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router