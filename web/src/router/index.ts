import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
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
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router