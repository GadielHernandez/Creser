import Vue from 'vue'
import VueRouter from 'vue-router'
import { authorization } from './middlewares'
import Login from '../views/Login'
import Home from '../views/Home'

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
        component: Login,
        meta: {
            requiresNoAuth: true
        }
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
