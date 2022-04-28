import { auth } from '../plugins/firebase'

export function authorization(to) {
    const requiresAuth = to.matched.some((r) => r.meta.requiresAuth)
    if (requiresAuth && !auth.currentUser)
        return { approve: false, redirect: '/login' }

    const requireNoAuth = to.matched.some((r) => r.meta.requiresNoAuth)
    if(requireNoAuth && auth.currentUser)
        return { approve: false, redirect: '/' }

    return { approve: true }
}