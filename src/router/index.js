import Vue from 'vue'
import VueRouter from 'vue-router'
import { authorization } from './middlewares'
import Login from '../views/Login'
import Home from '../views/Home'
import Logout from '../views/Logout'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'logout',
        path: '/logout',
        component: Logout
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
	const auth = authorization(to)
    if(!auth.approve)
        return next(auth.redirect)

    next()
})

export default router
