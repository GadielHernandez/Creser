import { USER, TEACHER } from './user-types'
import router from "../router"

export const INITAL_ROUTES = {
    [USER]: 'student-home',
    [TEACHER]: 'teacher-home'
}

export function createRoute(params) {
    return {
        name: params.name,
        path: params.path,
        component: params.view,
        meta: {
            requiresAuth: true,
            level: params.level,
        },
    }
}

export function goTo(route_name){
    if(router.currentRoute.name === route_name)
      return
    router.push({ name: route_name })
}
